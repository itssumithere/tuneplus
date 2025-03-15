import React, { useState, useRef } from 'react';
import Swal from "sweetalert2";
import { postData } from '../../Services/Ops';
import { base } from '../../Constants/Data.constant';
import axios from 'axios';

const Step2Controller = () => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [releaseData, setReleaseData] = useState({});
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const inputRef = useRef(null);

    // Fetch release details
    const fetchReleaseDetails = async (releaseId) => {
        try {
            const body = { releaseId };
            const result = await postData(base.releaseDetails, body);
            if (result.data.status) {
                setFiles(result.data.data.step2);
            } else {
                Swal.fire("Error", "Failed to fetch release details", "error");
            }
        } catch (error) {
            console.error("Error fetching release details:", error);
        }
    };

    // delete file 
    const handleDeleteFile = async (fileId) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to recover this file!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            });
    
            if (result.isConfirmed) {
                let body={
                    fileId : fileId ,
                    releaseId : releaseData._id
                }
                
                await postData(base.deleteFile, body );
    
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                setFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
            }
        } catch (error) {
            console.error("Error deleting file:", error);
            Swal.fire("Error", "Failed to delete the file.", "error");
        }
    };

    // Handle file upload
    const handleFileChange = async (e) => {
        if (!e.target.files.length) return;
    
        const formData = new FormData();
        formData.append("id", releaseData._id);
    
        Array.from(e.target.files).forEach(file => {
            formData.append("files", file);
        });
    
        let token = localStorage.getItem("token");
    
        try {
            const config = {
                headers: { 
                    Authorization: token, 
                    "Content-Type": "multipart/form-data", 
                    "Cache-Control": "no-cache" 
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                },
            };
    
            await axios.post(base.releaseStep2, formData, config);
            
            // Ensure the progress reaches 100% before verifying
            setUploadProgress(100);
    
            // Simulate verification delay
            setTimeout(() => {
                Swal.fire("Success", "File uploaded and verified successfully.", "success");
                fetchReleaseDetails(releaseData._id);
                setUploadProgress(0);
            }, 2000);
    
        } catch (error) {
            console.error("Upload error:", error);
            Swal.fire("Error", "An error occurred while uploading files.", "error");
        } finally {
            if (inputRef.current) {
                inputRef.current.value = "";  // Clear input field
            }
        }
    };
    

    // Remove selected file
    const handleRemove = (fileName) => {
        setMediaFiles((prevFiles) => prevFiles.filter((file) => file.fileName !== fileName));
    };

    return {
        handleDeleteFile,
        handleFileChange,
        mediaFiles,
        handleRemove,
        setReleaseData,
        uploadProgress,
        files,
        fetchReleaseDetails,
        inputRef
    };
};

export default Step2Controller;
