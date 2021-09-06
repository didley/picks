import React from "react";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { profile } from "actions/profileActions";
import { getProfile, selectUser } from "reducers/selectors";
import ProfileHeader from "components/ProfileHeader";
import CardList from "components/CardList";
import CreateCardSection from "components/CreateCardSection";

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

  handleProfileUpdateSubmit = (values) =>
    this.props.updateProfile(values, this.handleSetProfileEditHidden);

  handleSetProfileEditVisible = () =>
    this.setState({ profileEditFormVisible: true });

  handleSetProfileEditHidden = () =>
    this.setState({ profileEditFormVisible: false });

  render() {
    const { profileHeader, profileCards } = this.props.profile;
    const { user } = this.props;
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

        {isOwnProfile && <CreateCardSection />}

        <CardList
          cards={profileCards.cards}
          loggedInUsername={user?.username}
          isLoading={profileCards.cardStatus === "loading"}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  profile: getProfile(state),
  user: selectUser(state),
});

export default connect(mapState, {
  getProfileHeader: profile.getSummary.request,
  updateProfile: profile.updateSummary.request,
  getAllCards: card.getAll.request,
})(ProfilePage);
