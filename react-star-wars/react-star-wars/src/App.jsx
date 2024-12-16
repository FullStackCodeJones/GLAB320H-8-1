import React, { useState, useEffect } from "react";
import { getAllStarships } from "./services/sw-api.js";
import StarshipCard from "./components/StarshipCard";

function App() {
  const [starships, setStarships] = useState([]); // State to hold starship data

  useEffect(() => {
    // Fetch the starships when the app loads
    getAllStarships().then((data) => setStarships(data));
  }, []); // Empty dependency array to run the effect once after the initial render

  return (
    <div className="App">
      <h1>Star Wars Starships</h1>
      {starships.length > 0 ? (
        starships.map((starship) => (
          <StarshipCard key={starship.name} starship={starship} />
        ))
      ) : (
        <p>Loading starships...</p>
      )}
    </div>
  );
}

export default App;
