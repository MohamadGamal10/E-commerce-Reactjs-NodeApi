import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ForgetPasswordHook from "../../hook/auth/forget-password-hook";

export default function ForgetPasswordPage() {
  const [onChangeEmail, email, onSubmit] = ForgetPasswordHook();
  return (
    <Container style={{ minHeight: "670px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">نسيت كلمه السر</label>
          <input
          value={email}
          onChange={onChangeEmail}
            placeholder="الايميل..."
            type="email"
            className="user-input my-3 text-center mx-auto"
          />
          <button onClick={onSubmit} className="btn-login mx-auto mt-2">ارسال الكود</button>
        
        </Col>

       
      </Row>
      <ToastContainer />
    </Container>
  );
}



