"use client";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    console.log("Enviando datos:", data); // Verificar los datos enviados

    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        if (res.ok) {
          router.push("/auth/login");
        }
        //return res.json();
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
      });
  });

  const userNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const passwordConfirmId = useId();
  console.log(errors);
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form action="" onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Regitrar</h1>
        <label
          htmlFor={userNameId}
          className="text-slate-500 mb-2 block text-sm"
        >
          Usuario:
        </label>
        <input
          type="text"
          id={userNameId}
          placeholder="youUser123"
          {...register("username", {
            required: {
              value: true,
              message: "Usuario es un campo requerido",
            },
          })}
          className="p-3 rounder block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
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
        <label
          htmlFor={passwordConfirmId}
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirmar Contraseña:
        </label>
        <input
          type="password"
          id={passwordConfirmId}
          placeholder="* * * * * * * *"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "El campo Confirmar Contraseña es requerido",
            },
          })}
          className="p-3 rounder block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-3">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
//    http://localhost:3000/auth/register
