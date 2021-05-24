import React from "react";

//Redux
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../store/slices/authSlice";

//Router

const Header = ({ isLoggedIn }) => {
  const dispatch = useDispatch();
  const historyLocation = useHistory();

  const logOutHandler = (e) => {
    dispatch(logOut());
    if (isLoggedIn === false) {
      historyLocation.push("/");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-center justify-center py-3 bg-darkBlue text-center">
        <p className="text-white mb-5 sm:mb-0 text-2xl ml-5 sm:ml-10 md:ml-0 font-bold">
          React Trello
        </p>
        {isLoggedIn ? (
          <div className="md:absolute right-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={logOutHandler}
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Header;
