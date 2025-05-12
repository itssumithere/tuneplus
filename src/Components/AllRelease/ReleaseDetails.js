import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import OneReleaseController from '../../Controllers/One-release-controller/OneReleaseController';
import { Nav } from '../Common/Nav'
import initialCountryList from '../../Enums/store.list.json';
import { SideBar } from '../Common/SideBar'
import MainStepController from '../../Controllers/One-release-controller/MainStepController';
import { base, domainUrl } from '../../Constants/Data.constant';
import { postData } from '../../Services/Ops';
import Swal from 'sweetalert2';
import { useUserProfile } from '../../Context/UserProfileContext';
import * as XLSX from 'xlsx';
import Loader from '../Common/Loader';
import moment from 'moment';

export const ReleaseDetails = () => {
  const location = useLocation();
  const releaseId = location.state?.releaseId;
  const navigate = useNavigate();
  // const { exportTableToExcel } = OneReleaseController();
  const { myRelease, setMyRelease, fetchReleaseDetails, } = MainStepController();
  const { userProfile, getPermissoin, getProfile } = useUserProfile()
  const [showModal, setShowModal] = useState(false);  // Controls modal visibility
  const [rejectionReason, setRejectionReason] = useState("");
  useEffect(() => {
    fetchReleaseDetails(releaseId)
  }, [])

  const getLogo = (name) => {
    let item = initialCountryList.find(item => item.name == name);
    return item?.logo
  }
  const changeStatus = async (status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want change Status",
      icon: "info", // Options: 'warning', 'error', 'success', 'info', 'question'
      showCancelButton: true, // Enables the Cancel button
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let body = {
          id: releaseId,
          status: status,
          title: myRelease.title,
          UPCEAN: myRelease.step1.UPCEAN,
          reason: rejectionReason ? rejectionReason : "",
        }
        try {
          let result = await postData(base.releaseChangeStatus, body)
          if (result.data.status === true) {
            Swal.fire("Success", `${status} successfully`, "success");
            fetchReleaseDetails(releaseId)
          } else {
            Swal.fire("Error", result.data.message, "error");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          Swal.fire("Error", "Something went wrong. Please try again later.", "error");
        }

      } else if (result.isDismissed) {
        // User clicked the cancel button
        Swal.fire("Cancelled", "Action was cancelled.", "info");
      }
    });

  }

  const handleReject = () => {
    if (rejectionReason.trim()) {
      changeStatus("Reject", rejectionReason); // Pass rejection reason to changeStatus function
      setShowModal(false); // Close the modal after submission
      setRejectionReason(''); // Clear the input field after submission
    } else {
      alert("Please provide a reason for rejection.");
    }
  };

  function exportTableToExcel(tableId, fileName = 'TableData.xlsx') {
    // Get the table element by ID
    const table = document.getElementById(tableId);
    if (!table) {
      console.error(`Table with ID ${tableId} not found.`);
      return;
    }

    // Convert table to a worksheet
    const worksheet = XLSX.utils.table_to_sheet(table);

    // Create a new workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, fileName);
  }

  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async (urlValue, name) => {
    setIsDownloading(true);
    try {
      const response = await fetch(urlValue); // Replace with your API endpoint
      const blob = await response.blob(); // Convert the response to a Blob
      const url = window.URL.createObjectURL(blob); // Create a Blob URL

      // Create a temporary <a> element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Remove the element after download

      // Revoke the Blob URL to free memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const getLastKey = (url) => {
    // Extract the query string from the URL
    // const queryString = url?.split('?')[1]; // "v=xQRo9Iy5YHM"

    // // Split the query string into key-value pairs
    // const params = queryString?.split('&'); // ["v=xQRo9Iy5YHM"]

    // // Get the last key-value pair
    // const lastPair = params[params?.length - 1]; // "v=xQRo9Iy5YHM"

    // // Split into key and value
    // const [lastKey, lastValue] = lastPair?.split('=');
    return url;
  }

  return (
    <div>
      <SideBar />
      <div className="main-cotent">
        <Nav />
        <div className="content-main">
          <section className="content">


            <div className="audio-table release-inner dash-detail dash-detail-two mb-4">
              <div className="release-title">
                <h2>Relase Information</h2>
                {/* <h2>{myRelease.status}</h2> */}
                <img src={myRelease?.step1?.coverImage} height={200} width={200} />
                <div className="release-detail d-flex flex-wrap mt-3">

                  <p className="release-data"><strong>Title :</strong> {myRelease?.title}</p>
                  <p className="release-data"><strong>SubTitle :</strong> {myRelease?.step1?.subTitle == "null" ? "" : myRelease?.step1?.subTitle}</p>
                  <p className="release-data"><strong>Status :</strong> {myRelease?.status}</p>

                  <p className="release-data">
                    <strong>Artists:</strong>{" "}
                    {myRelease?.step1?.primaryArtist?.map((item, index) => (
                      <span key={index}>
                        {item.name}
                        {index < myRelease.step1.primaryArtist.length - 1 && ", "}
                      </span>
                    ))}
                    <br />
                  </p>
                  <p className="release-data"><strong>Genre :</strong> {myRelease?.step1?.genre}</p>
                  <p className="release-data"><strong>Sub Genre :</strong> {myRelease?.step1?.subGenre}</p>
                  <p className="release-data"><strong>Label Name :</strong> {myRelease?.step1?.labelName}</p>
                  <p className="release-data"><strong>Format :</strong> {myRelease?.step1?.format}</p>
                  <p className="release-data"><strong>P Line :</strong> {myRelease?.step1?.pline}</p>
                  <p className="release-data"><strong>C Line :</strong> {myRelease?.step1?.cline}</p>
                  <p className="release-data"><strong>P Year :</strong> {myRelease?.step1?.pYear}</p>
                  <p className="release-data"><strong>C Year :</strong> {myRelease?.step1?.cYear}</p>
                  <p className="release-data"><strong>Production Year :</strong> {myRelease?.step1?.productionYear}</p>
                  <p className="release-data"><strong>UPCEAN :</strong> {myRelease?.step1?.UPCEAN}</p>
                  <p className="release-data"><strong>Producer Catalogue Number :</strong> {myRelease?.step1?.producerCatalogueNumber}</p>
                  <p className="release-data"><strong>OAC Certified by YouTube Link :</strong> {myRelease?.youtubechannelLinkId}</p>
                </div>
              </div>
            </div>
            <div className="audio-table release-inner dash-detail dash-detail-two">
              <div className="release-title">
                <h2>Audio / Video Files</h2>
              </div>
              <div className="release-table">
                <table id="example1" className="table table-bordered table-hover dataTable" aria-describedby="example2_info">
                  <thead>
                    <tr role="row">
                      <th>Name</th>
                      <th>TYPE</th>
                      <th>FILE URL</th>
                    </tr>
                  </thead>
                  <tbody role="alert" aria-live="polite" aria-relevant="all">
                    {myRelease?.step2 && myRelease?.step2.map((item) => (
                      <tr className="odd">
                        <td className="  sorting_1">{item.fileName}</td>
                        <td >{item.fileType}</td>
                        <td className=" ">
                          <a href={item.fileData} target="_blank">
                            <img className="img-fluid" src={require('../../assets/images/play.jpg')} alt={"logo"} style={{ width: "20px", height: "20px", borderRadius: "360px" }}
                            />
                          </a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* {isLoading && "Loading..."} */}
            </div>
            {/* <div className="track-table release-inner dash-detail dash-detail-two">
              <div className="release-title">
                <h3 className="title">Tracks</h3>
              </div>
              <div className="release-table">
                <table className="table" aria-describedby="example2_info">
                  <thead>
                    <tr draggable="true">
                      <th rowspan="1" colspan="1">Volume</th>
                      <th rowspan="1" colspan="1">Content Type</th>
                      <th rowspan="1" colspan="1">PrimaryTrackType</th>
                      <th rowspan="1" colspan="1">SecondaryTrackType</th>
                      <th rowspan="1" colspan="1">Title</th>
                    </tr>
                  </thead>
                  <tbody role="alert" aria-live="polite" aria-relevant="all">
                    {myRelease?.step3 && myRelease?.step3.map((item) => (
                      <tr draggable="true" className="odd">
                        <td className="  sorting_1">{item.Volume}</td>
                        <td className="">{item.ContentType}</td>
                        <td className=" ">{item.PrimaryTrackType}</td>
                        <td className=" ">{item.SecondaryTrackType}</td>
                        <td className=" ">{item.Title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="release-inner dash-detail dash-detail-two">
                  <div className="release-title">
                    <h3 className="title">Stores</h3>
                  </div>
                  <div className="release-detail d-flex flex-wrap">
                    {myRelease?.step4?.map((item, index) => (
                      <div key={index} className="colElement">
                        <div className="countryItem">
                          <input type="checkbox" checked={item.status === 'active'} />{item.name}
                          {getLogo(item.name) != "" && getLogo(item.name) != undefined ?
                            <img className="img-fluid" src={require(`../../assets/images/store/${getLogo(item.name)}`)} alt={item.name} /> : <></>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="release-inner dash-detail dash-detail-two">
                  <div className="release-title">
                    <h3 className="title">Release Dates</h3>
                  </div>
                  <div className="release-detail d-flex flex-wrap">
                    <p className="release-data"><strong>Main Release Date:</strong> {myRelease?.step5?.MainReleaseDate}</p>
                    <p className="release-data"><strong>Pre Order Release Date:</strong></p>
                    {myRelease?.step5?.PreOrder?.map((item, index) => (
                      <p className="release-data" key={index}><strong>{item.name}:</strong> {item.date}</p>
                    ))}
                    <p className="release-data"><strong>Exclusive Release Dates:</strong></p>
                    {myRelease?.step5?.ExclusiveReleaseDates?.map((item, index) => (
                      <p className="release-data" key={index}><strong>{item.name}:</strong> {item.date}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="track-table release-inner dash-detail dash-detail-two">
              <div className="track-heading d-flex flex-wrap align-items-center justify-content-between">
                <h2>Tracks</h2>
              </div>
              <div className="release-table">
                <div className="box-body table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr role="row">
                        <th>CHECK NO.</th>
                        <th>GROUPING ID</th>
                        <th>PRODUCT TITLE</th>
                        <th>VERSION DESCRIPTION</th>
                        <th>PRIMARY ARTIST</th>
                        <th>PRIMARY ARTIST SPOTIFY ID</th>
                        <th>PRIMARY ARTIST APPLE ID</th>
                        <th>ARTIST 2</th>
                        <th>ARTIST 2 ROLE</th>
                        <th>ARTIST 2 SPOTIFY ID</th>
                        <th>ARTIST 2 APPLE ID</th>
                        <th>ARTIST 3</th>
                        <th>ARTIST 3 ROLE</th>
                        <th>ARTIST 3 SPOTIFY ID</th>
                        <th>ARTIST 3 APPLE ID</th>
                        <th>BARCODE</th>
                        <th>CATALOGUE NO.</th>
                        <th>RELEASE FORMAT TYPE</th>
                        <th>Text Language</th>
                        <th>PRICE BAND</th>
                        <th>LICENSED TERRITORIES to INCLUDE</th>
                        <th>LICENSED TERRITORIES to EXCLUDE</th>
                        <th>RELEASE START DATE</th>
                        <th>RELEASE END DATE</th>
                        <th>GRid</th>
                        <th>(P) YEAR</th>
                        <th>(P) HOLDER</th>
                        <th>(C) YEAR</th>
                        <th>(C) HOLDER</th>
                        <th>LABEL</th>
                        <th>MainGenre Primary (drop-down menu)</th>
                        <th>MainGenre Sub</th>
                        <th>AlternateGenre Primary (drop-down menu)</th>
                        <th>AlternateGenre Sub</th>
                        <th>Mood (drop-down menu)</th>
                        <th>COMPOSER(S)</th>
                        <th>CONDUCTOR(S)</th>
                        <th>PRODUCER(S)</th>
                        <th>ARRANGER(S)</th>
                        <th>ORCHESTRA</th>
                        <th>EXPLICIT CONTENT</th>
                        <th>VOLUME NO.</th>
                        <th>VOLUME TOTAL</th>
                        <th>SERVICES</th>
                        <th>TRACK NO.</th>
                        <th>TRACK TITLE</th>
                        <th>MIX / VERSION</th>
                        <th>PRIMARY ARTIST</th>
                        <th>PRIMARY ARTIST SPOTIFY ID</th>
                        <th>PRIMARY ARTIST APPLE ID</th>
                        <th>ARTIST 2</th>
                        <th>ARTIST 2 ROLE</th>
                        <th>ARTIST 2 SPOTIFY ID</th>
                        <th>ARTIST 2 APPLE ID</th>
                        <th>ARTIST 3</th>
                        <th>ARTIST 3 ROLE</th>
                        <th>ARTIST 3 SPOTIFY ID</th>
                        <th>ARTIST 3 APPLE ID</th>
                        <th>ISRC</th>
                        <th>GRid</th>
                        <th>AVAILABLE SEPARATELY</th>
                        <th>(P) YEAR</th>
                        <th>(P) HOLDER</th>
                        <th>(C) YEAR</th>
                        <th>(C) HOLDER</th>
                        <th>MainGenre Primary (drop-down menu)</th>
                        <th>MainGenre Sub</th>
                        <th>AlternateGenre Primary (drop-down menu)</th>
                        <th>AlternateGenre Sub</th>
                        <th>EXPLICIT CONTENT</th>
                        <th>COVER SONG</th>
                        <th>DO YOU HAVE A LICENSE FILE?</th>
                        <th>PRODUCER(S)</th>
                        <th>MIXER(S)</th>
                        <th>CONDUCTOR</th>
                        <th>ARRANGER(S)</th>
                        <th>ORCHESTRA</th>
                        <th>COMPOSER(S)</th>
                        <th>LYRICIST(S)</th>
                        <th>PUBLISHER(S)</th>
                        {/* Mapping over selectContributory and otherContributory */}
                        {[...(myRelease?.step3?.[0]?.selectContributory || []), ...(myRelease?.step3?.[0]?.otherContributory || [])].map((item) => (
                          <th key={item._id}>{item.name}</th>
                        ))}
                        <th>PRO AFFILIATION (PERFORMING RIGHTS ORGANISATION)</th>
                        <th>Custom PRO Affiliation</th>
                        <th>PRO MEMBERSHIP NUMBER</th>
                        <th>Audio Language</th>
                        <th>Cover Image</th>
                        <th>Media</th>


                      </tr>
                    </thead>
                    <tbody role="alert" aria-live="polite" aria-relevant="all">
                      {
                        myRelease?.step3 && myRelease?.step3.map((item, index) => {
                          return (
                            <tr className="odd">
                              <td className="  sorting_1">{index + 1}</td>
                              <td></td>
                              <td>{myRelease.title}</td>
                              <td>{myRelease?.step1?.subTitle == "null" ? "" : myRelease?.step1?.subTitle}</td>
                              <td>{myRelease?.step1?.primaryArtist?.length > 0 && myRelease?.step1?.primaryArtist[0]?.name}</td>
                              <td>{myRelease?.step1?.primaryArtist?.length > 0 && getLastKey(myRelease?.step1?.primaryArtist[0]?.linkId)}</td>
                              <td>{myRelease?.step1?.primaryArtist?.length > 0 && getLastKey(myRelease?.step1?.primaryArtist[0]?.itunesLinkId)}</td>
                              <td>{myRelease?.step1?.primaryArtist?.length > 1 && myRelease?.step1?.primaryArtist[1]?.name}</td>
                              <td> {myRelease?.step1?.primaryArtist?.length > 1 ? "Performer" : "Featuring"}</td>
                              <td>{myRelease?.step1?.primaryArtist?.length > 1 && getLastKey(myRelease?.step1?.primaryArtist[1]?.linkId)}</td>
                              <td>{myRelease?.step1?.primaryArtist?.length > 1 && getLastKey(myRelease?.step1?.primaryArtist[1]?.itunesLinkId)}</td>
                              <td>{myRelease?.step1?.primaryArtist?.length > 2 && myRelease?.step1?.primaryArtist[2]?.name}</td>
                              <td></td>
                              <td>{myRelease?.step1?.primaryArtist?.length > 2 && getLastKey(myRelease?.step1?.primaryArtist[2]?.linkId)}</td>
                              <td>{myRelease?.step1?.primaryArtist?.length > 2 && getLastKey(myRelease?.step1?.primaryArtist[2]?.itunesLinkId)}</td>
                              <td>{myRelease?.step1?.UPCEAN}</td>
                              <td>{myRelease?.step1?.producerCatalogueNumber}</td>
                              <td>{myRelease?.step1?.format}</td>
                              <td>{item?.TrackTitleLanguage}</td>
                              <td>{item?.Price}</td>
                              <td>World</td>
                              <td></td>
                              <td>{myRelease.step1?.originalReleaseDate.split('T')[0]}</td>
                              <td>{myRelease.step1?.originalReleaseDate.split('T')[0]}</td>
                              <td></td>
                              <td>{myRelease?.step1?.pYear}</td>
                              <td>{myRelease?.step1?.pline}</td>
                              <td>{myRelease?.step1?.cYear}</td>
                              <td>{myRelease?.step1?.cline}</td>
                              <td>{myRelease?.step1?.labelName}</td>
                              <td>{myRelease?.step1?.genre}</td>
                              <td>{myRelease?.step1?.subGenre}</td>
                              <td>{item?.SecondaryGenre}</td>
                              <td>{item?.SubSecondaryGenre}</td>
                              <td>{myRelease?.step1?.mood}</td>
                              <td>{item?.Composer[0]?.name}</td>
                              <td>None</td>
                              <td>{item?.Producer[0]?.name}</td>
                              <td>{item?.Arranger[0]?.name}</td>
                              <td>None</td>
                              <td>{item?.ParentalAdvisory == 'yes' ? 'Y' : item?.ParentalAdvisory == 'no' ? 'N' : 'C'}</td>
                              <td>{item?.Volume?.match(/\d+/)}</td>
                              <td>1</td>
                              <td>None</td>
                              <td>{index + 1}</td>
                              <td>{item?.title}</td>
                              <td>{item?.VersionSubtitle}</td>
                              <td>{item?.PrimaryArtist?.length > 0 && item?.PrimaryArtist[0]?.name}</td>
                              <td>{item?.PrimaryArtist?.length > 0 && getLastKey(item?.PrimaryArtist[0]?.linkId)}</td>
                              <td>{item?.PrimaryArtist?.length > 0 && getLastKey(item?.PrimaryArtist[0]?.itunesLinkId)}</td>
                              <td>{item?.Featuring?.length > 1 && item?.Featuring[1]?.name}</td>
                              <td>Featuring</td>
                              <td>{item?.Featuring?.length > 1 && getLastKey(item?.Featuring[1]?.linkId)}</td>
                              <td>{item?.Featuring?.length > 1 && getLastKey(item?.Featuring[1]?.itunesLinkId)}</td>
                              <td>{item?.PrimaryArtist?.length > 2 && item?.PrimaryArtist[2]?.name}</td>
                              <td></td>
                              <td>{item?.PrimaryArtist?.length > 2 && getLastKey(item?.PrimaryArtist[2]?.linkId)}</td>
                              <td>{item?.PrimaryArtist?.length > 2 && getLastKey(item?.PrimaryArtist[2]?.itunesLinkId)}</td>
                              <td>{item?.ISRC}</td>
                              <td>{ }</td>
                              <td>{ }</td>
                              <td>{item?.pYear}</td>
                              <td>{item?.Pline}</td>
                              <td>{item?.cYear}</td>
                              <td>{item?.cLine}</td>
                              <td>{item?.Genre}</td>
                              <td>{item?.SubGenre}</td>
                              <td>{item?.SecondaryGenre}</td>
                              <td>{item?.SubSecondaryGenre}</td>
                              <td>{item?.ParentalAdvisory}</td>
                              <td>{item?.SecondaryTrackType}</td>
                              <td>{ }</td>
                              <td>{item?.Producer[0]?.name}</td>
                              <td>{item?.Remixer[0]?.name}</td>
                              <td>{ }</td>
                              <td>{ }</td>
                              <td>{ }</td>
                              <td>{item?.Composer[0]?.name}</td>
                              <td>{item?.Author[0].name}</td>
                              <td>{item?.Publisher[0].name}</td>
                              {/* Mapping over selectContributory and otherContributory */}
                              {[...(myRelease?.step3?.[0]?.selectContributory || []), ...(myRelease?.step3?.[0]?.otherContributory || [])].map((contributor) => (
                                <td key={contributor._id}>{contributor.value}</td>
                              ))}
                              <td>{item?.ISRC}</td>
                              <td>{ }</td>
                              <td>{ }</td>
                              <td>{item?.LyricsLanguage}</td>
                              <td>
                                {isDownloading ?
                                  <Loader />
                                  :
                                  <span onClick={() => { downloadFile(myRelease?.step1?.coverImage, myRelease.title + '.jpg') }}>
                                    <img className="img-fluid" src={require('../../assets/images/imgdownload.png')} style={{ height: 40, width: 40 }} />
                                  </span>
                                }
                              </td>
                              <td>
                                {isDownloading ?
                                  <Loader />
                                  :
                                  <span onClick={() => { downloadFile(myRelease?.step2[index]?.fileData, myRelease?.step2[index]?.fileName) }}>
                                    <img className="img-fluid" src={require('../../assets/images/download.png')} style={{ height: 40, width: 40 }} />
                                  </span>
                                }
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {userProfile?.role == 'Admin' &&
              <div className="track-table release-inner dash-detail dash-detail-two">
                <div className="track-heading d-flex flex-wrap align-items-center justify-content-between">
                  <h2>Tracks Details for Download</h2>
                  <div className="add-track-btn">
                    <button className="btn btn-primary "
                      onClick={() => {
                        exportTableToExcel('example2', 'release.xlsx')
                      }}>Download</button>
                  </div>
                </div>
                <div className="release-table">
                  <div className="box-body table-responsive">
                    <table id="example2" className="table table-bordered table-striped">
                      <thead>
                        <tr role="row">
                          <th>CHECK NO.</th>
                          <th>GROUPING ID</th>
                          <th>PRODUCT TITLE</th>
                          <th>VERSION DESCRIPTION</th>
                          <th>PRIMARY ARTIST</th>
                          <th>PRIMARY ARTIST SPOTIFY ID</th>
                          <th>PRIMARY ARTIST APPLE ID</th>
                          <th>ARTIST 2</th>
                          <th>ARTIST 2 ROLE</th>
                          <th>ARTIST 2 SPOTIFY ID</th>
                          <th>ARTIST 2 APPLE ID</th>
                          <th>ARTIST 3</th>
                          <th>ARTIST 3 ROLE</th>
                          <th>ARTIST 3 SPOTIFY ID</th>
                          <th>ARTIST 3 APPLE ID</th>
                          <th>BARCODE</th>
                          <th>CATALOGUE NO.</th>
                          <th>RELEASE FORMAT TYPE</th>
                          <th>Text Language</th>
                          <th>PRICE BAND</th>
                          <th>LICENSED TERRITORIES to INCLUDE</th>
                          <th>LICENSED TERRITORIES to EXCLUDE</th>
                          <th>RELEASE START DATE</th>
                          <th>RELEASE END DATE</th>
                          <th>GRid</th>
                          <th>(P) YEAR</th>
                          <th>(P) HOLDER</th>
                          <th>(C) YEAR</th>
                          <th>(C) HOLDER</th>
                          <th>LABEL</th>
                          <th>MainGenre Primary (drop-down menu)</th>
                          <th>MainGenre Sub</th>
                          <th>AlternateGenre Primary (drop-down menu)</th>
                          <th>AlternateGenre Sub</th>
                          <th>Mood (drop-down menu)</th>
                          <th>COMPOSER(S)</th>
                          <th>CONDUCTOR(S)</th>
                          <th>PRODUCER(S)</th>
                          <th>ARRANGER(S)</th>
                          <th>ORCHESTRA</th>
                          <th>EXPLICIT CONTENT</th>
                          <th>VOLUME NO.</th>
                          <th>VOLUME TOTAL</th>
                          <th>SERVICES</th>
                          <th>TRACK NO.</th>
                          <th>TRACK TITLE</th>
                          <th>MIX / VERSION</th>
                          <th>PRIMARY ARTIST</th>
                          <th>PRIMARY ARTIST SPOTIFY ID</th>
                          <th>PRIMARY ARTIST APPLE ID</th>
                          <th>ARTIST 2</th>
                          <th>ARTIST 2 ROLE</th>
                          <th>ARTIST 2 SPOTIFY ID</th>
                          <th>ARTIST 2 APPLE ID</th>
                          <th>ARTIST 3</th>
                          <th>ARTIST 3 ROLE</th>
                          <th>ARTIST 3 SPOTIFY ID</th>
                          <th>ARTIST 3 APPLE ID</th>
                          <th>ISRC</th>
                          <th>GRid</th>
                          <th>AVAILABLE SEPARATELY</th>
                          <th>(P) YEAR</th>
                          <th>(P) HOLDER</th>
                          <th>(C) YEAR</th>
                          <th>(C) HOLDER</th>
                          <th>MainGenre Primary (drop-down menu)</th>
                          <th>MainGenre Sub</th>
                          <th>AlternateGenre Primary (drop-down menu)</th>
                          <th>AlternateGenre Sub</th>
                          <th>EXPLICIT CONTENT</th>
                          <th>COVER SONG</th>
                          <th>DO YOU HAVE A LICENSE FILE?</th>
                          <th>PRODUCER(S)</th>
                          <th>MIXER(S)</th>
                          <th>CONDUCTOR</th>
                          <th>ARRANGER(S)</th>
                          <th>ORCHESTRA</th>
                          <th>COMPOSER(S)</th>
                          <th>LYRICIST(S)</th>
                          <th>PUBLISHER(S)</th>
                          <th>PRO AFFILIATION (PERFORMING RIGHTS ORGANISATION)</th>
                          <th>Custom PRO Affiliation</th>
                          <th>PRO MEMBERSHIP NUMBER</th>
                          <th>Audio Language</th>

                        </tr>
                      </thead>
                      <tbody role="alert" aria-live="polite" aria-relevant="all">
                        {
                          myRelease?.step3 && myRelease?.step3.map((item, index) => {
                            return (
                              <tr className="odd">
                                <td className="  sorting_1">{index + 1}</td>
                                <td></td>
                                <td>{myRelease.title}</td>
                                <td>{myRelease?.step1?.subTitle == "null" ? "" : myRelease?.step1?.subTitle}</td>

                                <td>{myRelease?.step1?.primaryArtist?.length > 0 && myRelease?.step1?.primaryArtist[0]?.name}</td>
                                <td>{myRelease?.step1?.primaryArtist?.length > 0 && getLastKey(myRelease?.step1?.primaryArtist[0]?.linkId)}</td>
                                <td>{myRelease?.step1?.primaryArtist?.length > 0 && getLastKey(myRelease?.step1?.primaryArtist[0]?.itunesLinkId)}</td>

                                <td>{myRelease?.step1?.primaryArtist?.length > 1 ? myRelease?.step1?.primaryArtist[1]?.name : myRelease?.step1?.Featuring?.length > 0 ? myRelease?.step1?.Featuring[0]?.name : ""}</td>
                                <td> {myRelease?.step1?.primaryArtist?.length > 1 ? "Performer" : "Featuring"}</td>
                                <td>{myRelease?.step1?.primaryArtist?.length > 1 ? getLastKey(myRelease?.step1?.primaryArtist[1]?.linkId) : myRelease?.step1?.Featuring?.length > 0 ? getLastKey(myRelease?.step1?.Featuring[0]?.linkId) : ""}</td>
                                <td>{myRelease?.step1?.primaryArtist?.length > 1 ? getLastKey(myRelease?.step1?.primaryArtist[1]?.itunesLinkId) : myRelease?.step1?.Featuring?.length > 0 ? getLastKey(myRelease?.step1?.Featuring[0]?.itunesLinkId) : ""}</td>

                                <td>{myRelease?.step1?.primaryArtist?.length > 1 ? myRelease?.step1?.primaryArtist[2]?.name : myRelease?.step1?.Featuring?.length > 0 ? myRelease?.step1?.Featuring[0]?.name : ""}</td>
                                <td>{myRelease?.step1?.Featuring?.length > 0 && myRelease?.step1?.primaryArtist?.length > 1 && "Featuring"}</td>
                                <td>{myRelease?.step1?.Featuring?.length > 0 && myRelease?.step1?.primaryArtist?.length > 1 ? getLastKey(myRelease?.step1?.Featuring[0]?.linkId) : ""}</td>
                                <td>{myRelease?.step1?.Featuring?.length > 0 && myRelease?.step1?.primaryArtist?.length > 1 ? getLastKey(myRelease?.step1?.Featuring[0]?.itunesLinkId) : ""}</td>

                                <td>{myRelease?.step1?.UPCEAN}</td>
                                <td>{myRelease?.step1?.producerCatalogueNumber}</td>
                                <td>{myRelease?.step1?.format?.toLowerCase().replace(/^./, str => str.toUpperCase())}</td>
                                <td>{item?.TrackTitleLanguage}</td>
                                <td>{item?.Price}</td>
                                <td>World</td>
                                <td></td>
                                <td>{moment(myRelease.step1?.originalReleaseDate).format("DD/MM/YYYY")}</td>
                                <td>{moment(myRelease.step1?.originalReleaseDate).format("DD/MM/YYYY")}</td>
                                <td></td>
                                <td>{myRelease?.step1?.pYear}</td>
                                <td>{myRelease?.step1?.pline}</td>
                                <td>{myRelease?.step1?.cYear}</td>
                                <td>{myRelease?.step1?.cline}</td>
                                <td>{myRelease?.step1?.labelName}</td>
                                <td>{myRelease?.step1?.genre}</td>
                                <td>{myRelease?.step1?.subGenre}</td>
                                <td>{item?.SecondaryGenre}</td>
                                <td>{item?.SubSecondaryGenre}</td>
                                <td>{item?.mood}</td>
                                <td>{item?.Composer[0]?.name}</td>
                                <td>{ }</td>
                                <td>{item?.Producer[0]?.name}</td>
                                <td>{item?.Arranger[0]?.name}</td>
                                <td>{ }</td>
                                <td>{item?.ParentalAdvisory == 'yes' ? 'Y' : item?.ParentalAdvisory == 'no' ? 'N' : 'C'}</td>
                                <td>{item?.Volume?.match(/\d+/)}</td>
                                <td>1</td>
                                <td>Jeet Music Services</td>
                                <td>{index + 1}</td>
                                <td>{item?.Title}</td>
                                <td>{item?.VersionSubtitle}</td>
                                <td>{item?.PrimaryArtist?.length > 0 && item?.PrimaryArtist[0]?.name}</td>
                                <td>{item?.PrimaryArtist?.length > 0 && getLastKey(item?.PrimaryArtist[0]?.linkId)}</td>
                                <td>{item?.PrimaryArtist?.length > 0 && getLastKey(item?.PrimaryArtist[0]?.itunesLinkId)}</td>

                                <td>{item?.PrimaryArtist?.length > 1 ? item?.PrimaryArtist[1]?.name : item?.Featuring?.length > 0 ? item?.Featuring[0]?.name : ""}</td>
                                <td> {item?.PrimaryArtist?.length > 1 ? "Performer" : "Featuring"}</td>
                                <td>{item?.PrimaryArtist?.length > 1 ? getLastKey(item?.PrimaryArtist[1]?.linkId) : item?.Featuring?.length > 0 ? getLastKey(item?.Featuring[0]?.linkId) : ""}</td>
                                <td>{item?.PrimaryArtist?.length > 1 ? getLastKey(item?.PrimaryArtist[1]?.itunesLinkId) : item?.Featuring?.length > 0 ? getLastKey(item?.Featuring[0]?.itunesLinkId) : ""}</td>

                                <td>{item?.Featuring?.length > 0 && item?.PrimaryArtist?.length > 1 ? item?.Featuring[0]?.name : ""}</td>
                                <td>{item?.Featuring?.length > 0 && item?.PrimaryArtist?.length > 1 && "Featuring"}</td>
                                <td>{item?.Featuring?.length > 0 && item?.PrimaryArtist?.length > 1 ? getLastKey(item?.Featuring[0]?.linkId) : ""}</td>
                                <td>{item?.Featuring?.length > 0 && item?.PrimaryArtist?.length > 1 ? getLastKey(item?.Featuring[0]?.itunesLinkId) : ""}</td>


                                {/* <td>{item?.PrimaryArtist?.length > 0 && item?.PrimaryArtist[0]?.name}</td>
                                <td>{item?.PrimaryArtist?.length > 0 && getLastKey(item?.PrimaryArtist[0]?.linkId)}</td>
                                <td>{item?.PrimaryArtist?.length > 0 && getLastKey(item?.PrimaryArtist[0]?.itunesLinkId)}</td>
                                <td>{item?.Featuring?.length > 1 && item?.Featuring[1]?.name}</td>
                                <td>Featuring</td>
                                <td>{item?.Featuring?.length > 1 && getLastKey(item?.Featuring[1]?.linkId)}</td>
                                <td>{item?.Featuring?.length > 1 && getLastKey(item?.Featuring[1]?.itunesLinkId)}</td>
                                <td>{item?.PrimaryArtist?.length > 2 && item?.PrimaryArtist[2]?.name}</td>
                                <td></td>
                                <td>{item?.PrimaryArtist?.length > 2 && getLastKey(item?.PrimaryArtist[2]?.linkId)}</td>
                                <td>{item?.PrimaryArtist?.length > 2 && getLastKey(item?.PrimaryArtist[2]?.itunesLinkId)}</td> */}
                                <td>{item?.ISRC}</td>
                                <td>{ }</td>
                                <td>Y</td>
                                <td>{item?.pYear}</td>
                                <td>{item?.Pline}</td>
                                <td>{item?.cYear}</td>
                                <td>{item?.cLine}</td>
                                <td>{item?.Genre}</td>
                                <td>{item?.Subgenre}</td>
                                <td>{item?.SecondaryGenre}</td>
                                <td>{item?.SubSecondaryGenre}</td>
                                <td>{item?.ParentalAdvisory == 'yes' ? 'Y' : item?.ParentalAdvisory == 'no' ? 'N' : 'C'}</td>
                                <td>{item?.SecondaryTrackType == 'original' ? "N" : 'Y'}</td>
                                <td>{ }</td>
                                <td>{item?.Producer[0]?.name}</td>
                                <td>{item?.Remixer[0]?.name}</td>
                                <td>{ }</td>
                                <td>{ }</td>
                                <td>{ }</td>
                                <td>{item?.Composer[0]?.name}</td>
                                <td>{item?.Author[0].name}</td>
                                <td>{item?.Publisher[0].name != "None" ? item?.Publisher[0].name : ""}</td>
                                <td>None</td>
                                <td>{ }</td>
                                <td>{ }</td>
                                <td>{item?.LyricsLanguage}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            }

            {userProfile?.role == "Admin" &&
              <div className="submit-btn text-center my-4">
                <button type="submit" className="btn btn-success" onClick={() => {
                  changeStatus("Approve")
                }}>Approve</button>
                <button
                  type="button"
                  className="btn btn-danger mx-4"
                  onClick={() => setShowModal(true)}  // Open the modal
                >
                  Reject
                </button>
                <button type="submit" className="btn btn-info mx-4" onClick={() => {
                  changeStatus("Pending")
                }}>Takedown</button>
              </div>

            }
            {/* Custom Modal for Rejection */}
            {showModal && (
              <div className="modal fade show"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent overlay
                }} role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content bg-dark text-light">
                    <div className="modal-header">
                      <h5 className="modal-title text-light">Reason for Rejection</h5>
                      <button
                        type="button"
                        className="btn-close text-light"
                        onClick={() => setShowModal(false)} // Close modal on cancel
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <textarea
                        className="form-control bg-dark text-light"
                        rows="4"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)} // Handle text input
                        placeholder="Enter the reason for rejection..."
                      ></textarea>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-light text-dark"
                        onClick={() => setShowModal(false)} // Close modal on cancel
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleReject} // Submit rejection reason
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </section>
        </div>
      </div>
    </div>
  );
};