import { CgDollar } from "react-icons/cg";
import { Title } from "../components/common/Design";
import Loader from "../components/common/Loader";
import { useRedirectLogoutUser } from "../hooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getAdminIncome } from "../redux/features/authSlice";


export const Income = () => {
  const isChecking = useRedirectLogoutUser("/login");
  const dispatch = useDispatch();
  const { income } = useSelector((state) => state.auth);


    useEffect(() => {
      dispatch(getAdminIncome());
  }, [dispatch]);
  
  

  if (isChecking) {
    return <Loader />;
  }
  return (
    <>
      <section>
        <div className="shadow-s1 p-8 rounded-lg  mb-12">
          <Title level={5} className=" font-normal">
            Commission Income
          </Title>

          <div className="shadow-s3 py-16 my-16 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
            <CgDollar size={80} className="text-green" />
            <div>
              <Title level={1}>$ { income?.commissionBalance}</Title>
              <Title>Total Income</Title>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
