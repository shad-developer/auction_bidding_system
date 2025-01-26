import React, { useEffect, useState } from "react";
import {
  commonClassNameOfInput,
  PrimaryButton,
  Caption,
  Title,
} from "../../components/common/Design";
import { user2 } from "../../assets/data";
import { useRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, updateProfile } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  role: "",
  country: "",
  city: "",
  phone_number: "",
  address: "",
  zip_code: "",
};

const UserProfile = () => {
  useRedirectLogoutUser("/login");
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [userImage, setUserImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        country: user.country,
        city: user.city,
        phone_number: user.phone_number,
        address: user.address,
        zip_code: user.zip_code,

      });
      setImagePreview(user?.image?.filePath);
    }
  }, [dispatch, user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserImage(file);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const isValid = /^[a-zA-Z\s]*$/.test(value); 
      if (!isValid) {
        toast.error("Name cannot contain special characters or numbers");
        return; 
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateUser = new FormData();
    updateUser.append("name", formData.name);
    updateUser.append("country", formData.country);
    updateUser.append("city", formData.city);
    updateUser.append("phone_number", formData.phone_number);
    updateUser.append("address", formData.address);
    updateUser.append("zip_code", formData.zip_code);


    if (userImage) {
      updateUser.append("image", userImage);
    }

    console.log(updateUser);

    await dispatch(updateProfile(updateUser));
    if (isSuccess) {
      navigate("/profile");
      toast.success("Profile updated successfully");
    }
  };

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="profile flex items-center gap-8">
          <img
            src={user?.image?.filePath ?? user2}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <Title level={5} className="capitalize">
              {user?.name ?? "Example"}
            </Title>
            <Caption>{user?.email ?? "example@gmail.com"}</Caption>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-1/2">
              <Caption className="mb-2">Full Name</Caption>
              <input
                value={formData?.name}
                name="name"
                onChange={handleInputChange}
                type="text"
                className={`capitalize ${commonClassNameOfInput}`}
              />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Phone No.</Caption>
              <input
                value={formData?.phone_number}
                name="phone_number"
                onChange={handleInputChange}
                type="text"
                className={`capitalize ${commonClassNameOfInput}`}
              />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Country</Caption>
              <input
                value={formData?.country}
                name="country"
                onChange={handleInputChange}
                type="text"
                className={`capitalize ${commonClassNameOfInput}`}
              />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">City</Caption>
              <input
                value={formData?.city}
                name="city"
                onChange={handleInputChange}
                type="text"
                className={`capitalize ${commonClassNameOfInput}`}
              />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-1/2">
              <Caption className="mb-2">Address</Caption>
              <textarea
                value={formData?.address}
                name="address"
                onChange={handleInputChange}
                type="text"
                className={`capitalize ${commonClassNameOfInput}`}
              />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Zip Code</Caption>
              <input
                value={formData?.zip_code}
                name="zip_code"
                onChange={handleInputChange}
                type="text"
                className={`capitalize ${commonClassNameOfInput}`}
              />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Profile Picture</Caption>
              <input
                type="file"
                className={commonClassNameOfInput}
                name="image"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-5 mt-5">
            {/* Image Preview */}
            {imagePreview && (
              <div className="my-4">
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="w-1/3 h-auto"
                />
              </div>
            )}
          </div>
          <PrimaryButton type="submit" className="mt-5">
            {isLoading ? "Updating.." : "Update Profile"}
          </PrimaryButton>
        </form>
        <div className="flex justify-end items-start">
          <button className="mt-5 text-red-600">
            <a href="/reset-password">Forgot Password?</a>
          </button>
        </div>
      </section>
    </>
  );
};


export default UserProfile;