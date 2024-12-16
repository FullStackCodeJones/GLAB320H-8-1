import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  // State to hold the cryptocurrency data
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Fetch prices for multiple currencies in parallel
        const [usdResponse, eurResponse, gbpResponse] = await Promise.all([
          axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: { vs_currency: "usd", ids: "bitcoin,ethereum,litecoin" },
          }),
          axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: { vs_currency: "eur", ids: "bitcoin,ethereum,litecoin" },
          }),
          axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: { vs_currency: "gbp", ids: "bitcoin,ethereum,litecoin" },
          }),
        ]);

        // Combine the results from different currencies
        setPrices({
          usd: usdResponse.data,
          eur: eurResponse.data,
          gbp: gbpResponse.data,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err); // Log the error
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchPrices();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Display loading, error, or the list of prices
  return (
    <div>
      <h2>Cryptocurrency Prices</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h3>USD Prices</h3>
          <ul>
            {prices.usd?.map((coin) => (
              <li key={coin.id}>
                <h4>{coin.name}</h4>
                <p>USD: ${coin.current_price}</p>
              </li>
            ))}
          </ul>
          <h3>EUR Prices</h3>
          <ul>
            {prices.eur?.map((coin) => (
              <li key={coin.id}>
                <h4>{coin.name}</h4>
                <p>EUR: €{coin.current_price}</p>
              </li>
            ))}
          </ul>
          <h3>GBP Prices</h3>
          <ul>
            {prices.gbp?.map((coin) => (
              <li key={coin.id}>
                <h4>{coin.name}</h4>
                <p>GBP: £{coin.current_price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
