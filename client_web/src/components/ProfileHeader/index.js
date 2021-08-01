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

  const isOwnProfile = loggedInUsername === username;

  if (profileHeader.status === "loading")
    return <small>Loading profile...</small>;

  if (profileEditFormVisible)
    return (
      <EditProfileForm
        initialValues={profileHeader.data}
        onSubmit={handleProfileUpdateSubmit}
        handleSetProfileEditHidden={handleSetProfileEditHidden}
      />
    );

  return (
    <div className="m-2 relative md:m-auto max-w-md p-8 rounded-lg border border-gray-500">
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
          <h4 className="font-black">{name}</h4>{" "}
          <p className="text-gray-500">{username}</p>
        </>
      ) : (
        <h4 className="font-black">{username}</h4>
      )}
      {bio && <p className="pt-4">{bio}</p>}
      {location && (
        <small className="text-gray-500">
          <span role="img" aria-label="compass" className="mr-2">
            🧭
          </span>
          {location}
        </small>
      )}
    </div>
  );
};

export default ProfileHeader;
