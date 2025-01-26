import React, { useEffect } from "react";
import Prototypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import { Caption, PrimaryButton, ProfileCard, Title } from "../common/Design";
import { RiAuctionFill } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineFavorite } from "react-icons/md";
import { fetchBiddingHistory } from "../../redux/features/biddingSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ item, highestBid, totalBids }) => {
  const navigate = useNavigate();  

  const handlePlaceBid = () => {
    if (item?._id) {
      console.log(`Navigating to details page for item ID: ${item._id}`); 
      navigate(`/details/${item._id}`);
    } else {
      console.error("Item ID is undefined");
    }
  };


  return (
    <>
      {" "}
      <div className="bg-white shadow-s1 rounded-xl p-3">
        <div className="h-56 relative overflow-hidden">
          <NavLink to={`/details/${item?._id}`}>
            <img
              src={`${item?.image?.filePath}`}
              alt={item?.image?.fileName}
              className="w-full h-full object-contain rounded-xl hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out"
            />
          </NavLink>
          <ProfileCard className="shadow-s1 absolute right-3 bottom-3">
            <RiAuctionFill size={22} className="text-green" />
          </ProfileCard>

          <div className="absolute top-0 left-0 p-2 w-full">
            <div className="flex items-center justify-between">
              {item?.isSoldout ? (
                <Caption className="text-red-500 bg-white px-3 py-1 text-sm rounded-full">
                  Sold Out
                </Caption>
              ) : (
                <Caption className="text-green bg-green_100 px-3 py-1 text-sm rounded-full">
                  On Stock
                </Caption>
              )}
              <Caption className="text-green bg-green_100 px-3 py-1 text-sm rounded-full">
                {totalBids} Bids
              </Caption>
            </div>
          </div>
        </div>
        <div className="details mt-4">
          <Title className="uppercase">{item?.title?.slice(0, 20)}...</Title>
          <hr className="mt-3" />
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center justify-between gap-5">
              <div>
                <RiAuctionFill size={40} className="text-green" />
              </div>
              <div>
                <Caption className="text-green">Current Bid</Caption>
                <Title>Rs: {highestBid}</Title>
              </div>
            </div>
            <div className="w-[1px] h-10 bg-gray-300"> </div>
            <div className="flex items-center justify-between gap-5">
              <div>
                <GiMoneyStack size={40} className="text-red-500" />
              </div>
              <div>
                <Caption className="text-red-500">Price</Caption>
                <Title>Rs: {item?.price}</Title>
              </div>
            </div>
          </div>
          <hr className="mb-3" />

          <div
            className="flex items-center justify-between mt-3"
            onClick={handlePlaceBid}>
            <PrimaryButton className="rounded-lg w-full text-sm">
             View Product
            </PrimaryButton>

            {/* <PrimaryButton className="rounded-lg px-4 py-3">
          <MdOutlineFavorite size={20} />
        </PrimaryButton> */}
          </div>
        </div>
      </div>
    </>
  );
};

ProductCard.Prototypes = {
  item: Prototypes.object,
};

export default ProductCard;
