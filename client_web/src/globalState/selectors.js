export const getExamplesState = (store) => store.examples;

export const getExamplesList = (store) =>
  getExamplesState(store) ? getExamplesState(store) : [];

export const getExampleById = (store, id) =>
  getExamplesState(store)
    ? getExamplesState(store).examples.filer((example) => example.id === id)
    : {};
