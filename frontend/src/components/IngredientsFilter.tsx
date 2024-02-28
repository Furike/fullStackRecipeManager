import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, InputLabel } from '@mui/material';

type Props = {
  ingredientNames: string[];
  selectedNames: string[];
  setSelectedNames: (names: string[]) => void;
};

function IngredientsFilter({
  ingredientNames,
  selectedNames,
  setSelectedNames,
}: Props) {
  const handleChange = (event: SelectChangeEvent<typeof selectedNames>) => {
    const {
      target: { value },
    } = event;
    setSelectedNames(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">Ingredients filter</InputLabel>
      <Select
        labelId="select-label"
        label="Ingredients filter"
        multiple
        value={selectedNames}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        size="small"
      >
        {ingredientNames.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={selectedNames.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default IngredientsFilter;
