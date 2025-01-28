import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import VerifyPasswordHook from "../../hook/auth/verify-password-hook";

export default function VerifyPasswordPage() {
  const [onChangeCode, code, onSubmit] = VerifyPasswordHook();
  return (
    <Container style={{ minHeight: "670px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">ادخل الكودالي تم ارساله</label>
          <input
          value={code}
          onChange={onChangeCode}
            placeholder="ادخل الكود..."
            type="text"
            className="user-input my-3 text-center mx-auto"
          />
          <button onClick={onSubmit} className="btn-login mx-auto mt-2">تأكيد</button>
        
        </Col>

       
      </Row>
      <ToastContainer />
    </Container>
  );
}

