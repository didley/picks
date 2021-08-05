import React from "react";

import { Formik, Form, Field, FieldArray, ErrorMessage, insert } from "formik";

const EditProfileForm = ({
  initialValues,
  onSubmit,
  handleSetProfileEditHidden,
  isLoading,
}) => {
  const { name = "", bio = "", location = "" } = initialValues;
  const controlledInitialValues = { name, bio, location };

  return (
    <div className="flex justify-center w-full">
      <div className="relative mx-2 w-full max-w-xl p-8 rounded-lg border-2 border-gray-500">
        <div className="flex justify-between mb-2">
          <h5 className="font-bold">Editing Profile</h5>
          <button onClick={handleSetProfileEditHidden}>Cancel</button>
        </div>
        <Formik initialValues={controlledInitialValues} onSubmit={onSubmit}>
          {({ dirty }) => (
            <Form>
              <label>
                Name:
                <Field name="name" className="w-full" />
              </label>

              <label>
                Bio:
                <Field name="bio" component="textarea" className="w-full" />
              </label>

              <label>
                Location:
                <Field name="location" className="w-full" />
              </label>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!dirty}
                  className={`border-2 p-2 m-1 rounded-md ${
                    dirty
                      ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                      : "border-gray-300 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>{" "}
    </div>
  );
};

export default EditProfileForm;
