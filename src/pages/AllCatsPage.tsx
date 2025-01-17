import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CatCard from "../components/CatCard";
import { Cat } from "../types/Cat";

interface AllCatsPageProps {
  favorites: Cat[];
  onToggleFavorite: (cat: Cat) => void;
}

const AllCatsPage: React.FC<AllCatsPageProps> = ({
  favorites,
  onToggleFavorite,
}) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchCats = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await axios.get<Cat[]>(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      if (response.data.length === 0) {
        setHasMore(false);
      }
      setCats((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error("Error fetching cats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchCats();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading, hasMore]);

  return (
    <div className="cat-grid">
      {cats.map((cat) => (
        <CatCard
          key={cat.id}
          cat={cat}
          isFavorite={favorites.some((fav) => fav.id === cat.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}

      <div
        ref={observerRef}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "195px",
        }}
      />

      {isLoading && (
        <p style={{ fontFamily: "Roboto" }}>... загружаем еще котиков ...</p>
      )}
      {!hasMore && <p>к сожалению, котики закончились</p>}
    </div>
  );
};

export default AllCatsPage;
