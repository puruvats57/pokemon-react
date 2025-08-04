const COLLECTION_KEY = 'pokemon_collection';

export function getSavedCollection() {
  const stored = localStorage.getItem(COLLECTION_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function savePokemonToCollection(pokemon) {
  const current = getSavedCollection();
  if (!current.find(p => p.id === pokemon.id)) {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify([...current, pokemon]));
  }
}

export function updateCollection(newCollection) {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(newCollection));
}
