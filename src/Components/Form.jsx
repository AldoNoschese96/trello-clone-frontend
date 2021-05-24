import React, { useState, useEffect } from "react";

const Form = ({
  inputPlaceholder = "Scrivi Qui",
  inputType = "text",
  textarea = false,
  onClose,
  onSubmit,
  buttonText = "Add",
  paddingX = 2,
  defaultValue = null,
  enableDeleteCard = false,
  onDeleteCard,
}) => {
  const [formState, setFormState] = useState(null);

  const onSubmitHandler = (e) => {
    if (formState && formState !== "") {
      onSubmit(formState, e);
    }
  };

  return (
    <div
      className={`flex flex-col px-${paddingX} py-3 bg-lightGrey rounded-sm`}
    >
      <div>
        {textarea ? (
          <textarea
            onChange={(e) => setFormState(e.target.value)}
            rows="3"
            className="py-2 px-1 outline-none rounded-sm w-full shadow-md"
            placeholder={inputPlaceholder}
            defaultValue={defaultValue}
          ></textarea>
        ) : (
          <input
            onChange={(e) => setFormState(e.target.value)}
            type={inputType}
            className="py-2 px-1 outline-none rounded-sm w-full"
            placeholder={inputPlaceholder}
            defaultValue={defaultValue}
          />
        )}
      </div>
      {enableDeleteCard ? (
        <div className="font-bold text-xs flex rounded-lg justify-end py-1 mb-1 text-red-500">
          <svg
            onClick={(e) => onDeleteCard(e)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      ) : null}
      <div className="flex items-start justify-start rounded-sm mt-4">
        <button
          onClick={(e) => onSubmitHandler(e)}
          className="px-3 py-1 text-white bg-green-500 outline-none mr-3 focus:outline-none"
        >
          {buttonText}
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default Form;
