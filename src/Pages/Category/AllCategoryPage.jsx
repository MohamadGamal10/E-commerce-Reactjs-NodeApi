import React from 'react'
import CategoryContainer from '../../Components/Category/CategoryContainer'
import Pagination from '../../Components/Uitily/Pagination'
import { AllCategoryHook } from '../../hook/category/all-category-page-hook';



export default function AllCategoryPage() {

   const [categories , loading , pageCount , getPage] = AllCategoryHook();
  
  return (
    <div style={{minHeight:"670px"}}>
        <CategoryContainer data={categories} loading={loading} />
        {pageCount > 1 ? <Pagination pageCount={pageCount} onPress={getPage}/> : null}
    </div>
  )
}
