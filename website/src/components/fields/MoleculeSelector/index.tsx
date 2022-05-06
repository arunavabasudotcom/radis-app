import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { addSubscriptsToMolecule } from "../../../utils";
import "./index.css";
import { moleculeOptions, moleculeOptionsNonequimolecules } from "./molecules";

export interface MoleculeSelectorProps {
  molecule: string;
  validationError?: string;
  handleChange: (
    _: React.ChangeEvent<Record<string, string>>,
    value: string | null
  ) => void;
  autofocus?: boolean;
  isNonquilibrium: boolean;
}

export const MoleculeSelector: React.FC<MoleculeSelectorProps> = ({
  molecule,
  validationError,
  handleChange,
  autofocus = false,
  isNonquilibrium,
}) => {
  const [input, setInput] = useState("");

  return (
    <Autocomplete
      id="molecule-selector"
      className="MoleculeSelector"
      //itreating the array
      options={
        isNonquilibrium
          ? moleculeOptionsNonequimolecules.map((value) => addSubscriptsToMolecule(value))
          : moleculeOptions.map((value) => addSubscriptsToMolecule(value))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="HITRAN 2020 Molecule"
          error={validationError !== undefined}
          autoFocus={autofocus}
        />
      )}
      value={addSubscriptsToMolecule(molecule || "")}
      inputValue={input}
      onInputChange={(_, newInput) =>
        setInput(addSubscriptsToMolecule(newInput.toUpperCase()))
      }
      renderOption={(molecule) => addSubscriptsToMolecule(molecule)}
      onChange={handleChange}
    />
  );
};
