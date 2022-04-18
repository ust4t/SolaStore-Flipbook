import React from "react";
import useTranslation from "next-translate/useTranslation";
import { StoreContext } from "../../context/StoreProvider";
import { CHANGE_LANG } from "../../context/type";
import { useRouter } from "next/router";

const langs = [
  {
    flag: "en",
    name: "en",
  },
  {
    flag: "ru",
    name: "ru",
  },
  {
    flag: "ar",
    name: "ar",
  },
  {
    flag: "fr",
    name: "fr",
  },
  {
    flag: "tr",
    name: "tr",
  },
];

export default function Controls({
  currentPage,
  firstPage,
  lastPage,
  nextPage,
  prevPage,
}) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { state, dispatch } = React.useContext(StoreContext);

  const changeLang = (name, flag) => {
    dispatch({
      type: CHANGE_LANG,
      payload: {
        name,
        flag,
      },
    });
    router.push(router.asPath, router.asPath, {
      locale: name,
    });
  };

  return (
    <div
      style={{
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
      <div className="dropdown">
        <a
          className="btn dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <img
            className="flag"
            src={`/img/flags/${state.lang.flag}.jpg`}
            alt={state.lang.name}
          />
          <span className="mx-2 fs-5 fw-bold text-uppercase">
            {state.lang.name}
          </span>
        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {langs.map(({ name, flag }, i) => (
            <li key={`${name}.|${i}`}>
              <a
                onClick={() => changeLang(name, flag)}
                className="dropdown-item"
                href="#">
                <img
                  className="flag"
                  src={`/img/flags/${flag}.jpg`}
                  alt={name}
                />
                <span className="mx-2 fs-5 fw-bold text-uppercase">{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
