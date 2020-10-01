import React, { useState, useEffect, FunctionComponent } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "../hooks/useDropdown";
import Results from "./Results";

const SearchParams: FunctionComponent= () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals }: any = await pet.animals({
      location,
      breed,
      type: animal
    })

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error)
  }, [animal])

  return (
    <div className="search-params">
      <form
        onSubmit={(event => {
          event.preventDefault();
          requestPets();
        })}
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
        <button type="submit">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
