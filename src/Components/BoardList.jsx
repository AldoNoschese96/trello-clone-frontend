import React from "react";

const BoardList = ({ items, onDelete, onSelect }) => {
  return (
    <div className="w-2/4">
      <div className="grid grid-cols-1">
        {items &&
          items.map((x) => {
            return (
              <div
                onClick={() => onSelect(x._id)}
                key={x._id}
                className="w-full px-3 py-2 shadow-2xl bg-green-100 border-2 my-2 border-green-300 rounded-md text-black cursor-pointer hover:bg-green-300"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{x.title}</span>
                  <svg
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(x._id);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BoardList;
