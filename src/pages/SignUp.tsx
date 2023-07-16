/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../redux/features/user/userApi";
import "../styles/autofill.css";
export default function SignUp() {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  console.log(isLoading);

  const handleRegister = async (e: {
    preventDefault: () => void;
    target: any;
  }) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      return toast.error("Please Enter Six Character");
    }

    const option = {
      email,
      password,
    };

    try {
      const response = await createUser(option);

      if ("error" in response) {
        return toast.error("Failed to create user");
      }

      form.reset();
      toast.success("User created successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5">
      <div className="text-slate-950 rounded-3xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="w-full md:w-9/12 shadow-lg  mx-auto px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl">Please Register</h1>
              <small className="text-slate-950">
                Already have an account? please{" "}
                <Link to="/login" className="underline">
                  login
                </Link>
              </small>
            </div>
            <div>
              <form className="w-1/2 mx-auto" onSubmit={handleRegister}>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="" className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-lg"></i>
                      </div>
                      <input
                        type="email"
                        name="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2  outline-none"
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
                        <i className="mdi mdi-lock-outline text-lg"></i>
                      </div>
                      <input
                        type="password"
                        name="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2  outline-none"
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
                      className="block  w-full  mx-auto bg-slate-950 text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      Registration
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
