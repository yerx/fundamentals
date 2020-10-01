import React, { useState } from "react";
import { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "../hooks/useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  // eslint-disable-next-line
  const [breeds, setBreeds] = useState([]);
  // eslint-disable-next-line
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  // eslint-disable-next-line
  const [breed, BreedDropdown] = useDropdown("Breed", "", breeds);

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
