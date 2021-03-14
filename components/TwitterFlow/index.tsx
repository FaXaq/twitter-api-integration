import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import TweetsList from './components/TweetsList';

export default function TwitterFlow() {
  const [searchTerm, setSearchTerm] = useState('');

  // debounce to prevent searching directly when the user types
  // and make unnecessary requests
  const onInputChange = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 250), [])

  return <div>
    <h2>Recherche twitter</h2>
    <input type="text" onChange={e => onInputChange(e.target.value)} />
    <TweetsList searchTerm={searchTerm} />
  </div>
}