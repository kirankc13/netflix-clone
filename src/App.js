import React from 'react';
import './App.css';
import requests from './requests';
import { Row } from './Row';
import { Banner } from './Banner';
import { Nav } from './Nav';

function App() {
  return (
    <div className="App">      
      <Nav/>
      <Banner/>
      <Row title="NETFLIX ORIGINALS" isLargerRow="true" fetchUrl={requests.fetchNetflixOriginals}/>
      <Row title="Trending Movies" fetchUrl={requests.fetchTrending}/>
      <Row title="Action" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>

    </div>
  );
}

export default App;
