import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import NavBarLogin from "./Components/Uitily/NavBarLogin";
import Footer from "./Components/Uitily/Footer";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import AllCategoryPage from "./Pages/Category/AllCategoryPage";
import AllBrandPage from "./Pages/Brand/AllBrandPage";
import ShopProductPage from "./Pages/Products/ShopProductPage";
import ProductDetalisPage from "./Pages/Products/ProductDetalisPage";
import CartPage from "./Pages/Cart/CartPage";
import ChoosePayMethodPage from "./Pages/Checkout/ChoosePayMethodPage";
import AdminAllProductsPage from "./Pages/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./Pages/Admin/AdminAllOrdersPage";
import AdminOrderDetalisPage from "./Pages/Admin/AdminOrderDetalisPage";
import AdminAddBrandPage from "./Pages/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "./Pages/Admin/AdminAddCategoryPage";
import AdminAddSubCategoryPage from "./Pages/Admin/AdminAddSubCategoryPage";
import AdminAddProductsPage from "./Pages/Admin/AdminAddProductsPage";
import UserAllOrdersPage from "./Pages/User/UserAllOrdersPage";
import UserAllAddresPage from "./Pages/User/UserAllAddresPage";
import UserFavoriteProductsPage from "./Pages/User/UserFavoriteProductsPage";
import UserProfilePage from "./Pages/User/UserProfilePage";
import UserAddAddressPage from "./Pages/User/UserAddAddressPage";
import UserEditAddressPage from "./Pages/User/UserEditAddressPage";
import AdminEditProductsPage from "./Pages/Admin/AdminEditProductsPage";
import ForgetPasswordPage from "./Pages/Auth/ForgetPasswordPage";
import VerifyPasswordPage from "./Pages/Auth/VerifyPasswordPage";
import ResetPasswordPage from "./Pages/Auth/ResetPasswordPage";
import { AdminAddCouponPage } from "./Pages/Admin/AdminAddCouponPage";
import AdminEditCouponPage from "./Pages/Admin/AdminEditCouponPage";
import ProtectedRouteHook from "./hook/auth/protected-route-hook";
import ProtectedRoute from "./Components/Uitily/ProtectedRoute";
import ProductsByCategory from "./Pages/Products/ProductsByCategory";
import ProductsByBrand from "./Pages/Products/ProductsByBrand";

function App() {
  const [isUser, isAdmin, userData] = ProtectedRouteHook();
  return (
    <div className="App font">
      <NavBarLogin />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/allcategory" element={<AllCategoryPage />} />
        <Route path="/allbrand" element={<AllBrandPage />} />
        <Route path="/products" element={<ShopProductPage />} />
        <Route path="/products/:id" element={<ProductDetalisPage />} />
        <Route path="/user/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/user/verify-code" element={<VerifyPasswordPage />} />
        <Route path="/user/reset-password" element={<ResetPasswordPage />} />
        <Route path="/products/category/:id" element={<ProductsByCategory />} />
        <Route path="/products/brand/:id" element={<ProductsByBrand />} />

        {/* <Route
          path="/order/paymethod"
          element={
            <ProtectedRoute auth={isUser}>
              <ChoosePayMethodPage />
            </ProtectedRoute>
          }
        /> */}

        <Route element={<ProtectedRoute auth={isAdmin} />}>
          <Route path="/admin">
            <Route path="allproducts" element={<AdminAllProductsPage />} />
            <Route path="editproduct/:id" element={<AdminEditProductsPage />} />
            <Route path="allorders" element={<AdminAllOrdersPage />} />
            <Route path="orders/:id" element={<AdminOrderDetalisPage />} />
            <Route path="addbrand" element={<AdminAddBrandPage />} />
            <Route path="addcategory" element={<AdminAddCategoryPage />} />
            <Route
              path="addsubcategory"
              element={<AdminAddSubCategoryPage />}
            />
            <Route path="addproduct" element={<AdminAddProductsPage />} />
            <Route path="addcoupon" element={<AdminAddCouponPage />} />
            <Route path="editcoupon/:id" element={<AdminEditCouponPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute auth={isUser} />}>

            <Route path="/user/allorders" element={<UserAllOrdersPage />} />
            <Route
              path="/user/favoriteproducts"
              element={<UserFavoriteProductsPage />}
            />
            <Route path="/user/addresses" element={<UserAllAddresPage />} />
            <Route path="/user/add-address" element={<UserAddAddressPage />} />
            <Route path="/user/edit-address/:id" element={<UserEditAddressPage />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
            <Route path="order/paymethod" element={<ChoosePayMethodPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
