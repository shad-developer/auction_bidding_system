import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { TiEyeOutline } from "react-icons/ti";
import { ProfileCard, Title } from "../components/common/Design";
import { user2 } from "../assets/data";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import { useRedirectLogoutUser } from "../hooks/useRedirectLogoutUser";
import { getAllUsers } from "../redux/features/authSlice";

const UserList = () => {

  const isChecking = useRedirectLogoutUser("/login");
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  if (isChecking || isLoading) {
    return <Loader />;  
  }

  // Once the data is loaded, render the table
  return (
    <section className="shadow-s1 p-8 rounded-lg">
      <div className="flex justify-between">
        <Title level={5} className=" font-normal">
          User Lists
        </Title>
      </div>
      <hr className="my-5" />
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                S.N
              </th>
              <th scope="col" className="px-6 py-5">
                Name
              </th>
              <th scope="col" className="px-6 py-5">
                Email
              </th>
              <th scope="col" className="px-6 py-5">
                Role
              </th>
              <th scope="col" className="px-6 py-5">
                Photo
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              {/* <th scope="col" className="px-6 py-3">
               Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 capitalize">{user?.name}</td>
                <td className="px-6 py-4">{user?.email}</td>
                <td className={`px-6 py-4 capitalize font-bold 
                  ${user?.role === 'admin' ? 'text-red-500' : 
                    user?.role === 'seller' ? 'text-violet-500' : 
                    user?.role === 'buyer' ? 'text-green' : ''}`}>
                  {user?.role}
                </td>
                <td className="px-6 py-4">
                  <ProfileCard>
                    <img src={user?.photo || user2} alt="User" />
                  </ProfileCard>
                </td>
                <td className="px-6 py-4">{new Date(user?.createdAt).toLocaleString()}</td>
                {/* <td className="py-4 flex justify-end px-8">
                  <NavLink
                    to="#"
                    type="button"
                    className="font-medium text-indigo-500"
                  >
                    <TiEyeOutline size={25} />
                  </NavLink>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserList;