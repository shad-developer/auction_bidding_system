import React, { useEffect } from "react";
import { Container, Title, Body, ProfileCard } from "../common/Design";
import SearchBox from "./SearchBox";
import Box from "./Box";
import Prototypes from "prop-types";
import { User1, user2, user3, user4 } from "../../assets/data";
import { PiPlus } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/features/productSlice";
import { getAllCategory } from "../../redux/features/categorySlice";

const Hero = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <>
      <section className="hero bg-primary py-8">
        <Container className="flex justify-between items-center md:flex-row flex-col">
          <div className="w-100 md:w-1/2 text-white pr-12 mt-16">
            <Title level={3} className="text-white">
              Build, sell & collect digital items
            </Title>
            <Body className="leading-7  text-gray-200 my-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repellat, nostrum. Sint est, explicabo sit incidunt aut corporis
              iusto quae, obcaecati totam consequatur maiores voluptatum
              aspernatur? Ad tempore explicabo sequi, placeat aliquam labore
              quos ut.
            </Body>

            <SearchBox />
            <div className="flex gap-8 items-center my-8">
              <div>
                <Title level={4} className="text-center">
                  {products?.length}K
                </Title>
                <Body className="leading-7 text-gray-200">Total Products</Body>
              </div>

              <div>
                <Title level={4} className="text-center">12M</Title>
                <Body className="leading-7 text-gray-200">Total Auctions</Body>
              </div>
              <div>
                <Title level={4} className="text-center">
                  {categories?.length}K
                </Title>
                <Body className="leading-7 text-gray-200">
                  Total Categories
                </Body>
              </div>
            </div>
          </div>
          <div className="w-full my-16 py-16 relative md:w-1/2">
            <img src="../../images/home/hero.webp" alt="" />
            <div className="horiz-move absolute md:top-28 top-8 left-0">
              <Box title="Proof of quality" desc="Lorem Ipsum Dolar Amet" />
            </div>
            <div className="horiz-move absolute bottom-72 right-0">
              <Box title="Safe and secure" desc="Lorem Ipsum Dolar Amet" />
            </div>
            <div className="px-5 shadow-md bg-white py-4 flex gap-5 items-center rounded-xl ml-5 -mt-5 vert-move w-1/2">
              <Title>58M Happy client</Title>
              <div className="flex items-center">
                <ProfileCard className="border-2 border-white">
                  <img
                    src={user2}
                    alt="img"
                    className="w-full h-full object-cover"
                  />
                </ProfileCard>
                <ProfileCard className="border-2 border-white -ml-4">
                  <img
                    src={User1}
                    alt="img"
                    className="w-full h-full object-cover"
                  />
                </ProfileCard>
                <ProfileCard className="border-2 border-white -ml-4">
                  <img
                    src={user3}
                    alt="img"
                    className="w-full h-full object-cover"
                  />
                </ProfileCard>
                <ProfileCard className="border-2 border-white -ml-4">
                  <img
                    src={user4}
                    alt="img"
                    className="w-full h-full object-cover"
                  />
                </ProfileCard>

                <ProfileCard className="border-2 border-primary -ml-4">
                  <PiPlus />
                </ProfileCard>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <div className="bg-white w-full py-16 -mt-10 rounded-t-[40px]"></div>
    </>
  );
};
Box.Prototypes = {
  title: Prototypes.string,
  desc: Prototypes.string,
};

export default Hero;
