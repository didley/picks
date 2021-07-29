const ProfileHeader = ({ profileHeader, ownProfile }) => {
  const { name, username, location, bio, displayPicture } = profileHeader.data;

  if (profileHeader.status === "loading")
    return <small>Loading profile...</small>;

  return (
    <div className="m-2 md:m-auto max-w-md p-8 rounded-lg border border-gray-500">
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
