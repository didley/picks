import React from "react";
import EditingPicks from "./EditingPicks";

import { Formik, Form, Field } from "formik";

const CardForm = ({ onSubmit, editingCard, onDelete, isLoading }) => {
  const initialValues = editingCard
    ? { comments: editingCard.comments }
    : { comments: "" };

  const editingView = editingCard ? true : false;

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {() => (
        <Form>
          <div className="grid md:grid-cols-2 gap-2">
            <label className="font-normal">
              Post Comments
              <Field name="comments" component="textarea" className="w-full" />
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
  );
};

export default CardForm;
