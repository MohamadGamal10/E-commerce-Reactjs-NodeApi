import React, { useEffect, useState } from "react";
import Logo from "../../Images/logo.png";
import Login from "../../Images/login.png";
import cart from "../../Images/cart.png";
import {
  Navbar,
  Container,
  FormControl,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import NavbarSearchHook from "../../hook/search/navbar-search-hook";
import GetAllUserCartHook from "../../hook/cart/get-all-user-cart-hook";

export default function NavBarLogin() {
  const [onChangeSearch, searchWord] = NavbarSearchHook();
  let word = [];
  if (localStorage.getItem("searchWord") != null) {
    word = localStorage.getItem("searchWord");
  }

  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
  };

  // console.log(user);

  const [itemsNum] = GetAllUserCartHook();

  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img src={Logo} className="logo" alt="img" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
            value={word}
            onChange={onChangeSearch}
          />
          <Nav className="me-auto">
            {user ? (
              user.name && (
                <NavDropdown title={user.name} id="basic-nav-dropdown" className="mx-auto">
                  {user.role === "admin" ? (
                    <NavDropdown.Item href="/admin/allproducts">
                      لوحة التحكم
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item href="/user/profile">
                      الصفحة الشخصية
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout} href="/">
                    تسجيل الخروج
                  </NavDropdown.Item>
                </NavDropdown>
              )
            ) : (
              <Nav.Link
                href="/login"
                className="nav-text d-flex mt-3 justify-content-center"
              >
                <img src={Login} className="login-img" alt="sfvs" />
                <p style={{ color: "white" }}>دخول</p>
              </Nav.Link>
            )}
            <Nav.Link
              href="/cart"
              className="nav-text d-flex mt-3 justify-content-center position-relative"
              style={{ color: "white" }}
            >
              <img src={cart} className="login-img" alt="sfvs" />
              <p style={{ color: "white" }}>العربه</p>
              <span className="position-absolute top-10 mb-3 me-5 translate-middle badge rounded-pill bg-danger">
                {itemsNum || 0}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
