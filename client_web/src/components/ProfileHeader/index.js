import EditProfileForm from "./EditProfileForm";

const ProfileHeader = ({
  profileHeader,
  loggedInUsername,
  handleProfileUpdateSubmit,
  profileEditFormVisible,
  handleSetProfileEditVisible,
  handleSetProfileEditHidden,
}) => {
  const { name, username, location, bio, displayPicture } = profileHeader.data;
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

  if (isLoading) return <small>Loading profile...</small>;

  return (
    <div className="flex justify-center w-full">
      <div
        aria-label="profile"
        className="relative mx-2 w-full max-w-xl p-8 rounded-lg border border-gray-500"
      >
        {isOwnProfile && (
          <button
            className="absolute top-0 right-0 mr-3 md:mr-5 mt-6 text-sm text-gray-500 border border-gray-400 rounded-full p-2 hover:border-blue-500 hover:text-blue-500"
            onClick={handleSetProfileEditVisible}
          >
            Edit Profile
          </button>
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
