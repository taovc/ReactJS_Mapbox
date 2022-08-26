import React, { useState, useEffect } from "react";
import AddForm from "./AddForm.jsx";
import axios from "axios";

const AddButton = ({ setOpen }) => {
  return (
    <div onClick={() => setOpen(true)} className="mainAddButton">
      Ajouter
    </div>
  );
};

const ListUsers = ({ setShowInfo, showInfo, setLat, setLng }) => {
  const [userInfo, setUserInfo] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api");
        setAllUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!allUsers[0]) fetchData();
  });

  const handleClick = (user) => {
    setShowInfo(!showInfo);
    setUserInfo(user);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/${id}`);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100vh",
        margin: "40px",
      }}
    >
      {allUsers.map((user, index) => {
        return (
          <div key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: "200px",
                margin: "20px",
                backgroundColor: "lightblue",
                cursor: "pointer",
              }}
              onClick={() => {
                handleClick(user);
              }}
              key={`user_${index}`}
            >
              <div key={`username_${index}`}>{user.name}</div>
              {showInfo && (
                <AddForm
                  setOpen={setShowInfo}
                  lat={userInfo.lat}
                  lng={userInfo.lng}
                  setLat={setLat}
                  setLng={setLng}
                  DefaultName={userInfo.name}
                  DefaultDescription={userInfo.description}
                  DefaultType={userInfo.type}
                  key={`form_${index}`}
                />
              )}
            </div>
            <button
              key={`deletebtn_${index}`}
              className="delButton"
              onClick={() => handleDelete(user._id)}
            >
              Supprimer
            </button>
          </div>
        );
      })}
    </div>
  );
};

const CreateUser = ({ setOpen }) => {
  return <AddButton setOpen={setOpen} />;
};

const UserAction = {
  ListUsers,
  CreateUser,
};

export default UserAction;
