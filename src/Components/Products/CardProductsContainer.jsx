import React, { useEffect, useState } from 'react'
import SubTitle from "../Uitily/SubTitle";
import { Container, Row } from "react-bootstrap";
import ProductCard from './ProductCard';
import CardContainerHook from '../../hook/products/card-container-hook';

export default function CardProductsContainer({title,btnTitle,pathText,products}) {
  const [favProd] = CardContainerHook();

  return (
    <Container>
      <SubTitle title={title} btnTitle={btnTitle} pathText={pathText}/>
      <Row className="my-2 d-flex justify-content-between">
        {products && products.map((item, index) => (
          <ProductCard key={index} item={item} favProd={favProd} />
        ))}
      </Row>
    </Container>
  )
}
