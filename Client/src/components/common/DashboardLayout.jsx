import { Container } from "./Design";
import { Sidebar } from "../admin/Sidebar";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../redux/features/authSlice";
import { useRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import Loader from "../common/Loader";

const DashboardLayout = ({ children }) => {
  
  // const isChecking = useRedirectLogoutUser("/login");

  const location = useLocation();
  const dispatch = useDispatch();
  const { role, isLoggedIn } = useUserProfile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserProfile());
    }
  }, [location, dispatch, isLoggedIn]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  
  // if (isChecking) {
  //   return <Loader />;
  // }


  return (
    <div className="relative mt-32">
      <Container className="flex">
        <button
          onClick={toggleSidebar}
          className={`fixed top-24 left-4 lg:hidden px-1 text-white  transition duration-300 rounded-full shadow-md ${
            isSidebarOpen ? "bg-primary" : "bg-green"
          }`}
        >
          {isSidebarOpen ? "Close" : "Open"} Sidebar
        </button>
        <div className="h-auto lg:w-[20%] lg:shadow-s1 py-8 p-5 rounded-lg">
          <Sidebar role={role} isOpen={isSidebarOpen} />
        </div>

        <div
          className={`w-full lg:w-[80%] px-5 ml-0 md:ml-10 rounded-lg transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-50" : "opacity-100"
          }`}
        >
          {children}
        </div>
      </Container>
    </div>
  );
};

export default DashboardLayout;
