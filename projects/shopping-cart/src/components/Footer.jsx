import { useCart } from "../hooks/useCart";
// import { useFilter } from "../hooks/useFilters";
import "./Footer.css";

export function Footer() {
  // const { filters } = useFilter();
  const { carts } = useCart();

  return (
    <>
      <footer className="footer">
        {/* {
          JSON.stringify(filters, null, 2)
         
        }, */}
        {JSON.stringify(carts, null, 2)}
        {/* <h4>
          Prueba técnica de React ⚛️ － <span>@midudev</span>
        </h4>
        <h5>Shopping Cart con useContext & useReducer</h5> */}
      </footer>
    </>
  );
}
