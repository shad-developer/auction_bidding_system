import React from "react";
import { Caption, Container, PrimaryButton, Title } from "../components/common/Design";
import ChooseUs from "../components/choose/ChooseUs";

const About = () => {
  return (
    <>
      <section className="regsiter pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">
                About us
              </Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">
                  Home
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  /
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  About Us
                </Title>
              </div>
            </div>
          </Container>
        </div>

        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute bottom-96 right-0"></div>
        <Container className="">
          <div className="flex md:flex-row flex-col justify-between w-full mt-5">
            <div className="md:w-1/2 w-full">
              <img src="./images/about.png" alt="demo" />
            </div>
            <div className="md:w-1/2 w-full mt-32">
              <Title level={2} className="text-2xl text-primary">
                About Us
              </Title>
              <Caption className="text-lg">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Similique ea eveniet quibusdam rerum beatae sapiente dolores
                assumenda saepe nulla possimus. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Praesentium nostrum ab sunt,
                tenetur esse assumenda in officiis harum nemo eaque ex iusto
                suscipit vel ratione asperiores earum quibusdam itaque.
                Veritatis maiores velit tenetur dolorem libero vero. Dolor
                cupiditate dignissimos incidunt fugit architecto similique
                facilis, ipsam ex deleniti dolores doloribus expedita.{" "}
              </Caption>

              <PrimaryButton className="rounded-lg mt-5">Contact us Now</PrimaryButton>
            </div>
          </div>
        </Container>
      </section>

      <ChooseUs/>
    </>
  );
};

export default About;
