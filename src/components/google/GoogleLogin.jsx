import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/User/userSlice";

export default function GoogleLogin({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleAuth = async (code) => {
    try {
      const { data } = await Axios.get(`/api/v1/auth/google?code=${code}`);

      if (data.success) {
        dispatch(
          signInSuccess({
            ...data.data,
            isProfileComplete: Boolean(data.data.profilePicture),
          })
        );

        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);

        navigate("/dashboard/profile", {
          replace: true,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      throw error;
    }
  };
  const responseGoogle = async (response) => {
    try {
      if (response.code) {
        await googleAuth(response.code);
      } else {
        console.log(response);
        throw new Error("Google login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return <span onClick={googleLogin}>{children}</span>;
}
