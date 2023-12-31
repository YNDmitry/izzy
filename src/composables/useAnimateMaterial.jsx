import gsap from "gsap";

export function useAnimateMaterial(materialRef, delay, shouldAnimateRef, invalidate) {
    if (!materialRef.current) return
    const material = materialRef.current.material
    const settings = {
        r: 1,
        g: 1,
        b: 1,
        repeat: -1,
        stagger: 1,
        duration: 0,
        ease: 'none',
        yoyo: true,
        repeatDelay: delay,
        onUpdate: () => {
            if (shouldAnimateRef.current) {
                invalidate()
            }
        },
    };
    gsap.to(material.color, settings)
    gsap.to(material.emissive, settings)
}
