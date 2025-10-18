
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import FlightCard from './FlightCard';
import { searchFlights } from '../../services/flightService'; 

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); 

  useEffect(() => {
    
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const departure = searchParams.get('departure');

    //  Create a params object to send to the API
    const params = { from, to, departure };
    
    setLoading(true);
    //  Call the API with the search params
    searchFlights(params)
      .then(res => {
        if (res?.success) {
          setFlights(res.data);
        }
      })
      .catch(err => {
        console.error('Flight fetch failed:', err);
        setFlights([]); // Clear flights on error
      })
      .finally(() => {
        setLoading(false);
      });

  }, [searchParams]); //  Rerun this effect whenever the URL search params change

  if (loading) {
    return <p className="text-center mt-8 text-xl">Searching for flights...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Available Flights</h2>
      <div className="space-y-4">
        {flights.length > 0 ? (
          flights.map(f => <FlightCard key={f.id} flight={f} />)
        ) : (
          <p className="text-center bg-white p-6 rounded-lg shadow">No flights found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;