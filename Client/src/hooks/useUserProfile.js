import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, selectIsLoggedIn } from "../redux/features/authSlice";

export const useUserProfile = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { user, isLoading } = useSelector((state) => state.auth);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (isLoggedIn && !user && !isLoading) {
      dispatch(getUserProfile());
    }

    if (user && user.role) {
      setRole(user.role);
    }
  }, [dispatch, user, isLoading, isLoggedIn]);

  return { role, isLoggedIn, isLoading };
};
