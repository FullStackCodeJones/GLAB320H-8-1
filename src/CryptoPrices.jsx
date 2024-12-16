import React from "react";
import CryptoPrices from "./CryptoPrices"; // Import the CryptoPrices component

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Crypto Prices App</h1>
      <CryptoPrices /> {/* Render the CryptoPrices component */}
    </div>
  );
};

export default HomePage;
