import { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../../components/util/TextInput";
import * as Yup from "yup";
import { useRegisterMutation } from "../../feature/auth/authApi";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [birthDate, setBirthdate] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();
  const [signup, { isLoading }] = useRegisterMutation();

  const handleValidate = () => {
    const userSchema = Yup.object({
      firstName: Yup.string()
        .required("Please Enter First Name")
        .max(30, "First Name is too long (maximum is 30 characters)"),
      lastName: Yup.string()
        .required("Please Enter Last Name")
        .max(30, "Last Name is too long (maximum is 30 characters)"),
      birthDate: Yup.string().required("Please Enter Your Birthdate"),
      password: Yup.string()
        .required("Please Enter Your Password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\_*])(?=.{6,})/,
          "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      confirmPassword: Yup.string()
        .required("Please Confirm Your Password")
        .oneOf([Yup.ref("password"), null], "Password Doesn't matched"),
      email: Yup.string()
        .required("Please Enter Email.")
        .email("Invalid Email Address"),
    });
    userSchema
      .validate(
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          birthDate,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        const res: any = await signup({
          firstName,
          lastName,
          email,
          password,
          birthdate: birthDate,
        });
        if (res?.data?.errors) {
          setErrors(res?.data?.errors);
          toast.error(res?.data?.message);
        } else {
          toast.success(res?.data?.message);
          navigate("/");
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
      <div className="sm:w-full md:w-[70%] lg:w-[60%] xl:w-[50%] bg-slate-800 h-full overflow-y-auto flex flex-col gap-3 p-3">
        <h1 className="text-green-500 font-extrabold text-3xl mt-4 mb-4">
          Create Your Account
        </h1>
        <TextInput
          type="text"
          placeholder="Enter First Name"
          label="First Name"
          error={errors?.firstName}
          required={true}
          value={firstName}
          onChange={(e: any) => setFirstName(e.target.value)}
        />
        <TextInput
          type="text"
          placeholder="Enter Last Name"
          label="Last Name"
          error={errors?.lastName}
          required={true}
          value={lastName}
          onChange={(e: any) => setLastName(e.target.value)}
        />
        <TextInput
          type="email"
          placeholder="Enter Email"
          label="Email Address"
          error={errors?.email}
          required={true}
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Type Your Password"
          label="Password"
          error={errors?.password}
          required={true}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Confirm Your Password"
          label="Confirm Password"
          error={errors?.confirmPassword}
          required={true}
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />
        <TextInput
          type="date"
          placeholder="Date Of Birth"
          label="Select Your Birthdate."
          error={errors?.birthDate || errors?.birthdate}
          required={true}
          value={birthDate}
          onChange={(e: any) => setBirthdate(e.target.value)}
        />
        <div className="flex justify-center my-2">
          <BeatLoader loading={isLoading} color="green" />
        </div>
        <button
          className="mt-7 bg-green-600 px-7 py-3 rounded-sm text-slate-50 font-extrabold hover:bg-green-500"
          onClick={handleValidate}
        >
          Signup
        </button>
        <div className="mt-6 text-center mb-7">
          <Link className="text-green-700 text-xl text-center" to="/login">
            Already Have An Account?Login
          </Link>
          <Link className="text-green-700 text-xl text-center" to="/login">
            Forget Password
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
