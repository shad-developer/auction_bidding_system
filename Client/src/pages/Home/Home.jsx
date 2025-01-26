import React, { useEffect } from "react";
import Hero from "../../components/Home/Hero";
import CategorySlider from "../../components/Home/CategorySlider";
import {LiveProducts} from "../../components/Home/LiveProducts";
import TopSeller from "../../components/Home/TopSeller";
import Process from "../../components/Home/Process";
import Trust from "../../components/Home/Trust";
import TopCollections from "../../components/Home/TopCollections";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/features/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <Hero />
      <CategorySlider />
      <LiveProducts products={products} />
      <TopSeller />
      <Process />
      <Trust />
      <TopCollections />
    </>
  );
};

export default Home;
