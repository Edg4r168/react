/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { cartReducer, cartInitialState, CART_ACTIONS } from "../reducers/cart";

export const CartContext = createContext();

const useCartReducer = () => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) =>
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: product,
    });

  const clearCart = () =>
    dispatch({
      type: CART_ACTIONS.CLEAR_CART,
    });

  return { state, addToCart, removeFromCart, clearCart };
};

export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer();

  // const addToCart = (product) => {
  //   // Revisar si el producto ya esta en el carrito
  //   const productInCartIndex = carts.findIndex(
  //     (item) => item.id === product.id
  //   );

  //   if (productInCartIndex >= 0) {
  //     // Usando structuredClone
  //     const newCarts = structuredClone(carts);
  //     newCarts[productInCartIndex].quantity += 1;

  //     return setCarts(newCarts);
  //   }

  //   // Producto no esta en el carrito
  //   setCarts((prevState) => {
  //     return [
  //       ...prevState,
  //       {
  //         ...product,
  //         quantity: 1,
  //       },
  //     ];
  //   });
  // };

  // const removeFromCart = (product) => {
  //   setCarts((prevState) => prevState.filter((item) => item.id !== product.id));
  // };

  // const clearCart = () => {
  //   setCarts([]);
  // };

  return (
    <>
      <CartContext.Provider
        value={{ carts: state, clearCart, addToCart, removeFromCart }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
