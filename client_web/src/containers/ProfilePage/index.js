import React from "react";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { getProfile } from "reducers/selectors";
import PicksCards from "components/PicksCards";

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.getAllCards();
  }

  render() {
    const { cards, status, error } = this.props.profile;

    return (
      <div>
        <PicksCards cards={cards} />
      </div>
    );
  }
}

const mapState = (state) => ({
  profile: getProfile(state),
});

export default connect(mapState, { getAllCards: card.getAll.request })(
  ProfilePage
);
