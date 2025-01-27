import React, { useState, useCallback, useEffect, useRef } from "react";
import { Copy } from "lucide-react";
const PasswordGenerator = () => {
  const [length, setLength] = useState(8); // for changing the length
  const [numAllowed, setNumAllowed] = useState(false); // for enhancing the password with numbers
  const [charAllowed, setCharAllowed] = useState(false); // for enhancing the password with special characters
  const [password, setPassword] = useState(""); // for storing the generated password

  // useRef hook
  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    alphabets = numAllowed ? alphabets + "1234567890" : alphabets;
    alphabets = charAllowed
      ? alphabets + "!@#$%^&*()_+{}[]|:;<>,./?~"
      : alphabets;
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * alphabets.length + 1);
      pass += alphabets.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const getStrengthColor = () => {
    if (length > 14) return "bg-green-500";
    if (length > 8) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-80 md:w-100 mx-auto mt-10 p-10 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Password Generator</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          readOnly
          className="w-full p-2 border rounded font-mono"
          value={password}
          ref={passRef}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-gray-200 cursor-pointer"
          onClick={copyPasswordToClipboard}
        >
          <Copy />
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Password Length: {length}
          <input
            type="range"
            min="6"
            max="24"
            className="w-full text-white accent-white"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 accent-white"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          Include Special Characters
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 accent-white"
            defaultChecked={numAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          Include Numbers
        </label>
      </div>
      <div className="mb-4 mt-3">
        <p className="mb-3">Password Strength: </p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getStrengthColor()} transition-all duration-300 ease-in-out`}
            style={{ width: `${(length / 24) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
