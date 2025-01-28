import React from "react";
import Pagination from "../../Components/Uitily/Pagination";
import BrandContainer from "../../Components/Brand/BrandContainer";
import AllBrandHook from "../../hook/brand/all-brand-page-hook";

export default function AllBrandPage() {
  const [res, loading, pageCount, getPage] = AllBrandHook();
  return (
    <div style={{ minHeight: "670px" }}>
      <BrandContainer brand={res} loading={loading} />
      {pageCount > 1 ? (
        <Pagination pageCount={pageCount} onPress={getPage} />
      ) : null}
    </div>
  );
}
