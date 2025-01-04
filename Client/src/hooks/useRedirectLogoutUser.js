import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../redux/services/authService";
import { toast } from "react-toastify";

export const useRedirectLogoutUser = (path) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true); 
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { loggedIn } = await authService.getLoginStatus();
        if (!loggedIn) {
          navigate(path); 
          // toast.error("Login to Continue");
        }
      } catch (error) {
        console.error("Error checking login status:", error.message);
      } finally {
        setIsChecking(false); 
      }
    };

    checkLoginStatus();
  }, [navigate, path]);

  return isChecking; 
};
