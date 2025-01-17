import React from 'react';
import CatCard from '../components/CatCard';
import { Cat } from '../types/Cat';

interface FavoritesPageProps {
  favorites: Cat[];
  onToggleFavorite: (cat: Cat) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, onToggleFavorite }) => {
  return (
    <div className="cat-grid">
      {favorites.map((cat) => (
        <CatCard
          key={cat.id}
          cat={cat}
          isFavorite={true}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default FavoritesPage;
