import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "../hooks/useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  useEffect(() => {
    // initial code to console.log the response from the API call
    // pet.breeds(animal).then(console.log, console.error);
    // when animal changes, clear out all of the breeds using an empty []
    setBreeds([]);
    // when animal changes, clear out the current breed with an emtpy string
    setBreed("");
    /* call the pet API, which is a promise that returns an object i.e. {breeds: Array(257)}. then do destructuring to get the breeds which is an array of objects. And the array contains objects i.e. {name: "Affenpinscher", _links: {…}}. Perform Map method on the array, and do more destructing to just grab the name aka object.name
     */
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
    // declare the dependencies for useEffect so that useEffect does NOT run after every re-render. We only want useEffect to run when animal changes, but it also technically depends on setBreeds and setBreed so we'll add it to the []
  }, [animal]);

  return (
    <div className="search-params">
      <form>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
