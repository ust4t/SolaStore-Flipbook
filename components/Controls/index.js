import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function Controls({
  currentPage,
  firstPage,
  lastPage,
  nextPage,
  prevPage,
}) {
  const { t } = useTranslation("common");

  return (
    <div
      style={{
        // width: "320px",
        // height: "60px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        gap: "10px",
      }}
      className="d-flex justify-content-center align-items-center position-fixed bottom-0 start-50 translate-middle-x p-2">
      <div
        onClick={firstPage}
        className={`controls-btn ${currentPage === 0 && "disabled"}`}>
        <ion-icon name="play-back-outline" size="large" />
        <p className="p-0 m-0">{t("first")}</p>
      </div>
      <div
        onClick={prevPage}
        className={`controls-btn ${currentPage === 0 && "disabled"}`}>
        <ion-icon name="chevron-back-outline" size="large" />
        <p className="p-0 m-0">{t("prev")}</p>
      </div>
      <div onClick={nextPage} className="controls-btn">
        <ion-icon name="chevron-forward-outline" size="large" />
        <p className="p-0 m-0">{t("next")}</p>
      </div>
      <div onClick={lastPage} className="controls-btn">
        <ion-icon name="play-forward-outline" size="large" />
        <p className="p-0 m-0">{t("last")}</p>
      </div>
      <div class="dropdown">
        <a
          class="btn dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <img src="" alt="" />
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a class="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
