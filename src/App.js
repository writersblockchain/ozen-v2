import {ethers} from 'ethers';
import './App.scss'
import React from 'react'
import {GetBalance} from './GetBalance.js';
import {StartFunction} from './StartFunction.js';
import {StopFunction} from './StopFunction.js';
import userAppArtifact from "./abis/UserApp.json"
import { ReactComponent as PlayIcon } from './svgs/play.svg'
import {Link} from "react-router-dom";

const ozenTokenAddress = "0xab573EC236CAf73d48cCFB00C116943A15be7f35";
const userAppAddress = "0xa37F2fBdd86B5A686E5733C8B838E3beC9b5d174";
const artistAppAddress = "0xE3F6cbFad9DB22acFD4251dd87B162AffCD2ae69";
const radioAppAddress = "0x46F411c24ffF4338Fb1f09a026Da1a3F3b764Ec5";
const ozenABI = [
  "function balanceOf(address) view returns(uint256)",
  "function createFlowToArtist(ISuperfluidToken,address,int96)",
  "function createFlowFromArtist(ISuperfluidToken,int96,address)",
  "function deleteFlowToArtist(ISuperfluidToken,address)",
  "function deleteFlowFromArtist(ISuperfluidToken,address)"
];

// Category database
const categories = [
  {
    id: 1,
    name: 'DJ DAO',
    tagline: 'Music curated by DAOs',
  },
  {
    id: 2,
    name: 'Listen & Earn',
    tagline: 'Listen to promoted music',
  },
  {
    id: 3,
    name: 'Listen & Spend',
    tagline: 'Spend tokens to listen to exclusive content',
  },
]

// Station database
const stations = 
[{
  id: 1,
  name: "ōzen Stream",
  songs: [4,3,2],
  stationAppAddress: "0x00",
}
// , {
//   id: 2,
//   name: "New Finds",
//   songs: [5,1],
//   stationAppAddress: "0x00",
// }
]

// Song database
const songs = 
[{
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
  category_id: 2,
  title: 'Break It Off',
  coverUri:
    'https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/3.jpeg',
  artist: 'LPinkPantheress',
  uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/3.mp3",
  promoted: true,
  flowRate: 385802469135802,
  artistAppAddress: "0x0"
},
{
  id: 3,
  category_id: 2,
  title: `There, Where It's Good`,
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
  category_id: 3,
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
  category_id: 3,
  title: 'Free Mind',
  coverUri:
    'https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/4.jpeg',
  artist: 'Tems',
  uri: "https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/4.mp3",
  promoted: false,
  flowRate: 385802469135802,
  artistAppAddress: "0x0"
}];


function App() {   

  // React state
  const [songId, setSongId] = React.useState(0);
  const [songTitle, setSongTitle] = React.useState("");
  const [songArtist, setSongArtist] = React.useState("");
  const [songUri, setSongUri] = React.useState("");
  const [songCoverUri, setSongCoverUri] = React.useState("https://img.spacergif.org/v1/spacer.gif");
  const [address, setAddress] = React.useState("Connect");
  const [balance, setBalance] = React.useState(0);
  const [stationId, setStationId] = React.useState(0);
  const [stationName, setStationName] = React.useState("");
  const [stationSongId, setStationSongId] = React.useState(0);

  const { ethereum } = window;
  let provider;
  let signer;

  async function connectWallet() {
    // Show loading
    document.querySelector("#btn-connect").innerText = "Connecting...";
    
    // Try to connect
    if(ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts'});
      provider = new ethers.providers.Web3Provider(ethereum);
      signer = provider.getSigner(0);
      const connectedUserAddress = await signer.getAddress();
      setAddress(connectedUserAddress);    
      setBalanceContinuously();   
    } else {
      console.log("MetaMask not available");
    }   
  }

  async function setBalanceContinuously() {
    // console.log('setBalanceContinuously');
    // console.log('signer:');
    // console.log(signer);
    if(signer) {
      const balance = await GetBalance(userAppAddress, artistAppAddress, radioAppAddress, ozenTokenAddress, ozenABI, signer);
      // console.log('balance %s', balance.userAppBalance);
      setBalance((Math.round(balance.userAppBalance * 1000) / 1000).toLocaleString("en-US"));
    }    
    setTimeout(setBalanceContinuously, 500);
  }

  function playStation(stationId) {
    const station = stations.find(x => x.id === stationId);
    setStationId(station.id);
    setStationName(station.name);
    setStationSongId(station.songs[0]);
    playSong(station.songs[0], false,true);
  }

  function handleSongEnded() {
    console.log('song ended');
    // If a station is playing, progress to the next song
    if(stationId) {
      const station = stations.find(x => x.id === stationId);
      const currentSongIndex = station.songs.findIndex((element) => element == songId);
      let newSongIndex = currentSongIndex + 1;
      if(newSongIndex >= station.songs.length) newSongIndex = 0;
      setStationSongId(station.songs[newSongIndex]);
      playSong(station.songs[newSongIndex], false,true);
    }
    else {
      // handleStreamFinished();
    }
  }

  function handleStreamFinished() {
    const song = songs.find(x => x.id === songId);
    StopFunction(userAppAddress, artistAppAddress, ozenTokenAddress, null, song.promoted);
  }

  async function playSong(songId, endStationPlay, free) {  
    console.log('playing songid: ' + songId);
    // End any station play if just this song was selected
    if(endStationPlay) {
      setStationId(0);
      setStationName("");
      setStationSongId(0);
    }

    const song = songs.find(x => x.id === songId);

    // Start flow
    if(!free) {

      await StartFunction(userAppAddress, artistAppAddress, ozenTokenAddress, ozenABI, song.flowRate, signer, song.promoted);

    }
   
    // Play song    
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
    <div className='outerWrap'>
      <div className="App">
        <div className='navBar'>
          <div className='logo'></div>
          <ul>
            <Link to='/'><li className='active'>Home</li></Link>
            <Link to='/search'><li>Search</li></Link>
            <Link to='/your-library'><li>Your Library</li></Link>
          </ul>
          <div id="balance" style={{fontSize: '2em', fontWeight: '700', color: 'white', marginTop: '50px', padding: '12px' }}><span style={{fontSize:'.4em', color: '#cccccc'}}>BALANCE<br/></span>{balance}</div>        
          <div className='cookies'>
            <span>Coded by</span>
            <span>Chainshot devs</span>
          </div>
        </div>          
        <div className="main">
          <div className="upperNav">
            <img className='ozen-logo' src="/ozen_white.png" alt='' />
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12 }} >
              <button id="btn-connect" onClick={connectWallet} style={{maxWidth: '140px'}}>{address}</button>
            </div>
          </div>
          <div className='mainContent'>
          <div>
          {categories.filter(category => category.id === 1).map((category) => (
            <div className="cardsWrap" key={category.id}>
              <h2>{category.name}</h2>
              <p className="subText">{category.tagline}</p>
              <div className='cardsWrapInner'>    
                {stations.map((station) => (
                  <div className="card" key={station.id} onClick={() => playStation(station.id)}>
                    <div className="cardImage">
                      <img src="./images/ozen_stream_cover.jpg" alt=''></img>
                    </div>
                    <div className='cardContent'>
                      <h3>{station.name}</h3>
                    </div>
                    <span className="playIcon">
                    <PlayIcon/>
                    </span> 
                  </div>           
                ))}
              </div>
            </div>
          ))}
          {categories.filter(category => category.id !== 1).map((category) => (
            <div className="cardsWrap" key={category.id}>
              <h2>{category.name}</h2>
              <p className="subText">{category.tagline}</p>
              <div className='cardsWrapInner'>    
                {songs.filter(song => song.category_id === category.id).map((song) => (
                  <div className="card" key={song.id} onClick={() => playSong(song.id, true)}>
                    <div className="cardImage">
                      <img src={song.coverUri} alt=''></img>
                    </div>
                    <div className='cardContent'>
                      <h3>{song.title}</h3>
                      <span> {song.artist}</span>
                    </div>
                    <span className="playIcon">
                    <PlayIcon/>
                    </span> 
                  </div>           
                ))}
              </div>
            </div>
          ))}
          </div>
          </div>
        </div>
        <div className="musicControls">          
        </div>  
      </div>
      <div className="musicControls">
        <audio id="player" controls src="" type="audio/mpeg" onEnded={handleSongEnded} onPause={handleStreamFinished}>
            Your browser does not support the audio element.
        </audio>        
        <img className="coverImage" alt='' src={songCoverUri}/>
      </div>
    </div>  
  )
}

export default App