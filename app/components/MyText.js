import { useField } from "formik";

const MyText = ({ label, ...props }) => {
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

export default MyText;
