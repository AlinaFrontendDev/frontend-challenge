import React from 'react';

interface HeaderProps {
  onTabChange: (tab: 'all' | 'favorites') => void;
  currentTab: 'all' | 'favorites';
}

const Header: React.FC<HeaderProps> = ({ onTabChange, currentTab }) => {
  return (
    <header>
      <nav>
        <button
          onClick={() => onTabChange('all')}
          className={currentTab === 'all' ? 'active' : ''}
        >
          Все котики
        </button>
        <button
          onClick={() => onTabChange('favorites')}
          className={currentTab === 'favorites' ? 'active' : ''}
        >
          Любимые котики
        </button>
      </nav>
    </header>
  );
};

export default Header;
