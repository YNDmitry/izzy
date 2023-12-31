import {useProgress} from "@react-three/drei";

export function Loader() {
    const { progress } = useProgress()
    sessionStorage.removeItem('modelIsLoaded')
    if (progress === 100) {
        return sessionStorage.setItem('modelIsLoaded', 'true')
    }
}
