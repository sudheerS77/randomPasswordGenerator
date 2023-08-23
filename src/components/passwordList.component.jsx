import React, { useEffect, useState } from "react";

const PasswordList = ({ passwords }) => {
  const [copiedStatus, setCopiedStatus] = useState({
    copied: false,
    index: null,
  });
  const copyPass = (data, index) => {
    setCopiedStatus({
      copied: true,
      index: index,
    });
    const textField = document.createElement("textarea");
    textField.innerText = data;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  useEffect(() => {
    setTimeout(() => {
      setCopiedStatus({
        copied: false,
        index: null,
      });
    }, [2000]);
  }, [copiedStatus.copied]);

  return (
    <div className="w-full md:[w-10%] lg:w-[20%]">
      <h2 className="text-lg font-semibold border-b">Generated Passwords</h2>
      <p className="text-xs">(click the password to copy)</p>
      <ul className="my-4 list-decimal space-y-2">
        {passwords?.map((password, index) => (
          <div className="relative" key={index}>
            <li
              onClick={() => copyPass(password, index)}
              className="cursor-pointer"
            >
              {password}
            </li>
            {copiedStatus.index === index && copiedStatus.copied && (
              <div className="absolute top-0 -right-[10px] bg-red-500 p-0.5 rounded text-xs font-bold">
                copied
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PasswordList;
