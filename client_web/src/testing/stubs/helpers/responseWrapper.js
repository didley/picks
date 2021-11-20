import { v4 as uuid } from "uuid";

const singleStubWrapper = (
  stub = {},
  options = { props: {}, timestamps: false }
) => {
  const timestamps = {
    createdAt: "2021-07-26T11:42:31.892Z",
    updatedAt: "2021-07-26T11:42:31.892Z",
  };

  const includedTimestamps = options.timestamps ? timestamps : null;

  if (
    options.props &&
    (Array.isArray(options.props) || typeof options.props !== "object")
  ) {
    throw Error(
      `responseWrapper options.props must be an object:\nSupplied props: ${options.props}`
    );
  }

  return {
    ...stub,
    ...{ _id: uuid() },
    ...includedTimestamps,
    ...options.props,
  };
};

const multipleStubWrapper = (stub = [], options = {}) =>
  stub.map((item) => singleStubWrapper(item, options));

/**
 *
 * Returns a stub wrapped with server response properties
 * if stub is array each item will include response properties
 * only a unique _id property is added if no options are supplied
 *
 * @param {(object|array)} stub - stub to wrap with response properties
 * @param {object=} options
 * @param {object=} options.props - additional custom props to include
 * @param {boolean=} options.timestamps - set true to include createdAt/updatedAt, defaults to false
 */
export const responseWrapper = (stub, options = {}) =>
  Array.isArray(stub)
    ? multipleStubWrapper(stub, options)
    : singleStubWrapper(stub, options);
