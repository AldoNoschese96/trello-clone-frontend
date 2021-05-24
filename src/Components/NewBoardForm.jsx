import React from "react";

//Final Form
import { Form, Field } from "react-final-form";

const NewBoardForm = ({ onSubmit }) => {
  const validator = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Campo Obbligatorio";
    }
    return errors;
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={validator}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="w-full">
              <Field id="title" type="text" name="title">
                {({ input, meta }) => (
                  <div className="w-full text-left">
                    <input
                      className="w-full py-1 border-b-2 bg-transparent border-darkBlue outline-none "
                      placeholder="Enter A Title"
                      {...input}
                    />
                    <span className="text-red-400 text-sm font-semibold mt-4">
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </span>
                  </div>
                )}
              </Field>
            </div>
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="py-2 px-3 bg-green-400 font-bold rounded-2xl text-white text-sm outline-none focus:outline-none"
                disabled={submitting || pristine}
              >
                Create New Board
              </button>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default NewBoardForm;
