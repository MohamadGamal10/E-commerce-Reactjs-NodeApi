import React from "react";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import SearchCountResult from "../../Components/Uitily/SearchCountResult";
import { Col, Container, Row } from "react-bootstrap";
import SideFilter from "../../Components/Uitily/SideFilter";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import Pagination from "../../Components/Uitily/Pagination";
import ViewSearchProductsHook from "../../hook/products/view-search-products-hook";

export default function ShopProductPage() {
  const [items, pagination, onPress, getProducts, results] = ViewSearchProductsHook();

  if (pagination)
    var pageCount = pagination;
else
    pageCount = 0;
  return (
    <div style={{ minHeight: "670px", overflow: "hidden" }}>
      <CategoryHeader />
      <Container>
        <SearchCountResult onclick={getProducts} title={`${results} نتيجه بحث`} />
        <Row className="d-flex flex-row">
          <Col xs={2} md={1} className="d-flex">
            <SideFilter />
          </Col>
          <Col xs={10} md={11} className="ms-0">
            <CardProductsContainer products={items}  />
          </Col>
        </Row>
        <Pagination pageCount={pageCount} onPress={onPress} />
      </Container>
    </div>
  );
}
