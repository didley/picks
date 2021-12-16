import EditProfileForm from "./EditProfileForm";
import ShareBtn from "components/ShareBtn";
import { createLink } from "utils/history";

const ProfileHeader = ({
  profileHeader,
  loggedInUsername,
  handleProfileUpdateSubmit,
  profileEditFormVisible,
  handleSetProfileEditVisible,
  handleSetProfileEditHidden,
}) => {
  const { name, username, location, bio } = profileHeader.data;
  const isLoading = profileHeader.status === "loading";
  const isOwnProfile = loggedInUsername === username;

  if (profileEditFormVisible)
    return (
      <EditProfileForm
        initialValues={profileHeader.data}
        onSubmit={handleProfileUpdateSubmit}
        handleSetProfileEditHidden={handleSetProfileEditHidden}
        isLoading={isLoading}
      />
    );

  if (isLoading)
    return (
      <small>
        Loading profile...
        <br />
      </small>
    );

  return (
    <div className="flex justify-center w-full mb-1">
      <div
        aria-label="profile"
        className="relative mx-2 w-full max-w-xl p-8 rounded-lg border border-gray-200 bg-white"
      >
        <div className="absolute top-0 right-0 mr-4 md:mr-6 mt-8">
          <ShareBtn
            shareData={{
              url: createLink(`/profile/${username}`),
              title: `${username} Picks profile`,
            }}
          >
            <small className="text-purple-400 font-bold hover:underline">
              share profile
            </small>
          </ShareBtn>
        </div>
        {isOwnProfile && (
          <div className="absolute bottom-0 right-0 mr-3 md:mr-5 mb-4">
            <button
              className="text-sm text-gray-500 border border-gray-400 rounded-full p-2 hover:border-purple-500 hover:text-purple-500"
              onClick={handleSetProfileEditVisible}
            >
              edit profile
            </button>
          </div>
        )}
        {name ? (
          <>
            <h4
              title="Profile name"
              aria-label="profile-name"
              className="font-black"
            >
              {name}
            </h4>
            <p
              title="Profile username"
              aria-label="profile-username"
              className="text-gray-500"
            >
              {username}
            </p>
          </>
        ) : (
          <h4
            title="Profile username"
            aria-label="profile-username"
            className="font-black"
          >
            {username}
          </h4>
        )}
        {bio && (
          <p title="Profile bio" aria-label="profile-bio" className="pt-4">
            {bio}
          </p>
        )}
        {location && (
          <small
            title="Profile location"
            aria-label="profile-location"
            className="text-gray-500"
          >
            <span role="img" aria-label="compass" className="mr-2">
              🧭
            </span>
            {location}
          </small>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
