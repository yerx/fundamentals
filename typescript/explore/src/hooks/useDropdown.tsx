import React, {
  useState,
  FunctionComponent, SetStateAction
} from "react";

const useDropDown = (
  label: string,
  defaultState: string,
  options: string[]
  ) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown: FunctionComponent = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state}
        onChange={(event) => setState(event.target.value)}
        onBlur={(event) => setState(event.target.value)}
        disabled={options.length === 0}
      >
        <option>All</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
  return [state, Dropdown, setState] as [
    string,
    FunctionComponent,
    SetStateAction<any>
  ];
};

export default useDropDown;
