import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "../../redux/features/categorySlice";
import Loader from "../common/Loader";
const CategoryDropDown = (props) => {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const allCategory = categories?.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });


  const handleChange = selectedOption => {
  props.onChange(selectedOption);
}

  return (
    <>
      {isLoading ? <Loader/>: <Select id="category" onChange={handleChange}  options={allCategory} value={props.value}/>}
    </>
  );
};
export default CategoryDropDown;
