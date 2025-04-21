import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import CarCard from './components/CarCard';

const API_BASE_URL = 'https://mc-api.marketcheck.com/v2';
const API_KEY = import.meta.env.VITE_Car_API_key;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [carList, setCarList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Fix: Boolean, not array

  const fetchCars = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Add rows, start, and sort_by parameters; include query if provided
      // const sedan = car.build?.body_type?.[0];
      const endpoint = `${API_BASE_URL}/search/car/active?api_key=${API_KEY}&rows=36&start=0&sort_by=price&sort_order=desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }

      const data = await response.json();

      // Check if listings exist
      if (!data.listings || data.listings.length === 0) {
        setErrorMessage('No cars found');
        setCarList([]);
        return;
      }

      setCarList(data.listings);
      setErrorMessage('');
    } catch (error) {
      console.error(`Error fetching: ${error}`);
      setErrorMessage('Error fetching, please try again later.');
      setCarList([]);
    } finally {
      setIsLoading(false); // Fix: Set loading to false, not errorMessage
    }
  };

  useEffect(() => {
    fetchCars(searchTerm); // Fetch cars based on search term
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./main1.jpg" alt="main" />
          <br />
          <h1>
            Find your <span className="text-gradient">dream car</span> here!
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className='mt-[40px]'>All your dream cars</h2>
          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {carList.map((car) => (
               <CarCard key={car.id} car={car}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;