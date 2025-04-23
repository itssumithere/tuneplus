import React, { useState, useEffect } from 'react'
import Step3Controller from '../../Controllers/One-release-controller/Step3Controller'
import ARTISTLIST from '../../Enums/artist.list.json';
import DynamicInputList from '../Common/DynamicInputList';
import SearchInput from '../Common/SearchBox';
import GENRES from '../../Enums/genres.json';
import language from '../../Enums/language.json'

export default function STEP3(props) {
  const { releaseData, fetchReleaseDetails, setErrors } = props
  const {
    localErrors,
    handleDeleteFile,
    contentType,
    setContentType,
    primaryTrackType,
    setPrimaryTrackType,
    secondaryTrackType,
    setSecondaryTrackType,
    instrumental,
    setInstrumental,
    title,
    setTitle,
    versionSubtitle,
    setVersionSubtitle,
    primaryArtist,
    setPrimaryArtist,
    featuring,
    setFeaturing,
    remixer,
    setRemixer,
    author,
    setAuthor,
    composer,
    setComposer,
    arranger,
    setArranger,
    producer,
    setProducer,
    pLine,
    setPLine,
    pYear,
    setPYear,
    cLine,
    setCLine,
    cYear,
    setCYear,
    productionYear,
    setProductionYear,
    publisher,
    setPublisher,
    isrc,
    setIsrc,
    generateISRC,
    setGenerateISRC,
    genre,
    setGenre,
    subgenre,
    setSubgenre,
    secondaryGenre,
    setSecondaryGenre,
    subSecondaryGenre,
    setSubSecondaryGenre,
    price,
    setPrice,
    producerCatalogueNumber,
    setProducerCatalogueNumber,
    parentalAdvisory,
    setParentalAdvisory,
    previewStart,
    setPreviewStart,
    trackTitleLanguage,
    setTrackTitleLanguage,
    lyricsLanguage,
    setLyricsLanguage,
    lyrics,
    setLyrics,
    step3, setStep3,
    handleSubmit,
    setReleaseData,
    btnName, setBtnName, setRowId,
    volume, setVolume,
    selectContributory, setSelectContributory,
    otherContributory, setOtherContributory,
    mood,
    setMood,
    isModalOpen, setIsModalOpen
  } = Step3Controller()


  const initialStoreList = [
    { id: '1', name: 'Mixing Eng', value: '' },
    { id: '2', name: 'Add Engineer', value: '' },
  ];
  const initialOtherContributoryList = [
    { id: '1', name: 'Acoustic Guitar', value: '' },
    { id: '2', name: 'Keyboard', value: '' },
    { id: '3', name: 'Bass', value: '' },
    { id: '4', name: 'Drum', value: '' },
    { id: '5', name: 'Flute', value: '' },
    { id: '6', name: 'Saxophone', value: '' }
  ];


  const [contributoryName, setContributoryName] = useState(initialStoreList);

  // Handle selection of a contributor
  const contributorySelect = (id) => {
    const selectedItem = contributoryName?.find((item) => item.id === id);
    if (selectedItem && !selectContributory?.some((item) => item.id === id)) {
      setSelectContributory([...selectContributory, selectedItem]);
      setContributoryName(contributoryName?.filter((item) => item.id !== id));
    }
  };

  // Handle changes to a specific contributor's value
  const handlecontributoryChange = (id, val) => {
    setSelectContributory((prevContributors) =>
      prevContributors?.map((item) =>
        item.id === id ? { ...item, value: val } : item
      )
    );
  };

  // Remove a contributor from the selected list
  const removeContributory = (id) => {
    const removedContributor = selectContributory.find((item) => item.id === id);
    if (removedContributor) {
      setContributoryName([...contributoryName, removedContributor]);
      setSelectContributory(selectContributory.filter((item) => item.id !== id));
    }
  };



  const [othersContributoryName, setothersContributoryName] = useState(initialOtherContributoryList);

  // Handle selection of a contributor
  const otherscontributorySelect = (id) => {
    const selectedItem = othersContributoryName?.find((item) => item.id === id);
    if (selectedItem && !otherContributory?.some((item) => item.id === id)) {
      setOtherContributory([...otherContributory, selectedItem]);
      setothersContributoryName(othersContributoryName?.filter((item) => item.id !== id));
    }
  };

  // Handle changes to a specific contributor's value
  const handleOthersContributoryChange = (id, val) => {
    setOtherContributory((prevContributors) =>
      prevContributors?.map((item) =>
        item.id === id ? { ...item, value: val } : item
      )
    );
  };

  // Remove a contributor from the selected list
  const removeOthersContributory = (id) => {
    const removedContributor = otherContributory.find((item) => item.id === id);
    if (removedContributor) {
      setothersContributoryName([...othersContributoryName, removedContributor]);
      setOtherContributory(otherContributory.filter((item) => item.id !== id));
    }
  };





  // State to manage the modal visibility
  // Function to open the modal
  const openModal = () => {
    setBtnName("Add");
    setIsModalOpen(true)
    setRowId("")
    console.log("")
    setContentType("");
    setPrimaryTrackType("");
    setSecondaryTrackType("");
    setInstrumental(false);
    setTitle("");
    setVersionSubtitle("");
    setPrimaryArtist("");
    setFeaturing("");
    setRemixer([{ value: '' }]);
    setAuthor([{ value: '' }]);
    setComposer([{ value: '' }]);
    setArranger([{ value: '' }]);
    setProducer([{ value: '' }]);
    setPLine("");
    setProductionYear("");
    setPublisher([{ value: '' }]);
    setIsrc("");
    setGenerateISRC(false);
    setGenre("");
    setSubgenre("");
    setSecondaryGenre("");
    setSubSecondaryGenre("");
    setPrice("");
    setProducerCatalogueNumber("");
    setParentalAdvisory("");
    setPreviewStart("");
    setTrackTitleLanguage("");
    setLyricsLanguage("");
    setLyrics("");
    setVolume("");
    setSelectContributory([]);
    setSelectContributory([]);


  };
  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    const getData = async () => {
      setStep3(releaseData.step3);
      setReleaseData(releaseData)
      // alert(releaseData.step1.format)
      if (releaseData?.step1?.format == "SINGLE") {
        setTitle(releaseData.title || "");
        setVersionSubtitle(releaseData.step1.subTitle || "");
        setContentType(releaseData.type);
        setPrimaryArtist(releaseData.step1.primaryArtist)
        setFeaturing(releaseData.step1.featuring);
      }

    }
    getData()
  }, [releaseData.step3])
  useEffect(() => {
    fetchReleaseDetails(releaseData._id)
  }, [isModalOpen])
  const editTracks = (item) => {
    console.log(item)
    setBtnName("Edit")
    setRowId(item._id)
    setIsModalOpen(true)
    console.log(item)
    setContentType(item.ContentType || "audio");
    setPrimaryTrackType(item.PrimaryTrackType || "music");
    setSecondaryTrackType(item.SecondaryTrackType || "original");
    setInstrumental(item.Instrumental || false);
    setTitle(item.Title || "");
    setVersionSubtitle(item.VersionSubtitle || "");
    setPrimaryArtist(item.PrimaryArtist || "");
    setFeaturing(item.Featuring || "");
    setRemixer(item.Remixer || [{ value: '' }]);
    setAuthor(item.Author || [{ value: '' }]);
    setComposer(item.Composer || [{ value: '' }]);
    setArranger(item.Arranger || [{ value: '' }]);
    setProducer(item.Producer || [{ value: '' }]);
    setPLine(item.Pline || "");
    setProductionYear(item.ProductionYear || "");
    setPublisher(item.Publisher || [{ value: '' }]);
    setIsrc(item.ISRC || "");
    setGenerateISRC(item.GenerateISRC || false);
    setGenre(item.Genre || "");
    setSubgenre(item.Subgenre || "");
    setSecondaryGenre(item.SecondaryGenre || "");
    setSubSecondaryGenre(item.SubSecondaryGenre || "");
    setPrice(item.Price || "");
    setProducerCatalogueNumber(item.ProducerCatalogueNumber || "");
    setParentalAdvisory(item.ParentalAdvisory || "");
    setPreviewStart(item.PreviewStart || "");
    setTrackTitleLanguage(item.TrackTitleLanguage || "");
    setLyricsLanguage(item.LyricsLanguage || "");
    setLyrics(item.Lyrics || "");
    setVolume(item.Volume || "");
    setSelectContributory(item.selectContributory || [])
    setOtherContributory(item.otherContributory || [])
    setMood(item?.mood)
    setCLine(item?.cLine)
    setCYear(item?.cYear)
    setPYear(item?.pYear)
  }
  const [incrementalValue, setIncrementalValue] = useState(1);


  // useEffect to set ISRC when generateISRC is true
  useEffect(() => {
    if (generateISRC) {
      setIsrc("");
    }
  }, [generateISRC]);
  const selectedGenre = GENRES.find((g) => g.name === genre);
  const subgenres = selectedGenre ? selectedGenre.subgenres : [];
  return (
    <div>
      <div className='row'>
        <div className="track-heading d-flex flex-wrap align-items-center justify-content-between">
          <h2>Tracks</h2>
          <div className="add-track-btn">
            <button onClick={openModal} className="btn btn-primary ">+ Add Track</button>
          </div>
        </div>
      </div>
      {/* <br>{releaseData?._id}</br> */}
      <div className="dash-detail">
        <div className="">
          <div className="">
            <div className="" role="grid">
              <table id="example2" className="table table-bordered table-hover dataTable" aria-describedby="example2_info">

                <thead>
                  <tr draggable="true">
                    <th rowspan="1" colspan="1">Volume</th>
                    <th rowspan="1" colspan="1">Content Type</th>
                    <th rowspan="1" colspan="1">PrimaryTrackType</th>
                    <th rowspan="1" colspan="1">SecondaryTrackType</th>
                    <th rowspan="1" colspan="1">Title</th>
                    <th rowspan="1" colspan="1">ACTION</th>
                  </tr>                </thead>
                <tbody role="alert" aria-live="polite" aria-relevant="all">
                  {step3 && step3.map((item) => (
                    <tr draggable="true" className="odd">
                      <td className="  sorting_1">{item.Volume}</td>
                      <td className="">{item.ContentType}</td>
                      <td className=" ">{item.PrimaryTrackType}</td>
                      <td className=" ">{item.SecondaryTrackType}</td>
                      <td className=" ">{item.Title}</td>
                      <td className=" ">
                        <a className="btn btn-app" onClick={() => { editTracks(item) }}>
                          <i className="fa fa-edit"></i> Edit
                        </a>
                        <button className="btn btn-danger" onClick={() => handleDeleteFile(item._id)}>
                        Delete
                      </button>
                        </td>
                    </tr>
                  ))}
                </tbody></table>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen &&
        <div>
          {/* Background Overlay */}
          <div
            className="modal-backdrop"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent overlay
              backdropFilter: 'blur(5px)', // Apply blur effect
              zIndex: 1040, // Ensure it stays below the modal content
            }}
          ></div>
          {/* Modal Content */}
          <div className="add-track-popup modal" style={{ display: 'block', zIndex: 1050 }}>

            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Track</h4>
                  <button type="btn btn-danger" className="btn btn-primary close" onClick={closeModal} aria-label="Close">
                    <span  >×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label>Content Type {contentType} *</label>
                        <input type="radio" value="Audio" checked={contentType == "Audio"} onChange={() => setContentType("Audio")} /> Audio
                        {/* <input type="radio" value="Video" checked={contentType == "Video"} onChange={() => setContentType("Video")} style={{ marginLeft: "10px" }} /> Video */}
                      </div>
                      {localErrors?.['contentType'] && (
                      <span className="text-danger">{localErrors['contentType']}</span>
                       )}
                    </div>
                    {/* Primary Track Type */}
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Primary Track Type *</label>
                        <input type="radio" value="music" checked={primaryTrackType === "music"} onChange={() => setPrimaryTrackType("music")} /> Music
                      </div>
                      {localErrors?.['primaryTrackType'] && (
                      <span className="text-danger">{localErrors['primaryTrackType']}</span>
                       )}
                    </div>
                    {/* Secondary Track Type */}
                    
                    <div className="col-lg-4 col-md-6">
                      <div className="form-group">
                        <label>Secondary Track Type *</label>
                        <input type="radio" value="original" checked={secondaryTrackType === "original"} onChange={() => setSecondaryTrackType("original")} /> Original
                        <input type="radio" value="karaoke" checked={secondaryTrackType === "karaoke"} onChange={() => setSecondaryTrackType("karaoke")} style={{ marginLeft: "10px" }} /> Karaoke
                        <input type="radio" value="medley" checked={secondaryTrackType === "medley"} onChange={() => setSecondaryTrackType("medley")} style={{ marginLeft: "10px" }} /> Medley
                        <input type="radio" value="cover" checked={secondaryTrackType === "cover"} onChange={() => setSecondaryTrackType("cover")} style={{ marginLeft: "10px" }} /> Cover
                      </div>
                      {localErrors?.['secondaryTrackType'] && (
                      <span className="text-danger">{localErrors['secondaryTrackType']}</span>
                       )}
                    </div>

                    {/* Instrumental */}
                    <div className="col-lg-2 col-md-6">
                      <div className="form-group">
                        <label>Instrumental *</label>
                        <input type="radio" value={true} checked={instrumental === true} onChange={() => setInstrumental(true)} /> Yes
                        <input type="radio" value={false} checked={instrumental === false} onChange={() => setInstrumental(false)} style={{ marginLeft: "10px" }} /> No
                      </div>
                      {localErrors?.['instrumental'] && (
                      <span className="text-danger">{localErrors['instrumental']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Volume *</label>
                        <select className="form-select form-control" value={volume} onChange={(e) => setVolume(e.target.value)}>
                          <option value="">- Select a Volume -</option>
                          {[...Array(20)].map((_, i) => (
                            <option key={i} value={`Volume` + (i + 1)}>{`Volume` + (i + 1)}</option>
                          ))}
                        </select>
                        {localErrors?.['volume'] && (
                      <span className="text-danger">{localErrors['volume']}</span>
                       )}
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Title *</label>
                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                      </div>
                      {localErrors?.['title'] && (
                      <span className="text-danger">{localErrors['title']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Version/Subtitle</label>
                        <input type="text" className="form-control" value={versionSubtitle} onChange={(e) => setVersionSubtitle(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Primary Artist *</label>
                        <SearchInput artistData={primaryArtist} setSelectData={setPrimaryArtist} />
                      </div>
                      {localErrors?.['primaryArtist'] && (
                      <span className="text-danger">{localErrors['primaryArtist']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Featuring</label>
                        <SearchInput artistData={featuring} setSelectData={setFeaturing} />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Mood *</label>
                        <select className="form-select form-control" value={mood} onChange={(e) => setMood(e.target.value)}>
                          <option value="">- Select a mood -</option>
                          <option value={'Romantic'}>Romantic</option>
                          <option value={'Sad'}>Sad</option>
                          <option value={'Happy'}>Happy</option>
                          <option value={'Soulful'}>Soulful</option>
                          <option value={'Chill'}>Chill</option>
                          <option value={'Party'}>Party</option>
                          <option value={'Insirational'}>Insirational</option>


                        </select>
                      </div>
                      {localErrors?.['mood'] && (
                      <span className="text-danger">{localErrors['mood']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Remixer</label>
                        <DynamicInputList inputs={remixer} setInputs={setRemixer} placeholder={"Remixer"} />
                        {/* <SearchInput />  */}
                      </div>
                      {/* <SearchInput />  */}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Author *</label>
                        <DynamicInputList inputs={author} setInputs={setAuthor} placeholder={"Author"} isIPRS={true} />

                      </div>
                      {localErrors?.['author'] && (
                      <span className="text-danger">{localErrors['author']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Composer *</label>
                        <DynamicInputList inputs={composer} setInputs={setComposer} placeholder={"Composer"} isIPRS={true} />

                      </div>
                      {localErrors?.['composer'] && (
                      <span className="text-danger">{localErrors['composer']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Arranger</label>
                        <DynamicInputList inputs={arranger} setInputs={setArranger} placeholder={"Arranger"} isIPRS={true} />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Producer</label>
                        <DynamicInputList inputs={producer} setInputs={setProducer} placeholder={"Producer"} isIPRS={true} />

                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>P Year *</label>
                        <select className="form-select form-control" value={pYear} onChange={(e) => setPYear(e.target.value)}>
                          <option value="">- Select a (P) year -</option>
                          {[...Array(100)].map((_, i) => (
                            <option key={i} value={2026 - i}>{2026 - i}</option>
                          ))}
                        </select>
                      </div>
                      {localErrors?.['pYear'] && (
                      <span className="text-danger">{localErrors['pYear']}</span>
                       )}
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>P Line *</label>
                        <input type="text" className="form-control" value={pLine} onChange={(e) => setPLine(e.target.value)} />
                      </div>
                      {localErrors?.['pLine'] && (
                      <span className="text-danger">{localErrors['pLine']}</span>
                       )}
                    </div>



                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>C Line *</label>
                        <input type="text" className="form-control" value={cLine} onChange={(e) => setCLine(e.target.value)} />
                      </div>
                      {localErrors?.['cLine'] && (
                      <span className="text-danger">{localErrors['cLine']}</span>
                       )}
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>C Year *</label>
                        <select className="form-select form-control" value={cYear} onChange={(e) => setCYear(e.target.value)}>
                          <option value="">- Select a (C) year -</option>
                          {[...Array(100)].map((_, i) => (
                            <option key={i} value={2026 - i}>{2026 - i}</option>
                          ))}
                        </select>
                      </div>
                      {localErrors?.['cYear'] && (
                      <span className="text-danger">{localErrors['cYear']}</span>
                       )}
                    </div>




                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Production Year *</label>
                        <select className="form-select form-control" value={productionYear} onChange={(e) => setProductionYear(e.target.value)}>
                          <option value="">- Select a year -</option>
                          {[...Array(100)].map((_, i) => (
                            <option key={i} value={2026 - i}>{2026 - i}</option>
                          ))}
                        </select>
                      </div>
                      {localErrors?.['productionYear'] && (
                      <span className="text-danger">{localErrors['productionYear']}</span>
                       )}
                    </div>


                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Publisher</label>
                        <DynamicInputList inputs={publisher} setInputs={setPublisher} placeholder={"Publisher"} isIPRS={true} />

                        {/* <input type="text" className="form-control" value={publisher} onChange={(e) => setPublisher(e.target.value)} /> */}
                      </div>
                    </div>
                    {/* {!generateISRC &&
                      <div className="col-lg-3 col-md-6">
                        <div className="form-group">
                          <label>ISRC</label>
                          <input disabled={generateISRC} type="text" className="form-control" value={!generateISRC ? "" : isrc} onChange={(e) => setIsrc(e.target.value)} />
                        </div>
                      </div>
                    }
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Generate ISRC</label>
                        <input type="radio" value={true} checked={generateISRC === true} onChange={() => setGenerateISRC(true)} /> Yes
                        <input type="radio" value={false} checked={generateISRC === false} onChange={() => setGenerateISRC(false)} style={{ marginLeft: "10px" }} /> No
                      </div>
                    </div> */}

                    {!generateISRC &&
                      <div className="col-lg-3 col-md-6">
                        <div className="form-group">
                          <label>ISRC *</label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={generateISRC} // Disabled when "Auto Generate ISRC" is Yes
                            value={generateISRC ? "" : isrc} // Clear input when auto-generate is selected
                            onChange={(e) => setIsrc(e.target.value)}
                          />
                        </div>
                      </div>
                    }
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Generate ISRC</label>
                        <input
                          type="radio"
                          value={true}
                          checked={generateISRC === true}
                          onChange={() => {
                            setGenerateISRC(true); // Enable auto-generate
                            // Clear manual input when auto-generate is selected
                          }}
                        />{" "}
                        Yes
                        <input
                          type="radio"
                          value={false}
                          checked={generateISRC === false}
                          onChange={() => {
                            setGenerateISRC(false)
                            setIsrc("");
                          }
                          } // Allow manual input
                          style={{ marginLeft: "10px" }}
                        />{" "}
                        No
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label htmlFor="genre">Genre *</label>
                        <select
                          value={genre}
                          className="form-select form-control"
                          id="genre"
                          onChange={(e) => setGenre(e.target.value)}
                        >
                          <option value={genre}>{genre ? genre : 'Select a genre'}</option>
                          {GENRES.map((item) =>
                            (<option value={item.name}>{item.name}</option>)
                          )}
                        </select>
                      </div>
                      {localErrors?.['genre'] && (
                      <span className="text-danger">{localErrors['genre']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label htmlFor="subgenre">SubGenre * </label>
                        <input
                          value={subgenre}
                          type="text"
                          className="form-control"
                          id="subgenre"
                          placeholder="SubGenre"
                          onChange={(e) => setSubgenre(e.target.value)}
                        />
                        {/* <select
                          value={subgenre}
                          className="form-select form-control"
                          id="subgenre"
                          onChange={(e) => setSubgenre(e.target.value)}
                          disabled={!subgenres.length} // Disable if no subgenres available
                        >
                          <option value={subgenre}>{subgenre ? subgenre : 'Select a Subgenre'}</option>
                          {subgenres.map((sub) => (
                            <option key={sub.id} value={sub.name}>{sub.name}</option>
                          ))}
                        </select> */}
                      </div>
                      {localErrors?.['subgenre'] && (
                      <span className="text-danger">{localErrors['subgenre']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label htmlFor="genre">Secondary Genre *</label>
                        <select
                          value={secondaryGenre}
                          className="form-select form-control"
                          id="genre"
                          onChange={(e) => setSecondaryGenre(e.target.value)}
                        >
                          <option value={secondaryGenre}>{secondaryGenre ? secondaryGenre : 'Select a Secondary genre'}</option>
                          {GENRES.map((item) =>
                            (<option value={item.name}>{item.name}</option>)
                          )}
                        </select>
                      </div>
                      {localErrors?.['secondaryGenre'] && (
                      <span className="text-danger">{localErrors['secondaryGenre']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label htmlFor="subgenre">Secondary SubGenre * </label>
                        <input
                          value={subSecondaryGenre}
                          type="text"
                          className="form-control"
                          id="subgenre"
                          placeholder="Enter SubGenre"
                          onChange={(e) => setSubSecondaryGenre(e.target.value)}
                        />
                        {/* <select
                          value={subSecondaryGenre}
                          className="form-select form-control"
                          id="subgenre"
                          onChange={(e) => setSubSecondaryGenre(e.target.value)}
                          disabled={!subgenres.length} // Disable if no subgenres available
                        >
                          <option value={subSecondaryGenre}>{subSecondaryGenre ? subSecondaryGenre : 'Select a Secondary Subgenre'}</option>
                          {subgenres.map((sub) => (
                            <option key={sub.id} value={sub.name}>{sub.name}</option>
                          ))}
                        </select> */}
                      </div>
                      {localErrors?.['subSecondaryGenre'] && (
                      <span className="text-danger">{localErrors['subSecondaryGenre']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Price *</label>
                        {/* <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} /> */}
                        <select
                          value={price}
                          className="form-select form-control"
                          id="price"
                          onChange={(e) => setPrice(e.target.value)}
                        >
                          <option value="">Please select...</option>
                          <option selected="selected" value="Premium">Premium</option>
                          <option value="Full">Full</option>
                          <option value="Mid">Mid</option>
                          <option value="Budget">Budget</option>
                        </select>
                      </div>
                      {localErrors?.['price'] && (
                      <span className="text-danger">{localErrors['price']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Parental Advisory *</label>
                        <input type="radio" value="yes" checked={parentalAdvisory === "yes"} onChange={() => setParentalAdvisory("yes")} /> Yes
                        <input type="radio" value="no" checked={parentalAdvisory === "no"} onChange={() => setParentalAdvisory("no")} style={{ marginLeft: "10px" }} /> No
                        <input type="radio" value="no" checked={parentalAdvisory === "Cleaned"} onChange={() => setParentalAdvisory("Cleaned")} style={{ marginLeft: "10px" }} /> Cleaned
                      </div>
                      {localErrors?.['parentalAdvisory'] && (
                      <span className="text-danger">{localErrors['parentalAdvisory']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Preview start *</label>
                        <input type="text" className="form-control" value={previewStart} onChange={(e) => setPreviewStart(e.target.value)} />
                      </div>
                      {localErrors?.['previewStart'] && (
                      <span className="text-danger">{localErrors['previewStart']}</span>
                       )}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Track title language *</label>
                        <select type="text" className="form-select form-control" value={trackTitleLanguage} onChange={(e) => setTrackTitleLanguage(e.target.value)} >
                          {language.map(item => (
                            <option key={item} value={item.value}>
                              {item.label}
                            </option>
                          ))
                          }

                        </select>
                        {localErrors?.['trackTitleLanguage'] && (
                      <span className="text-danger">{localErrors['trackTitleLanguage']}</span>
                       )}
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label>Lyrics language *</label>
                        <select type="text" className="form-select form-control" value={lyricsLanguage} onChange={(e) => setLyricsLanguage(e.target.value)} >
                          {language.map(item => (
                            <option key={item} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {localErrors?.['lyricsLanguage'] && (
                      <span className="text-danger">{localErrors['lyricsLanguage']}</span>
                       )}
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Lyrics</label>
                        <textarea className="form-control" rows="4" value={lyrics} onChange={(e) => setLyrics(e.target.value)} />
                      </div>
                    </div>


                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Add contributors</label>
                        <select
                          className="form-select form-control"
                          onChange={(e) => contributorySelect(e.target.value)}
                        >
                          <option value="">Please Select</option>
                          {contributoryName?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {selectContributory?.map((item) => (
                        <div
                          key={item.id}
                          className="form-control"
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                            alignItems: 'center',
                            marginTop: 20,
                          }}
                        >
                          <input
                            className="form-control"
                            value={item.name}
                            disabled
                          />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Person Name"
                            value={item.value}
                            onChange={(e) => handlecontributoryChange(item.id, e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeContributory(item.id)}
                          >
                            X
                          </button>
                        </div>
                      ))}


                    </div>
                    <div className="col-md-6">

                      <div className="form-group">
                        <label>Add Others contributors</label>
                        <select
                          className="form-select form-control"
                          onChange={(e) => otherscontributorySelect(e.target.value)}
                        >
                          <option value="">Please Select</option>
                          {othersContributoryName?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {otherContributory?.map((item) => (
                        <div
                          key={item.id}
                          className="form-control"
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                            alignItems: 'center',
                            marginTop: 20,
                          }}
                        >
                          <input
                            className="form-control"
                            value={item.name}
                            disabled
                          />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Person Name"
                            value={item.value}
                            onChange={(e) => handleOthersContributoryChange(item.id, e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeOthersContributory(item.id)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>




                  </div>
                  <div className="form-group">
                    {/* Submit Button */}
                    {/* <div className="col-ml-12"> */}
                    <button type="Submit" className="btn btn-primary"
                      onClick={async () => {
                        setErrors?.([]);
                        await handleSubmit();  // Ensure handleSubmit completes first

                        // Then close the modal
                      }}
                    >Save</button>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

