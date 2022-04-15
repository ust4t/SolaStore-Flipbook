import React from "react";

export default function Controls({ firstPage, lastPage, nextPage, prevPage }) {
  return (
    <div
      style={{
        width: "230px",
        height: "60px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        gap: "10px",
      }}
      className="d-flex justify-content-center align-items-center position-fixed bottom-0 start-50 translate-middle-x">
      <div onClick={firstPage} className="controls-btn">
        <ion-icon name="play-back-outline" size="large" />
      </div>
      <div onClick={prevPage} className="controls-btn">
        <ion-icon name="chevron-back-outline" size="large" />
      </div>
      <div onClick={nextPage} className="controls-btn">
        <ion-icon name="chevron-forward-outline" size="large" />
      </div>
      <div onClick={lastPage} className="controls-btn">
        <ion-icon name="play-forward-outline" size="large" />
      </div>
    </div>
  );
}
