import React, { createContext, useState, useEffect } from "react";

const FAVORITES_STORAGE_KEY = "favorites";

const getStoredFavorites = () => {
  if (typeof window !== "undefined") {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  return [];
};

const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorited: () => false,
});

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = getStoredFavorites();
    setFavorites(storedFavorites);
  }, []);

  const saveToLocalStorage = (favorites) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  };

  const isFavorited = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  const addToFavorites = (product) => {
    if (isFavorited(product.id)) {
      removeFromFavorites(product.id);
    } else {
      setFavorites((prevFavorites) => {
        const updatedFavorites = [...prevFavorites, product];
        saveToLocalStorage(updatedFavorites);
        return updatedFavorites;
      });
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (fav) => fav.id !== productId
      );
      saveToLocalStorage(updatedFavorites);
      return updatedFavorites;
    });
  };

  useEffect(() => {
    saveToLocalStorage(favorites);
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorited }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesProvider, FavoritesContext };
