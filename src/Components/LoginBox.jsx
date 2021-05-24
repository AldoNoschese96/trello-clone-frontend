import React, { useState } from "react";

//Final Form
import { Form, Field } from "react-final-form";

const LoginBox = ({ onSubmit, toSignUp, hasError }) => {
  const validator = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validator}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <div className="text-center px-3 py-4">
            <h2 className="text-2xl text-white font-bold mb-10 tracking-wider">
              Login
            </h2>
            <div className="flex flex-col items-start">
              <label
                className="my-2 text-white font-bold
              "
                htmlFor="email"
              >
                Email
              </label>
              <Field id="email" type="text" name="email">
                {({ input, meta }) => (
                  <div className="w-full text-left">
                    <input
                      className="w-full py-1 border-b-2 bg-transparent text-white border-white outline-none px-2"
                      {...input}
                    />
                    <span className="text-red-400 text-sm font-semibold">
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </span>
                  </div>
                )}
              </Field>
            </div>
            <div className="flex flex-col items-start">
              <label
                className="my-2 text-white mt-4 font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <Field id="password" type="password" name="password">
                {({ input, meta }) => (
                  <div className="w-full text-left">
                    <input
                      className={`w-full py-1 border-b-2 bg-transparent text-white border-white outline-none px-2`}
                      {...input}
                    />
                    <span className="text-red-400 text-sm font-semibold">
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </span>
                  </div>
                )}
              </Field>
            </div>
            <div className="mt-7 mb-1">
              <button
                type="submit"
                className="px-3 py-2 bg-green-400 rounded-2xl font-bold text-white w-full outline-none focus:outline-none"
                disabled={submitting || pristine}
              >
                Sign in
              </button>
            </div>
            <div className="mt-5 mb-1 text-left">
              <p className="text-white">
                Not account yet ?{" "}
                <span onClick={toSignUp} className="underline cursor-pointer">
                  Sign up
                </span>
              </p>
            </div>
            {hasError && (
              <div className="mt-4 mb-1 py-2 px-3 bg-red-400 border-2 rounded-md border-transparent text-white text-left">
                <p>{hasError}</p>
              </div>
            )}
          </div>
        </form>
      )}
    />
  );
};

export default LoginBox;
