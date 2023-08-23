import React from "react";

const CheckboxInput = ({ label, name, inputData, setInputData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInputData((prev) => ({
      ...prev,
      [name]: e.target.checked,
    }));
  };
  return (
    <label className="text-lg font-bold flex items-center">
      <input
        type="checkbox"
        checked={inputData[name] || false}
        name={name}
        onChange={handleChange}
        className="mr-4 accent-[#ff7900] w-6 h-6"
      />
      {label}
    </label>
  );
};

export default CheckboxInput;
