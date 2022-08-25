import React from "react";

const AddButton = ({ setOpen }) => {
  return (
    <div onClick={() => setOpen(true)} className="mainAddButton">
      Ajouter
    </div>
  );
};

const ListDatas = ({ setOpen }) => {
  return <AddButton setOpen={setOpen} />;
};

export default ListDatas;
