import React, { useEffect } from 'react';
import Step2Controller from '../../Controllers/One-release-controller/Step2Controller';
import Loader from '../Common/Loader';

export default function STEP2(props) {
  const { setStep, releaseData, setErrors } = props;
  const {
    handleFileChange,
    inputRef,
    files,
    setReleaseData,
    uploadProgress,
    fetchReleaseDetails,
    handleDeleteFile
  } = Step2Controller();

  useEffect(() => {
    setReleaseData(releaseData);
    setErrors?.([]);
    fetchReleaseDetails(releaseData._id);
  }, [releaseData]);

  return (
    <div className="media-uploader">
      <h2>Upload Media Files</h2>
      <div className="row">
        <div className="col-lg-5 col-12">
          <div className="form-group">
            <input
              type="file"
              multiple
              accept=".flac,.wav"
              className="form-control"
              onChange={handleFileChange}
              ref={inputRef}
              disabled={uploadProgress > 0 && uploadProgress < 100} // Disable during upload
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Accepted Audio File Formats:</strong>
            <ul>
              <li>WAV (PCM only)</li>
              <li>FLAC</li>
            </ul>

            <strong>File Naming Guidelines:</strong>
            <p>Avoid using special characters such as: &, /, %, # , etc.</p>
          </div>
        </div>

        {uploadProgress > 0 && (
          <div className="progress mt-3">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-success"
              role="progressbar"
              style={{ width: `${uploadProgress}%` }}
              aria-valuenow={uploadProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {uploadProgress < 100 ? `${uploadProgress}% uploaded` : "100% uploaded. Now verifying..."}
            </div>
          </div>
        )}


      </div>

      <div className="col-lg-12 col-12">
        <div className="dash-detail">
          <div className="old-heading">
            <h3 className="title">Old Files</h3>
          </div>
          <div className="file-table">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>File URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.fileName}</td>
                    <td>{item.fileType}</td>
                    <td>
                      <a href={item.fileData} target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-play"></i> Play
                      </a>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDeleteFile(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* {isLoading && <p>Loading...</p>} */}
        </div>
      </div>
    </div>
  );
}
