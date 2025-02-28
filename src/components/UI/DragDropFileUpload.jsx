import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DragDropFileUpload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Uploaded Files:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex justify-center items-center h-[50vh] bg-green-200">
      <div className="bg-white p-6 rounded-lg shadow-md w-[500px]">
        <h2 className="text-xl font-semibold text-center mb-4">
          React Drop Files Input
        </h2>
        <div
          {...getRootProps()}
          className={`border-2 ${isDragActive ? "border-green-500" : "border-gray-300"
            } border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-50`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <img
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fgreen-upload-icon-or-logo-vector-42783323&psig=AOvVaw2uF6boE4ZfegsPz0lk5p9S&ust=1740807088798000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjtxfLR5YsDFQAAAAAdAAAAABAE"
              alt="Upload"
              className="w-12 h-12 mb-2"
            />
            <p className="text-gray-500">Drag & Drop your files here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDropFileUpload;
