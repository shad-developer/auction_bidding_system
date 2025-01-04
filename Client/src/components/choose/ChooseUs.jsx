import React from "react";
import { Caption, Container, Title } from "../common/Design";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineGppGood } from "react-icons/md";
import { SiAegisauthenticator } from "react-icons/si";

const ChooseUs = () => {
  return (
    <>
      <section>
        <Container>
          <div className="flex text-center flex-col mt-10 px-10">
            <Title level={1}>Why Choose us</Title>
            <Caption>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, iste! Quam aliquid labore tenetur deserunt, recusandae
              soluta natus aliquam ut, officia ipsum corrupti tempore doloribus
              culpa iusto voluptatum error accusamus.
            </Caption>
          </div> 
          <div className="grid md:grid-cols-3 text-center grid-cols-1 gap-8 mt-5">
            <div className="text-center p-5 border border-green rounded-lg hover:border-b-green transition-transform hover:ease-in-out">
            <MdOutlineGppGood className="text-center mb-5" size={70} />
                <Caption>High Quality Products</Caption>
                <Title level={5}>High Quality Products</Title>       <Caption>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Asperiores, iste! Quam aliquid labore tenetur deserunt.
                </Caption>
            </div>

            <div className="text-center p-5 border border-green rounded-lg hover:border-b-green transition-transform hover:ease-in-out">
            <SiAegisauthenticator className="text-center mb-5" size={70}/>
                <Caption>100% Authentic</Caption>
                <Title level={5}>Authentic Platform</Title>       <Caption>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Asperiores, iste! Quam aliquid labore tenetur deserunt.
                </Caption>
            </div>

            <div className="text-center p-5 border border-green rounded-lg hover:border-b-green transition-transform hover:ease-in-out">
                <RiSecurePaymentLine className="text-center mb-5" size={70}/>
                <Caption>Safe and Secure</Caption>
                <Title level={5}>Payment Security</Title>
                <Caption>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Asperiores, iste! Quam aliquid labore tenetur deserunt.
                </Caption>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ChooseUs;
