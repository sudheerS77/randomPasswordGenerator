import React, { useEffect, useState } from "react";
import PasswordList from "./passwordList.component";
import CheckboxInput from "./form/checkbox.input";
import RangeSlider from "./form/rangeSlider";

const GeneratePasswordComponent = ({
  generatedPasswords,
  setGeneratedPasswords,
}) => {
  const [password, setPassword] = useState("");

  const [passwordFiels, setPasswordFields] = useState({
    CapitalLetts: true,
    smallLetters: true,
    numbers: true,
    specialChars: false,
  });
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [passwordLength, setPasswordLength] = useState(6);

  const generatePassword = () => {
    const numbers = "0123456789";
    const capitalAlp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const smallAlp = "abcdefghijklmnopqrstuvwxyz";
    const specialChars = "!@#$%^&*()";

    let charset = "";

    if (passwordFiels.CapitalLetts) {
      charset += capitalAlp;
    }

    if (passwordFiels.smallLetters) {
      charset += smallAlp;
    }

    if (passwordFiels.numbers) {
      charset += numbers;
    }

    if (passwordFiels.specialChars) {
      charset += specialChars;
    }

    let newPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset.charAt(randomIndex);
    }
    setGeneratedPasswords([newPassword, ...generatedPasswords?.slice(0, 4)]);
    setPassword(newPassword);

    // Save to local storage
    localStorage.setItem(
      "passwordsData",
      JSON.stringify([newPassword, ...generatedPasswords])
    );
  };
  useEffect(() => {
    const prevPasswords = localStorage.getItem("passwordsData");
    // setGeneratedPasswords(prevPasswords);
    const data = JSON.parse(prevPasswords);
    if (prevPasswords) {
      setGeneratedPasswords(data);
      setPassword(data[0]);
    } else {
      generatePassword();
    }
  }, []);

  const copyToClipboard = () => {
    setCopiedStatus(true);
    const textField = document.createElement("textarea");
    textField.innerText = password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  useEffect(() => {
    setTimeout(() => {
      setCopiedStatus(false);
    }, [2000]);
  }, [copiedStatus]);

  return (
    <div className="w-full lg:w-[80%] space-y-5">
      <div className="relative w-full flex flex-col lg:flex-row items-center gap-5 p-5 border-2 rounded">
        <div className="w-full md:w-[300px] lg:w-[500px] h-16 flex items-center text-xl font-semibold p-2">
          {password}
        </div>
        <div className="flex items-center gap-5 w-full">
          <button
            onClick={generatePassword}
            className="w-full px-2 md:px-5 py-1 md:py-2 bg-[#ff7900] text-white rounded hover:bg-[#ff9100] font-bold"
          >
            Generate
          </button>
          <button
            onClick={copyToClipboard}
            className="w-full bg-blue-500 px-2 md:px-5 py-1 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold"
          >
            Copy
          </button>
        </div>
        {copiedStatus && (
          <div className="absolute top-0 right-10 bg-red-500 p-0.5 rounded text-md font-bold">
            copied
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-5">
          <h3 className="w-44 text-lg font-semibold">
            Password length: {passwordLength}
          </h3>
          <RangeSlider />
          <input
            type="range"
            min="5"
            max="25"
            step="1"
            defaultValue={parseInt(passwordLength)}
            onChange={(e) => {
              setPasswordLength(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-wrap md:flex-row items-center space-x-5">
          <h3 className="w-44 text-lg font-semibold">Characters used:</h3>
          <CheckboxInput
            label="ABC"
            name="CapitalLetts"
            inputData={passwordFiels}
            setInputData={setPasswordFields}
          />

          <CheckboxInput
            label="abc"
            name="smallLetters"
            inputData={passwordFiels}
            setInputData={setPasswordFields}
          />
          <CheckboxInput
            label="123"
            name="numbers"
            inputData={passwordFiels}
            setInputData={setPasswordFields}
          />

          <CheckboxInput
            label="$#&"
            name="specialChars"
            inputData={passwordFiels}
            setInputData={setPasswordFields}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneratePasswordComponent;
