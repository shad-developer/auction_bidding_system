import {
    commonClassNameOfInput,
    Caption,
    Container,
    PrimaryButton,
    Title,
  } from "../../components/common/Design";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import {  verifyEmail } from "../../redux/features/authSlice";
  
  const VerifyEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [code, setCode] = useState(["", "", "", "", "", ""]);
  
    const { isLoading, isSuccess, isLoggedIn, isError } = useSelector((state) => state.auth);
  
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
    
      await dispatch(verifyEmail({code: verificationCode}));
    };

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
                  Verify Email
                </Title>
                <div className="flex items-center gap-3">
                  <Title level={5} className="text-green font-normal text-xl">
                    Home
                  </Title>
                  <Title level={5} className="text-white font-normal text-xl">
                    /
                  </Title>
                  <Title level={5} className="text-white font-normal text-xl">
                    Verify Email
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
              <Title level={5}> Verify Your Email</Title>
              <p className="text-gray-600 mb-6 text-center">
                Please enter the OTP below that was sent to your email in order to
                verify your email.
              </p>
            </div>
  
            <div className="flex justify-center mb-4 space-x-2 ">
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
            <PrimaryButton className="w-full rounded-none my-5">
              {isLoading ? "Verifying" : "Verify Email"}
            </PrimaryButton>
          </form>
          <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute bottom-96 right-0"></div>
        </section>
      </>
    );
  };
  
  export default VerifyEmail;