import { useEffect, useState } from "react";
import { getTrendingTerms } from "services/getTrendingTermsService";
import { Category } from "components/Category/Category";


export default function TrendingSearches() {
    const [ trends, setTrends ] = useState([]);

    useEffect(() => {
        getTrendingTerms()
            .then(trends => setTrends(trends));
    }, []);

    return <Category title="Tendencias" options={trends} />
}
