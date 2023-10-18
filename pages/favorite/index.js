import "tailwindcss/tailwind.css";
import Appbar from "@/app/components/Appbar";
import Bottom from "@/app/components/Bottom";
import Drawer from "@/app/components/Drawer";
import React, { useContext, useState } from "react";
import { FavoritesContext } from "@/app/contexts/FavoriteContext";
import {
  ProductContainer,
  ProductImage,
  CardButton,
} from "@/app/styles/ProductsStyles";

const FavoritesPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>

      <ul className="grid grid-cols-3 gap-4">
        {favorites.map((product) => (
          <li key={product.id}>
            <ProductContainer>
              <ProductImage src={product.image} />
              <p>{product.title}</p>
              <p>Price: {product.price}</p>
              <CardButton onClick={() => removeFromFavorites(product.id)}>
                Remove from Favorites
              </CardButton>
            </ProductContainer>
          </li>
        ))}
      </ul>

      <Bottom></Bottom>
    </main>
  );
};
export default FavoritesPage;
