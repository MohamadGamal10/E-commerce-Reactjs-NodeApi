import React from "react";
import ReactImageGallery from "react-image-gallery";
import LeftButton from "./LeftButton";
import RightButton from "./RightButton";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";
import ViewProductsDetalisHook from "../../hook/products/view-products-detalis-hook";
export default function ProductGallery() {
  const { id } = useParams();

  const [item, images, cat, brand, prodL] = ViewProductsDetalisHook(id);


  return (
    <div
      className="product-gallary-card d-flex justfiy-content-center  align-items-center
    pt-2"
    >
      <ReactImageGallery
        items={images}
        showFullscreenButton={false}
        isRTL={true}
        showPlayButton={false}
        showThumbnails={false}
        renderRightNav={RightButton}
        renderLeftNav={LeftButton}
      />
    </div>
  );
}
