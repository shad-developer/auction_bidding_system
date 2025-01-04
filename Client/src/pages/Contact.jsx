import React from 'react'
import { Container, Caption, commonClassNameOfInput, PrimaryButton, Title, CustomNavLink } from '../components/common/Design'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendMessage } from './../redux/features/authSlice';



const Contact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isLoading } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msgText, setmsgText] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, msgText };
    // console.log(data);
    await dispatch(sendMessage(data));
  };
  return (
    <>
      <section className="regsiter pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">
                Contact us Now
              </Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">
                  Home
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  /
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  Contact
                </Title>
              </div>
            </div>
          </Container>
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-s3 w-full m-auto md:w-1/3 my-16 p-8 rounded-xl">
          <div className="text-center">
            <Title level={5}>Contact us Now</Title>
            <p className="mt-2 text-lg">
              Enter Your Query about Bidding? <CustomNavLink href="/login">Log In Here</CustomNavLink>
            </p>
          </div>
          <div className="py-5">
            <Caption className="mb-2">Name *</Caption>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" className={commonClassNameOfInput} placeholder="First Name" required />
          </div>
          <div className="py-5">
            <Caption className="mb-2">Email *</Caption>
            <input type="email" name="email"  value={email} onChange={(e) => setEmail(e.target.value)} className={commonClassNameOfInput} placeholder="Enter Your Email" required />
          </div>

          <div className="py-5">
            <Caption className="mb-2">Message *</Caption>
            <textarea type="email" name="email"  value={msgText} onChange={(e) => setmsgText(e.target.value)} className={commonClassNameOfInput} placeholder="Enter your Message" required ></textarea>
          </div>
     
          <PrimaryButton className="w-full rounded-none my-5">
            { isLoading ? "Sending" :"Send Email"}</PrimaryButton>
        </form>
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute bottom-96 right-0"></div>
      </section>
    </>
  )
}

export default Contact
