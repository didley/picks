import React from "react";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { profile } from "actions/profileActions";
import {
  getProfile,
  getCardFormIsLoading,
  selectUser,
  selectPicks,
} from "reducers/selectors";
import ProfileHeader from "components/ProfileHeader";
import CardList from "components/CardList";
import CardForm from "components/CardForm";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profileEditFormVisible: false };
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.getProfileHeader(username);
    this.props.getAllCards(username);
  }

  handlePostSubmit = (card) => {
    card.picksType = "topic"; // replace when weekly/topic types implements
    this.props.createCard(card);
  };

  handleProfileUpdateSubmit = (values) =>
    this.props.updateProfile(values, this.handleSetProfileEditHidden);

  handleSetProfileEditVisible = () =>
    this.setState({ profileEditFormVisible: true });

  handleSetProfileEditHidden = () =>
    this.setState({ profileEditFormVisible: false });

  render() {
    const { profileHeader, profileCards } = this.props.profile;

    const {
      cards,
      form: { createFromVisible },
    } = profileCards;

    const {
      showCreateForm,
      hideCreateForm,
      setEditable,
      isLoading,
      user,
      picks,
    } = this.props;

    const isOwnProfile = this.props.match?.params?.username === user.username;

    return (
      <div className="max-w-6xl m-auto">
        <ProfileHeader
          profileHeader={profileHeader}
          loggedInUsername={user?.username}
          handleProfileUpdateSubmit={this.handleProfileUpdateSubmit}
          profileEditFormVisible={this.state.profileEditFormVisible}
          handleSetProfileEditVisible={this.handleSetProfileEditVisible}
          handleSetProfileEditHidden={this.handleSetProfileEditHidden}
        />
        <div className="max-w-6xl m-auto">
          {isOwnProfile &&
            (createFromVisible ? (
              <div className="rounded-lg p-4 m-2 border-2 border-blue-500 text-xs">
                <div className="flex justify-between">
                  <h5 className="font-bold">Create a picks post</h5>
                  <button onClick={hideCreateForm}>Cancel</button>
                </div>
                <CardForm
                  onSubmit={this.handlePostSubmit}
                  isLoading={isLoading}
                  // picks={picks}
                />
              </div>
            ) : (
              <button
                aria-label="create-post"
                onClick={showCreateForm}
                className="m-auto my-2 rounded-lg bg-red-400 flex py-4 px-8 text-white text-xs"
              >
                + New Picks
              </button>
            ))}
        </div>
        {profileCards.cardStatus === "loading" ? (
          <small>Loading cards...</small>
        ) : (
          <CardList
            cards={cards}
            handleEditClick={setEditable}
            loggedInUsername={user?.username}
            // picks={picks}
          />
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  profile: getProfile(state),
  isLoading: getCardFormIsLoading(state),
  user: selectUser(state),
  picks: selectPicks(state),
});

export default connect(mapState, {
  getProfileHeader: profile.getSummary.request,
  updateProfile: profile.updateSummary.request,
  getAllCards: card.getAll.request,
  createCard: card.create.request,
  showCreateForm: card.form.create.show,
  hideCreateForm: card.form.create.hide,
  setEditable: card.form.edit.set,
  clearEditable: card.form.edit.clear,
})(ProfilePage);
