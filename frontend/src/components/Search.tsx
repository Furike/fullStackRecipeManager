import { useCallback, useState } from 'react';
import { debounce } from '../utils';

type Props = {
  onChange: (value: string) => void;
};

function Search({ onChange }: Props) {
  const [search, setSearch] = useState('');

  const debouncedHandleSearch = useCallback(debounce(onChange), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedHandleSearch(e.target.value);
  };

  return <input value={search} onChange={handleInputChange} />;
}

export default Search;
