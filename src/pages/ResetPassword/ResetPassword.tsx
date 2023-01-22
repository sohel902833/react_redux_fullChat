import { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import * as Yup from "yup";
import "./style.css";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useResetPasswordByCodeMutation } from "../../feature/auth/authApi";
const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordByCodeMutation();

  const email = localStorage.getItem("email");

  const handleValidate = (e: any) => {
    e.preventDefault();
    const userSchema = Yup.object({
      password: Yup.string()
        .required("Please Enter Your Password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\_*])(?=.{6,})/,
          "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      confirmPassword: Yup.string()
        .required("Please Confirm Your Password")
        .oneOf([Yup.ref("password"), null], "Password Doesn't matched"),
      code: Yup.string().required("Please Enter Verify Code."),
    });
    userSchema
      .validate(
        {
          password,
          confirmPassword,
          code,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        const res: any = await resetPassword({
          newPassword: password,
          email,
          code: Number(code),
        });
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          navigate("/login");
          localStorage.removeItem("email");
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

  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem("email");
  //   };
  // }, []);

  if (!email) {
    return <Navigate to="/forget-password" />;
  }

  const parsedEmail =
    email.substring(0, 3) +
    "****" +
    email.substring(email.length - 4, email.length);

  return (
    <section className="bg-slate-900 h-screen flex gap-1 items-center justify-center">
      <div className="reset_password_box">
        <div className="reset_password_form">
          <h2>Set New Password</h2>
          <p className="text-white text-center mt-1">
            We Sent A Verification Code To Your{" "}
            <span className="text-green-500">{parsedEmail}</span>
          </p>
          <div className="inputBox">
            <input
              type="number"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <span>Verify Code</span>
            <i></i>
          </div>
          <p className="text-red-500 mt-1 text-sm">{errors?.code}</p>
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
          <div className="inputBox">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>Confirm Password</span>
            <i></i>
          </div>
          <p className="text-red-500 mt-1 text-sm">{errors?.confirmPassword}</p>

          <div className="links">
            <Link to="/forget-password">Forget Password</Link>
            <Link to="/signup">Signup</Link>
          </div>
          <div className="flex justify-center my-4">
            <BeatLoader loading={isLoading} color="green" />
          </div>
          <button className="submit-btn" onClick={handleValidate}>
            Reset Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
