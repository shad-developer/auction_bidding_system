import React, { useState, useEffect } from "react";
import {
  Body,
  Caption,
  Container,
  commonClassNameOfInput,
  Title,
} from "../../components/common/Design";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import AuctionHistory from "../../components/ProductDetails/AuctionHistory";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/features/productSlice";
import {
  fetchBiddingHistory,
  placeBid,
} from "../../redux/features/biddingSlice";
import { toast } from "react-toastify";
import Reviews from "../../components/ProductDetails/Reviews";
import { getAllReviewsByProductId } from "../../redux/features/reviewSlice";

const ProductDetails = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.product);
  const { history, isLoading } = useSelector((state) => state.bidding);
  const { reviews } = useSelector((state) => state.review);

  const [rate, setRate] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && !product.isSoldout) {
      dispatch(fetchBiddingHistory(id));
    }
  }, [dispatch, id, product]);

  useEffect(() => {
    if (history && history.length > 0) {
      const highestBid = Math.max(...history.map((bid) => bid.price));
      setRate(highestBid);
    } else if (product) {
      setRate(product.price);
    }
  }, [history, product]);

  useEffect(() => {
    if (id) {
      dispatch(getAllReviewsByProductId(id));
    }
  }, [dispatch, id]);

  // place bid
  const handleBidRateChange = (e) => {
    setRate(e.target.value);
  };

  const formData = {
    productId: id,
    price: rate,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product?.isVerify) {
      toast.warn("Comming Soon For Auction");
      return;
    }

    if (product?.isSoldout) {
      toast.error("Product already Sold");
      return;
    }

    await dispatch(placeBid(formData)).unwrap();
    dispatch(fetchBiddingHistory(id));
  };

  // average reviews result
  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      ).toFixed(1)
    : 0;

  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 !== 0;

  return (
    <>
      <section className="pt-24 px-8">
        <Container>
          <div className="flex flex-col md:flex-row  justify-between gap-8">
            <div className="md:w-1/2 w-full">
              <div className="h-[70vh]">
                <img
                  src={`${product?.image?.filePath}`}
                  alt=""
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            <div className="md:w-1/2  w-full">
              <Title level={3} className="capitalize">
                {product?.title}
              </Title>
              <div className="flex gap-5 mt-5">
                <div className="flex text-green">
                  {Array.from({ length: fullStars }, (_, index) => (
                    <IoIosStar key={index} size={20} />
                  ))}
                  {hasHalfStar && <IoIosStarHalf size={20} />}
                  {Array.from(
                    { length: 5 - Math.ceil(averageRating) },
                    (_, index) => (
                      <IoIosStarOutline key={index} size={20} />
                    )
                  )}
                </div>
                <Caption>{reviews.length} customer reviews</Caption>
              </div>
              <br />
              <Body>
                <Title level={5} className="mt-5">
                  Short Description:
                </Title>
                <br />
                <div className="description-content">
                  {product?.description ? (
                    <span
                      className="text-justify"
                      dangerouslySetInnerHTML={{
                        __html:
                          product.description.substring(0, 600) +
                          (product.description.length > 600 ? "..." : ""),
                      }}
                    />
                  ) : (
                    <span>No description available.</span>
                  )}
                </div>
              </Body>
              <Title level={5} className="flex items-center gap-2 my-5">
                Dimension:{" "}
                <Caption className="text-lg">
                  {`${product?.length || "*"}"L x ${
                    product?.width || "*"
                  }"W x ${product?.height || "*"}"H`}
                </Caption>
              </Title>

              <Title level={5} className="flex items-center gap-2 my-5">
                Timezone: <Caption className="text-lg">{timezone}</Caption>
              </Title>
              <Title className="flex items-center gap-2 my-5">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    product?.isVerify ? "" : "bg-red-500 text-white"
                  } ${product?.isSoldout ? "bg-red-500 text-white" : ""}`}
                >
                  {product?.isSoldout
                    ? "Sold Out"
                    : product?.isVerify
                    ? ""
                    : "Coming Soon"}
                </span>
              </Title>
              <br />
              <Caption>Time left:</Caption>
              <br />
              <div className="flex flex-col md:flex-row gap-8 text-center">
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>149</Title>
                  <Caption>Days</Caption>
                </div>
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>12</Title>
                  <Caption>Hours</Caption>
                </div>
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>36</Title>
                  <Caption>Minutes</Caption>
                </div>
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>51</Title>
                  <Caption>Seconds</Caption>
                </div>
              </div>
              <Title level={5} className="flex items-center gap-2 my-5">
                Price:{" "}
                <Caption className="text-lg">Rs: {product?.price} </Caption>
              </Title>
              <Title level={5} className="flex items-center gap-2 mt-5">
                Current bid:
                <Caption className="text-lg">Rs: {rate} </Caption>
              </Title>
              <div className="p-5 px-10 shadow-s3 py-8 mt-5">
                <form
                  className="flex gap-3 justify-between"
                  onSubmit={handleSubmit}
                >
                  <input
                    className={commonClassNameOfInput}
                    type="number"
                    name="price"
                    value={rate}
                    min={product?.price}
                    onChange={handleBidRateChange}
                  />
                  <button
                    type="submit"
                    className={`py-3 px-10 rounded-lg ${
                      product?.isSoldout || !product?.isVerify
                        ? "bg-red-500 text-white cursor-not-allowed"
                        : "bg-green text-white"
                    }`}
                    // disabled={product?.isSoldout || !product?.isVerify}
                  >
                    {isLoading ? "Placing" : "Place"}
                  </button>
                </form>
              </div>
            </div>
          </div>


          {/* tabs start from here */}
          
          <div className="details mt-8">
            <div className="flex items-center flex-wrap md:flex-row gap-5">
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "description"
                    ? "bg-green text-white"
                    : "bg-white"
                }`}
                onClick={() => handleTabClick("description")}
              >
                Description
              </button>
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "auctionHistory"
                    ? "bg-green text-white"
                    : "bg-white"
                }`}
                onClick={() => handleTabClick("auctionHistory")}
              >
                Auction History
              </button>
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "reviews" ? "bg-green text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("reviews")}
              >
                Reviews ({reviews.length})
              </button>
              {/* <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "moreProducts"
                    ? "bg-green text-white"
                    : "bg-white"
                }`}
                onClick={() => handleTabClick("moreProducts")}
              >
                More Products
              </button> */}
            </div>

            <div className="tab-content mt-8">
              {activeTab === "description" && (
                <div className="description-tab shadow-s3 p-8 rounded-md">
                  <Title level={4}>Description</Title>
                  <br />
                  <Caption className="leading-7">
                    <div
                      className="description-content"
                      dangerouslySetInnerHTML={{ __html: product?.description }}
                    />
                  </Caption>

                  <br />
                  <Title level={4}>Product Overview</Title>
                  <div className="flex flex-col md:flex-row justify-between gap-5">
                    <div className="mt-4 capitalize md:w-1/2 w-full">
                      <div className="flex justify-between border-b py-3">
                        <Title>category</Title>
                        <Caption>{product?.category}</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>Color</Title>
                        <Caption>{product?.color}</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>Length</Title>
                        <Caption>{product?.length || "*"} (inch)</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>Width</Title>
                        <Caption>{product?.width || "*"} (inch)</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>Height</Title>
                        <Caption>{product?.height || "*"} (inch)</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>weigth</Title>
                        <Caption>{product?.weight || "*"} (grams)</Caption>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>Material</Title>
                        <Caption> {product?.material} </Caption>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>Price</Title>
                        <Caption> Rs: {product?.price} </Caption>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>Sold out</Title>
                        {product?.isSoldout ? "Yes" : "No"}
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>verify</Title>
                        {product?.isVerify ? "Yes" : "No"}
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>Create At</Title>
                        <Caption>
                          {new Date(product?.createdAt).toLocaleString()}
                        </Caption>
                      </div>
                      {/* <div className="flex justify-between py-3">
                        <Title>Update At</Title>
                        <Caption>
                          {new Date(product?.updatedAt).toLocaleString()}
                        </Caption>
                      </div> */}
                    </div>
                    <div className="md:w-1/2 w-full">
                      <div className="h-[60vh] p-2 rounded-xl">
                        <img
                          src={`${product?.image?.filePath}`}
                          alt=""
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "auctionHistory" && (
                <AuctionHistory history={history} />
              )}
              {activeTab === "reviews" && (
                <Reviews reviews={reviews} productId={id} />
              )}
              {/* {activeTab === "moreProducts" && (
                <div className="more-products-tab shadow-s3 p-8 rounded-md">
                  <h1>More Products</h1>
                </div>
              )} */}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
