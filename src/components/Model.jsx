import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Color, MeshStandardMaterial } from 'three';
import { useThree } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger)

export function Model(props) {
  const { nodes, materials } = useGLTF("https://uploads-ssl.webflow.com/65705d0a7b517c17741ec3f1/6589dabe5b7d61bf88af9927_scooter-transformed.glb.txt");
  const model = useRef()
  const cameraControlsRef = useRef()
  const animations = useRef({})
  const { invalidate } = useThree()

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

  // Функция для инициализации материала
  const initializeMaterial = useCallback((color) => {
    const newMaterial = new MeshStandardMaterial({
      emissive: new Color(color),
      color: new Color(color),
      emissiveIntensity: 54,
    });
    return newMaterial
  }, [])

  // Функция для создания GSAP таймлайнов
  const createTimeline = useCallback((triggers, targetProps, positionProps, rotationProps, isLastTimeline) => {
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
        end: isLastTimeline ? 'bottom bottom' : '+=500px bottom',
        immediateRender: false,
        onUpdate: () => cameraControlsRef.current.update(),
      }
    });

    // Проверка того, что параметры передаются корректно
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

  const shouldAnimateRef = useRef(true);

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
    start: '+=100px',
    end: '+=100px',
    onEnter: enterCallback,
    onLeaveBack: leaveCallback // Обработка скролла вверх
  }), [])

  const textWithArrowAnimation = (trigger, startTrigger, endTrigger) => {
    gsap.to(trigger, {
      scrollTrigger: {
        trigger: startTrigger,
        endTrigger: endTrigger,
        scrub: true,
        start: '+=500px',
        end: '+=500px',
        onEnter: () => gsap.to(trigger, { opacity: 1, duration: 0.2 }),
        onEnterBack: () => gsap.to(trigger, { opacity: 1, duration: 0.2 }),
        onLeave: () => gsap.to(trigger, { opacity: 0, duration: 0.2 }),
        onLeaveBack: () => gsap.to(trigger, { opacity: 0, duration: 0.2 }),
      }
    })
  }

  let lastElementOffScreen = false;

  const textTriggerAnimation = (trigger, startTrigger, endTrigger, prevTrigger, isFirst, isLast) => {
    gsap.set(trigger, { opacity: 0 }); // Инициализируем с opacity 0

    gsap.to(trigger, {
      scrollTrigger: {
        trigger: startTrigger,
        endTrigger: endTrigger,
        scrub: true,
        start: '+=100px',
        end: '+=100px',
        onEnter: () => {
          if (isFirst || !lastElementOffScreen) gsap.to('#t2', { opacity: 1, duration: 0.2 });
          gsap.to(trigger, { opacity: 1, duration: 0.2 })
        },
        onLeave: () => {
          gsap.to(trigger, { opacity: 0.5, duration: 0.2 });
          if (isLast) {
            lastElementOffScreen = true;
            gsap.to('#t2', { opacity: 0, duration: 0.2 });
          }
        },
        onEnterBack: () => {
          if (prevTrigger) gsap.to(prevTrigger, { opacity: 0.5, duration: 0.2 });
          if (isLast) lastElementOffScreen = false;
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


  useLayoutEffect(() => {
    cameraControlsRef.current.update();
    gsap.to(led.current.material, {
      scrollTrigger: createLedScrollTrigger(
        '#trigger2-1',
        '#trigger2-2',
        () => {
          led.current.material = initializeMaterial(ledColors.blue)
          invalidate()
        }, // Действие при скролле вниз
        () => {
          led.current.material = initializeMaterial(ledColors.blue)
          invalidate()
        } // Действие при скролле вверх
      )
    });

    textTriggerAnimation('#t2-1', '#trigger2-1', '#trigger2-2', null, true, false);
    textTriggerAnimation('#t2-2', '#trigger2-2', '#trigger2-3', '#t2-1', false, false);
    textTriggerAnimation('#t2-3', '#trigger2-3', '#trigger2-4', '#t2-2', false, false);
    textTriggerAnimation('#t2-4', '#trigger2-4', '#trigger2-5', '#t2-3', false, true);

    gsap.to(led.current.material, {
      scrollTrigger: createLedScrollTrigger(
        '#trigger2-2',
        '#trigger2-3',
        () => {
          led.current.material = initializeMaterial(ledColors.green)
          invalidate()
        }, // Действие при скролле вниз
        () => {
          led.current.material = initializeMaterial(ledColors.green)
          invalidate()
        } // Действие при скролле вверх
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
        }, // Действие при скролле вниз
        () => {
          shouldAnimateRef.current = true
          led.current.material = initializeMaterial(ledColors.red)
          animateMaterial(led.current.material, 0.25)
        } // Действие при скролле вверх
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
        }, // Действие при скролле вниз
        () => {
          shouldAnimateRef.current = true
          led.current.material = initializeMaterial(ledColors.red)
          animateMaterial(led.current.material, 0.1)
        } // Действие при скролле вверх
      )
    });

    gsap.to(led.current.material, {
      scrollTrigger: createLedScrollTrigger(
        '#trigger2-5',
        '#trigger2-5',
        () => {
          shouldAnimateRef.current = false
          led.current.material = initializeMaterial(ledColors.blue)
        }, // Действие при скролле вниз
        () => {
        } // Действие при скролле вверх
      )
    });

    /* Timeline инструкция
      1 - trigger start и trigger end
      2 - камера таргет (camera.lookAt)
      3 - Позиция камеры
      4 - Ротейт камеры
    */

    animations.current.tl1 = createTimeline(
      { trigger: '#trigger1', endTrigger: '#trigger2-1' },
      { start: { x: -2, y: 0, z: 0 }, end: { x: -3, y: 1, z: -1 } },
      { start: { x: -9.75, y: 1, z: 15 }, end: { x: -4.74, y: 1, z: 5 } },
      { start: { x: 0, y: 0, z: 0 }, end: { x: 0, y: 0, z: 0 } }
    );

    animations.current.tl1.add(textWithArrowAnimation('#t1', '#trigger1', '#trigger2-1'))

    animations.current.tl2 = createTimeline(
      { trigger: '#trigger3', endTrigger: '#trigger4' },
      { start: { x: -3, y: 1, z: -1 }, end: { x: -6, y: 0, z: 0 } },
      { start: { x: -4.74, y: 1, z: 5, }, end: { x: 0.25, y: 7, z: 0 } }
    );

    animations.current.tl2.add(textWithArrowAnimation('#t3', '#trigger3', '#trigger4'))

    animations.current.tl3 = createTimeline(
      { trigger: '#trigger4', endTrigger: '#trigger5' },
      { start: { x: -6, y: 0, z: 0 }, end: { x: -6, y: 0, z: 0 } },
      { start: { x: 0.25, y: 7, z: 0 }, end: { x: 2, y: 9, z: 0 } }
    );

    animations.current.tl3.add(textWithArrowAnimation('#t4', '#trigger4', '#trigger5'))
    animations.current.tl3.add(textWithArrowAnimation('#t5', '#trigger4', '#trigger5'))
    animations.current.tl3.add(textWithArrowAnimation('#t6', '#trigger4', '#trigger5'))

    animations.current.tl4 = createTimeline(
      { trigger: '#trigger5', endTrigger: '#trigger6' },
      { start: { x: -6, y: 0, z: 0 }, end: { x: -2, y: 4, z: 0 } },
      { start: { x: 2, y: 9, z: 0 }, end: { x: -7, y: 5, z: -4 } },
      { start: { x: 0, y: 0, z: 0 }, end: { x: -2, y: -1, z: -3 } }
    );

    animations.current.tl4.add(textWithArrowAnimation('#t7', '#trigger5', '#trigger6'))

    animations.current.tl5 = createTimeline(
      { trigger: '#trigger6', endTrigger: '#trigger7' },
      { start: { x: -2, y: 4, z: 0 }, end: { x: -2, y: 4, z: 0 } },
      { start: { x: -7, y: 5, z: -4 }, end: { x: -5, y: 5, z: 6 } },
      { start: { x: -2, y: -1, z: -3 }, end: { x: 2, y: 0, z: 5 } }
    );

    animations.current.tl5.add(textWithArrowAnimation('#t8', '#trigger6', '#trigger7'))

    animations.current.tl6 = createTimeline(
      { trigger: '#trigger7', endTrigger: '#trigger8' },
      { start: { x: -2, y: 4, z: 0 }, end: { x: 0, y: -4, z: 0 } },
      { start: { x: -5, y: 5, z: 6 }, end: { x: 9, y: 3, z: -8 } },
      { start: { x: 2, y: 0, z: 5 }, end: { x: -2, y: 0, z: 3 } }
    );

    animations.current.tl6.add(textWithArrowAnimation('#t9', '#trigger7', '#trigger8'))

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
        end: '+=100px top',
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
        end: '+=100px top',
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

    animations.current.tl7 = createTimeline(
      { trigger: '#trigger8', endTrigger: '#trigger9' },
      { start: { x: 0, y: -4, z: 0 }, end: { x: 0, y: -3, z: 0 } },
      { start: { x: 9, y: 3, z: -8 }, end: { x: 6, y: 3, z: 9 } },
      { start: { x: -2, y: 0, z: 3 }, end: { x: -2, y: 1, z: 2 } },
      true
    );

    animations.current.tl7.add(textWithArrowAnimation('#t10', '#trigger8', '#trigger9'))

    return () => {
      Object.values(animations.current).forEach(tl => tl.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [])

  useEffect(() => {
    if (!cameraControlsRef.current) return;

    cameraControlsRef.current.target.set(-2, 0, 0);
    cameraControlsRef.current.object.position.set(-9.75, 1, 15);
    cameraControlsRef.current.update();
  })

  return (
    <>
      <OrbitControls
        ref={cameraControlsRef}
        enableZoom={false}
        enableRotate={false}
        enableDamping={false}
      />
      <group {...props} dispose={null} scale={5} ref={model}>
        <group name="Scene">
          <mesh name="Cube019" geometry={nodes.Cube019.geometry} material={materials.main} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]} castShadow receiveShadow />
          <mesh name="Cube011" geometry={nodes.Cube011.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]} />
          <mesh ref={led} name="Cylinder010" geometry={nodes.Cylinder010.geometry} material={materials.emission} position={[0.073, 0.131, -2.183]} rotation={[0, 0, -0.25]}>
            <meshStandardMaterial roughness={0} metalness={0} color={currentLed.current} emissive={currentLed.current} emissiveIntensity={54} />
          </mesh>
          <mesh ref={led3} name="Cube013" geometry={nodes.Cube013.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]}>
            <meshStandardMaterial roughness={0} metalness={0} color={'white'} emissive={'white'} emissiveIntensity={54} />
          </mesh>
          <mesh ref={led2} name="Cube015" geometry={nodes.Cube015.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]}>
            <meshStandardMaterial roughness={0} metalness={0} color={'white'} emissive={'white'} emissiveIntensity={54} />
          </mesh>
          <mesh name="Cube016" geometry={nodes.Cube016.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]} />
          <mesh name="Cube017" geometry={nodes.Cube017.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]} />
          <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.1045, 0.104, 0.078]}>
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

useGLTF.preload("https://uploads-ssl.webflow.com/65705d0a7b517c17741ec3f1/6589dabe5b7d61bf88af9927_scooter-transformed.glb.txt");
