import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/app/contexts/CartContext";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import { FavoritesProvider } from "@/app/contexts/FavoriteContext";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <CartProvider>
          <FavoritesProvider>
            <Component {...pageProps} />
          </FavoritesProvider>
        </CartProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
export default App;
