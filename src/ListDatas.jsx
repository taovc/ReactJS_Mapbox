import React, { useState } from "react";
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
  const [AllUsers, setAllUsers] = useState(null);

  if (AllUsers == null) {
    console.log('yes')
    try {
      axios.get(
        "http://localhost:4000/api",
      ).then(function (reponse) {
        setAllUsers(reponse.data)
        console.log(reponse.data)
      }).catch(function (err) {
        console.log(err)
      });
    } catch (err) {
      console.log(err);
    }
    console.log('hh', AllUsers)
  }

  const users = [
    {
      name: "Jay",
      description: "Bilzerian",
      type: "entreprise",
      lng: 0,
      lat: 1,
    },
    {
      id: 2,
      name: "Jay2",
      description: "Bilzerian2",
      type: "entreprise2",
      lng: 0,
      lat: 1,
    },
    {
      id: 3,
      name: "Jay3",
      description: "Bilzerian3",
      type: "entreprise3",
      lng: 0,
      lat: 1,
    }
  ];
  const handleClick = (user) => {
    setShowInfo(!showInfo);
    setUserInfo(user);
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
      {AllUsers.map((user, index) => {
        return (
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
            key={index}
          >
            <div key={index}>{user.name}</div>
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
              />
            )}
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
