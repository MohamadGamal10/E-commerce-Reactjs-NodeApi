import React from "react";
import { Row, Col } from 'react-bootstrap'
import { ToastContainer } from "react-toastify";
import AddSubcategoryhook from "../../hook/subcategory/add-subcategory-hook";

export default function AdminAddSubCategory() {

  const [id, name, loading, categories, subcategory, handleChange, handleSubmit, onChangeName] = AddSubcategoryhook();
 
  
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضافه تصنيف فرعي جديد</div>
        <Col sm="8">
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم التصنيف الفرعي"
            value={name}
            onChange={onChangeName}
          />
          <select name="category" id="cat" className="select mt-3 px-2 " value={id} onChange={handleChange}>
            <option  value="0" hidden>اختر تصنيف رئيسي</option>
            {categories.data ? categories.data.map((category, index) => (
               <option key={index} value={category._id} >{category.name}</option>
            )):null}
           
            {/* <option value="val2">التصنيف الثاني</option>
            <option value="val2">التصنيف الثالث</option>
            <option value="val2">التصنيف الرابع</option> */}
          </select>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">حفظ التعديلات</button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}
