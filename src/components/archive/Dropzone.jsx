import "./Dropzone.css";
import React from "react";

export const Dropzone = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <label className="dropzone">
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*,video/*,audio/*,.txt,.pdf"
      />

      <div className="image-label">
        파일 선택
      </div>
    </label>
  );
};