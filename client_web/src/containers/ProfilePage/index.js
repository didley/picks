import React from "react";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { profile } from "actions/profileActions";
import {
  getProfile,
  selectUser,
  selectCardQueryIsLoading,
} from "reducers/selectors";
import ProfileHeader from "components/ProfileHeader";
import CardList from "components/CardList";
import CreateCardSection from "components/CreateCardSection";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profileEditFormVisible: false };
  }

  componentDidMount() {
    const paramUn = this.props.match?.params?.username;
    const authedUn = this.props.user?.username;

    let username = paramUn ? paramUn : authedUn;

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
    const { user, profile, cardsLoading } = this.props;
    const { profileHeader, profileCards } = profile;
    const isOwnProfile = this.props.match?.params?.username === user?.username;

    return (
      <div className="max-w-6xl m-auto mt-2">
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
          isLoading={cardsLoading}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  user: selectUser(state),
  profile: getProfile(state),
  cardsLoading: selectCardQueryIsLoading(state),
});

export default connect(mapState, {
  getProfileHeader: profile.getSummary.request,
  updateProfile: profile.updateSummary.request,
  getAllCards: card.getAll.request,
})(ProfilePage);
