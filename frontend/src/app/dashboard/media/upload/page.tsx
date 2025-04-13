// Import Next.js Image component
"use client"
import Image from 'next/image'; 
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DragDropUpload() {
  const [file, setFile] = useState(null); // Handle a single file
  const [uploadedFilePath, setUploadedFilePath] = useState(null); // Track uploaded file path
  const [imageProps, setImageProps] = useState({ name: '', width: '', height: '' }); // Editable properties

  const onDrop: React.FC<{acceptedFiles: React.ImgHTMLAttributes}> = (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(Object.assign(newFile, { preview: URL.createObjectURL(newFile) }));
      setImageProps({
        name: newFile.name,
        width: 300, // Default width
        height: 300, // Default height
      });
      setUploadedFilePath(null);
    }
  };

  const uploadFile = async () => {
    if (!file) return alert("No file selected!");

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setUploadedFilePath(data.filePath);
    } else {
      alert(data.error);
    }
  };

  const cancelUpload = () => {
    setFile(null);
    setUploadedFilePath(null);
    setImageProps({ name: '', width: '', height: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImageProps((prev) => ({ ...prev, [name]: value }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="p-5 border rounded-lg border-dashed border-gray-400">
      <div
        {...getRootProps()}
        className={`w-full p-10 text-center transition-all duration-200 ${
          isDragActive ? 'bg-gray-200 border-gray-600' : 'bg-white'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop your file here...</p>
        ) : (
          <p>Drag & drop a file here, or click to select one</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-bold">Selected File:</h3>
        {file ? (
          <div className="relative w-32 h-32 mt-2">
            <Image
              src={file.preview}
              alt={imageProps.name || file.name}
              width={imageProps.width}
              height={imageProps.height}
              className="rounded-lg"
            />
            <p className="text-xs text-center mt-1">{file.name}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No file selected.</p>
        )}
      </div>

      {file && (
        <div className="mt-4 space-x-2">
          <button
            onClick={uploadFile}
            className="px-4 py-2  text-white rounded-lg bg-blaze-orange-600 hover:bg-blaze-orange-600"
          >
            Upload File
          </button>
          <button
            onClick={cancelUpload}
            className="px-4 py-2 text-white rounded-lg bg-blaze-orange-600 hover:bg-blaze-orange-600"
          >
            Cancel
          </button>
        </div>
      )}

      {file && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg">
          <h3 className="font-bold mb-3">Edit Image Properties:</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium">Name:</span>
              <input
                type="text"
                name="name"
                value={imageProps.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-lg"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Width (px):</span>
              <input
                type="number"
                name="width"
                value={imageProps.width}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-lg"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium">Height (px):</span>
              <input
                type="number"
                name="height"
                value={imageProps.height}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-lg"
              />
            </label>
          </div>
        </div>
      )}

      {uploadedFilePath && (
        <div className="mt-4">
          <p>
            Uploaded: <a href={uploadedFilePath}>{uploadedFilePath}</a>
          </p>
        </div>
      )}
    </div>
  );
}



