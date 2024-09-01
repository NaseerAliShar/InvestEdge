import axios from "axios";
import React from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Formik, Form, useField } from "formik";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={`w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        className={`w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Home = () => {
  return (
    <div className="max-w-md mx-auto mt-10 px-8 py-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-orange-500 mb-4">
        Create Campaign
      </h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          fundingGoal: "",
          currentFunding: 0,
          category: "",
          deadline: new Date().toISOString().split("T")[0],
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          fundingGoal: Yup.number()
            .min(1, "Must be at least 1")
            .required("Required"),
          category: Yup.string()
            .oneOf(["education", "finance", "health"], "Invalid Category")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axios
            .post(
              "https://66912b2926c2a69f6e8ebc93.mockapi.io/InvestEdge/campaigns",
              values
            )
            .then((response) => {
              toast.success("Campaign created successfully");
              console.log("Campaign created successfully:", response.data);
              // Reset form after successful submission
              resetForm();
            })
            .catch((error) => {
              console.error("Error creating campaign:", error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        <Form>
          <MyTextInput
            label="Title"
            name="title"
            type="text"
            placeholder="Title"
          />

          <MyTextInput
            label="Description"
            name="description"
            type="text"
            placeholder="Description"
          />

          <MyTextInput
            label="Funding Goal"
            name="fundingGoal"
            type="number"
            placeholder="Funding Goal"
          />

          <MyTextInput
            label="Deadline"
            name="deadline"
            type="date"
            placeholder="Deadline"
          />

          <MySelect label="Category" name="category">
            <option value="" disabled>
              Select Category
            </option>
            <option value="education">Education</option>
            <option value="finance">Finance</option>
            <option value="health">Health</option>
          </MySelect>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-1 px-4 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Home;
