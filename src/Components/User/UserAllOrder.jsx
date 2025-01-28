import React from "react";
import { Row } from "react-bootstrap";
import UserAllOrderItem from "./UserAllOrderItem";
import UserGetAllOrderHook from "../../hook/user/user-get-all-order-hook";
import Pagination from "../Uitily/Pagination";

export default function UserAllOrder() {
  const [userName, results, paginate, orderData, onPress] =
    UserGetAllOrderHook();
  return (
    <div>
      <div className="admin-content-text pb-4">عدد الطلبات #{results}</div>
      <Row className="justify-content-between">
        {orderData.length > 0 ? (
          orderData.map((item, index) => <UserAllOrderItem key={index} orderItem={item} />)
        ) : (
          <h6>لا يوجد طلبات حتى </h6>
        )}

        {paginate.numberOfPages >= 2 ? (
          <Pagination
            onPress={onPress}
            pageCount={paginate.numberOfPages ? paginate.numberOfPages : 0}
          />
        ) : null}
      </Row>
    </div>
  );
}
