import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "../../Components/Uitily/Pagination";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import ViewAllProductsBrandHook from "../../hook/products/view-all-products-brand-hook";
import { useParams } from "react-router-dom";

const ProductsByBrand = () => {
    const {id} = useParams();
    const [items, pagination, onPress] = ViewAllProductsBrandHook(id);

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

export default ProductsByBrand;
