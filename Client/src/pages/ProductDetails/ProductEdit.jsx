import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryDropDown from "../../components/common/CategoryDropDown";
import {
  commonClassNameOfInput,
  PrimaryButton,
  Caption,
  Title,
} from "../../components/common/Design";
import { useRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getProduct } from "../../redux/features/productSlice";
import ReactQuill from "react-quill";

const ProductEdit = () => {
  useRedirectLogoutUser("/login");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isSuccess, isLoading } = useSelector(
    (state) => state.product
  );

  
  const [formData, setFormData] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);


  
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        length: product.length || "",
        width: product.width || "",
        height: product.height || "",
        weight: product.weight || "",
        color: product.color,
        material: product.material,
      });
      setImagePreview(`${product.image?.filePath}`);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = new FormData();
    
    updatedProduct.append("title", formData.title);
    updatedProduct.append("price", formData.price);
    updatedProduct.append("description", formData.description);
    updatedProduct.append("height", formData.height);
    updatedProduct.append("length", formData.length);
    updatedProduct.append("width", formData.width);
    updatedProduct.append("weight", formData.weight);
    updatedProduct.append("material", formData.material);
    updatedProduct.append("color", formData.color);

    if (productImage) {
      updatedProduct.append("image", productImage);
    }

    await dispatch(updateProduct({ id, formData: updatedProduct }));

    if (isSuccess) {
      navigate("/product-list");
    }
  };
  

  return (
    <section className="bg-white shadow-s1 p-8 rounded-xl">
      <Title level={5} className="font-normal mb-5">
        Update Product
      </Title>
      <hr className="my-5" />
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-5 mt-4">
          <div className="w-full">
            <Caption className="mb-2">Title *</Caption>
            <textarea
              type="text"
              name="title"
              className={commonClassNameOfInput}
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
        </div>

        {/* Product Details Fields */}
        <div className="flex items-center gap-5 mt-4">
          <div className="w-1/3">
            <Caption className="mb-2">Height (Inch) </Caption>
            <input
              type="number"
              name="height"
              min={0}
              className={commonClassNameOfInput}
              placeholder="Height"
              value={formData.height}
              onChange={handleInputChange}
              
            />
          </div>
          <div className="w-1/3">
            <Caption className="mb-2">Length (Inch) </Caption>
            <input
              type="number"
              name="length"
              min={0}
              className={commonClassNameOfInput}
              placeholder="Length"
              value={formData.length}
              onChange={handleInputChange}
              
            />
          </div>
          <div className="w-1/3">
            <Caption className="mb-2">Width (Inch)</Caption>
            <input
              type="number"
              name="width"
              min={0}
              className={commonClassNameOfInput}
              placeholder="Width"
              value={formData.width}
              onChange={handleInputChange}
              
            />
          </div>
          <div className="w-1/3">
            <Caption className="mb-2">Weight (Grams)</Caption>
            <input
              type="number"
              min={0}
              name="weight"
              className={commonClassNameOfInput}
              placeholder="Weight"
              value={formData.weight}
              onChange={handleInputChange}
              
            />
          </div>
        </div>

        {/* Price , Material, Color Fields */}
        <div className="flex items-center gap-5 mt-4">
          <div className="w-1/3">
            <Caption className="mb-2">Price Range *</Caption>
            <input
              type="number"
              name="price"
              min={1}
              className={commonClassNameOfInput}
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-1/3">
            <Caption className="mb-2">Material </Caption>
            <input
              type="text"
              name="material"
              className={commonClassNameOfInput}
              placeholder="Material"
              value={formData.material}
              onChange={handleInputChange}
              
            />
          </div>
          <div className="w-1/3">
            <Caption className="mb-2">Color </Caption>
            <input
              type="text"
              name="color"
              className={commonClassNameOfInput}
              placeholder="Color"
              value={formData.color}
              onChange={handleInputChange}
              
            />
          </div>
        </div>

        <div className="mt-5">
          <Caption className="mb-2">Description *</Caption>

          <ReactQuill
            theme="snow"
            name="description"
            value={formData.description}
            className="h-48"
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
          />
        </div>

        {/* Image Field */}
        <div className="mt-20">
          <Caption className="mb-2">Image *</Caption>
          <input
            type="file"
            className={commonClassNameOfInput}
            name="image"
            onChange={handleImageChange}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="my-4">
            <img
              src={imagePreview}
              alt="Product Preview"
              className="w-20 h-20"
            />
          </div>
        )}

        {/* Submit Button */}
        <PrimaryButton type="submit" className="rounded-none my-5">
          {isLoading ? "Updating..." : "Update Product"}
        </PrimaryButton>
      </form>
    </section>
  );
};


export default ProductEdit;