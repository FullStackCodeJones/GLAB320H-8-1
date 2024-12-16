export async function getAllStarships() {
  try {
    const response = await fetch("https://swapi.py4e.com/api/starships/");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching starships:", error);
    return [];
  }
}
