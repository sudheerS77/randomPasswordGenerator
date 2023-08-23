import React, { useState } from "react";
import PasswordList from "../components/passwordList.component";
import GeneratePasswordComponent from "../components/generatePassword.component";

const HomePage = () => {
  const [generatedPasswords, setGeneratedPasswords] = useState([]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-[#071d2b] text-white px-5 md:px-20">
        <div className="flex flex-col items-center my-10 space-y-2">
          <h1 className="text-xl md:text-4xl font-bold">
            Create strong passwords with Password Generator
          </h1>
          <p className="text-md font-semibold text-[#ff7900]">
            Create strong and secure passwords to keep your account safe online.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-[fit-content] px-0 md:px-10 lg:px-0 items-start justify-center gap-10 ">
          <GeneratePasswordComponent
            generatedPasswords={generatedPasswords}
            setGeneratedPasswords={setGeneratedPasswords}
          />
          <PasswordList passwords={generatedPasswords} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
