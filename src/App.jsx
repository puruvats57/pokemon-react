import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import DiscoveryPage from './pages/DiscoveryPage';
import MyCollectionPage from './pages/MyCollectionPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <h1 style={{
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}>
            Pokémon Collection App
          </h1>
          <div style={{ marginBottom: '2rem' }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                margin: '0 1rem',
                textDecoration: 'none',
                color: isActive ? '#ffeb3b' : '#ffffff',
                fontWeight: 'bold',
              })}
            >
              Explore Pokémon
            </NavLink>
            <NavLink
              to="/collection"
              style={({ isActive }) => ({
                margin: '0 1rem',
                textDecoration: 'none',
                color: isActive ? '#ffeb3b' : '#ffffff',
                fontWeight: 'bold',
              })}
            >
              My Collection
            </NavLink>
          </div>
          <Routes>
            <Route path="/" element={<DiscoveryPage />} />
            <Route path="/collection" element={<MyCollectionPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}
