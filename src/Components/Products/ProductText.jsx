import { Row,Col } from 'react-bootstrap'
import ViewProductsDetalisHook from '../../hook/products/view-products-detalis-hook';
import { useParams } from 'react-router-dom';
import AddToCartHook from '../../hook/cart/add-to-cart-hook';
import { ToastContainer } from 'react-toastify';

export default function ProductText() {

  const { id } = useParams();
  const [item , images , cat, brand] = ViewProductsDetalisHook(id);
  const [colorClick, indexColor, addToCartHandel] = AddToCartHook(id, item);

  return (
    <div>
      <Row className="mt-2">
        <div className="cat-text">{cat.name} :</div>
      </Row>
      <Row>
        <Col md="8">
          <div className="cat-title d-inline">
            {item.title}
            <div className="cat-rate d-inline mx-3">{item.ratingsAverage}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-4">
          <div className="cat-text d-inline">الماركة :</div>
          <div className="barnd-text d-inline mx-1">{brand.name} </div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-1 d-flex">
        {
          item.availableColors && item.availableColors.map((color , index) => (
            <div
            key={index}
            className="color ms-2"
            onClick={() => colorClick(index, color)}
            style={{ backgroundColor: color , border: index === indexColor ? "2px solid black" : "none" }}></div>
          ))
        }
         <div className="cat-text d-inline">الكمية المتاحة : {item.quantity || 0} </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <div className="cat-text">المواصفات :</div>
      </Row>
      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">
            {item.description}
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="12">
        {item.priceAfterDiscount >= 1 ? (
            <div className="product-price d-inline px-3 py-3 border">
              <span style={{ textDecoration: 'line-through' }}> {item.price}</span> {item.priceAfterDiscount} جنية
            </div>) : <div className="product-price d-inline px-3 py-3 border"><span> {item.price}</span> جنية </div>
          }
          <div onClick={addToCartHandel} className="product-cart-add px-3 py-3 d-inline mx-3">اضف للعربة</div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}
