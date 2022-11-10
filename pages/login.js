import Link from "next/link";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login </h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "이메일을 입력하세요.",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "올바른 이메일 주소를 입력하세요.",
              },
            })}
            className="w-full text-black"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력하세요.",
              minLength: {
                value: 3,
                message: "3자리 이상의 비밀번호를 입력하세요.",
              },
            })}
            className="w-full text-black"
            id="password"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          계정이 없으면 회원가입을 하십시오. &nbsp;
          <Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
const submitHandler = async ({ email, password }) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      toast.error(result.error);
    }
  } catch (err) {
    toast.error(getError(err));
  }
};
