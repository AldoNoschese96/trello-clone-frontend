import React, { useState } from "react";

const AddListButton = ({ onClick }) => {
  const [isShowingAddItemForm, setIsShowingAddItemForm] = useState(false);

  return (
    <div
      onClick={onClick}
      className="flex py-3 px-4 cursor-pointer bg-white opacity-30 rounded-md w-56 min-w-full	"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
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
      <span className="text-black">Add a new list</span>
    </div>
  );
};

export default AddListButton;
