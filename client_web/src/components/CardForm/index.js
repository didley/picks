import React from "react";
import EditingPicks from "./EditingPicks";

import { Formik, Form, Field } from "formik";

const CardForm = ({
  onSubmit,
  editingCard,
  onDelete,
  isLoading,
  onCancelClick,
}) => {
  const initialValues = editingCard
    ? { comments: editingCard.comments }
    : { comments: "" };

  const editingView = editingCard ? true : false;

  return (
    <div className="rounded-lg p-4 m-2 border-2 border-blue-500 text-xs">
      <div className="flex justify-between">
        <h5 className="font-bold">
          {editingView ? "Editing Post" : "Create a Post"}
        </h5>
        <button onClick={onCancelClick}>Cancel</button>
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <div className="grid md:grid-cols-2 gap-2">
              <label className="font-normal">
                Post Comments
                <Field
                  name="comments"
                  component="textarea"
                  className="w-full"
                />
              </label>
            </div>

            <hr className="my-4" />
            <h6 className="font-normal">Picks</h6>
            <EditingPicks />

            <div className="flex justify-end">
              {isLoading ? (
                <small className="text-gray-400 p-2 m-1">Loading...</small>
              ) : editingView ? (
                <>
                  <button
                    type="button"
                    onClick={onDelete}
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white p-2 m-1 rounded-md"
                  >
                    Delete Post
                  </button>

                  <button
                    type="submit"
                    className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white p-2 m-1 rounded-md"
                  >
                    Update Post
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white p-2 m-1 rounded-md"
                >
                  Post Picks
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CardForm;
