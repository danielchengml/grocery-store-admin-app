import React, { useState } from "react";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const uploadImage = async () => {
    // get presignedUrl
    console.log("selectedImage", selectedImage)
    // const settings = {
    //   method: 'PUT',
    //   headers: {
    //     'headers': {
    //       'Content-Type': 'image/png'
    //     },
    //     formData: {
    //       '': {
    //         'value': readFileSync.createReadStream('/Users/dlean/Desktop/screenshots/Screen Shot 2023-10-11 at 9.39.07 AM.png'),
    //         'options': {
    //           'filename': 'Screen Shot 2023-10-11 at 9.39.07 AM.png',
    //           'contentType': null
    //         }
    //       }
    //     }
    //   }
    // };
    const formData = new FormData();
    formData.append('image', selectedImage);
    console.log("formData", formData)
    // const res = await fetch('/api/image/upload', {
    //   method: 'PUT',
    //   formData: formData
    // });
    // const data = await res.json()
    // console.log("data$$$", data)
  }

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
          <button onClick={() => uploadImage(selectedImage)}>Upload</button>
        </div>
      )}

      <br />
      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;