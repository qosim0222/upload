import axios from "axios";
import { useState } from "react";

const Contact = () => {
  const [file, setFile] = useState<any>(null);

  const handleUpload = () => {
    let formData = new FormData();

    formData.append("file", file[0]);

    axios.post("https://keldibekov.online/upload", formData);
  };

  const handleDownload = async () => {
    const fileUrl = "https://keldibekov.online/uploads/1748577354056.jpg";

    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "exported-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <div>
      <h2>Contact</h2>
      <a href="./assets/docs.xlsx" download={true}>
        Export file
      </a>
      <button onClick={handleDownload}>Export Image</button>;
      <div className="p-5">
        <div className="size-24 border rounded-lg overflow-hidden relative border-gray-300">
          <span className="absolute top-1/2 left-1/2 -translate-1/2 text-4xl">
            +
          </span>
          <img
            src={file && URL.createObjectURL(file[0])}
            className="w-full h-full object-contain relative"
            alt=""
          />
          <input
            className="absolute top-0 left-0 w-full h-full opacity-0"
            type="file"
            onChange={(e) => setFile(e.target.files)}
            accept="image/*"
          />
        </div>
        <button onClick={handleUpload}>send</button>
      </div>
    </div>
  );
};

export default Contact;
