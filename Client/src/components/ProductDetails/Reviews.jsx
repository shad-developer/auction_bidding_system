import React, { useState, useEffect } from "react";
import { Title, Caption, commonClassNameOfInput } from "../common/Design";
import { createReview } from "../../redux/features/reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Reviews = ({ reviews, productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading} = useSelector((state) => state.review);

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [imagePreview, setImagePreview] = useState("");


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImg(file);
    }
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !description) {
      toast.error("Please provide a rating and description.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("rating", rating);
    formData.append("description", description);
    if (productImg) {
      formData.append("image", productImg);
    }
    try {
      await dispatch(createReview(formData));
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="reviews-tab shadow-s3 p-8 rounded-md">
      <Title level={5} className="font-normal">
        Reviews
      </Title>
      <hr className="my-5" />

      {reviews && reviews.length > 0 ? (
         <div
         className="reviews-container overflow-y-auto"
         style={{
           maxHeight: "500px", 
           paddingRight: "10px", 
         }}>
          {reviews.map((review, index) => (
            <div key={index} className="review-item mb-5">
              <Title level={6}>{review.user?.name}</Title>
              <div className="flex items-center gap-2">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}
              </div>
              {review.image && (
                <div className="review-image">
                  <img
                    src={review.image.filePath}
                    alt="Review"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
              )}
              <Caption className="text-sm">{review.description}</Caption>
            </div>
          ))}
          </div>
      ) : (
        <Caption>No reviews yet.</Caption>
      )}

      <hr className="my-5" />
      {/* Add Review Form */}
      <Title level={5} className="mt-8">
        Add a Review
      </Title>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="mt-4"
      >
        <div className="flex items-center gap-2">
          <label className="text-xl">Rating: </label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() =>  setRating(star)}
              className={`cursor-pointer text-3xl ${
                rating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <div className="mt-4">
          <label className="block">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Write your review..."
          />
        </div>

        <div className="mt-4">
          <label className="block">Upload Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className={`${commonClassNameOfInput}`}
            name="image"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Uploaded preview"
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="py-2 px-4 bg-green text-white rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reviews;
