import "./UserListing.css";

export const UserListing = ({ users }) => {
  return (
    <>
      <div className="user-listing-container">
        {users.length === 0 ? (
          <p className="empty-list">No users to display</p>
        ) : (
          <ul className="user-list-parent">
            {users.map(({ profileImg, firstName, lastName }) => (
              <div className="user-list-item">
                <img src={profileImg} alt={firstName} />
                <span>{firstName + " " + lastName}</span>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}