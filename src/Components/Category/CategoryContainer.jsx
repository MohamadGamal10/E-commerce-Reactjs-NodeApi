import React from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import SubTitle from '../Uitily/SubTitle'
import CategoryCard from "../Category/CategoryCard";


export default function CategoryContainer({data , loading}) {



  const colors = [
    "#FFD3E8",
    "#F4DBA5",
    "#55CFDF",
    "#FF6262",
    "#0034FF",
    "#FFD3E8",
  ];

  return (
    <Container>
      <SubTitle title="كل التصنيفات"  />
      <Row className="my-2 d-flex justify-content-between">
      {loading ? <Spinner animation="border" variant="primary" /> : data ? (
          data.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.name}
              img={category.image}
              background={colors[Math.floor(Math.random() * 5) + 1]}
              id={category._id}
            />
          ))
        ) : (
          <h4>لا يوجد تصنيفات</h4>
        )}
      </Row>
    </Container>
  )
}
