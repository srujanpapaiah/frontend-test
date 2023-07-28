import React, { useEffect } from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const isPhoneNumber = z
  .string()
  .refine((value) => value.length === 10 || value.length === 11, {
    message: "Phone number must have 10 or 11 digits",
  });

const schema = z.object({
  firstName: z.string().min(3).max(10).trim(),
  lastName: z.string().min(3).max(15).trim(),
  age: z.number().min(18).max(70),
  phoneNumber: isPhoneNumber,
});

const FormData = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  phoneNumber: isPhoneNumber,
});

function Register({ updateHandle, updateUser }) {
  console.log(updateUser);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (updateUser) {
      setValue("firstName", updateUser.firstName);
      setValue("lastName", updateUser.lastName);
      setValue("phoneNumber", updateUser.phoneNumber);
      setValue("age", updateUser.age);
    }
  }, [updateUser, setValue]);

  const submitData = async (data) => {
    try {
      if (updateUser) {
        await axios.patch(
          `https://dashboardbackend.akashjayaraj.repl.co/user/${updateUser._id}`,
          data
        );
      } else {
        await axios.post(
          "https://dashboardbackend.akashjayaraj.repl.co/user/create",
          data
        );
      }
      console.log("Data submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit(submitData)}
        className="p-4 max-w-md mx-auto"
      >
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name:
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name:
          </label>
          <input
            type="text"
            {...register("lastName")}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone:
          </label>
          <input
            type="text"
            {...register("phoneNumber")}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.phoneNumber && (
            <span className="text-red-500">{errors.phoneNumber.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age:
          </label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
