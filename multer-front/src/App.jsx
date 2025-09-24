import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [images, setImages] = useState(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  console.log(uploadedImg);

  const formData = new FormData();

  images?.map((elem) => {
    formData.append("image", elem);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        setUploadedImg(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log("error in uploading..", error);
    }
  };

  return (
    <div>
      <h1>Multer photos upload</h1>

      <form onSubmit={handleSubmit} action="" encType="multiple/form-data">
        <input
          type="file"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
        />
        <button type="submit">Upload</button>
      </form>

      <div>
        {uploadedImg
          ? uploadedImg.map((elem) => (
              <img src={`http://localhost:3000/${elem}`} width={200} alt="image here" />
            ))
          : "No images uploaded"}
      </div>
    </div>
  );
};

export default App;
