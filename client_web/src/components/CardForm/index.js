import React from "react";

import { Formik, Form, Field, FieldArray, ErrorMessage, insert } from "formik";

const CardForm = ({ onSubmit }) => {
  const initialPickValues = {
    pickTitle: "",
    url: "",
    pickComments: "",
    nsfw: false,
  };

  const initialValues = {
    title: "",
    cardComments: "",
    picks: [initialPickValues],
  };

  const hanadleSortUp = () => {};

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <label className="font-normal">
            Post Title <Field name="title" className="w-full" />
          </label>

          <label className="font-normal">
            Post Comments{" "}
            <Field
              name="cardComments"
              component="textarea"
              className="w-full"
            />
          </label>
          <hr className="my-4" />
          <h4 className="font-normal">Picks</h4>
          <FieldArray name="picks">
            {({ move, remove, push }) => (
              <div>
                {values.picks.length > 0 &&
                  values.picks.map((pick, index) => (
                    <div
                      className="border border-gray-300 rounded-md p-4 my-2"
                      key={index}
                    >
                      <label className="font-normal">
                        Title{" "}
                        <Field
                          className="w-full"
                          name={`picks.${index}.pickTitle`}
                        />
                      </label>
                      <label className="font-normal">
                        URL{" "}
                        <Field
                          className="w-full"
                          type="url"
                          name={`picks.${index}.url`}
                        />
                      </label>{" "}
                      <label className="font-normal">
                        Comments
                        <Field
                          className="w-full"
                          component="textarea"
                          name={`picks.${index}.pickComments`}
                        />
                      </label>
                      <div className="flex justify-between">
                        <label className="font-normal">
                          NSFW{" "}
                          <Field type="checkbox" name={`picks.${index}.nsfw`} />
                        </label>
                        <div>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => move(index, index - 1)}
                              className="mx-2"
                            >
                              ↑
                            </button>
                          )}
                          {values.picks.length - 1 !== index && (
                            <button
                              type="button"
                              onClick={() => move(index, index + 1)}
                              className="mx-2"
                            >
                              ↓
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="mx-2 text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                {values.picks.length < 5 ? (
                  <div className="bg-blue-400 text-white rounded-md w-full my-4 p-1 text-center">
                    <button
                      type="button"
                      onClick={() => push(initialPickValues)}
                    >
                      {`Add Pick ${values.picks.length + 1} of 5`}
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-300 text-white rounded-md w-full my-4 p-1 text-center">
                    <small className="text-white">Total 5 picks created</small>
                  </div>
                )}
              </div>
            )}
          </FieldArray>
          <div className="flex justify-end">
            <button
              type="submit"
              className=" border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white p-2 m-1 rounded-md"
            >
              Post Picks
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CardForm;
