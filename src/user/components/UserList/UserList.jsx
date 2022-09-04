import React from "react";
import UserItem from "../UserItem/UserItem";
import "./UseList.css";

const UserList = ({ users = [] }) => {
  return (
    <div>
      {users.length !== 0 ? (
        <ul className="users-list">
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
      ) : (
        <div className="center">
          <h1>no users found</h1>
        </div>
      )}
    </div>
  );
};

export default UserList;
