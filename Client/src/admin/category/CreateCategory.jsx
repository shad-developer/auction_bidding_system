import { useNavigate } from "react-router-dom";
import { commonClassNameOfInput } from "../../components/common/Design";
import { Caption, PrimaryButton, Title } from "../../components/common/Design";
// import { commonClassNameOfInput } from "../../components/common/Design";
import { useRedirectLogoutUser } from "./../../hooks/useRedirectLogoutUser";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createCategory, getAllCategory } from "../../redux/features/categorySlice";

const CreateCategory = () => {
  useRedirectLogoutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setTitle(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }
    try {
      await dispatch(createCategory({ title })).unwrap();
      await dispatch(getAllCategory()).unwrap();
      navigate("/category");
    } catch (error) {
      setError(error.message);
      return;
    }
  };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Create Category
        </Title>
        <form onSubmit={handleSubmit}>
          <div className="w-full my-8">
            <Caption className="mb-2">Title *</Caption>
            <input
              type="text"
              className={`${commonClassNameOfInput}`}
              value={title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
          </div>

          <PrimaryButton type="submit" className="rounded-none my-5">
            CREATE
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};

export default CreateCategory;