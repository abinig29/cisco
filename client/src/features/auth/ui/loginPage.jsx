import { replace, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { userSchema } from "../schema";
import { useLoginMutation } from "../authApiSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import r from "../../../assets/r-logo.png";



const Login = () => {
  const navigate = useNavigate();
  const [login, { isError, error, isSuccess, isLoading }] = useLoginMutation();
  const [customError, setError] = useState("");
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values, { resetForm }) => {
    try {
      await login({ email: values.email, password: values.password }).unwrap();
      resetForm();
      navigate("/dash", { replace: true });
    } catch (error) {
      setError(error?.data?.message);
    }
  };
  const {
    touched,
    errors,
    values,
    setFieldValue,
    handleSubmit,
    getFieldProps,
  } = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit,
  });

  useEffect(() => {
    setError("");
  }, [values]);

  return (
    <div className="bg-slate-200 ">
      <Header />
      <main className="grid place-content-center min-h-[calc(100vh-76px)] ">
        <div className="w-full  flex justify-center">
          <img src={r} alt="" className="w-[300px]" />
        </div>

        <div class=" text-black  w-[300px] md:w-[400px] ">
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium  ">
              Sign in to our platform
            </h3>
            <form class="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium  "
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  {...getFieldProps("email")}
                  class="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 "
                  placeholder="name@company.com"
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your password
                </label>
                <input
                  type="password"
                  {...getFieldProps("password")}
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
                {touched.password && errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                class="w-full text-white  hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#427cce]"
              >
                {isLoading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600 "
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    <h3 className="inline"> Login to your account</h3>
                  </>
                ) : (
                  " Login to your account"
                )}
              </button>
              {customError && (
                <h3 className="text-red-400 text-sm text-center font-poppins">
                  {customError}
                </h3>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
