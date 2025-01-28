import React, { useEffect, useState } from 'react'
import { Container,Row ,Col} from 'react-bootstrap'
import { AllCategoryHook } from '../../hook/category/all-category-page-hook';
import { Link } from 'react-router-dom';

export default function CategoryHeader() {
  const [categories , loading , pageCount , getPage, allData]  = AllCategoryHook();


  
  return (
    <div className="cat-header">
    <Container>
      <Row>
        <Col className="d-flex justify-content-start py-2 flex-wrap">
        {categories?.map((item, index) => (
          <Link to={`/products/category/${item._id}`} style={{ textDecoration: "none" }} >
          <div key={index} className="cat-text-header">{item.name}</div>
          </Link>
        ))}
          {/* <div className="cat-text-header ">الكل</div>
          <div className="cat-text-header">الكترونيات</div>
          <div className="cat-text-header">ملابس</div>
          <div className="cat-text-header"> كهربيه</div>
          <div className="cat-text-header">تخفيضات</div>
          <div className="cat-text-header">تخفيضات</div>
          <div className="cat-text-header">تخفيضات</div>
          <div className="cat-text-header">تخفيضات</div>
          <div className="cat-text-header">تخفيضات</div> */}
          <Link to={"/allcategory"} className="cat-text-header">المزيد</Link>
        </Col>
      </Row>
    </Container>
  </div>
  )
}
