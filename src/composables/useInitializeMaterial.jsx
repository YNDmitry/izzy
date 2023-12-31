import { Color, MeshStandardMaterial } from "three";

export const useInitializeMaterial = (color) => {
    return new MeshStandardMaterial({
        emissive: new Color(color),
        color: new Color(color),
        emissiveIntensity: 54,
    });
};