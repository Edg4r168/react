import "./App.css";
import { products as initialProducts } from "./mocks/products.json";
import { Products } from "./components/Products";
import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/cartContext";
import { useFilter } from "./hooks/useFilters";

function App() {
  const { filterProducts } = useFilter();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {/* <Footer /> */}
    </CartProvider>
  );
}

export default App;
