import gsap from "gsap";
import {useInitializeMaterial} from "./useInitializeMaterial.jsx";
import {config} from "../config.js";
import {useAnimateMaterial} from "./useAnimateMaterial.jsx";

export function useLedAnimation(ledRef, shouldAnimateRef, invalidate) {

    if (!ledRef.current) return
    const led = ledRef.current
    const createLedScrollTrigger = (startTrigger, endTrigger, enterCallback, leaveCallback) => ({
        trigger: startTrigger,
        endTrigger: endTrigger,
        scrub: true,
        start: 'top',
        end: '+=20%',
        onEnter: enterCallback,
        onEnterBack: enterCallback,
        onLeave: leaveCallback,
        onLeaveBack: leaveCallback
    })

    const initializeMaterial = (color) => useInitializeMaterial(color);
    // const animateMaterial = (ref, delay, animate) => useAnimateMaterial(ref, delay, animate, invalidate);

    const triggers = [
        {
            triggerStart: '#trigger2-1',
            triggerEnd: '#trigger2-2',
            color: config.colors.blue,
            animate: false
        },
        {
            triggerStart: '#trigger2-2',
            triggerEnd: '#trigger2-3',
            color: config.colors.green,
            animate: false
        },
        {
            triggerStart: '#trigger2-3',
            triggerEnd: '#trigger2-4',
            color: config.colors.red,
            animate: true,
            delay: 0.25
        },
        {
            triggerStart: '#trigger2-4',
            triggerEnd: '#trigger2-5',
            color: config.colors.red,
            animate: true,
            delay: 0.15
        },
        {
            triggerStart: '#trigger2-5',
            triggerEnd: '#trigger2-5',
            color: config.colors.blue,
            animate: false,
        },
    ]

    triggers.forEach(({ triggerStart, triggerEnd, color, animate, delay }) => {
        gsap.to(led.material, {
            scrollTrigger: createLedScrollTrigger(
                triggerStart,
                triggerEnd,
                () => {
                    shouldAnimateRef.current = true
                    led.material = initializeMaterial(color);
                    invalidate();
                    if (animate) {
                        useAnimateMaterial(ledRef, delay, shouldAnimateRef, invalidate);;
                    }
                },
                () => {
                    shouldAnimateRef.current = false
                    led.material = initializeMaterial(color)
                }
            )
        });
    });
}