import React from "react";
import useTranslation from "next-translate/useTranslation";

import { sources } from "../../sources";

const PageCover = React.forwardRef(({ pages, brands, pageFlip }, ref) => {
  const { t } = useTranslation("common");

  return (
    <div className="page page-cover pt-2" ref={ref} data-density="hard">
      <div className="w-100 d-flex align-items-center justify-content-center">
        <img className="logo" src="/img/placeholder.jpg" alt="" />
      </div>
      <div className="d-flex flex-column justify-content-start w-100 px-5 ">
        {pages.map(({ title, pageNumber }) => (
          <a
            key={`${pageNumber}.||`}
            onClick={() => pageFlip(pageNumber, ["top", "bottom"])}
            className="d-flex justify-content-between mb-2 cursor-pointer">
            <p className="align-self-start h5 fw-normal">{t(title)}</p>
            <p className="align-self-start h5 fw-normal">{pageNumber}</p>
          </a>
        ))}
        <div className="row">
          {brands.slice(0, 8).map((brandItem, i) => (
            <div
              key={`${i}._!`}
              onClick={() => pageFlip(brandItem.pageNum, ["top"])}
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
  );
});

export default PageCover;
