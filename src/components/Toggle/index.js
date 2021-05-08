import React from "react";

const Toggle = ({ state, onChangeToggle }) => {
  return (
    <div
      className="inline-flex items-center cursor-pointer"
      onClick={() => {
        onChangeToggle(!state);
      }}
    >
      <span className="relative">
        <span
          className={`block w-10 h-6 bg-gray-400 rounded-full shadow-inner ${
            state ? "bg-blue-500" : "bg-gray-400"
          }`}
        ></span>
        <span
          className={`absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-white ${
            state ? "transform translate-x-full" : null
          }`}
        >
          <input
            id="unchecked"
            type="checkbox"
            className="absolute opacity-0 w-0 h-0"
          />
        </span>
      </span>
    </div>
  );
};

export default Toggle;
