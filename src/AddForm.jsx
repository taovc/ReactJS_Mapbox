import { useState } from "react";
import axios from "axios";

const AddForm = ({ setOpen, lat, lng, setLat, setLng, DefaultName, DefaultDescription = "", DefaultType = "Entreprise" }) => {
  const types = ["Entreprise", "Particulier", "Collectivité"];
  const [name, setName] = useState(DefaultName);
  const [description, setDesc] = useState(DefaultDescription);
  const [type, setType] = useState(DefaultType);

  const handleCreate = async () => {
    try {
      const newProduct = {
        name,
        description,
        type,
        lat,
        lng
      };
      await axios.post(
        "http://localhost:4000/api/datas",
        newProduct
      ).then(function (reponse) {
        console.log(reponse)
      }).catch(function (err) {
        console.log(err)
      });
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="wrapper">
        <span onClick={() => setOpen(false)} className="close">
          X
        </span>
        <h1>Ajouter</h1>
        <div className="item">
          <label className="label">Nom</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setName(e.target.value)}
            required={true}
            value={name}
            disabled={DefaultName}
          />
        </div>

        <div className="item">
          <label className="label">Latitude</label>
          <input
            type="number"
            className="input"
            onChange={(e) => setLat(e.target.value)}
            required={true}
            value={lat}
            disabled={DefaultName}
          />
        </div>

        <div className="item">
          <label className="label">Longitude</label>
          <input
            type="number"
            className="input"
            onChange={(e) => setLng(e.target.value)}
            required={true}
            value={lng}
            disabled={DefaultName}
          />
        </div>

        <div className="item">
          <label className="label">Description</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            value={description}
            disabled={DefaultName}
          />
        </div>

        <div className="item">
          <label className="label">
            Type (Entreprise, Particulier, Collectivité)
          </label>
          <select name="type" disabled={DefaultName} onChange={(e) => setType(e.target.value)}>
            {types.map((type, i) => (
              <option key={i} value={types[i]}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button className="addButton" onClick={handleCreate}>
          Créer
        </button>
      </div>
    </div>
  );
};

export default AddForm;
