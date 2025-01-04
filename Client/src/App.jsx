import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import { FaArrowUp  } from "react-icons/fa";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home/Home";
import Inbox from "./pages/Inbox";
import HowWorks from "./pages/HowWorks";
import About from "./pages/About";
import { AddProduct } from "./pages/ProductDetails/AddProduct";
import { LoginAsSeller } from "./pages/auth/LoginAsSeller";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { UserProfile } from "./pages/auth/UserProfile";
import Layout from "./components/common/Layout";
import { ProductList } from "./pages/ProductDetails/productlist/ProductList";
// import { LiveProducts } from "./components/Home/LiveProducts";
import { Products } from "./pages/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { Catgeorylist } from "./admin/category/Catgeorylist";
import { CreateCategory } from "./admin/category/CreateCategory";
import { NotFound } from "./components/common/NotFound";
import { Unauthorized } from "./components/common/Unauthorized";
import { WinningProductList } from "./pages/ProductDetails/WinningProductList";
import { PlaceBiddingList } from "./pages/ProductDetails/PlaceBiddingList";
import { MyFavoriteProduct } from "./pages/ProductDetails/MyFavoriteProduct";
// import { Income } from "./admin/Income";
import { ProductEdit } from "./pages/ProductDetails/ProductEdit";
import { AdminProductList } from "./admin/product/AdminProductList";
import { UpdateProductByAdmin } from "./admin/product/UpdateProductByAdmin";
import { UpdateCategory } from "./admin/category/UpdateCategory";
import { PrivateRoute } from "./router/PrivateRoute";
import { Dashboard } from "./pages/dashboard/Dashboard";
import DashboardLayout from "./components/common/DashboardLayout";
import { UserList } from "./admin/UserList";
import Contact from "./pages/Contact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./redux/features/authSlice";
import { getAllProduct } from "./redux/features/productSlice";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { VerifyEmail } from "./pages/auth/VerifyEmail";
import ProgressBar from "react-scroll-progress-bar";
import BackToUp from '@uiw/react-back-to-top';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  const { products } = useSelector((state) => state.product);

  const verifiedProducts = products.filter(product =>
    product.isSoldout === false &&
    product.isVerify === true
  );

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
      <BackToUp className="absolute z-50 bottom-32 right-20 "><FaArrowUp/></BackToUp>
      <ProgressBar height="2" bgcolor="#5BBB7B" duration="0.1" />
        <ToastContainer autoClose={1500} position="bottom-right" />
        <ScrollToTop />
        <Routes>
          {/* Home Page  */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          {/* Products Page  */}
          <Route
            path="/products"
            element={
              <Layout>
                <Products products={verifiedProducts} />
              </Layout>
            }
          />

          {/* Product details */}
          <Route
            path="/details/:id"
            element={
              <Layout>
                <ProductDetails />
              </Layout>
            }
          />

          {/* Contact us page */}
          <Route
            path="/Contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />

          {/* About us page */}
          <Route
            path="/About"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />

          {/* How Auction Work page */}
          <Route
            path="/work"
            element={
              <Layout>
                <HowWorks />
              </Layout>
            }
          />

          {/* Login  */}
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />

          {/* chat inbox */}
          <Route
            path="/inbox"
            element={
              <PrivateRoute>
                <Layout>
                  <Inbox />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Become Seller  */}
          <Route
            path="/seller/login"
            element={
              <PrivateRoute>
                <Layout>
                  <LoginAsSeller />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* Register  */}
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />

          {/* Verify Email */}
          <Route
            path="/verify-email"
            element={
              <Layout>
                <VerifyEmail />
              </Layout>
            }
          />

          {/* Reset Password */}
          <Route
            path="/reset-password"
            element={
              <Layout>
                <ResetPassword />
              </Layout>
            }
          />

          {/* dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* My Profile */}
          <Route
            path="/profile"
            element={
              <PrivateRoute roles={['admin', 'seller', 'buyer']}>
                <Layout>
                  <DashboardLayout>
                    <UserProfile />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Seller Routes */}
          {/* Add Products By Seller  */}
          <Route
            path="/add"
            element={
              <PrivateRoute roles={['seller']}>
                <Layout>
                  <DashboardLayout>
                    <AddProduct />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Update Product by Seller */}
          <Route
            path="/product/update/:id"
            element={
              <PrivateRoute roles={['seller']}>
                <Layout>
                  <DashboardLayout>
                    <ProductEdit />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Seller Products Table */}
          <Route
            path="/product-list"
            element={
              <PrivateRoute roles={['seller']}>
                <Layout>
                  <DashboardLayout>
                    <ProductList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          {/* Seller Routes End */}

          {/* Admin Routes */}
          {/* Table All Seller Products on Admin Dashboard */}
          <Route
            path="/product/admin"
            element={
              <PrivateRoute roles={['admin']}>
                <Layout>
                  <DashboardLayout>
                    <AdminProductList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Verify and Add Commission in Product By Admin */}
          <Route
            path="/product/admin/update/:id"
            element={
              <PrivateRoute roles={['admin']}>
                <Layout>
                  <DashboardLayout>
                    <UpdateProductByAdmin />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* All Users Table on Admin Dashboard */}
          <Route
            path="/userlist"
            element={
              <PrivateRoute roles={['admin']}>
                <Layout>
                  <DashboardLayout>
                    <UserList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Category Table Admin Dashboard */}
          <Route
            path="/category"
            element={
              <PrivateRoute roles={['admin']}>
                <Layout>
                  <DashboardLayout>
                    <Catgeorylist />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Create Category by Admin */}
          <Route
            path="/category/create"
            element={
              <PrivateRoute roles={['admin']}>
                <Layout>
                  <DashboardLayout>
                    <CreateCategory />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Update Category by Admin */}
          <Route
            path="/category/update/:id"
            element={
              <PrivateRoute roles={['admin']}>
                <Layout>
                  <DashboardLayout>
                    <UpdateCategory />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          {/* End Admin Routes */}


          {/* Buyer Routes */}
          {/* Buyer Winning Product Table */}
          <Route
            path="/winning-products"
            element={
              <PrivateRoute roles={['buyer']}>
                <Layout>
                  <DashboardLayout>
                    <WinningProductList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Buyer Biddings Table */}
          <Route
            path="/my-biddings"
            element={
              <PrivateRoute roles={['buyer']}>
                <Layout>
                  <DashboardLayout>
                    <PlaceBiddingList />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          {/* Favorites products Buyer */}
          <Route
            path="/favorites"
            element={
              <PrivateRoute roles={['buyer']}>
                <Layout>
                  <DashboardLayout>
                    <MyFavoriteProduct />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          {/* End Buyer Routes  */}

          <Route
            path="/*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />

          <Route
            path="/unauthorized"
            element={
              <Layout>
                <Unauthorized />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
