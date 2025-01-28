import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ResetPasswordHook from "../../hook/auth/reset-password-hook";

export default function ResetPasswordPage() {
  const [password, confirmPassword, OnChangePassword, OnChangeConfirmPassword, onSubmit] = ResetPasswordHook();
  return (
    <Container style={{ minHeight: "670px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">ادخل كلمة السر الجديدة</label>
          <input
          value={password}
          onChange={OnChangePassword}
            placeholder="ادخل كلمة السر الجديدة"
            type="password"
            className="user-input my-3 text-center mx-auto"
          />
          <input
          value={confirmPassword}
          onChange={OnChangeConfirmPassword}
            placeholder="تأكيد كلمة السر الجديدة"
            type="password"
            className="user-input my-3 text-center mx-auto"
          />
          <button onClick={onSubmit} className="btn-login mx-auto mt-2">حفظ</button>
        
        </Col>

       
      </Row>
      <ToastContainer />
    </Container>
  );
}

