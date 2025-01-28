import { Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
// import avatar from "../../Images/avatar.png";
import add from "../../Images/add.png";
import MultiImageInput from "react-multiple-image-input";
import { CompactPicker } from "react-color";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { AdminEditProductsHook } from "../../hook/products/edit-products-hook";
import { useDispatch } from "react-redux";

export default function AdminEditProducts() {
    const {id} = useParams();
    
  
  const [CatID, BrandID, onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, showColor, categories, brands, priceAfter, images, setImages, onSelect, onRemove, options, handleChangeComplete, removeColor, onSelectCategory, handleSubmit, onSelectBrand, colors, priceBefore, qty, prodDescription, prodName] = AdminEditProductsHook(id);

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4"> تعديل منتج - {prodName}</div>
        <Col sm="8">
          <div className="text-form pb-2"> صور للمنتج</div>
          {/* <img src={avatar} alt="" height="100px" width="120px" /> */}
          <MultiImageInput
            images={images}
            setImages={setImages}
            theme="light"
            allowCrop={false}
            max={4}
            // cropConfig={{ crop, ruleOfThirds: true }}
          />
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المنتج"
            value={prodName}
            onChange={onChangeProdName}
          />
          <textarea
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="وصف المنتج"
            value={prodDescription}
            onChange={onChangeDesName}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر قبل الخصم"
            value={priceBefore}
            onChange={onChangePriceBefor}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="سعر المنتج بعد الخصم"
            value={priceAfter}
            onChange={onChangePriceAfter}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="الكمية المتاحة"
            value={qty}
            onChange={onChangeQty}
          />
          <select
            name="languages"
            id="lang"
            className="select input-form-area mt-3 px-2 "
            onChange={onSelectCategory}
            value={CatID}
          >
            <option value="0">التصنيف الرئيسي</option>
            {categories.data &&
              categories.data.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>

          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الفرعي"
            options={options}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            style={{ color: "red" }}
          />
          <select
            name="brand"
            id="brand"
            className="select input-form-area mt-3 px-2 "
            onChange={onSelectBrand}
            value={BrandID}
          >
            <option value="0">الماركة</option>
            {brands.data &&
              brands.data.map((brand, index) => (
                <option key={index} value={brand._id}>
                  {brand.name}
                </option>
              ))}
          </select>
          <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>
          <div className="mt-1 d-flex">
            {colors.length > 0 &&
              colors.map((color, index) => (
                <div
                  key={index}
                  className="color ms-2 border  mt-1"
                  style={{ backgroundColor: `${color}` }}
                  onClick={() => removeColor(color)}
                ></div>
              ))}

            <img
              onClick={onChangeColor}
              src={add}
              alt=""
              width="30px"
              height="35px"
              className=""
              style={{ cursor: "pointer" }}
            />
            {showColor && (
              <CompactPicker onChangeComplete={handleChangeComplete} />
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديلات
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}
