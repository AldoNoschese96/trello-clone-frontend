import React, { useState, useEffect } from "react";

//Components
import LoginBox from "../Components/LoginBox";
import SignUpBox from "../Components/SignUpBox";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../store/slices/authSlice";
import { loginHandler, signUpHandler } from "../store/actions/authSliceActions";

//Router
import { useHistory, withRouter } from "react-router-dom";

const Login = () => {
  const historyRouter = useHistory();
  const dispatch = useDispatch();

  const [showSignUp, setShowSignUp] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  const onSubmitLoginHandler = async (formValues, handler = false) => {
    try {
      if (handler) {
        return dispatch(loginHandler(formValues));
      }
      dispatch(signUpHandler(formValues));
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (isLoggedIn && user._id) {
      historyRouter.push(`/boards/${user._id}`);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(clearError());
  }, [showSignUp]);

  return (
    <div className="grid bg-lightBlue place-items-center h-screen w-full">
      <div className="w-2/3 md:w-1/4 grid grid-cols-1 ">
        {!showSignUp ? (
          <LoginBox
            showSignUp={showSignUp}
            onSubmit={(values) => onSubmitLoginHandler(values, true)}
            toSignUp={() => setShowSignUp(true)}
            hasError={error}
            isLoading={isLoading}
          />
        ) : (
          <SignUpBox
            showSignUp={showSignUp}
            onSubmit={(values) => onSubmitLoginHandler(values, false)}
            toSignIn={() => setShowSignUp(false)}
            hasError={error}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(Login);
