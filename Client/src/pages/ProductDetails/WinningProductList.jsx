import React, {useState, useEffect} from "react";
import { Title } from "../../components/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { getWonedProducts } from "../../redux/features/productSlice";
import { NavLink } from "react-router-dom";
import { TiEyeOutline } from "react-icons/ti";


const WinningProductList = () => {
  const dispatch = useDispatch();
  const {wonnedProducts, isLoading} = useSelector((state) => state.product)

  
  useEffect(() => {
    dispatch(getWonedProducts());
  }, [dispatch]);

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            Winning Product Lists
          </Title>
        </div>
        <hr />

        <div className="relative overflow-x-auto rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-5">
                  S.N
                </th>
                <th scope="col" className="px-20 py-5">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-5">
                 Title
                </th>
                <th scope="col" className="px-6 py-3">
                 Bid Price
                </th>
                <th scope="col" className="px-6 py-3 flex justify-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wonnedProducts.length > 0 ? (
                wonnedProducts.map((winned, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center">
                      <img
                    className="w-16 h-16 rounded-md "
                          src={`${winned?.image?.filePath}`}
                    alt="Product Image"
                        />
                        </div>
                    </td>
        
                    <td className="px-6 py-4">{new Date(winned?.createdAt).toLocaleString()} </td> 
                    <td className="px-6 py-4 font-bold">{winned?.title.substring(0,20)}</td>
                    <td className="px-6 py-4 font-bold">Rs. {winned?.price}  </td>
                    <td className="px-6 py-4 text-center flex items-end justify-center mt-4">
                      <NavLink to={`/details/${winned?.product?._id}`} className=" font-medium text-indigo-500">
                        <TiEyeOutline size={25} />
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No Winned Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default WinningProductList;