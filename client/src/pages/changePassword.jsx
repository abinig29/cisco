import React, { useEffect, useState } from "react";
import { useChangePasswordMutation } from "../features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectEmail, selectRole } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const email = useSelector(selectEmail);
  const role = useSelector(selectRole);
  console.log(email);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [changePassword, { isError, error, isSuccess, isLoading }] =
    useChangePasswordMutation();

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    changePassword({ newPassword: password, email });
  };
  useEffect(() => {
    console.log({ isSuccess });
    if (isSuccess) {
      if (role === "Admin") return navigate("/dash/registrees");
      else return navigate("/dash/courses");
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 border rounded shadow-md">
        {isError && (
          <h5 className="text-sm text-red-600 text-center">
            {error?.data?.message}
          </h5>
        )}
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              New password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 disabled:bg-blue-300 `}
          >
            Chaneg Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
