import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { commonClassNameOfInput, Caption, Container, CustomNavLink, PrimaryButton, Title } from "../../components/common/Design";
import { loginUserAsSeller } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./../../components/common/Loader";

const LoginAsSeller = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, message, isError, user } =
    useSelector((state) => state.auth);
  
  
  const [formData, setFormData] = useState({
    email: user?.email || "",  
    password: "",
    storeName: "",
    termsAccepted: false,
  });
  const { email, password, storeName, termsAccepted } = formData;
  const [showPassword, setShowPassword] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };
  const handleLoginAsSeller = async (e) => {
    e.preventDefault();
    if (!email || !password || !storeName) {
      return toast.error("All Fields are required");
    }

    if (!termsAccepted) {
      return toast.error("You must agree to the Terms and Conditions");
    }

    const userData = {
      email,
      password,
      storeName,
      termsAccepted
    };

    await dispatch(loginUserAsSeller(userData));
   
    if (isSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="regsiter pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">
                Become Seller
              </Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">
                  Home
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  /
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  Seller
                </Title>
              </div>
            </div>
          </Container>
        </div>
        <form onSubmit={handleLoginAsSeller} className="bg-white shadow-s3 w-full md:w-1/2 m-auto my-16 p-8 rounded-xl">
          <div className="text-center">
            <Title level={5}>New Seller Member</Title>
          </div>
          <div className="flex justify-between gap-5">
            <div className="py-5 mt-8 w-full">
              <Caption className="mb-2">Email *</Caption>
              <input type="email" name="email" value={email}  disabled onChange={handleInputChange} className={commonClassNameOfInput} placeholder="Enter Your Email" />
            </div>
            <div className="py-5 mt-8 w-full relative">
              <Caption className="mb-2">Password *</Caption>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleInputChange}
                className={commonClassNameOfInput}
                placeholder="Enter Your Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle the icon */}
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-5"> 
          <div className="py-5 w-full">
              <Caption className="mb-2">Store Name *</Caption>
              <input type="text" name="storeName" value={storeName} onChange={handleInputChange} className={commonClassNameOfInput} placeholder="Enter Your Store Name" />
            </div>
          </div>
          <div className="flex items-center gap-2 py-4">
            <input type="checkbox" checked={termsAccepted} onChange={handleCheckboxChange} />
            <Caption>I agree to the Below Terms Conditions & Policy</Caption>
          </div>

          <PrimaryButton className="w-full rounded-none my-5 uppercase">Become Seller</PrimaryButton>


          {/* Terms And Conditions */}
          <ul className="list-none space-y-2 text-justify">
            <li className="flex items-start">
              <span class="mr-2 text-gray-500">•</span>
              <p>
                By clicking the Become Seller button, you create a seller account, and you agree to <span className="text-green underline"> Terms Conditions</span> & <span className="text-green underline">Privacy Policy</span>.
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-gray-500">•</span>
              <p>Sellers are liable for an  <span className="text-green"> admin commission </span> ranging from  <span className="text-green"> 5% to 20% of the product selling price, depending on the category.</span> After this, the seller's product will be verified and made available for auction.</p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-gray-500">•</span>
              <p>Sellers can track their sales performance, monitor customer reviews, and make necessary adjustments to their listings through their dashboard.</p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-gray-500">•</span>
              <p>Gain access to your personal dashboard for posting products and updating listings.</p>
            </li>

            <li className="flex items-start">
              <span className="mr-2 text-gray-500">•</span>
              <p>Sellers are responsible for providing accurate product descriptions, images, and specifications to ensure a smooth listing process.</p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-gray-500">•</span>
              <p>Sellers must comply with platform policies regarding product quality, shipping timelines, and customer service.</p>
            </li>


          </ul>
        </form>
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute bottom-96 right-0"></div>
      </section>
    </>
  );
};


export default LoginAsSeller;