import React from "react";

export default function Controls({
  currentPage,
  firstPage,
  lastPage,
  nextPage,
  prevPage,
}) {
  return (
    <div
      style={{
        width: "320px",
        // height: "60px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        gap: "10px",
      }}
      className="d-flex justify-content-center align-items-center position-fixed bottom-0 start-50 translate-middle-x py-2">
      <div
        onClick={firstPage}
        className={`controls-btn ${currentPage === 0 && "disabled"}`}>
        <ion-icon name="play-back-outline" size="large" />
        <p className="p-0 m-0">First Page</p>
      </div>
      <div
        onClick={prevPage}
        className={`controls-btn ${currentPage === 0 && "disabled"}`}>
        <ion-icon name="chevron-back-outline" size="large" />
        <p className="p-0 m-0">Previous</p>
      </div>
      <div onClick={nextPage} className="controls-btn">
        <ion-icon name="chevron-forward-outline" size="large" />
        <p className="p-0 m-0">Next</p>
      </div>
      <div onClick={lastPage} className="controls-btn">
        <ion-icon name="play-forward-outline" size="large" />
        <p className="p-0 m-0">Last Page</p>
      </div>
    </div>
  );
}
