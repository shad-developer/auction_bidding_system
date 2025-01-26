import {
  commonClassNameOfInput,
  Caption,
  Container,
  PrimaryButton,
  Title,
  CustomNavLink,
} from "../../components/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, RESET, resetPassword } from "../../redux/features/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, isSuccess, message, isError, errorType } =
    useSelector((state) => state.auth);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    await dispatch(forgotPassword(email));
    if (isSuccess) {
     toast.success("OTP Send to your E-mail")
    }
  };

  
  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < code.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length < code.length) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    const data = {
      email,
      code: verificationCode,
      password: newPassword,
    };

    await dispatch(resetPassword(data));
  };

  
  return (
    <>
      <section className="regsiter pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">
                Reset Password
              </Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">
                  Home
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  /
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  Reset Password
                </Title>
              </div>
            </div>
          </Container>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-s3 w-full md:w-1/3 m-auto my-16 p-8 rounded-xl"
        >
          <div className="text-center">
            <Title level={5}> Reset Your Password</Title>
            <p className="text-gray-600 mb-6 text-center">
             Enter your email address below and we'll send you a OTP to reset
              your password.
            </p>
          </div>
          <div className="py-5 relative">
            <Caption className="mb-2">Enter Your Email *</Caption>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={commonClassNameOfInput}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="flex justify-end mb-5">
            <button className="hover:text-green" onClick={handleSendOTP}>
              {isLoading ? "Sending" :"Send OTP"}
             </button>
          </div>
          <hr/>
          <div className="py-2 relative">
          <Caption className="mb-2">Enter OTP *</Caption>
          <div className="flex justify-center mb-4 space-x-2 border">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-12 h-12 text-center border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            ))}
            </div>
            </div>

          <div className="py-1 relative">
            <Caption className="mb-2">Enter New Password</Caption>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-12 border border-indigo-500 rounded px-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="New Password"
              required
            />
            <span
              className="absolute inset-y-0 right-0 top-5 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8-8 3.582-8 8z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12h3m-3 0H9m6 0H9m3 0v3m0-3v-3m0 6v3m0-6H9m0 0V9m0 3H3m6 0H3m3 0H6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8-8 3.582-8 8z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825a9.95 9.95 0 01-1.484.175c-4.418 0-8-3.582-8-8a9.95 9.95 0 011.175-4.625M12 6.75v3.75m0 0H9m3 0h3"
                  />
                </svg>
              )}
            </span>
          </div>
          <PrimaryButton className="w-full rounded-none my-5">
            Reset Password
          </PrimaryButton>
        </form>
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute bottom-96 right-0"></div>
      </section>
    </>
  );
};

export default ResetPassword;