import React, {useState, useEffect} from "react";
import { ProfileCard, Title } from "../../components/common/Design";
import { useRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/Table";
import { deleteBid, getMyBidsHistory } from "../../redux/features/biddingSlice";
import { NavLink } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TiEyeOutline } from "react-icons/ti";

const PlaceBiddingList = () => {
  useRedirectLogoutUser("/login");

  const dispatch = useDispatch();
  const { myBids } = useSelector((state) => state.bidding);

  useEffect(() => {
    dispatch(getMyBidsHistory());
  }, [dispatch]);



  const handleDeleteBid = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this Bid?");
      if (confirmDelete) {
        await dispatch(deleteBid(id));
        await dispatch(getMyBidsHistory());
      }
    } catch (error) {
      toast.error("Failed to delete Bid");
    }
   
  };

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            My Bidding Lists
          </Title>
        </div>
        <hr className="my-5" />
        <div className="relative overflow-x-auto rounded-lg">
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
              {myBids.length > 0 ? (
                myBids.map((bid, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center">
                      <img
                    className="w-16 h-16 rounded-md "
                    src={`${bid?.product?.image?.filePath}`}
                    alt="Product Image"
                        />
                        </div>
                    </td>
        
                    <td className="px-6 py-4">{new Date(bid?.createdAt).toLocaleString()} </td> 
                    <td className="px-6 py-4 font-bold">{bid?.product?.title.substring(0,20)}</td>
                    <td className="px-6 py-4 font-bold">Rs: {bid?.price}  </td>
                    <td className="px-6 py-4 text-center flex items-center justify-end gap-3 mt-4">
                      <NavLink to={`/details/${bid?.product?._id}`} type="button" className="font-medium text-indigo-500">
                        <TiEyeOutline size={25} />
                      </NavLink>
                      <button onClick={() => handleDeleteBid(bid?._id)} className="font-medium text-red-500">
                        <MdOutlineDeleteOutline size={25} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No bids available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default PlaceBiddingList;