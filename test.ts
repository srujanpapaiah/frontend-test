import { z } from "zod";

const UserSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required buddy",
        invalid_type_error: "Name must be a string boy",
      })
      .optional(),
    age: z.number(),
    isAlive: z.boolean(),
    hobbies: z.array(z.string()),
    address: z.object({
      street: z.string(),
    }),
    password: z.string({}).min(6, "Password must be atleast 6 characters"),
    confirmPassword: z.string({}),
  })
  .refine(
    (data) => {
      return (data.password = data.confirmPassword);
    },
    {
      message: "Passwords do not match",
    }
  );

function createUser(props: unknown) {
  const result = UserSchema.parse(props);
  return result;
}

type CreateUserInput = z.infer<typeof UserSchema>;

const payload: CreateUserInput = {
  name: "john",
  age: 30,
  isAlive: true,
  hobbies: ["coding", "reading"],
  address: {
    street: "main street",
  },
  //@ts-ignore
  isUnknown: true,
};
const result = createUser(payload);
