
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a resume.");
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const response = await axios.post(
        "https://vercel.app",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("✅ Resume Uploaded Successfully!");
      

      setFile(null);
      document.getElementById("resumeFile").value = "";
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response) {
        if (error.response.status === 401) {
          alert("Session expired. Please login again.");
        } else if (error.response.status === 400) {
          alert(
            error.response.data.detail ||
              "Resume already uploaded or invalid file."
          );
        } else {
          alert("Upload failed.");
        }
      } else {
        alert("Cannot connect to server.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Upload Resume
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Upload your latest resume (PDF, DOC, DOCX)
        </p>

        <form onSubmit={handleSubmit}>

          <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-600 transition">

            <input
              id="resumeFile"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-gray-700
              file:mr-4
              file:px-5
              file:py-2
              file:border-0
              file:rounded-lg
              file:bg-blue-600
              file:text-white
              file:font-semibold
              hover:file:bg-blue-700"
            />

            {file && (
              <div className="mt-4">

                <p className="text-green-600 font-semibold">
                  Selected File
                </p>

                <p className="text-gray-700 text-sm mt-1">
                  {file.name}
                </p>

              </div>
            )}

          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full mt-8 py-3 rounded-xl text-lg font-semibold text-white transition duration-300 ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading Resume..." : "Upload Resume"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResumeUpload;