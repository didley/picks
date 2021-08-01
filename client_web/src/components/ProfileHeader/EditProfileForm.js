import React from "react";

import { Formik, Form, Field, FieldArray, ErrorMessage, insert } from "formik";

const EditProfileForm = ({
  initialValues,
  onSubmit,
  handleSetProfileEditHidden,
}) => {
  const { name = "", bio = "", location = "" } = initialValues;
  const controlledInitialValues = { name, bio, location };

  return (
    <div className="rounded-lg p-8 m-2 border-2 text-xs relative md:m-auto max-w-md border-gray-500">
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
                Update Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileForm;
