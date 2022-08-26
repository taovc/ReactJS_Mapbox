import React, { useState, useEffect } from "react";
import AddForm from "./AddForm.jsx";
import axios from "axios";
import "./ListUser.css";
import "./AddForm.css";

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
    <div class="listing">
      <table class="table-style">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td
                  style={{
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
                </td>
                <td>
                  <button
                    key={`deletebtn_${index}`}
                    className="delButton"
                    onClick={() => handleDelete(user._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const CreateUser = ({ setOpen }) => {
  return <AddButton setOpen={setOpen} />;
};

export { ListUsers, CreateUser };
