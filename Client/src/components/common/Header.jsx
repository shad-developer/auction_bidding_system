import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { Container, CustomNavLink, CustomNavLinkList, ProfileCard } from "./Design";
import { menuList, user2 } from "../../assets/data";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ShowOnLogin, ShowOnLogout } from "../../utils/HiddenLinks";
import { useDispatch, useSelector } from "react-redux";
import { useUserProfile } from "../../hooks/useUserProfile";
import logo from '../../assets/images/common/logo.png';


 const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

   const { user } = useSelector((state) => state.auth);
  const { role, isLoggedIn } = useUserProfile();
   
   
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenuOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };  
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenuOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", closeMenuOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if it's the home page
  const isHomePage = location.pathname === "/";

  return (
    <>
      <header className={isHomePage ? `header  py-1 bg-primary ${isScrolled ? "scrolled" : ""}` : `header bg-white shadow-s1 ${isScrolled ? "scrolled" : ""}`}>
        <Container>
          <nav className="p-4 flex justify-between items-center relative">
            <div className="flex items-center gap-14">
              <div className="flex">
                {isHomePage && !isScrolled ? (
                  <img src={logo} alt="Logo" className="h-14" /> 
                ) : (
                  <img src={logo} alt="Logo" className="h-14" />
                )}
              </div>
              <div className="hidden lg:flex items-center justify-between gap-8">
                {menuList.map((list) => (
                  <li key={list.id} className="capitalize list-none">
                    <CustomNavLinkList href={list.path} isActive={location.pathname === list.path} className={`${isScrolled || !isHomePage ? "text-black" : "text-white"}`}>
                      {list.link}
                    </CustomNavLinkList>
                  </li>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-8 icons">
              <div className="hidden lg:flex lg:items-center lg:gap-8">
                {/* <IoSearchOutline size={23} className={`${isScrolled || !isHomePage ? "text-black" : "text-white"}`} /> */}
                {isLoggedIn && role === "buyer" && (
                  <ShowOnLogin>
                  <CustomNavLink href="/seller/login" className={`${isScrolled || !isHomePage ? "text-black" : "text-white"}`}>
                    Become a Seller
                  </CustomNavLink>
                  </ShowOnLogin>
                )}
                <ShowOnLogout>
                <CustomNavLink href="/login" className={`${isScrolled || !isHomePage ? "text-black" : "text-white"}`}>
                  Sign in
                </CustomNavLink>
                <CustomNavLink href="/register" className={`${!isHomePage || isScrolled ? "bg-green" : "bg-white"} px-8 py-2 rounded-full text-primary shadow-md`}>
                  Join
                  </CustomNavLink>
                </ShowOnLogout>
                <ShowOnLogin>                  
                <CustomNavLink href="/dashboard">
                  <ProfileCard>
                      <img src={user?.image?.filePath ?? user2} alt="" className="w-full h-full rounded-full object-cover" />
                      
                    </ProfileCard>
                    <span className={`text-sm ${isScrolled || !isHomePage ? "text-black" : "text-white"}`}>
                  {/* {user?.name ?? ""} */}
                  </span>
                  </CustomNavLink>
                  
                  </ShowOnLogin>
              </div>
              <div className={`icon flex items-center justify-center gap-6 ${isScrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                <button onClick={toggleMenu} className="lg:hidden w-10 h-10 flex justify-center items-center bg-black text-white focus:outline-none">
                  {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>
              </div>
            </div>

            {/* Responsive Menu if below 768px */}
            <div ref={menuRef} className={`lg:flex lg:items-center lg:w-auto w-full p-5 absolute right-0 top-full menu-container ${isOpen ? "open" : "closed"}`}>
              {menuList.map((list) => (
                <li href={list.path} key={list.id} className="uppercase list-none">
                  <CustomNavLink className="text-white">{list.link}</CustomNavLink>
                </li>
              ))}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};


export default Header