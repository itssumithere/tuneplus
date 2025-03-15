import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { images } from '../../assets/images';
import { base } from '../../Constants/Data.constant';
import { getData, postData } from '../../Services/Ops';
import { useUserProfile } from '../../Context/UserProfileContext';

export default function SearchInput(props) {
  const { artistData = [], setSelectData } = props;
  const [query, setQuery] = useState("");
  const { userPermission, userProfile } = useUserProfile()
  const [artistList, setArtistList] = useState([]);
  const [link, setLink] = useState("");
  const [itunesLinkId, setItunesLinkId] = useState("");

  const [selectedArtists, setSelectedArtists] = useState(Array.isArray(artistData) ? artistData : []);

  // Fetch artist list once on component mount
  useEffect(() => {
    fetchArtistList();
  }, []);

  // Update selected artists when artistData prop changes
  useEffect(() => {
    if (Array.isArray(artistData)) {
      setSelectedArtists(artistData);
    }
  }, [artistData]);

  const addArtist = (artist) => {
    // Prevent duplicate artist entries
    if (!selectedArtists.some(item => item._id === artist._id)) {
      const updatedArtists = [...selectedArtists, artist];
      console.log("updatedArtists-----", updatedArtists)
      setSelectedArtists(updatedArtists);
      setSelectData(updatedArtists);  // Update parent component
    }

    setQuery("");
    setLink("");
    setItunesLinkId("")
  };

  const removeArtist = (artistId) => {
    const updatedArtists = selectedArtists.filter(artist => artist._id !== artistId);
    setSelectedArtists(updatedArtists);
    setSelectData(updatedArtists);  // Update parent component
  };

  const filteredArtists = artistList.filter(artist =>
    artist.name.toLowerCase().includes(query.toLowerCase())
  );

  const addHandleSubmit = async () => {
    let body = { name: query, linkId: link, itunesLinkId: itunesLinkId };
    let result = await postData(base.addArtist, body);
    console.log("artiest result======", result)

    if (result.data.status === true) {
      Swal.fire("Success", result.message, "success");
      fetchArtistList();
      setQuery("");
      setLink("");
      setItunesLinkId("")
      addArtist(result.data.data)


    } else {
      Swal.fire("Error", result.message, "error");
    }
  }

  const fetchArtistList = async () => {
    let result = await getData(base.fetchArtistList);
    if (result.status === true) {
      setArtistList(result.data);
    } else {
      Swal.fire("Error", "Failed to fetch artist list", "error");
    }
  }

  return (
    <div>
      <input className="form-control" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for an artist..." />
      <div className="input-group input-group-sm">
      </div>

      {query && (
        <ul>
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <li key={artist._id} onClick={() => addArtist(artist)} className="form-control">
                <span >{artist.name}</span>
                {artist.linkId && <a href={artist.linkId} target="_blank"> <img src='https://static.believedigital.com/images/logos/stores/204.svg' height="20" width="20"></img></a>}
                {artist.itunesLinkId && <a href={artist.itunesLinkId} target="_blank"> <img src='https://static.believedigital.com/images/logos/stores/408.svg' height="20" width="20"></img></a>}

              </li>
            ))
          ) : (
            <div className="box">
             
                <div className="box-body">

                  <div className="form-input">
                    <label>Artist Name</label>
                    <input
                      className="form-control"
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter artist name..."
                    />
                  </div>
                  <div className="form-input">
                    <label>Add Spotify Link Id</label>
                    <input
                      className="form-control"
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Add Spotify Link Id..."
                    />
                  </div>
                  <div className="form-input">
                    <label>Itunes Link Id</label>
                    <input
                      className="form-control"
                      type="text"
                      value={itunesLinkId}
                      onChange={(e) => setItunesLinkId(e.target.value)}
                      placeholder="Add Itunes Link Id..."
                    />
                  </div>
                  {/* <div className="form-input"> */}

                  <button
                    className="btn btn-success btn-flat form-control "
                    type="button"
                    onClick={addHandleSubmit}
                    style={{ marginTop: 20 }}
                  >
                    Add Artist
                  </button>
                  {/* </div> */}


                </div>
              
            </div>
          )}
        </ul>
      )}

      <div>
        {selectedArtists.map((artist) => (
          <div key={artist._id} className="artist-item form-control d-flex flex-wrap align-items-center">
            <div className="artist-img d-flex align-items-center">
              <img src={images.user} className="img-fluid" />
              <div className="artist-name">
                <span>{artist.name}</span>
              </div>
            </div>
            <div className="artist-music d-flex align-items-start">
              {artist.linkId && <a href={artist.linkId} target="_blank"> <img src='https://static.believedigital.com/images/logos/stores/204.svg' className="img-fluid"></img></a>}
              {artist.itunesLinkId && <a href={artist.itunesLinkId} target="_blank"> <img src='https://static.believedigital.com/images/logos/stores/408.svg' className="img-fluid"></img></a>}
              <div className="remove-artist">
                <button className="btn btn-primary" onClick={() => removeArtist(artist._id)}>x</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
