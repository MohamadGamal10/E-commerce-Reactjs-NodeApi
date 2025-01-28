import React from "react";
import { Row } from "react-bootstrap";
import SidebarSearchHook from "../../hook/search/sidebar-search-hook";

export default function SideFilter() {
  const [category, brand, changeCategory, changeBrand,priceFrom,priceTo] = SidebarSearchHook();
  let localFrom = localStorage.getItem("priceFrom")
  let localTo = localStorage.getItem("priceTo")

  return (
    <div className="mt-3">
      <Row>
        <div className="d-flex flex-column mt-2">
          <div className="filter-title">الفئة</div>
          <div className="d-flex mt-3">
            <input onChange={changeCategory} type="checkbox" value="0" />
            <div className="filter-sub me-2 ">الكل</div>
          </div>
          {category ? (
            category.map((item, index) => (
              <div key={index} className="d-flex mt-2">
                <input
                  onChange={changeCategory}
                  type="checkbox"
                  value={item._id}
                />
                <div className="filter-sub me-2 ">{item.name}</div>
              </div>
            ))
          ) : (
            <h6>لا يوجد تصنيفات</h6>
          )}
        </div>

        <div className="d-flex flex-column mt-2">
          <div className="filter-title mt-3">الماركة</div>
          <div className="d-flex mt-3">
            <input onChange={changeBrand} type="checkbox" value="0" />
            <div className="filter-sub me-2 ">الكل</div>
          </div>
          {brand ? (
            brand.map((item, index) => (
              <div key={index} className="d-flex mt-2">
                <input
                  onChange={changeBrand}
                  type="checkbox"
                  value={item._id}
                />
                <div className="filter-sub me-2 ">{item.name}</div>
              </div>
            ))
          ) : (
            <h6>لا يوجد ماركات</h6>
          )}
        </div>

        <div className="filter-title my-3">السعر</div>
        <div className="d-flex">
          <p className="filter-sub my-2">من:</p>
          <input
          value={localFrom}
            onChange={priceFrom}
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>
        <div className="d-flex">
          <p className="filter-sub my-2">الي:</p>
          <input
            value={localTo}
            onChange={priceTo}
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>
      </Row>
    </div>
  );
}
