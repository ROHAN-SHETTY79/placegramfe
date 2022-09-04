import React from "react";
import { UserList } from "../../components";

const Users = () => {
  const users = [
    {
      id:"u1",
      name: "Rohan Shetty",
      image: "https://images.unsplash.com/photo-1652615959329-13d913e3c30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
      placeCount: 9,
    }
  ];
  console.log("user list ", UserList)
  return (
    <div>
      <UserList users={users} />
    </div>
  );
};

export default Users;
