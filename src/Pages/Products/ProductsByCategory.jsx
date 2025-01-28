import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "../../Components/Uitily/Pagination";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import ViewAllProductsCategoryHook from "../../hook/products/view-all-products-category-hook";
import { useParams } from "react-router-dom";

const ProductsByCategory = () => {
  const {id} = useParams();
  const [items, pagination, onPress] = ViewAllProductsCategoryHook(id);
  
  if (pagination)
    var pageCount = pagination
else
    pageCount = 0

  return (
    <div style={{ minHeight: "670px" }}>
      <Container>
        <Row className="d-flex flex-row">
          <Col sm="12">
            <CardProductsContainer products={items} title="" btntitle="" />
          </Col>
        </Row>

        <Pagination pageCount={pageCount} onPress={onPress} />
      </Container>
    </div>
  );
};

export default ProductsByCategory;
