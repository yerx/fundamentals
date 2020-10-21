import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "../hooks/useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  useEffect(() => {
    // initial code to console.log the response from the API call
    // pet.breeds(animal).then(console.log, console.error);
    // when animal changes, clear out all of the breeds using an empty []
    setBreeds([]);
    // when animal changes, clear out the current breed with an emtpy string
    setBreed("");
    /* call the pet API, which is a promise that returns an object i.e. {breeds: Array(257)}. then do destructuring to get the breeds which is an array of objects. And the array contains objects i.e. {name: "Affenpinscher", _links: {…}}. Perform Map method on the array, and do more destructing to just grab the name aka object.name
     */
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
    // declare the dependencies for useEffect so that useEffect does NOT run after every re-render. We only want useEffect to run when animal changes, but it also technically depends on setBreeds and setBreed so we'll add it to the []
  }, [animal, setBreed]);

  return (
    <div className="search-params">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }} type="submit">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
