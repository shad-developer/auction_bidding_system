import { useNavigate, useParams } from "react-router-dom";
import {
  commonClassNameOfInput,
  PrimaryButton,
  Title,
  Caption,
} from "../../components/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getProduct, updateProductByAdmin } from "../../redux/features/productSlice";

const UpdateProductByAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, product, isLoading } = useSelector((state) => state.product);
  const [commission, setCommission] = useState(0);



  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));  
    }
  }, [id, dispatch]);

  
  useEffect(() => {
    if (product && product?.commission !== undefined) {
      setCommission(product?.commission);
    }
  }, [product]);


  const handleChange = (e) => {
    setCommission(e.target.value);
  };

  const formData = {
    commission,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProductByAdmin({ id, formData }));
    navigate("/product/admin");
  };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Verify Product
        </Title>
        <hr className="my-5" />
        <div className="create-product">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <Caption className="mb-2">Add Commission %</Caption>
              <input
                type="number"
                name="commission"
                placeholder="Admin Percentage"
                value={commission}
                onChange={handleChange}
                className={`${commonClassNameOfInput}`}
              />
              <p className=" mt-5 text-gray-400 text-sm">Note: Add Commission to verify the product for auction listing</p>
            </div>
            <PrimaryButton type="submit" className="rounded-none my-5">
              {isLoading? "Verifying" :"Verify"}
            </PrimaryButton>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateProductByAdmin;