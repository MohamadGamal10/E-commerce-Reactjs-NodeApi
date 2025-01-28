import React from 'react'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import { Container } from 'react-bootstrap'
import ProductDetails from '../../Components/Products/ProductDetails'
import RateContainer from '../../Components/Rate/RateContainer'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import ViewProductsDetalisHook from '../../hook/products/view-products-detalis-hook'
import { useParams } from 'react-router-dom'

export default function ProductDetalisPage() {
  const { id } = useParams();
  const [item, images, cat, brand, prodL] = ViewProductsDetalisHook(id);

 if(item){
  var rateAvg = item.ratingsAverage;
  var rateQty = item.ratingsQuantity;
 }
  
  return (
    <div style={{minHeight:"670px"}}>
        <CategoryHeader />
        <Container>
           <ProductDetails  />
           <RateContainer rateAvg={rateAvg} rateQty={rateQty} />
           <CardProductsContainer products={prodL} title="منتجات قد تعجبك" />
        </Container>
    </div>
  )
}
