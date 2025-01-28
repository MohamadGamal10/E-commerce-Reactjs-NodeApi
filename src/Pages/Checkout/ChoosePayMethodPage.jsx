import React from "react";
import { Container } from "react-bootstrap";
import ChoosePayMethod from "../../Components/Checkout/ChoosePayMethod";

export default function ChoosePayMethodPage() {
  return (
    <Container style={{ minHeight: "570px" }}>
      <ChoosePayMethod />
    </Container>
  );
}
