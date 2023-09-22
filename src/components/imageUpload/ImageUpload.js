import React, { useState } from "react";
import { storage, db, fb } from "../../firebase/FirebaseInit";
import "./ImageUpload.css";

function ImageUpload({ user }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image || !caption) {
      alert("Please select an image and enter a caption.");
      return;
    }

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(error);
        alert(`Upload failed: ${error.message}`);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: fb.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: user.displayName,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          })
          .catch((error) => {
            console.error(error);
            alert(`Failed to get image URL: ${error.message}`);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <progress className="progress" value={progress} max="100" />
      <div className="uploadCapBtn">
        <input className="uploadCap" type="file" onChange={handleChange} />
        <button className="primary__button uploadBtn" onClick={handleUpload}>
          Post
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
