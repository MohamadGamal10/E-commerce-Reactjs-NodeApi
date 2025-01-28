import React from "react";
import { Row,Col } from 'react-bootstrap'
import EditAddressHook from "../../hook/user/edit-address-hook";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export default function UserEditAddress() {
  const {id} = useParams();
  const [handelEdit, alias, detalis, phone, onChangeAlias, onChangeDetalis, onChangePhone] = EditAddressHook(id);
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-2">تعديل العنوان </div>
        <Col sm="8">
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تسمية العنوان مثلا(المنزل - العمل)"
            value={alias}
            onChange={onChangeAlias}
          />
          <textarea
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="العنوان بالتفصيل"
            value={detalis}
            onChange={onChangeDetalis}
          />
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={onChangePhone}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelEdit} className="btn-save d-inline mt-2 ">حفظ تعديل العنوان</button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}
