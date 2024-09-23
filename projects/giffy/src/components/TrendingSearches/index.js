import Spiner from "components/Spiner/Spiner";
import { useNeerScreen } from "hooks/useNeerScreen";
import React, { Suspense } from "react";
const TrendingSearches = React.lazy(() => {
    return import("./TrendingSearches");
});

export const LazyTrending = () => {
    const {isNeerScreen, fromRef } = useNeerScreen({ distance: "20px" });

    return <div ref={fromRef}>
        <Suspense fallback={<Spiner />}>
            {isNeerScreen ? <TrendingSearches /> : <Spiner />}
        </Suspense>
    </div>
} 
