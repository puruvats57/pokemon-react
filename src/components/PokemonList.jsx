import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useCallback } from 'react';
import PokemonCard from './PokemonCard';

const fetchPokemon = async ({ pageParam = 0 }) => {
  const limit = 6;
  const offset = pageParam * limit;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await res.json();

  const detailedData = await Promise.all(
    data.results.map(p => fetch(p.url).then(res => res.json()))
  );

  return { results: detailedData, nextPage: pageParam + 1, hasMore: !!data.next };
};

export default function PokemonList({ onAddToCollection }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemon,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
  });

  const observerRef = useRef();

  const loadMoreRef = useCallback(node => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (node) observerRef.current.observe(node);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        {data?.pages.map((page, i) =>
          page.results.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} onAdd={onAddToCollection} />
          ))
        )}
      </div>

      {/* 👇 Place the loading indicator + intersection observer target here */}
      <div ref={loadMoreRef} style={{ marginTop: '2rem', textAlign: 'center' }}>
        {isFetchingNextPage && (
          <>
            <p style={{ color: '#fff', fontSize: '1.1rem' }}>Loading more Pokémon...</p>
            <div className="spinner" />
          </>
        )}
      </div>
    </>
  );
}
