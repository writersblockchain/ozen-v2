import Playlists from "./Playlists";

const MusicPlayer = ({setSongTitle, songTitle, songArtist,
    setSongArtist,
     setSongUri, songCoverUri,
    setSongCoverUri,
    stationId,
    setStationId,
    setStationName,
    setStationSongId, songId,setSongId}) => {

// Station database
const stations = 
[{
  id: 1,
  name: "Ozen Stream",
  songs: [4,3,2],
  stationAppAddress: "0x00",
}, {
  id: 2,
  name: "New Finds",
  songs: [5,1],
  stationAppAddress: "0x00",
}]

// Song database
const songs = 
[{
  id: 1,
  title: "There, where it's good",
  artist: "ANIKV",
  uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/1.mp3",
  coverUri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/1.jpeg",
  promoted: true,
  flowRate: 285802469135802,
  artistAppAddress: "0x0"
}, {
  id: 2,
  title: "Kwaku the Traveller",
  artist: 'Black Sherif',
  uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/2.mp3",
  coverUri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/2.jpeg",
  promoted: true,
  flowRate: 285802469135802,
  artistAppAddress: "0x0"
}, {
  id: 3,
  title: 'Break It Off',
  artist: 'PinkPantheress',
  uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/3.mp3",
  coverUri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/3.jpeg",
  promoted: false,
  flowRate: 385802469135802,
  artistAppAddress: "0x0"
}, {
  id: 4,
  title: 'Free Mind',
  artist: 'Tems',
  uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/4.mp3",
  coverUri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/4.jpeg",
  promoted: false,
  flowRate: 385802469135802,
  artistAppAddress: "0x0"
}, {
  id: 5,
  title: 'Essence',
  artist: 'WizKid',
  uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/5.mp3",
  coverUri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/5.jpeg",
  promoted: false,
  flowRate: 385802469135802,
  artistAppAddress: "0x0"
}];

function playStation(stationId) {
  const station = stations.find(x => x.id === stationId);
  setStationId(station.id);
  setStationName(station.name);
  setStationSongId(station.songs[0]);
  playSong(station.songs[0], false);
}

function handleSongEnded() {
  console.log('song ended');
  // If a station is playing, progress to the next song
  if(stationId) {
    const station = stations.find(x => x.id === stationId);
    const currentSongIndex = station.songs.findIndex((element) => element === songId);
    let newSongIndex = currentSongIndex + 1;
    if(newSongIndex >= station.songs.length) newSongIndex = 0;
    setStationSongId(station.songs[newSongIndex]);
    playSong(station.songs[newSongIndex], false);
  }
}

function playSong(songId, endStationPlay) {  
  console.log('playing songid: ' + songId);
  // End any station play if just this song was selected
  if(endStationPlay) {
    setStationId(0);
    setStationName("");
    setStationSongId(0);
  }

  // Play song
  const song = songs.find(x => x.id === songId);
  const player = document.querySelector('#player');
  player.src = song.uri;
  setSongId(song.id);
  setSongCoverUri(song.coverUri);
  setSongTitle(song.title);
  setSongArtist(song.artist);
  console.log("Song accessed from URI: " + song.uri);
  player.play();
}


  return (
<div>

    <div className="MusicPlayer">
  <audio className="player" controls src="" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
     
      <img className="coverImage" alt='' src={songCoverUri}/>
    </div>
    </div>

      
  );
}
export default MusicPlayer;


{/* <div className="App">

<h2>Select station</h2>
<div id="station-list">
  <ul>
    {stations.map((station) => (
      <li key={station.id}>{station.name} <button onClick={() => playStation(station.id)}>Play</button></li>
    ))} 
  </ul>
</div>
<h2>Select song</h2>
<div id="song-list">
  <ul>
    {songs.map((song) => (
      <li key={song.id}>{song.title} <button onClick={() => playSong(song.id, true)}>Play</button></li>
    ))} 
  </ul>
</div>
<h4>{stationName}</h4>
<h3>{songArtist}</h3>
<div>        
  <img id="coverImage" src={songCoverUri} style={{width:'200px', height:'200px', backgroundColor:'gray'}}/>
</div>     
<h4>{songTitle}</h4>
<div>
  <audio id="player" controls src="" type="audio/mpeg" onEnded={handleSongEnded}>
      Your browser does not support the audio element.
  </audio>
</div>
</div> */}
