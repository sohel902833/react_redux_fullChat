import { Link, useNavigate } from "react-router-dom";
import "../Login/login.css";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { useForgetPasswordMutation } from "../../feature/auth/authApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleValidate = (e: any) => {
    e.preventDefault();
    const userSchema = Yup.object({
      email: Yup.string()
        .required("Please Enter Email.")
        .email("Invalid Email Address"),
    });
    userSchema
      .validate(
        {
          email,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        const res: any = await forgetPassword({
          email,
        });
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          localStorage.setItem("email", email);
          navigate("/reset-password");
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        let newError: any = {};
        err.inner?.forEach((item: any) => {
          newError[item.path] = item.message;
        });
        setErrors(newError);
      });
  };

  return (
    <section className="bg-slate-900 h-screen flex gap-1 items-center justify-center">
      <div className="box">
        <div className="form">
          <h2>Forget Password</h2>
          <div className="inputBox">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
            <i></i>
          </div>
          <p className="text-red-500 mt-1 text-sm">{errors?.email}</p>

          <div className="links">
            <Link to="/login">Login</Link>
          </div>
          <div className="flex justify-center my-4">
            <BeatLoader loading={isLoading} color="green" />
          </div>
          <button className="submit-btn" onClick={handleValidate}>
            Forget Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
