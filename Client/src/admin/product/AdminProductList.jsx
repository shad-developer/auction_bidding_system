
import { Title } from "../../components/common/Design";
import {Table } from '../../components/Table'
import { useRedirectLogoutUser } from './../../hooks/useRedirectLogoutUser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {deleteProduct, getAllProduct} from "../../redux/features/productSlice";
import Loader from './../../components/common/Loader';
import { useUserProfile } from './../../hooks/useUserProfile';


const AdminProductList = () => {
  useRedirectLogoutUser("/login");
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);

  const { role, isLoggedIn } = useUserProfile();
  const isAdmin = role === "admin";

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProduct());
  };

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            Product Lists
          </Title>
        </div>
        <hr className="my-5" />
        <Table products={products} isAdmin={isAdmin} handleDeleteProduct={handleDeleteProduct}/>
      </section>
    </>
  );
};


export default AdminProductList;