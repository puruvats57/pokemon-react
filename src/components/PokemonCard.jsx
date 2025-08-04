export default function PokemonCard({ pokemon, onAdd }) {
  const { name, sprites, types, stats } = pokemon;

  const getStat = (statName) =>
    stats.find(s => s.stat.name === statName)?.base_stat ?? 0;

  return (
    <div style={{
      background: '#fff',
      color: '#333',
      borderRadius: '20px',
      padding: '1.5rem',
      width: '250px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
      textAlign: 'center',
      position: 'relative',
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        margin: '0 auto 1rem',
        background: 'radial-gradient(circle at top, #ff9a9e, #fad0c4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src={sprites.front_default} alt={name} style={{ width: '60px' }} />
      </div>

      <h3 style={{ marginBottom: '0.5rem' }}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>

      <div style={{ marginBottom: '1rem' }}>
        {types.map(t => (
          <span key={t.type.name} style={{
            display: 'inline-block',
            background: '#eee',
            color: '#333',
            padding: '0.3rem 0.6rem',
            margin: '0 0.3rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            {t.type.name.toUpperCase()}
          </span>
        ))}
      </div>

      <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>HP: {getStat('hp')}</div>
      <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Attack: {getStat('attack')}</div>
      <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Defense: {getStat('defense')}</div>

      <button
        onClick={() => onAdd(pokemon)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#4caf50',
          border: 'none',
          borderRadius: '50%',
          color: '#fff',
          width: '30px',
          height: '30px',
          fontSize: '1.2rem',
          cursor: 'pointer',
        }}
      >
        +
      </button>
    </div>
  );
}
