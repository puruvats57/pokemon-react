import { useCallback } from 'react';
import PokemonList from '../components/PokemonList';
import { savePokemonToCollection } from '../utils/localStorageUtils';

export default function DiscoveryPage() {
  const handleAdd = useCallback((pokemon) => {
    savePokemonToCollection(pokemon);  //list
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '1rem' }}>
        Explore Pokémon
      </h2>
      <PokemonList onAddToCollection={handleAdd} />
    </div>
  );
}
