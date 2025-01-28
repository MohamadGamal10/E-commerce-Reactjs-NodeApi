import React from "react";
import Slider from "../../Components/Home/Slider";
import HomeCategory from "../../Components/Home/HomeCategory";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import DiscountSection from "../../Components/Home/DiscountSection";
import BrandFeatured from "../../Components/Brand/BrandFeatured";
import ViewHomeProductsHook from "../../hook/products/view-home-products-hook";

export default function HomePage() {

  const [items] = ViewHomeProductsHook();
  // console.log(items);
  
  return (
    <div className="font" style={{ minHeight: "670px" }}>
      
      <Slider />
      <HomeCategory />
      <CardProductsContainer
        title="الاكثر مبيعا"
        btnTitle="المزيد"
        pathText="/products"
        products={items}
      />
      <DiscountSection />
      <CardProductsContainer
        title="احدث الازياء"
        btnTitle="المزيد"
        pathText="/products"
        products={items}
      />
      <BrandFeatured title="اشهر الماركات" btnTitle="المزيد" />
      
    </div>
  );
}
