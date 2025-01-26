import React from "react";
import { Title } from "../../components/common/Design";


const MyFavoriteProduct = () => {
  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            My Favorite Products
          </Title>
        </div>
        <br />

        <div className="text-center py-5">
          <p className="text-gray-500">No Favorite found!</p>
        </div>
      </section>
    </>
  );
};

export default MyFavoriteProduct;