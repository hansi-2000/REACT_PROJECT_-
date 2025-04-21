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
  const [isLoading, setIsLoading] = useState(false);

  const fetchCars = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Construct the endpoint based on query presence
      const endpoint = query
        ? `${API_BASE_URL}/search/car/active?api_key=${API_KEY}&q=${encodeURIComponent(query)}&rows=36&start=0&sort_by=price&sort_order=desc`
        : `${API_BASE_URL}/search/car/active?api_key=${API_KEY}&category=sedan|suv|coupe|truck&rows=36&start=0&sort_by=price&sort_order=desc`;

      console.log('Fetching from:', endpoint); // Debug: Log the endpoint

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Log the response to inspect its structure
      console.log('API Response:', data);

      // Handle the listings array
      const listings = data.listings || data.data || data.results || data || [];
      if (!listings || listings.length === 0) {
        setErrorMessage('No cars found');
        setCarList([]);
        return;
      }

      // Filter out cars without a price
      const validListings = listings.filter((car) => car.price);
      setCarList(validListings);
      setErrorMessage('');
    } catch (error) {
      console.error(`Error fetching: ${error}`);
      setErrorMessage('Error fetching cars, please try again later.');
      setCarList([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger initial fetch on mount
  useEffect(() => {
    fetchCars(); // Fetch cars without a query
  }, []);

  // Handle manual search
  const handleSearch = () => {
    fetchCars(searchTerm);
  };

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
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">
            All your dream cars (Sorted by Price: High to Low)
          </h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {carList.map((car) => (
                <CarCard key={car.id || car.vin} car={car} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;