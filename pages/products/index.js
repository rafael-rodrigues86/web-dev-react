"use client";
import "tailwindcss/tailwind.css";
import Appbar from "@/app/components/Appbar";
import Bottom from "@/app/components/Bottom";
import Drawer from "@/app/components/Drawer";
import React, { useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchProducts } from "@/app/utils/api";
import { CartContext } from "@/app/contexts/CartContext";
import {
  ProductContainer,
  ProductImage,
  CardButton,
} from "@/app/styles/ProductsStyles";
import { FavoritesContext } from "@/app/contexts/FavoriteContext";

const ProductsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const { addToCart } = useContext(CartContext);
  const { addToFavorites, isFavorited } = useContext(FavoritesContext);

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { data: session } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    getProducts();
  }, []);

  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>  

      <ul className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="h-full">
            <ProductContainer>
              <ProductImage className="mb-4" src={product.image} width={200} />
              <p className="mb-4">{product.title}</p>
              <p className="mb-4">{product.price}</p>
              <p className="mb-4">{product.description}</p>
              <p className="mb-4">{product.category} </p>

              <button onClick={() => addToFavorites(product)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isFavorited(product.id) ? "red" : "gray"}
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>

              <CardButton onClick={() => addToCart(product)}>
                Add cart
              </CardButton>
            </ProductContainer>
          </li>
        ))}
      </ul>

      <Bottom></Bottom>
    </main>
  );
};
export default ProductsPage;
