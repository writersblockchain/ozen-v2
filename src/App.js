import React from 'react'
import Nav from './components/Nav'
import Main from './components/Main'
import './App.scss'
// import MusicPlayer from './components/MusicPlayer'
import { useState } from 'react'
import { ethers } from "ethers";

const App = () => {


  // 1. Set Up MetaMask + request accounts 
  const { ethereum } = window;
  let provider;

  if(ethereum) {
    ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(ethereum);

  } else {
    console.log("You need to install MetaMask!");
  }

  async function setAccount() {
    let signer = await provider.getSigner();
    let addr1 = await signer.getAddress();

    setAddress(addr1);
  }

  // React state
  const [songTitle, setSongTitle] = useState("Kwaku the Traveller");
  const [songArtist, setSongArtist] = useState('Black Sherif');
  const [songUri, setSongUri] = useState("");
  const [songCoverUri, setSongCoverUri] = useState("https://hackathon.skalenodes.com/fs/downright-royal-saiph/6558e89b3399a2bc82bfc98b0bce6e13163243f1/2.jpeg");
  const [address, setAddress] = useState("Connect");
  const [balance, setBalance] = useState(0);
  const [stationId, setStationId] = useState(0);
  const [stationName, setStationName] = useState("");
  const [stationSongId, setStationSongId] = useState(0);
  const [songId, setSongId] = useState('');

 


  return (
    <div className='outerWrap'>
      <div className="App">
     <Nav/>
     
     <Main
     
         songTitle={songTitle}
         setSongTitle={setSongTitle}
         songArtist={songArtist}
         setSongArtist={setSongArtist}
         setSongUri={setSongUri}
         setSongCoverUri={setSongCoverUri}
         songCoverUri={songCoverUri}
         setAddress={setAddress}
         stationId={stationId}
         setStationId={setStationId}
         setStationName={setStationName}
         setStationSongId={setStationSongId}
         songId={songId}
     />
        </div>
         <div className="musicControls"></div>
         {/* <MusicPlayer
         songTitle={songTitle}
         setSongTitle={setSongTitle}
         songArtist={songArtist}
         setSongArtist={setSongArtist}
         setSongUri={setSongUri}
         setSongCoverUri={setSongCoverUri}
         songCoverUri={songCoverUri}
         setAddress={setAddress}
         stationId={stationId}
         setStationId={setStationId}
         setStationName={setStationName}
         setStationSongId={setStationSongId}
         songId={songId}

         /> */}
         {/* </div>
          */}
      </div>

  
  )
}

export default App