import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Title, PrimaryButton } from "../../../components/common/Design";
import { useRedirectLogoutUser } from "./../../../hooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getUserProduct,
} from "../../../redux/features/productSlice";
import { Table } from "../../../components/Table";
import { sellProduct } from "../../../redux/features/biddingSlice";

const ProductList = () => {
  
  useRedirectLogoutUser("/login");
  const dispatch = useDispatch();
  const { userProducts } = useSelector((state) => state.product);
  const { isLoading } = useSelector((state) => state.bidding);

  useEffect(() => {
    dispatch(getUserProduct());
  }, [dispatch]);

  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getUserProduct());
  };

  const handleSellProduct = async (productId) => {
    await dispatch(sellProduct({productId: productId}));
    await dispatch(getUserProduct());
  };

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            Product Lists
          </Title>
          <NavLink to="/add">
            <PrimaryButton className="flex items-center gap-3 px-5 py-2 text-sm rounded-md transition-transform hover:scale-105">
              <AiOutlinePlus size={20} />
              <span>Create Product</span>
            </PrimaryButton>
          </NavLink>
        </div>
        <hr className="my-5" />
        <Table
          products={userProducts}
          handleDeleteProduct={handleDeleteProduct}
          handleSellProduct={handleSellProduct}
          isLoading={isLoading}

        />
      </section>
    </>
  );
};


export default ProductList;