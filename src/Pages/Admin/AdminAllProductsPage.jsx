import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import Pagination from '../../Components/Uitily/Pagination'
import AdminAllProducts from '../../Components/Admin/AdminAllProducts'
import ViewProductAdminHook from '../../hook/admin/view-product-admin-hook'

export default function AdminAllProductsPage() {
    const [items, pagination, onPress] = ViewProductAdminHook();

    if(pagination){
        var pageCount = pagination;
    }else{
         pageCount = 0;
    }
 
    
  return (
    <Container >
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminAllProducts products={items} />
                    {pageCount > 1 ? <Pagination pageCount={pageCount} onPress={onPress} /> : null}
                </Col>
            </Row>
        </Container>
  )
}
