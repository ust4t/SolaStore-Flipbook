import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import HTMLFlipBook from "react-pageflip";

import { sources } from "../sources";
import { encodeURLString } from "../utils/utils";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <div className="page-text">{props.children}</div>
      </div>
    </div>
  );
});

export default function Home({ allPages, brands }) {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [screeHt, setScreeHt] = useState(1);
  const flipBook = useRef();
  // const flipBook = React.useRef(null);

  const nextPage = () => flipBook.current.pageFlip().flipNext();

  const prevPage = () => flipBook.current.pageFlip().flipPrev();

  const pageFlip = (page, corner) =>
    flipBook.current.pageFlip().flip(page, corner);

  const onPage = (e) => {
    setPage(e.data);
  };

  useEffect(() => {
    setScreeHt(window.innerHeight);
  }, []);

  return (
    <div
      style={{
        maxWidth: "1300px",
        height: "100vh",
      }}
      className="d-flex flex-column align-items-center justify-content-center overflow-hidden">
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
        // onChangeState={this.onChangeState}
        className="demo-book "
        ref={flipBook}>
        <div
          className="page page-cover d-flex flex-column align-items-center pt-2 "
          data-density="hard">
          <img className="logo" src="/img/placeholder.jpg" alt="" />
          <div className="d-flex flex-column justify-content-start w-100 px-5 ">
            {pages.map(({ title, pageNumber }) => (
              <a
                key={`${pageNumber}.||`}
                onClick={() => pageFlip(pageNumber + 2, ["top", "bottom"])}
                className="d-flex justify-content-between mb-2 cursor-pointer">
                <p className="align-self-start h5 fw-normal">{title}</p>
                <p className="align-self-start h5 fw-normal">{pageNumber}</p>
              </a>
            ))}
            <div className="row">
              {brands.slice(0, 8).map((brandItem, i) => (
                <div
                  key={`${i}._!`}
                  className="col-3 my-1 cursor-pointer brand">
                  <img
                    className="border brand brand-img"
                    src={`${sources.brand}${brandItem.guidName}`}
                    alt={brandItem.brandName}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Page className="page">
          <div className="row justify-content-center h-100 m-2">
            {brands.slice(8, 26).map((brandItem, i) => (
              <div key={`${i}._._!`} className="col-3 my-1 cursor-pointer">
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
                <p className="text-center fs-3 fw-bold">{page.title}</p>
                <p className="text-center fs-3 position-absolute top-0  ps-2">
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
      <div
        style={{
          zIndex: "102",
        }}
        className="d-flex">
        <button className="btn btn-primary" onClick={prevPage}>
          Prev
        </button>
        {page !== allPages.length && (
          <button className="btn btn-primary" onClick={nextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

const pages = [
  {
    title: "Yeni Ürünler",
    pageNumber: 1,
  },
  {
    title: "Popüler Ürünler",
    pageNumber: 2,
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
        allPages,
        brands,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
