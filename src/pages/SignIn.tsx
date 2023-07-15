/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/api/apiSlice";
import { setID, setUser } from "../redux/features/user/userSlice";
import { useAppDispatch } from "../redux/hooks";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function SignIn() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  console.log(isLoading);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e: {
    preventDefault: () => void;
    target: any;
  }) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log({ email, password });
    const option = {
      email,
      password,
    };

    try {
      const response = await loginUser(option);

      if ("error" in response) {
        return toast.error("Failed to login");
      }

      dispatch(setUser(response.data.data.email));
      dispatch(setID(response.data.data._id));

      localStorage.setItem("user", response.data.data.email);
      localStorage.setItem("userID", response.data.data._id);

      form.reset();
      toast.success("Logged in successfully");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Failed to login");
    }
  };

  return (
    <div className="md:flex w-full">
      <div className="w-full md:w-9/12 mx-auto py-10 px-5 md:px-10">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl uppercase text-cyan-500">Login</h1>
          <p className="mt-2">Enter your credentials to login</p>
        </div>
        <div>
          <form className="w-1/2 mx-auto" onSubmit={handleLogin}>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label htmlFor="" className="text-xs font-semibold px-1">
                  Email
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-cyan-500"
                    placeholder="Enter Email"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-12">
                <label htmlFor="" className="text-xs font-semibold px-1">
                  Password
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-cyan-500"
                    placeholder="************"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <button
                  type="submit"
                  className="   pl-10 pr-3   w-full mx-auto bg-cyan-500 hover:bg-cyan-700 focus:bg-cyan-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
