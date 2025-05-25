import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleResponse = async (authResult) => {
    try {
      setLoading(true);
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const userInfo = { email, name, token, image };
        localStorage.setItem("user-info", JSON.stringify(userInfo));
        navigate("/dashboard");
      } else {
        throw new Error("No auth code returned from Google");
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleResponse,
    onError: handleGoogleResponse,
    flow: "auth-code",
  });

  return {
    loginWithGoogle,
    loading,
    error,
  };
};
