import { useDispatch, useSelector } from "react-redux";
import {
  Caption,
  commonClassNameOfInput,
  PrimaryButton,
  Title,
} from "../../components/common/Design";
import { useRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  updateCategory,
  getAllCategory,
  getCategoryById,
} from "../../redux/features/categorySlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  useRedirectLogoutUser("/login");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [title, setTitle] = useState("");

  const { isLoading, isSuccess, category } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (id) {
      dispatch(getCategoryById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (category) {
      setTitle(category.title);
    }
  }, [category]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Title is required");
      return;
    }
    const formData = {
      title: title,
    };
    try {
      await dispatch(updateCategory({ id, formData }));
      await dispatch(getAllCategory());
      if (isSuccess) {
        navigate("/category");
      }
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Update Category
        </Title>

        <form onSubmit={handleSubmit}>
          <div className="w-full my-8">
            <Caption className="mb-2">Title *</Caption>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${commonClassNameOfInput}`}
            />
          </div>

          <PrimaryButton type="submit" className="rounded-none my-5">
            Update
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};


export default UpdateCategory;