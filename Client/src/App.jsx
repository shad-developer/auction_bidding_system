import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import 'react-quill/dist/quill.snow.css';
import { ScrollToTop } from "./components/ScrollToTop";
import ProgressBar from "react-scroll-progress-bar";
import BackToUp from '@uiw/react-back-to-top';
import Loader from "./components/common/Loader";

// Pages
const Home = lazy(() => import("./pages/Home/Home"));
const HowWorks = lazy(() => import("./pages/HowWorks"));
const About = lazy(() => import("./pages/About"));
const Inbox = lazy(() => import("./pages/Inbox"));
const Contact = lazy(() => import("./pages/Contact"));

const NotFound = lazy(() => import("./components/common/NotFound"));
const Unauthorized = lazy(() => import("./components/common/Unauthorized"));
const PrivateRoute = lazy(() => import("./router/PrivateRoute"));

const Layout = lazy(() => import("./components/common/Layout"));
const DashboardLayout = lazy(() => import("./components/common/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const LoginAsSeller = lazy(() => import("./pages/auth/LoginAsSeller"));

const UserProfile = lazy(() => import("./pages/auth/UserProfile"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));

// import { LiveProducts } from "./components/Home/LiveProducts";
const Products = lazy(() => import("./pages/Products"));
const AddProduct = lazy(() => import("./pages/ProductDetails/AddProduct"));
const ProductEdit = lazy(() => import("./pages/ProductDetails/ProductEdit"));
const ProductList = lazy(() => import("./pages/ProductDetails/productlist/ProductList"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));
const MyFavoriteProduct = lazy(() => import("./pages/ProductDetails/MyFavoriteProduct"));
const WinningProductList = lazy(() => import("./pages/ProductDetails/WinningProductList"));
const PlaceBiddingList = lazy(() => import("./pages/ProductDetails/PlaceBiddingList"));

const Catgeorylist = lazy(() => import("./admin/category/Catgeorylist"));
const CreateCategory = lazy(() => import("./admin/category/CreateCategory"));
const UpdateCategory = lazy(() => import("./admin/category/UpdateCategory"));

// import { Income } from "./admin/Income";
const AdminProductList = lazy(() => import("./admin/product/AdminProductList"));
const UpdateProductByAdmin = lazy(() => import("./admin/product/UpdateProductByAdmin"));
const UserList = lazy(() => import("./admin/UserList"));

import { getLoginStatus } from "./redux/features/authSlice";
import { getAllProduct } from "./redux/features/productSlice";

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
    {/* <BackToUp className="absolute z-50 bottom-32 right-20 "><FaArrowUp/></BackToUp> */}
    <ProgressBar height="2" bgcolor="#5BBB7B" duration="0.1" />
    <ToastContainer autoClose={1500} position="bottom-right" />
        <ScrollToTop />
        
    <Suspense fallback={<Loader/>}>
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
    
    <Route
    path="/inbox"
    element={
      <PrivateRoute roles={['admin', 'seller', 'buyer']}>
      <Layout>
      <DashboardLayout>
      <Inbox />
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
          </Suspense>
    </BrowserRouter>
    </>
  );
}

export default App;
