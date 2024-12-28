"use client";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const emailId = useId();
  const passwordId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
    }
  });
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        {error && <p className="bg-red-500 text-lg text-white p-3">{error}</p>}
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
        <label htmlFor={emailId} className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          id={emailId}
          placeholder="user@email.com"
          {...register("email", {
            required: {
              value: true,
              message: "Email es un campo requerido",
            },
          })}
          className="p-3 rounder block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <label
          htmlFor={passwordId}
          className="text-slate-500 mb-2 block text-sm"
        >
          Contraseña:
        </label>
        <input
          type="password"
          id={passwordId}
          placeholder="* * * * * * * *"
          {...register("password", {
            required: {
              value: true,
              message: "El campo Contraseña es reuqerido ",
            },
          })}
          className="p-3 rounder block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-3">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
//      http://localhost:3000/auth/login
