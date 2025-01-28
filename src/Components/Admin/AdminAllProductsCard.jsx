import React, { useEffect, useState } from "react";
import { Col, Card, Row, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import prod1 from "../../Images/prod1.png";
import { deleteProduct } from "../../Redux/actions/productsAction";
import { useDispatch } from "react-redux";
import { notify } from "../../hook/useNotifaction";
import { ToastContainer } from "react-toastify";

export default function AdminAllProductsCard({ item }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteProduct(item._id));
    setShow(false);
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      notify("تم حذف المنتج بنجاح", "success");
      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
    }
  }, [loading]);

  return (
    <Col xs="12" sm="6" md="5" lg="4" className="d-flex">
      <ToastContainer />
      <Card
        className="my-2"
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Row className="d-flex justify-content-center px-2">
          <Col className=" d-flex justify-content-between">
            <div
              onClick={handleShow}
              className="d-inline text-danger item-delete-edit"
            >
              ازاله
            </div>
            <Link to={`/admin/editproduct/${item._id}`}>
              <div className="d-inline text-primary item-delete-edit">
                تعديل
              </div>
            </Link>
          </Col>
        </Row>
        <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
          <Card.Img
            style={{ height: "228px", width: "100%" }}
            src={item.imageCover}
          />
          <Card.Body>
            <Card.Title>
              <div className="card-title">{item.title}</div>
            </Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-between">
                <div className="card-rate">{item.ratingsQuantity}</div>
                <div className="d-flex">
                  {/* <div className="card-currency mx-1">جنيه</div> */}
                  <div className="card-price">
                  {item.priceAfterDiscount ? (
                    <div> 
                      {item.priceAfterDiscount}
                      
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#9B9B9B",
                          fontSize: "17px",
                        }}
                      >
                        {item.price}
                      </span>
                    </div>
                  ) : (
                    item.price
                  )}
                </div>
                <div className="card-currency mx-1">جنيه</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="font">تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font">هل انت متاكد من حذف المنتج</Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button className="font" variant="danger" onClick={handleDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}
