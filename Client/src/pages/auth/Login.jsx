import { FaFacebook, FaGoogle, FaEye, FaEyeSlash,FaCircleNotch } from "react-icons/fa";
import { commonClassNameOfInput, Caption, Container, CustomNavLink, PrimaryButton, Title } from "../../components/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, RESET } from "../../redux/features/authSlice";

const initialState = {
  email: "",
  password: "",
}

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const { isLoading, isSuccess, isLoggedIn, message, isError, errorType } =
    useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All Fields are required");
    }

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      if (errorType === "EMAIL_NOT_VERIFIED") {
        navigate("/verify-email");
      } else {
        toast.error(message);
      }
      dispatch(RESET());
    }
  }, [isError, message, navigate, dispatch]);


  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, isError, navigate]);

  return (
    <>
      <section className="regsiter pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">
                Log In
              </Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">
                  Home
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  /
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  Log In
                </Title>
              </div>
            </div>
          </Container>
        </div>
        <form onSubmit={handleLogin} className="bg-white shadow-s3 w-full md:w-1/3 m-auto my-16 p-8 rounded-xl">
          <div className="text-center">
            <Title level={5}>Login</Title>
            <p className="mt-2 text-lg">
              Do you already have an account? <CustomNavLink href="/register">Signup Here</CustomNavLink>
            </p>
          </div>

          <div className="py-5 mt-8">
            <Caption className="mb-2">Enter Your Email *</Caption>
            <input type="email" name="email" value={email} onChange={handleInputChange} className={commonClassNameOfInput} placeholder="Enter Your Email" required />
          </div>
          <div className="relative">
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
          {/* <div className="flex items-center gap-2 py-4">
            <input type="checkbox" />
            <Caption>I agree to the Terms & Policy</Caption>
          </div> */}
          <PrimaryButton className="flex justify-center w-full rounded-none my-5">{isLoading ? <FaCircleNotch /> : "Login"}</PrimaryButton>
          <p className="text-center">
            <CustomNavLink href="/reset-password">Forgot Password?</CustomNavLink>
          </p>
          <p className="text-center mt-5">
            By clicking the signup button, you create a account, and you agree to <span className="text-green underline">Terms & Conditions</span> &
            <span className="text-green underline"> Privacy Policy </span> .
          </p>
        </form>
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute bottom-96 right-0"></div>
      </section>
    </>
  );
};


export default Login;