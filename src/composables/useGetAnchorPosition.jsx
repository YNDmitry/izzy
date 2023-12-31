import {useCallback, useEffect, useState} from "react";
import {config} from "../config.js";

export function useGetAnchorPosition(id) {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    if (windowSize.width > 1220) {
        return config.anchorPositions[id].desktop;
    } else if (windowSize.width > 479) {
        return config.anchorPositions[id].tablet;
    } else if (windowSize.width <= 479) {
        return config.anchorPositions[id].mobile;
    }
}