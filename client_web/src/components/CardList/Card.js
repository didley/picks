import React from "react";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { getEditingId, getCardFormIsLoading } from "reducers/selectors";
import CardForm from "components/CardForm";
import PickList from "../PickList";

class Card extends React.Component {
  render() {
    const {
      card,
      editingId,
      setEditable,
      clearEditable,
      isLoading,
      deleteCard,
      updateCard,
    } = this.props;
    const { title, createdBy, picksType, picks, comments, _id } = card;

    if (editingId === _id) {
      return (
        <div className="rounded-lg p-4 m-2 border-2 border-blue-500 text-xs ">
          <div className="flex justify-between">
            <h5 className="font-bold">Editing Pick</h5>
            <button onClick={clearEditable}>X</button>
          </div>
          <CardForm
            editingCard={card}
            onDelete={() => deleteCard(_id)}
            onSubmit={(value) => updateCard(value)}
            isLoading={isLoading}
          />
        </div>
      );
    }

    return (
      <div className="relative border rounded-lg p-3 m-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <button
          className="absolute top-0 right-0 mr-3 md:mr-5 mt-4 md:mt-3 text-sm text-gray-500"
          onClick={() => setEditable(_id)}
        >
          Edit
        </button>
        <div className="mb-3">
          <small className="text-gray-500">UserName Picks #4</small>
          <br />
          <small>{comments}</small>
        </div>
        <hr className="md:hidden" />

        <PickList picks={picks} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    editingId: getEditingId(state),
    isLoading: getCardFormIsLoading(state),
  }),
  {
    setEditable: card.form.edit.set,
    clearEditable: card.form.edit.clear,
    deleteCard: card.delete.request,
    updateCard: card.update.request,
  }
)(Card);