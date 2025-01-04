import { useEffect, useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { RiAuctionLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { CgProductHunt } from "react-icons/cg";
import { TbCurrencyDollar } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomNavLink, Title, Caption } from "../common/Design";
import { User1 } from "../../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { logout, RESET } from "../../redux/features/authSlice";
import { useRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { getUserProfile } from "../../redux/features/authSlice";
import { useUserProfile } from "../../hooks/useUserProfile";

export const Sidebar = ({ isOpen }) => {
  useRedirectLogoutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { role, isLoggedIn } = useUserProfile();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserProfile());
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) return <p>Login to Access this Page</p>;

  const logoutUser = async () => {
    // dispatch(RESET());
    await dispatch(logout());
    navigate("/");
  };

  const className = "flex items-center gap-3 mb-2 p-4 rounded-full";

  return (
    <section
      className={`sidebar absolute top-0 left-0 h-auto bg-white shadow-lg lg:shadow-none z-50 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:h-auto lg:block`}
    >
      <div className="profile flex items-center text-center justify-center gap-8 flex-col mb-8 p-4">
        <img
          src={user?.image?.filePath ?? User1}
          alt={user ? `${user.name}'s profile picture` : "user profile picture"}
          className="md:w-32 w-full h-auto rounded-full  object-cover"
        />
        <div>
          <Title className="capitalize">{user?.name ?? "guest"}</Title>
          <Caption>{user?.email ?? "example@gmail.com"}</Caption>
          <Caption className="mt-2 text-green">({user?.role ?? "Guest"})</Caption>
        </div>
      </div>
      <div className="flex flex-col p-4">
          <CustomNavLink
            href="/dashboard"
            isActive={location.pathname === "/dashboard"}
            className={className}
          >
            <span>
              <CiGrid41 size={22} />
            </span>
            <span>Dashboard</span>
          </CustomNavLink>
       
{/*  */}
        {role === "seller" && (
          <CustomNavLink
            href="/product-list"
            isActive={location.pathname === "/product-list"}
            className={className}
          >
            <span>
              <MdOutlineCategory size={22} />
            </span>
            <span>My Products</span>
          </CustomNavLink>
        )}

        {/*  */}
        {role === "admin" && (
          <>
            <CustomNavLink
              href="/product/admin"
              isActive={location.pathname === "/product/admin"}
              className={className}
            >
              <span>
                <CgProductHunt size={22} />
              </span>
              <span>All Product List</span>
            </CustomNavLink>
            <CustomNavLink
              href="/category"
              isActive={location.pathname === "/category"}
              className={className}
            >
              <span>
                <MdOutlineCategory size={22} />
              </span>
              <span>Categories</span>
            </CustomNavLink>
            <CustomNavLink
              href="/userlist"
              isActive={location.pathname === "/userlist"}
              className={className}
            >
              <span>
                <FiUser size={22} />
              </span>
              <span>All Users</span>
            </CustomNavLink>
          </>
        )}

        {role === "buyer" && (
          <>
            <CustomNavLink
              href="/my-biddings"
              isActive={location.pathname === "/my-biddings"}
              className={className}
            >
              <span>
                <RiAuctionLine size={22} />
              </span>
              <span>My Bids</span>
            </CustomNavLink>

            <CustomNavLink
              href="/winning-products"
              isActive={location.pathname === "/winning-products"}
              className={className}
            >
              <span>
                <RiAuctionLine size={22} />
              </span>
              <span>Win Products</span>
            </CustomNavLink>

            {/* <CustomNavLink
              href="/favorites"
              isActive={location.pathname === "/favorites"}
              className={className}
            >
              <span>
                <IoIosHeartEmpty size={22} />
              </span>
              <span>My Favorites</span>
            </CustomNavLink> */}
          </>
        )}

        <CustomNavLink
          href="/profile"
          isActive={location.pathname === "/profile"}
          className={className}
        >
          <span>
            <IoSettingsOutline size={22} />
          </span>
          <span>Personal Profile</span>
        </CustomNavLink>
        <button
          onClick={logoutUser}
          className="flex items-center w-full gap-3 mt-4 bg-red-500 mb-3 hover:text-white p-4 rounded-full text-white"
        >
          <span>
            <IoIosLogOut size={22} />
          </span>
          <span>Log Out</span>
        </button>
      </div>
    </section>
  );
};
