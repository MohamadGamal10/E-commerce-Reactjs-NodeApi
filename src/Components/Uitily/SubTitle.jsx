import React from "react";
import { Link } from "react-router-dom";

export default function SubTitle({ title, btnTitle , pathText}) {
  return (
    <div className="d-flex justify-content-between pt-4">
      <div className="sub-tile">
          {title}
      </div>
      {btnTitle ? (
        <Link to={pathText} style={{ textDecoration: "none" }}>
        <div className="shopping-now">
            {btnTitle}
        </div>
        </Link>
      ): null}
    </div>
  );
}
