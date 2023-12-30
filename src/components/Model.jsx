import {forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Html, OrbitControls, useGLTF} from "@react-three/drei";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Color, MeshStandardMaterial } from 'three';
import { useThree } from '@react-three/fiber';
import {IconT1} from "./Icons/IconT1.jsx";
import {IconT3} from "./Icons/IconT3.jsx";
import {IconT4} from "./Icons/IconT4.jsx";
import {IconT5} from "./Icons/IconT5.jsx";
import {IconT6} from "./Icons/IconT6.jsx";
import {IconT7} from "./Icons/IconT7.jsx";
import {IconT8} from "./Icons/IconT8.jsx";
import {IconT9} from "./Icons/IconT9.jsx";
import {IconT10} from "./Icons/IconT10.jsx";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger)

export function Model(props) {
  const { nodes, materials, scene } = useGLTF("https://uploads-ssl.webflow.com/65705d0a7b517c17741ec3f1/6589dabe5b7d61bf88af9927_scooter-transformed.glb.txt");
  const model = useRef()
  const cameraControlsRef = useRef()
  const animations = useRef({})
  const { invalidate } = useThree()
  const shouldAnimateRef = useRef(true);
  let lastElementOffScreen = useRef(false);

  const led = useRef()
  const led2 = useRef()
  const led3 = useRef()
  const currentLed = useRef('#0047FF')

  const ledColors = {
    blue: '#0047FF',
    green: '#00FF19',
    red: '#FF0004',
    orange: 'orange'
  };

  const initializeMaterial = useCallback((color) => {
    const newMaterial = new MeshStandardMaterial({
      emissive: new Color(color),
      color: new Color(color),
      emissiveIntensity: 54,
    });
    return newMaterial
  }, [])

  const createTimeline = useCallback((triggers, targetProps, positionProps, rotationProps) => {
    if (!cameraControlsRef.current || !cameraControlsRef.current.target || !cameraControlsRef.current.object) {
      console.error("Camera controls are not initialized");
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggers.trigger,
        endTrigger: triggers.endTrigger,
        scrub: true,
        start: 'top top',
        end: '+=60% bottom',
        markers: import.meta.env.DEV ? true : false,
        onUpdate: () => cameraControlsRef.current.update()
      }
    });

    if (targetProps) {
      timeline.fromTo(cameraControlsRef.current.target, targetProps.start, targetProps.end, 0);
    }
    if (positionProps) {
      timeline.fromTo(cameraControlsRef.current.object.position, positionProps.start, positionProps.end, 0);
    }
    if (rotationProps) {
      timeline.fromTo(cameraControlsRef.current.object.rotation, rotationProps.start, rotationProps.end, 0);
    }

    return timeline;
  }, [])

  const animateMaterial = useCallback((material, delay) => {
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
          invalidate();
        }
      },
    }
    gsap.to(material.color, settings);
    gsap.to(material.emissive, settings);
  }, [invalidate])

  const createLedScrollTrigger = useCallback((startTrigger, endTrigger, enterCallback, leaveCallback) => ({
    trigger: startTrigger,
    endTrigger: endTrigger,
    scrub: true,
    start: 'top',
    end: '+=20%',
    onEnter: enterCallback,
    onEnterBack: enterCallback,
    onLeave: leaveCallback,
    onLeaveBack: leaveCallback
  }), [])

  const textWithArrowAnimation = (trigger, startTrigger, endTrigger) => {
    const stops = document.querySelectorAll(`${trigger} .gradient stop`);
    gsap.to(trigger, {
      scrollTrigger: {
        trigger: startTrigger,
        endTrigger: endTrigger,
        scrub: true,
        start: '+=60%',
        end: '+=40%',
        markers: import.meta.env.DEV ? {
            startColor: 'white',
            endColor: 'white'
        } : false,
        onEnter: () => {
          gsap.to(trigger, {opacity: 1, duration: 0.2})
          gsap.fromTo(stops[0], {attr: { offset: '0%' }}, {attr: { offset: '200%' }, duration: 2, delay: 1});
          gsap.fromTo(stops[1], {attr: { offset: '0%' }},{attr: { offset: '100%' }, duration: 2});
        },
        onEnterBack: () => {
          gsap.to(trigger, {opacity: 1, duration: 0.2})
          gsap.fromTo(stops[0], {attr: { offset: '0%' }}, {attr: { offset: '200%' }, duration: 2, delay: 1});
          gsap.fromTo(stops[1], {attr: { offset: '0%' }},{attr: { offset: '100%' }, duration: 2});
        },
        onLeave: () => {
          gsap.to(trigger, {opacity: 0, duration: 0.2})
        },
        onLeaveBack: () => {
          gsap.to(trigger, {opacity: 0, duration: 0.2})
          gsap.fromTo(stops[0], {attr: { offset: '0%' }}, {attr: { offset: '200%' }, duration: 2, delay: 1});
          gsap.fromTo(stops[1], {attr: { offset: '0%' }},{attr: { offset: '100%' }, duration: 2});
        },
      }
    })
  }

  const textTriggerAnimation = (trigger, startTrigger, endTrigger, prevTrigger, isFirst, isLast) => {
    gsap.set(trigger, { opacity: 0 });

    gsap.to(trigger, {
      scrollTrigger: {
        trigger: startTrigger,
        endTrigger: endTrigger,
        scrub: true,
        start: 'top',
        end: '+=20%',
        onEnter: () => {
          if (isFirst || !lastElementOffScreen.current) gsap.to('#t2', { opacity: 1, duration: 0.2 });
          gsap.to(trigger, { opacity: 1, duration: 0.2 })
        },
        onLeave: () => {
          gsap.to(trigger, { opacity: 0.5, duration: 0.2 });
          if (isLast) {
            lastElementOffScreen.current = true;
            gsap.to('#t2', { opacity: 0, duration: 0.2 });
          }
        },
        onEnterBack: () => {
          if (prevTrigger) gsap.to(prevTrigger, { opacity: 0.5, duration: 0.2 });
          if (isLast) lastElementOffScreen.current = false;
          gsap.to('#t2', { opacity: 1, duration: 0.2 });
          gsap.to(trigger, { opacity: 1, duration: 0.2 });
        },
        onLeaveBack: () => {
          gsap.to(trigger, { opacity: 0, duration: 0.2 });
          if (isFirst) gsap.to('#t2', { opacity: 1, duration: 0.2 });
        }
      }
    });
  }

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useLayoutEffect(() => {
    if (!model.current || !cameraControlsRef.current) return

    animations.current.tl1 = createTimeline(
        { trigger: '#trigger1', endTrigger: '#trigger2-1' },
        { start: { x: -2, y: 0, z: 0 }, end: { x: -3, y: 1, z: -1 } },
        { start: { x: -9.75, y: 1, z: 15 }, end: { x: -4.74, y: 1, z: 5 } },
        { start: { x: 0, y: 0, z: 0 }, end: { x: 0, y: 0, z: 0 } }
    );

    animations.current.tl2 = createTimeline(
        { trigger: '#trigger3', endTrigger: '#trigger4' },
        { start: { x: -3, y: 1, z: -1 }, end: { x: -6, y: 0, z: 0 } },
        { start: { x: -4.74, y: 1, z: 5, }, end: { x: 0.25, y: 7, z: 0 } }
    )

    if (window.innerWidth > 1220) {
      animations.current.tl3 = createTimeline(
          { trigger: '#trigger4', endTrigger: '#trigger5' },
          { start: { x: -6, y: 0, z: 0 }, end: { x: -6, y: 0, z: 0 } },
          { start: { x: 0.25, y: 7, z: 0 }, end: { x: 2, y: 9, z: 0 } }
      );
      animations.current.tl4 = createTimeline(
          { trigger: '#trigger5', endTrigger: '#trigger6' },
          { start: { x: -6, y: 0, z: 0 }, end: { x: -2, y: 4, z: 0 } },
          { start: { x: 2, y: 9, z: 0 }, end: { x: -7, y: 5, z: -4 } },
          { start: { x: 0, y: 0, z: 0 }, end: { x: -2, y: -1, z: -3 } }
      );
      animations.current.tl5 = createTimeline(
          { trigger: '#trigger6', endTrigger: '#trigger7' },
          { start: { x: -2, y: 4, z: 0 }, end: { x: -2, y: 4, z: 0 } },
          { start: { x: -7, y: 5, z: -4 }, end: { x: -5, y: 5, z: 6 } },
          { start: { x: -2, y: -1, z: -3 }, end: { x: 2, y: 0, z: 5 } }
      );
      animations.current.tl6 = createTimeline(
          { trigger: '#trigger7', endTrigger: '#trigger8' },
          { start: { x: -2, y: 4, z: 0 }, end: { x: 0, y: -4, z: 0 } },
          { start: { x: -5, y: 5, z: 6 }, end: { x: 9, y: 3, z: -8 } },
          { start: { x: 2, y: 0, z: 5 }, end: { x: -2, y: 0, z: 3 } }
      )
      animations.current.tl7 = createTimeline(
          { trigger: '#trigger8', endTrigger: '#trigger9' },
          { start: { x: 0, y: -4, z: 0 }, end: { x: 0, y: -3, z: 0 } },
          { start: { x: 9, y: 3, z: -8 }, end: { x: 6, y: 3, z: 9 } },
          { start: { x: -2, y: 0, z: 3 }, end: { x: -2, y: 1, z: 2 } },
          true
      );
    } else {
      animations.current.tl3 = createTimeline(
          { trigger: '#trigger4', endTrigger: '#trigger5' },
          { start: { x: -6, y: 0, z: 0 }, end: { x: -6, y: 0, z: 0 } },
          { start: { x: 0.25, y: 7, z: 0 }, end: { x: 3, y: 15, z: 0 } }
      );
      animations.current.tl4 = createTimeline(
          { trigger: '#trigger5', endTrigger: '#trigger6' },
          { start: { x: -6, y: 0, z: 0 }, end: { x: -2, y: 4, z: 0 } },
          { start: { x: 3, y: 15, z: 0 }, end: { x: -7, y: 5, z: -4 } },
          { start: { x: 0, y: 0, z: 0 }, end: { x: -2, y: -1, z: -3 } }
      );
      animations.current.tl5 = createTimeline(
          { trigger: '#trigger6', endTrigger: '#trigger7' },
          { start: { x: -2, y: 4, z: 0 }, end: { x: -2, y: 4, z: 0 } },
          { start: { x: -7, y: 5, z: -4 }, end: { x: -5, y: 7, z: 6 } },
          { start: { x: -2, y: -1, z: -3 }, end: { x: 3, y: 0, z: 5 } }
      );
      animations.current.tl6 = createTimeline(
          { trigger: '#trigger7', endTrigger: '#trigger8' },
          { start: { x: -2, y: 4, z: 0 }, end: { x: 4, y: -4, z: 0 } },
          { start: { x: -5, y: 7, z: 6 }, end: { x: 12, y: 3, z: -8 } },
          { start: { x: 3, y: 0, z: 5 }, end: { x: 0, y: 0, z: 2 } }
      )
      animations.current.tl7 = createTimeline(
          { trigger: '#trigger8', endTrigger: '#trigger9' },
          { start: { x: 4, y: -4, z: 0 }, end: { x: 0, y: -4, z: 0 } },
          { start: { x: 12, y: 3, z: -8 }, end: { x: 5, y: 3, z: 8 } },
          { start: { x: 0, y: 0, z: 2 }, end: { x: 0, y: 0, z: 2 } },
          true
      )
    }

    return () => {
      Object.values(animations.current).forEach(tl => tl.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, [])

  useEffect(() => {
    if (!model.current || !cameraControlsRef.current) return
    cameraControlsRef.current.target.set(-2, 0, 0);
    cameraControlsRef.current.object.position.set(-9.75, 1, 15);
    cameraControlsRef.current.update();
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    gsap.to(led.current.material, {
      scrollTrigger: createLedScrollTrigger(
          '#trigger2-1',
          '#trigger2-2',
          () => {
            led.current.material = initializeMaterial(ledColors.blue)
            invalidate()
          },
          () => {
            led.current.material = initializeMaterial(ledColors.blue)
            invalidate()
          }
      )
    });

    gsap.to(led.current.material, {
      scrollTrigger: createLedScrollTrigger(
          '#trigger2-2',
          '#trigger2-3',
          () => {
            led.current.material = initializeMaterial(ledColors.green)
            invalidate()
            shouldAnimateRef.current = false
          },
          () => {
            led.current.material = initializeMaterial(ledColors.green)
            invalidate()
            shouldAnimateRef.current = false
          }
      )
    });

    gsap.to(led.current.material, {
      scrollTrigger: createLedScrollTrigger(
          '#trigger2-3',
          '#trigger2-4',
          () => {
            shouldAnimateRef.current = true
            led.current.material = initializeMaterial(ledColors.red)
            animateMaterial(led.current.material, 0.25)
          },
          () => {
            shouldAnimateRef.current = true
            led.current.material = initializeMaterial(ledColors.red)
            animateMaterial(led.current.material, 0.25)
          }
      )
    });

    gsap.to(led.current.material, {
      scrollTrigger: createLedScrollTrigger(
          '#trigger2-4',
          '#trigger2-5',
          () => {
            shouldAnimateRef.current = true
            led.current.material = initializeMaterial(ledColors.red)
            animateMaterial(led.current.material, 0.1)
          },
          () => {
            shouldAnimateRef.current = true
            led.current.material = initializeMaterial(ledColors.red)
            animateMaterial(led.current.material, 0.1)
          }
      )
    });

    gsap.to(led.current.material, {
      scrollTrigger: createLedScrollTrigger(
          '#trigger2-5',
          '#trigger2-5',
          () => {
            shouldAnimateRef.current = false
            led.current.material = initializeMaterial(ledColors.blue)
          },
          () => {
          }
      )
    });

    textTriggerAnimation('#t2-1', '#trigger2-1', '#trigger2-2', null, true, false);
    textTriggerAnimation('#t2-2', '#trigger2-2', '#trigger2-3', '#t2-1', false, false);
    textTriggerAnimation('#t2-3', '#trigger2-3', '#trigger2-4', '#t2-2', false, false);
    textTriggerAnimation('#t2-4', '#trigger2-4', '#trigger2-5', '#t2-3', false, true);
    textWithArrowAnimation('#t1', '#trigger1', '#trigger2-1')
    textWithArrowAnimation('#t3', '#trigger3', '#trigger4')
    textWithArrowAnimation('#t4', '#trigger4', '#trigger5')
    textWithArrowAnimation('#t5', '#trigger4', '#trigger5')
    textWithArrowAnimation('#t6', '#trigger4', '#trigger5')
    textWithArrowAnimation('#t7', '#trigger5', '#trigger6')
    textWithArrowAnimation('#t8', '#trigger6', '#trigger7')
    textWithArrowAnimation('#t9', '#trigger7', '#trigger8')
    textWithArrowAnimation('#t10', '#trigger8', '#trigger9')

    gsap.to(led2.current.material, {
      scrollTrigger: {
        trigger: '#trigger5',
        start: 'bottom',
        end: 'bottom',
        scrub: true,
        onEnter: () => {
          shouldAnimateRef.current = false
          led2.current.material = initializeMaterial('white')
        },
        onLeaveBack: () => {
          shouldAnimateRef.current = false
          led2.current.material = initializeMaterial('white')
        }
      }
    })

    gsap.to(led2.current.material, {
      scrollTrigger: {
        trigger: '#trigger6',
        start: 'bottom bottom',
        end: '+=10% top',
        scrub: true,
        onEnter: () => {
          shouldAnimateRef.current = true
          led2.current.material = initializeMaterial(ledColors.orange)
          animateMaterial(led2.current.material, 0.3)
        },
        onLeave: () => {
          shouldAnimateRef.current = false
          led2.current.material = initializeMaterial('white')
        },
        onEnterBack: () => {
          shouldAnimateRef.current = true
          led2.current.material = initializeMaterial(ledColors.orange)
          animateMaterial(led2.current.material, 0.3)
        }
      },
    })

    gsap.to(led3.current.material, {
      scrollTrigger: {
        trigger: '#trigger7',
        start: 'bottom bottom',
        end: '+=10% top',
        scrub: true,
        onEnter: () => {
          shouldAnimateRef.current = true
          led3.current.material = initializeMaterial(ledColors.orange)
          animateMaterial(led3.current.material, 0.3)
        },
        onLeave: () => {
          shouldAnimateRef.current = false
          led3.current.material = initializeMaterial('white')
        },
        onEnterBack: () => {
          shouldAnimateRef.current = true
          led3.current.material = initializeMaterial(ledColors.orange)
          animateMaterial(led3.current.material, 0.3)
        }
      },
    })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const anchorPositions = {
    't1': {
      desktop: [-1.6, 0.10, -5.2],
      tablet: [0, 0.6, -1.3],
      mobile: [0.1, 0.9, -2.7]
    },
    't2': {
      desktop: [0, 1, -17],
      tablet: [0, 0.5, -3],
      mobile: [0, 0.5, -3]
    },
    't3': {
      desktop: [0, -1, 0],
      tablet: [0, -1.5, 1],
      mobile: [0, -1.5, 1]
    },
    't4': {
      desktop: [0, 2.8, 4.3],
      tablet: [0, 8, 2],
      mobile: [0, 8, 1.5]
    },
    't5': {
      desktop: [0, -1.2, 3.3],
      tablet: [0, 7, -2],
      mobile: [0, 6, -2.5]
    },
    't6': {
      desktop: [0, 0.4, -3.4],
      tablet: [0, 0, -1],
      mobile: [0, 0, 0.2]
    },
    't7': {
      desktop: [0, -1.6, -5],
      tablet: [0, -1.6, -2],
      mobile: [0, -2, -2]
    },
    't8': {
      desktop: [0, -0.4, 7.7],
      tablet: [0, -1.7, 3.8],
      mobile: [0, -2, 4.5]
    },
    't9': {
      desktop: [15.5, -16, 13],
      tablet: [15.5, -13, 1],
      mobile: [15.5, -11.5, 1]
    },
    't10': {
      desktop: [15, -18, -17],
      tablet: [10, -32, -17],
      mobile: [5, -34, -17]
    },
  }

  const getAnchorPosition = useCallback((id) => {
    if (windowSize.width > 1220) {
      return anchorPositions[id].desktop;
    } else if (windowSize.width > 479) {
      return anchorPositions[id].tablet;
    } else if (windowSize.width <= 479) {
      return anchorPositions[id].mobile;
    }
  }, [windowSize]);

  return (
    <>
      <OrbitControls
          ref={cameraControlsRef}
          enableDamping={false}
          enabled={false}
          makeDefault
      />
      <group {...props} dispose={null} scale={5} ref={model}>
        <group name="Scene">
          <mesh name="Cube019" geometry={nodes.Cube019.geometry} material={materials.main} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]} castShadow={true} receiveShadow={true}>
            <Annotation anchor={getAnchorPosition('t10')} id='t10' icon={<IconT10/>} center comboClass={'is-v7'}>
              <div className="trigger_text is-big order">Устойчивая платформа <span className={'text-color-gray'}>с нескользящей поверхностью</span></div>
            </Annotation>
          </mesh>
          <mesh name="Cube011" geometry={nodes.Cube011.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]} />
          <mesh ref={led} name="Cylinder010" geometry={nodes.Cylinder010.geometry} material={materials.emission} position={[0.073, 0.131, -2.183]} rotation={[0, 0, -0.25]}>
            <Annotation anchor={getAnchorPosition('t1')} id='t1' icon={<IconT1/>} comboClass={'is-1'}>
              <div className="trigger_text">Яркий индикатор <span className={'text-color-gray'}>заметен в любое время суток</span></div>
            </Annotation>
            <Annotation anchor={getAnchorPosition('t2')} id='t2' comboClass={'is-v2'}>
              <div id="t2-1" className="trigger_text is-v2">Доступен</div>
              <div id="t2-2" className="trigger_text is-v2">Активен</div>
              <div id="t2-3" className="trigger_text is-v2">Поворот</div>
              <div id="t2-4" className="trigger_text is-v2">Торможение</div>
            </Annotation>
            <meshStandardMaterial roughness={0} metalness={0} color={currentLed.current} emissive={currentLed.current} emissiveIntensity={54} />
          </mesh>
          <mesh ref={led3} name="Cube013" geometry={nodes.Cube013.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]}>
            <Annotation anchor={getAnchorPosition('t3')} id='t3' icon={<IconT3/>} comboClass={'is-v3'}>
              <div className="trigger_text order">Приборная панель <span className={'text-color-gray'}>с простым интерфейсом</span></div>
            </Annotation>
            <Annotation anchor={getAnchorPosition('t4')} center id='t4' icon={<IconT4/>} comboClass={'is-2'}>
              <div className="trigger_text is-small">Надежный тормоз</div>
            </Annotation>
            <Annotation anchor={getAnchorPosition('t5')} center id='t5' icon={<IconT5/>} comboClass={'is-v4'}>
              <div className="trigger_text">Фиксатор для смартфона <span className={'text-color-gray'}>с беспроводной зарядкой</span></div>
            </Annotation>
            <Annotation anchor={getAnchorPosition('t6')} id='t6' icon={<IconT6/>} comboClass={'is-v3'}>
              <div className="trigger_text order">Мягкая кнопка старта</div>
            </Annotation>
            <Annotation anchor={getAnchorPosition('t9')} id='t9' icon={<IconT9/>} center>
              <div className="trigger_text">Даже на заднем колесе</div>
            </Annotation>
            <meshStandardMaterial roughness={0} metalness={0} color={'white'} emissive={'white'} emissiveIntensity={54} />
          </mesh>
          <mesh ref={led2} name="Cube015" geometry={nodes.Cube015.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]}>
            <Annotation anchor={getAnchorPosition('t8')} id='t8' icon={<IconT8/>} comboClass={'is-v6'} center>
              <div className="trigger_text order">Заметные поворотные огни</div>
            </Annotation>
            <meshStandardMaterial roughness={0} metalness={0} color={'white'} emissive={'white'} emissiveIntensity={54} />
          </mesh>
          <mesh name="Cube016" geometry={nodes.Cube016.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]} />
          <mesh name="Cube017" geometry={nodes.Cube017.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]}>
            <Annotation anchor={getAnchorPosition('t7')} id='t7' icon={<IconT7/>} comboClass={'is-v5'} center>
              <div className="trigger_text is-big">Мощная фара <span className={'text-color-gray'}>для безопасности пользователя и окружающих</span></div>
            </Annotation>
          </mesh>
          <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.emission}
                position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.1045, 0.104, 0.078]}>
            <meshStandardMaterial roughness={0} metalness={0} color={ledColors.red} emissive={ledColors.red} emissiveIntensity={54} />
          </mesh>
          <mesh name="Cube002" geometry={nodes.Cube002.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.105, 0.105, 0.079]}>
            <meshStandardMaterial roughness={0} metalness={0} color={currentLed.current} emissive={currentLed.current} emissiveIntensity={54} />
          </mesh>
        </group>
      </group >
    </>
  )
}

const Annotation = forwardRef(({ children, anchor, icon, id, comboClass, distanceFactor, ...props }, ref) => {
  return (
<Html{...props} ref={ref} position={anchor} className={'trigger_popover'} style={{'pointerEvents': 'none'}}>
  <div className={`trigger_text-wrapper ${comboClass}`} id={id}>
    {children}
    {icon && <div className="trigger_icon">{icon}</div>}
  </div>
</Html>
)
})

useGLTF.preload("https://uploads-ssl.webflow.com/65705d0a7b517c17741ec3f1/6589dabe5b7d61bf88af9927_scooter-transformed.glb.txt");
