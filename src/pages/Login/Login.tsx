import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../feature/auth/authApi";
import * as Yup from "yup";
import "./login.css";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleValidate = (e: any) => {
    e.preventDefault();
    const userSchema = Yup.object({
      password: Yup.string().required("Please Enter Your Password"),
      email: Yup.string()
        .required("Please Enter Email.")
        .email("Invalid Email Address"),
    });
    userSchema
      .validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        const res: any = await login({
          email,
          password,
        });
        if (res?.data?.user) {
          toast.success(res?.data?.message);
          navigate("/");
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
          <h2>Sign in</h2>
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
          <div className="inputBox">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i></i>
          </div>
          <p className="text-red-500 mt-1 text-sm">{errors?.password}</p>
          <div className="links">
            <Link to="/forget-password">Forget Password</Link>
            <Link to="/signup">Signup</Link>
          </div>
          <div className="flex justify-center my-4">
            <BeatLoader loading={isLoading} color="green" />
          </div>
          <button className="submit-btn" onClick={handleValidate}>
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
