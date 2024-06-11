import React, { FormEvent, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long!" }),
  age: z
    .number({ invalid_type_error: "Age field is required!" })
    .min(18, { message: "Age must be at least 18!" }),
});
type FormData = z.infer<typeof schema>;
// interface FormData {
//   name: string;
//   age: number;
// }
const Form = () => {
  // const nameRef = useRef<HTMLInputElement>(null);
  // const ageRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control" /* ref={nameRef} */
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            id="age"
            type="number"
            className="form-control" /* ref={ageRef} */
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <button
          disabled={!isValid}
          className="btn btn-primary p-2 "
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
