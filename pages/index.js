import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import HTMLFlipBook from "react-pageflip";

import { sources } from "../sources";
import { encodeURLString } from "../utils/utils";
import Controls from "../components/Controls";
import PageCover from "../components/PageCover";
import Page from "../components/Page";

export default function Home({ allPages, brands }) {
  const [page, setPage] = useState(0);
  const [screeHt, setScreeHt] = useState(1);
  const flipBook = useRef();

  const nextPage = () => flipBook.current.pageFlip().flipNext();

  const prevPage = () => flipBook.current.pageFlip().flipPrev();

  const pageFlip = (page, corner) =>
    flipBook.current.pageFlip().flip(page, corner);

  const onPage = (e) => {
    setPage(e.data);
  };

  const firstPage = () => flipBook.current.pageFlip().flip(0, ["top"]);

  const lastPage = () => {
    const totalPage = flipBook.current.pageFlip().getPageCount();
    flipBook.current.pageFlip().flip(totalPage - 1, ["top"]);
  };

  useEffect(() => {
    setScreeHt(window.innerHeight);
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: "1300px",
          height: "100vh",
        }}
        className="d-flex flex-column align-items-center justify-content-center book-overflow">
        <HTMLFlipBook
          width={550}
          height={733}
          minWidth={315}
          maxWidth={1200}
          minHeight={420}
          size="stretch"
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onPage}
          // onChangeOrientation={this.onChangeOrientation}
          className="demo-book"
          ref={flipBook}>
          <PageCover pages={pages} brands={brands} pageFlip={pageFlip} />

          <Page className="page">
            <div className="row justify-content-center h-100 m-2">
              {brands.slice(8, 26).map((brandItem, i) => (
                <div
                  onClick={() =>
                    brandItem.pageNum === 30 || brandItem.pageNum === 31
                      ? lastPage()
                      : pageFlip(brandItem.pageNum + 3, ["top"])
                  }
                  key={`${i}._._!`}
                  className="col-3 my-1 cursor-pointer">
                  {brandItem.pageNum}
                  <img
                    className="border brand-img-2"
                    src={`${sources.brand}${brandItem.guidName}`}
                    alt={brandItem.brandName}
                  />
                </div>
              ))}
            </div>
          </Page>

          {allPages.map((page, index) => (
            <Page key={`${index}.|`} className="page" number={index}>
              <div className="row m-0 p-0">
                <div className="col-12 border-bottom position-relative">
                  <p className="text-center fs-3 fw-bold mb-1">{page.title}</p>
                  <p className="text-center fs-3 position-absolute top-0 ps-2 mb-1">
                    {index + 1}
                  </p>
                </div>
                {page.data.map((pageItem, i) => (
                  <div key={`${i}.||._`} className="col-4 my-md-1">
                    <a
                      href={`https://solastore.com.tr/detail/${encodeURLString(
                        pageItem.productShortName
                      )}:${pageItem.masterProductID}?selected=${
                        pageItem.productID
                      }`}
                      target="_blank">
                      <img
                        src={`${sources.imageMidSrc}${pageItem.picture_1}`}
                        alt=""
                        className="page-image img-fluid overflow-hidden"
                      />
                      <p className="text-center title fw-bold mb-0">
                        {pageItem.productShortName}
                      </p>
                      <p
                        style={{
                          color: "var(--color-primary)",
                        }}
                        className="text-center fs-4">
                        {pageItem.singlePrice}$
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </Page>
          ))}
        </HTMLFlipBook>
        <Controls
          nextPage={nextPage}
          prevPage={prevPage}
          firstPage={firstPage}
          lastPage={lastPage}
        />
      </div>
    </>
  );
}

const pages = [
  {
    title: "Yeni Ürünler",
    pageNumber: 1,
  },
  {
    title: "Popüler Ürünler",
    pageNumber: 4,
  },
];

export async function getServerSideProps() {
  let allPages = [];
  try {
    const [{ data: newProducts }, { data: popularProducts }, { data: brands }] =
      await Promise.all([
        axios.get(
          `https://api.solastore.com.tr/api/Product/GetNewProducts?lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
        ),
        axios.get(
          `https://api.solastore.com.tr/api/Product/GetBestSellerProducts?lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
        ),
        axios.get(
          `https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
        ),
      ]);

    allPages = [
      { title: "Yeni Ürünler", data: newProducts.slice(0, 6) },
      { title: "Yeni Ürünler", data: newProducts.slice(6, 12) },
      { title: "Yeni Ürünler", data: newProducts.slice(12, 18) },
      { title: "Popüler Ürünler", data: popularProducts.slice(0, 6) },
      { title: "Popüler Ürünler", data: popularProducts.slice(6, 12) },
    ];

    await Promise.all(
      brands.map(async ({ brandName, brandID }) => {
        const { data: brandData } = await axios.get(
          `https://api.solastore.com.tr/api/Product/GetSelectedBrandProducts?BrandID=${brandID}&lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
        );

        allPages.push({
          title: brandName,
          data: brandData.slice(0, 6),
        });
      })
    );

    return {
      props: {
        allPages: [
          ...allPages.slice(0, 5),
          ...allPages
            .slice(5, allPages.length)
            .sort((a, b) => a.title.localeCompare(b.title)),
        ],
        brands: brands
          .sort((a, b) => a.brandName.localeCompare(b.brandName))
          .map((item, i) => ({
            ...item,
            pageNum: 5 + i + 1,
          })),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        allPages: [],
        brands: [],
      },
    };
  }
}
