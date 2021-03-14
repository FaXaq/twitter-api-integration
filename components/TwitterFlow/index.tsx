import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import TweetsList from './components/TweetsList';
import styles from './index.module.css';

export default function TwitterFlow() {
  const [searchTerm, setSearchTerm] = useState('');

  // debounce to prevent searching directly when the user types
  // and make unnecessary requests
  const onInputChange = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 250), [])

  return <div className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.title}>Recherche twitter</h2>
      <input className={styles.input} type="text" onChange={e => onInputChange(e.target.value)} aria-label="search tweet input" />
    </div>
    <div className={styles.content}>
      <TweetsList searchTerm={searchTerm} />
    </div>
  </div>
}