import { useId } from "react";
import "./Filters.css";
import { useFilter } from "../hooks/useFilters";

export const Filters = () => {
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const { filters, setFilters } = useFilter();

  const handleOnChangeMinPrice = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };

  const handleChangeCategory = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  return (
    <>
      <section className="filters">
        <div>
          <label htmlFor={minPriceFilterId}>Pricio a partir de:</label>
          <input
            id={minPriceFilterId}
            type="range"
            min="0"
            max="1000"
            onChange={handleOnChangeMinPrice}
            value={filters.minPrice}
          />
          <span>{filters.minPrice}</span>
        </div>

        <div>
          <label htmlFor={categoryFilterId}>Categoría</label>

          <select id={categoryFilterId} onChange={handleChangeCategory}>
            <option value="all">Todas</option>
            <option value="laptops">Laptops</option>
            <option value="smartphones">Celulares</option>
          </select>
        </div>
      </section>
    </>
  );
};
