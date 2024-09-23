import { useState, useEffect } from "react";
import { getFactService } from "../services/getFactService.js";

export function useCatFact() {
  const [fact, setFact] = useState();

  const refreshFact = () => {
    getFactService().then((fact) => setFact(fact));
  };

  useEffect(refreshFact, []);

  return { fact, refreshFact };
}
