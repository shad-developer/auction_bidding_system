import { useNavigate } from "react-router-dom";
import CategoryDropDown from "../../components/common/CategoryDropDown";
import {
  commonClassNameOfInput,
  Caption,
  PrimaryButton,
  Title,
} from "../../components/common/Design";
import { useRedirectLogoutUser } from "./../../hooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/features/productSlice";
import { useEffect, useState, useRef } from "react";
import ReactQuill from 'react-quill';

const initialState = {
  title: "",
  description: "",
  price: "",
  category: null,
  length: "",
  width: "",
  height: "",
  weight: "",
  color: "",
  material: "",
};

const AddProduct = () => {
  useRedirectLogoutUser("/login");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImg, setProductImg] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const { isSuccess, isLoading } = useSelector((state) => state.product);

  const {
    title,
    description,
    price,
    category,
    length,
    width,
    height,
    weight,
    color,
    material,
  } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImg(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCategoryChange = (selectedCategory) => {
    setProduct({ ...product, category: selectedCategory });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("length", length);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("color", color);
    formData.append("material", material);
    formData.append("image", productImg);

    if (category) {
      formData.append("category", category.label);
    }

    await dispatch(createProduct(formData));
    if (isSuccess) {
      navigate("/product-list");
    }
  };


  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Create Product
        </Title>
        <hr className="my-5" />
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <Caption className="mb-2">Title *</Caption>
            <textarea
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              className={`${commonClassNameOfInput}`}
              placeholder="Title"
              rows={3}
              required
            ></textarea>
          </div>

          <div className="flex items-center gap-5 mt-4 mb-5">
            <div className="w-1/2">
              <Caption className="mb-2">Category *</Caption>
              <CategoryDropDown
                onChange={handleCategoryChange}
                value={category}
                required
                className={`${commonClassNameOfInput}`}
              />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Price Range*</Caption>
              <input
                type="number"
                min={1}
                name="price"
                value={price}
                onChange={handleInputChange}
                className={`${commonClassNameOfInput}`}
                placeholder="Price in PKR"
                required
              />
            </div>

            <div className="w-1/2">
              <Caption className="mb-2">Weight </Caption>
              <input
                type="number"
                name="weight"
                min={0}
                value={weight}
                onChange={handleInputChange}
                className={`${commonClassNameOfInput}`}
                placeholder="Weight in Grams"
              />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-4 mb-5">
            {/* Length Input */}
            <div className="w-1/2">
              <Caption className="mb-2">Length </Caption>
              <input
                type="number"
                name="length"
                min={0}
                value={length}
                onChange={handleInputChange}
                className={`${commonClassNameOfInput}`}
                placeholder="Length in Inches"
              />
            </div>
            {/* Width Input */}
            <div className="w-1/2">
              <Caption className="mb-2">Width </Caption>
              <input
                type="number"
                name="width"
                min={0}
                value={width}
                onChange={handleInputChange}
                className={`${commonClassNameOfInput}`}
                placeholder="Width in Inches"
              />
            </div>

            {/* Height Input */}
            <div className="w-1/2">
              <Caption className="mb-2">Height </Caption>
              <input
                type="number"
                name="height"
                min={0}
                value={height}
                onChange={handleInputChange}
                className={`${commonClassNameOfInput}`}
                placeholder="Height in Inches"
              />
            </div>
          </div>

          <div className="flex items-center gap-5 mt-4 mb-5">
            {/* Weight Input */}
          

            {/* Color Input */}
            <div className="w-1/2">
              <Caption className="mb-2">Color </Caption>
              <input
                type="text"
                name="color"
                value={color}
                onChange={handleInputChange}
                className={`${commonClassNameOfInput}`}
                placeholder="Color"
              />
            </div>

            {/* Material Input */}
            <div className="w-1/2">
              <Caption className="mb-2">Material </Caption>
              <input
                type="text"
                name="material"
                value={material}
                onChange={handleInputChange}
                className={`${commonClassNameOfInput}`}
                placeholder="Material"
              />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Image </Caption>
              <input
                type="file"
                onChange={handleImageChange}
                className={`${commonClassNameOfInput}`}
                name="image"
              />
            </div>
          </div>

          <div>
            <Caption className="mb-2">Description *</Caption>

            <ReactQuill
              theme="snow"
              name="description"
              value={description}
              className="h-48"
              onChange={(value) => setProduct({ ...product, description: value })}
            />
          </div>

          <PrimaryButton type="submit" className="rounded-none my-5 mt-16">
            {isLoading ? "Creating..." : "CREATE"}
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};


export default AddProduct;