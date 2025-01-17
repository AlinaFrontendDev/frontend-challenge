import React, { useState } from 'react';
import Header from './components/Header';
import AllCatsPage from './pages/AllCatsPage';
import FavoritesPage from './pages/FavoritesPage';
import { Cat } from './types/Cat';
import './styles/main.scss';

const App: React.FC = () => {
  const [tab, setTab] = useState<'all' | 'favorites'>('all');
  const [favorites, setFavorites] = useState<Cat[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  const handleToggleFavorite = (cat: Cat) => {
    const isFavorite = favorites.some((fav) => fav.id === cat.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== cat.id)
      : [...favorites, cat];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <Header onTabChange={setTab} currentTab={tab} />
      <main>
        {tab === 'all' ? (
          <AllCatsPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />
        ) : (
          <FavoritesPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />
        )}
      </main>
    </div>
  );
};

export default App;
