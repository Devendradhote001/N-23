import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from "axios";

const App = () => {
  const [togggle, setTogggle] = useState(true);
  const [image, setImage] = useState(null);
  console.log(image);

  let formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.append("image", image);
      let res = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log("error in upload->", error);
    }
  };

  return (
    <div>
      {/* {!togggle ? (
        <Register setTogggle={setTogggle} />
      ) : (
        <Login setTogggle={setTogggle} />
      )} */}

      <form onSubmit={handleSubmit} action="">
        <input type="file" onChange={(e) => setImage(e.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
