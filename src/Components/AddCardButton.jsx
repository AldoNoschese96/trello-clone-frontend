import React from "react";

const AddCardButton = ({ onClick }) => {
  return (
    <div onClick={onClick} className="flex items-start text-gray-400 pt-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <span className="ml-2 cursor-pointer">Add another Card</span>
    </div>
  );
};

export default AddCardButton;
