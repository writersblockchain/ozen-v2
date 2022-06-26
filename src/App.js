import {ethers} from 'ethers';
import Nav from './components/Nav'
import './App.scss'
import React from 'react'
import {GetBalance} from './GetBalance.js';
import {StartFunction} from './StartFunction.js';
import {StopFunction} from './StopFunction.js';
import userAppArtifact from "./abis/UserApp.json"
import { ReactComponent as PlayIcon } from './svgs/play.svg'

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
}];


function App() {   

  // React state
  const [songId, setSongId] = React.useState(0);
  const [songTitle, setSongTitle] = React.useState("");
  const [songArtist, setSongArtist] = React.useState("");
  const [songUri, setSongUri] = React.useState("");
  const [songCoverUri, setSongCoverUri] = React.useState("./images/default-cover.png");
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
    // console.log('attempting to set balance');
    // console.log('signer:');
    // console.log(signer);
    if(signer) {
      const balance = await GetBalance(userAppAddress, artistAppAddress, radioAppAddress, ozenTokenAddress, ozenABI, signer);
      // console.log('balance %s', balance.userAppBalance);
      setBalance(balance.userAppBalance);
    }    
    setTimeout(setBalanceContinuously, 500);
  }

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
      const currentSongIndex = station.songs.findIndex((element) => element == songId);
      let newSongIndex = currentSongIndex + 1;
      if(newSongIndex >= station.songs.length) newSongIndex = 0;
      setStationSongId(station.songs[newSongIndex]);
      playSong(station.songs[newSongIndex], false);
    }
    else {
      handleStreamFinished();
    }
  }

  function handleStreamFinished() {
    StopFunction();
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

    // Start flow
    StartFunction(userAppAddress, artistAppAddress, ozenTokenAddress, ozenABI, song.flowRate, signer, song.promoted);
  }


  return (
    <div className='outerWrap'>
      <div className="App">
        <Nav/>     
        <div className="main">
          <div className="upperNav">
            <img className='ozen-logo' src="/ozen_white.png" alt='' />
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12 }} >
              <button id="btn-connect" onClick={connectWallet} style={{maxWidth: '140px'}}>{address}</button>
            </div>
          </div>
          <div className='mainContent'>
          <div>
          {categories.map((category, id) => (
            <div className="cardsWrap" key={id}>
              <h2>{category.name}</h2>
              <p className="subText">{category.tagline}</p>
              <div className='cardsWrapInner'>    
                {songs.filter(song => song.category_id === id).map((song, id) => (
                  <div className="card" key={id} onClick={() => playSong(song.id, true)}>
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
        <button onClick={handleStreamFinished}/>
        <img className="coverImage" alt='' src={songCoverUri}/>
      </div>
    </div>  
  )
}

export default App