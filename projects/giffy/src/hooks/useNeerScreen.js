import { useEffect, useState, useRef } from "react";

export function useNeerScreen({ distance, once = true } = { distance: "100px" }) {
    const [ show, setShow ] = useState(false);
    const fromRef = useRef();

    // (Elementos que estamos observando, observador)
    function onChange (entries, observer) {
        const el = entries[0];
        
        if (el.isIntersecting) {
            setShow(true);
            once && observer.disconnect();
        } else {
            !once && setShow(false);
        }
    }

    useEffect(() => {
        let observer;

        const element = fromRef.current; 

        Promise.resolve(
            IntersectionObserver ?? import("intersection-observer")
            ).then(() => {
                // Params(cb, options)
                observer = new IntersectionObserver(onChange, { rootMargin: distance }); // rootMargin: ajustar los límites del área de intersección.
            // threshold: umbral de visibilidad del elemento
            
            if (element) observer.observe(element);
        });
        

        return () => observer && observer.disconnect();
    }, [distance]);

    return { isNeerScreen: show, fromRef}
}