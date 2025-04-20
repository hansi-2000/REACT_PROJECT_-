import React, { useEffect, useState } from 'react'
import Search from './components/Search'

const API_BASE_URL = 'https://mc-api.marketcheck.com/v2';

const API_KEY = import.meta.env.VITE_Car_API_key;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const fetchCars = async () => {
    try{
      const endpoint = `${API_BASE_URL}/listing/car/id?api_key=${API_KEY}`

      const response = await fetch(endpoint, API_OPTIONS);
      alert(response);

    } catch (error){
      console.error(`Error fetching: ${error}`);
      setErrorMessage('Error fetching, please try again later.');
    }
  }

  useEffect(() => {
    fetchCars();

  }, []); // loads at the start (for that we declare empty dependency array)

  return (
    <main>
      <div className="pattern"/>
     <div className='wrapper'>
      <header>
        <img src="./main1.jpg" alt='main'/>
        <br/>
        <h1>Find your <span className='text-gradient'>dream vehicle</span> here!</h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>
      <section className='all-movies'>
        <h2>All Cars</h2>

        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </section>

     </div>
   
    </main>
  )
}

export default App
