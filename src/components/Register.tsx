import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

type FormData = {
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
};

const schema = z.object({
  firstName: z.string().min(3).max(10).trim(),
  lastName: z.string().min(3).max(15).trim(),
  age: z.number().min(18).max(70),
  phoneNumber: z.string().refine((value) => value.length === 10, {
    message: "Phone number must have 10 or 11 digits",
  }),
});

function Register({
  updateHandle,
  updateUser,
}: {
  updateHandle?: any;
  updateUser?: any;
}) {
  if (updateHandle) console.log(updateUser);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
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

  const submitData = async (data: FormData) => {
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
    <div className="flex items-center justify-center h-full">
      <div className="bg-white shadow-md p-4 md:w-64 lg:w-72 xl:w-80 rounded-lg">
        <form onSubmit={handleSubmit(submitData)} className="space-y-4">
          <div>
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
          <div>
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
          <div>
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
          <div>
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
            {updateUser ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
