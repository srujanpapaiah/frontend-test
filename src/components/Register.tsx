import React, { useEffect } from "react";
import "../App.css";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const FormData = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  phoneNumber: z.number(), // Change to phoneNumber
});

const isPhoneNumber = z
  .number()
  .refine(
    (value) => String(value).length === 10 || String(value).length === 11,
    {
      message: "Phone number must have 10 or 11 digits",
    }
  )
  .transform(Number); // Transform the phone number to a number type

function Register({ updateHandle, selectedUser }) {
  const schema: ZodType<FormData> = z.object({
    firstName: z.string().min(3).max(10),
    lastName: z.string().min(3).max(10),
    age: z.number().min(18).max(70),
    phoneNumber: isPhoneNumber, // Use the custom validation with phoneNumber
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (selectedUser) {
      // Pre-fill the form with the selected user's data
      setValue("firstName", selectedUser.firstName);
      setValue("lastName", selectedUser.lastName);
      setValue("phoneNumber", selectedUser.phoneNumber); // Change to phoneNumber
      setValue("age", selectedUser.age);
    }
  }, [selectedUser, setValue]);

  const submitData = async (data) => {
    try {
      if (selectedUser) {
        // If selectedUser is available, it means we are updating
        await axios.patch(
          `https://dashboardbackend.akashjayaraj.repl.co/user/${selectedUser._id}`,
          data
        );
        // Perform any necessary actions after successful update, e.g., refetch data, show success message, etc.
      } else {
        // If selectedUser is not available, it means we are creating new data
        await axios.post(
          "https://dashboardbackend.akashjayaraj.repl.co/user/create",
          data
        );
        // Perform any necessary actions after successful creation, e.g., refetch data, show success message, etc.
      }
      console.log("Data submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label>First Name :</label>
        <input
          type="text"
          {...register("firstName")}
          className="border border-black"
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <label>Last Name :</label>
        <input
          type="text"
          {...register("lastName")}
          className="border border-black"
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <label>Phone :</label>
        <input
          type="number"
          {...register("phoneNumber", { valueAsNumber: true })} // Change to phoneNumber
          className="border border-black"
        />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}{" "}
        {/* Change to phoneNumber */}
        <label>Age :</label>
        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          className="border border-black"
        />
        {errors.age && <span>{errors.age.message}</span>}
        <input type="submit" className="border border-black" />
      </form>
    </div>
  );
}

export default Register;
