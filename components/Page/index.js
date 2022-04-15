import React from "react";

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <div className="page-text">{props.children}</div>
      </div>
    </div>
  );
});

export default Page;
