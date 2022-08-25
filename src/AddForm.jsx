import { useState } from "react";
import "./AddForm.css";
import axios from "axios";

const AddForm = ({ setOpen, lat, lng, setLat, setLng }) => {
  const types = ["Entreprise", "Particulier", "Collectivité"];
  const [name, setName] = useState(null);
  const [description, setDesc] = useState("");
  const [type, setType] = useState(types[0]);

  const handleCreate = async () => {
    try {
      const newProduct = {
        name,
        description,
        type,
        lat,
        lng
      };
      const res = await axios.post(
        "http://localhost:3000/api/datas",
        newProduct
      );
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
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
          />
        </div>

        <div className="item">
          <label className="label">Description</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="item">
          <label className="label">
            Type (Entreprise, Particulier, Collectivité)
          </label>
          <select name="type" onChange={(e) => setType(e.target.value)}>
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
