import React from "react";
import { useLocation } from "react-router-dom";
import logo from '../../assets/images/common/logo.png'
import { Container, PrimaryButton, ProfileCard, Title } from "./Design";
// import { FiPhoneOutgoing } from "react-icons/fi";
// import { MdOutlineAttachEmail } from "react-icons/md";
// import { IoLocationOutline } from "react-icons/io5";
// import { FaFacebook, FaInstagram } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa6";
// import { CiTwitter } from "react-icons/ci";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <footer className="relative py-16 mt-16 bg-primary">
      {isHomePage && (
        <div className="bg-white w-full py-20 -mt-10 rounded-b-[40px] z-10 absolute top-0"></div>
      )}

      <Container
        className={`${isHomePage ? "mt-32" : "mt-0"
          } flex flex-col md:flex-row  justify-between gap-12 mb-5`}
      >
        <div className="w-full md:w-1/4">
          <center>
            <img src={logo} alt="" className="h-24 w-24" />
          </center>
          <br />
          <p className="text-gray-300">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            aperiam delectus.
          </p>
          <div className="bg-gray-300 h-[1px] my-8" />
          <div className="max-w-md mx-auto mt-6 mb-5">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-4 pr-16 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Enter your email"
              />
              <PrimaryButton
                className="mt-0 w-auto flex items-center justify-center absolute right-1 top-1 bottom-1 bg-primary text-white rounded-full px-5 font-semibold transition-colors duration-300 hover:bg-primary-dark"
              >
                Submit
              </PrimaryButton>
            </div>
          </div>
          <Title className="font-normal text-gray-100">
            Contact to subscribe newsletter
          </Title>
        </div>

        <div>
          <Title level={5} className="font-normal text-white">
            Categories
          </Title>
          <ul className="flex flex-col gap-5 mt-8 text-gray-200">
            <li>Sports and Outdoors</li>
            <li>Ending Now</li>
            <li>Electronics</li>
            <li>Watches</li>
            <li>Jewelry</li>
          </ul>
        </div>

        <div>
          <Title level={5} className="font-normal text-white">
            About Us
          </Title>
          <ul className="flex flex-col gap-5 mt-8 text-gray-200">
            <li>About Bid</li>
            <li>Affiliate</li>
            <li>Our Blog</li>
            <li>Jobs</li>
            <li>Press</li>
          </ul>
        </div>

        <div>
          <Title level={5} className="font-normal text-white">
            Need Help?
          </Title>
          <ul className="flex flex-col gap-5 mt-8 text-gray-200">
            <li>Shipping Information</li>
            <li>Safe & Secure</li>
            <li>Your Account</li>
            <li>Contact Us</li>
            <li>Help & FAQs</li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
