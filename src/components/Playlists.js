import React from 'react'
import { ReactComponent as PlayIcon } from '../svgs/play.svg'
// import {Link} from 'react-router-dom'

const Playlists = (props, {setSongTitle, songTitle, songArtist,
  setSongArtist,
   setSongUri, songCoverUri,
  setSongCoverUri,
  stationId,
  setStationId,
  setStationName,
  setStationSongId, songId,setSongId}) => {

// // Station database
// const stations = 
// [{
//   id: 1,
//   name: "Ozen Stream",
//   songs: [4,3,2],
//   stationAppAddress: "0x00",
// }, {
//   id: 2,
//   name: "New Finds",
//   songs: [5,1],
//   stationAppAddress: "0x00",
// }]

    const dataPlaylists = [
        {
          id: 1,
          category_id: 2,
          title: 'Kwaku the Traveller',
          coverUri:
          "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/2.jpeg",
          artist: 'Black Sherif',
          uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/2.mp3",
          promoted: true,
          flowRate: 285802469135802,
          artistAppAddress: "0x0"
        },
        {
          id: 2,
          category_id: 3,
          title: 'Break It Off',
          coverUri:
            'https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/3.jpeg',
          artist: 'LPinkPantheress',
          uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/3.mp3",
          promoted: false,
          flowRate: 385802469135802,
          artistAppAddress: "0x0"
        },
        {
          id: 3,
          category_id: 2,
          title: `There, where it's good`,
          coverUri:
          "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/1.jpeg",
          artist: 'ANIKV',
          uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/1.mp3",
          promoted: true,
          flowRate: 285802469135802,
          artistAppAddress: "0x0"
        },
        {
          id: 4,
          category_id: 1,
          title: 'Essence',
          coverUri:
            'https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/5.jpeg',
          artist: 'WizKid',
          uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/5.mp3",
          promoted: false,
          flowRate: 385802469135802,
          artistAppAddress: "0x0"
        },
        {
          id: 5,
          category_id: 1,
          title: 'Free Mind',
          coverUri:
            'https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/4.jpeg',
          artist: 'Tems',
          uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/4.mp3",
          promoted: false,
          flowRate: 385802469135802,
          artistAppAddress: "0x0"
        },
      ]

      // function playStation(stationId) {
      //   const station = stations.find(x => x.id === stationId);
      //   setStationId(station.id);
      //   setStationName(station.name);
      //   setStationSongId(station.songs[0]);
      //   playSong(station.songs[0], false);
      // }
      
      // function handleSongEnded() {
      //   console.log('song ended');
      //   // If a station is playing, progress to the next song
      //   if(stationId) {
      //     const station = stations.find(x => x.id === stationId);
      //     const currentSongIndex = station.songs.findIndex((element) => element === songId);
      //     let newSongIndex = currentSongIndex + 1;
      //     if(newSongIndex >= station.songs.length) newSongIndex = 0;
      //     setStationSongId(station.songs[newSongIndex]);
      //     playSong(station.songs[newSongIndex], false);
      //   }
      // }
      
      // function playSong(songId, endStationPlay) {  
      //   console.log('playing songid: ' + songId);
      //   // End any station play if just this song was selected
      //   if(endStationPlay) {
      //     setStationId(0);
      //     setStationName("");
      //     setStationSongId(0);
      //   }
      
      //   // Play song
      //   const song = songs.find(x => x.id === songId);
      //   const player = document.querySelector('#player');
      //   player.src = song.uri;
      //   setSongId(song.id);
      //   setSongCoverUri(song.coverUri);
      //   setSongTitle(song.title);
      //   setSongArtist(song.artist);
      //   console.log("Song accessed from URI: " + song.uri);
      //   player.play();
      // }
      











      let matchedPlaylists = dataPlaylists
      .filter(playlist => playlist.category_id === props.category_id)




    return (
 

      
    <div className='cardsWrapInner'>
    
{matchedPlaylists.map((playlist, id) => (
  // <Link to={`/playlist/` + playlist.id}>
          <div className="card" key={id}>
             <div className="cardImage">
     <img src={playlist.coverUri} alt=''></img>
    </div>

    <div className='cardContent'>
     <h3>{playlist.title}</h3>
     <span> {playlist.artist}</span>
    </div>
    <span className="playIcon">
    <PlayIcon/>
    </span> 
      </div>
      // </Link>
))}
      </div>
      

      
 

    )

    
}



export default Playlists