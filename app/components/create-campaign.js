import * as Yup from "yup";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { Formik, Form, useField } from "formik";
import CampaignFactory from "../../artifacts/contracts/Campaign.sol/CampaignFactory.json";

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

const CreateCampaign = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-orange-500 mb-4">
        Create Campaign
      </h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          requiredAmount: "",
          category: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          requiredAmount: Yup.number() // Correct validation for numeric input
            .min(1, "Must be at least 1")
            .required("Required"),
          category: Yup.string()
            .oneOf(
              ["education", "finance", "health", "technology", "music", "arts"],
              "Invalid Category"
            )
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
          }
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const balance = ethers
            .formatEther(await provider.getBalance(address))
            .slice(0, 5);

          console.log(`User Address: ${address}`);
          console.log(`User Balance: ${balance}`);

          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            CampaignFactory.abi,
            signer
          );

          try {
            // Ensure all 4 parameters are passed to match the contract
            const tx = await contract.createCampaign(
              values.title,
              ethers.parseEther(values.requiredAmount.toString()), // Ensure correct type
              values.category,
              values.description // Pass the description as well
            );
            await tx.wait();
            console.log("Campaign created successfully!", tx.to);
            toast.success("Campaign created successfully!");
            resetForm();
          } catch (error) {
            console.error("Error creating campaign:", error);
            toast.error("Failed to create campaign");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <MyTextInput
              label="Title"
              name="title"
              type="text"
              placeholder="Enter Campaign Title"
            />

            <MyTextInput
              label="Description"
              name="description"
              type="text"
              placeholder="Enter Campaign Description"
            />

            <MyTextInput
              label="Required Amount"
              name="requiredAmount"
              type="number" // Set to number for proper input validation
              placeholder="Enter Required Amount for Campaign"
            />

            <MySelect label="Category" name="category">
              <option value="" disabled>
                Select Category
              </option>
              <option value="technology">Technology</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
              <option value="health">Health</option>
              <option value="music">Music</option>
              <option value="arts">Arts</option>
            </MySelect>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-1 px-4 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCampaign;
