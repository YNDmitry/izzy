import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Color, MeshStandardMaterial } from 'three';
import { useThree } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger)

export function Model(props) {
  const { nodes, materials } = useGLTF("https://uploads-ssl.webflow.com/65705d0a7b517c17741ec3f1/65872bb51744e63eb44e2f74_scooter-last-transformed.glb.txt");
  const model = useRef()
  const cameraControlsRef = useRef()
  const animations = useRef({})
  const { invalidate } = useThree()

  const led = useRef()
  const led2 = useRef()
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
        end: '+=500px bottom',
        onUpdate: () => cameraControlsRef.current.update()
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
    start: 'top top',
    end: '+=1px',
    onEnter: enterCallback,
    onLeaveBack: leaveCallback // Обработка скролла вверх
  }), [])

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

    animations.current.tl2 = createTimeline(
      { trigger: '#trigger3', endTrigger: '#trigger4' },
      { start: { x: -3, y: 1, z: -1 }, end: { x: -6, y: 0, z: 0 } },
      { start: { x: -4.74, y: 1, z: 5, }, end: { x: 0.25, y: 7, z: 0 } }
    );

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
    );

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

    animations.current.tl7 = createTimeline(
      { trigger: '#trigger8', endTrigger: '#trigger9' },
      { start: { x: 0, y: -4, z: 0 }, end: { x: 0, y: -3, z: 0 } },
      { start: { x: 9, y: 3, z: -8 }, end: { x: 6, y: 3, z: 9 } },
      { start: { x: -2, y: 0, z: 3 }, end: { x: -2, y: 1, z: 2 } }
    );
  }, [nodes, ledColors, initializeMaterial, createTimeline, animateMaterial, createLedScrollTrigger])

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
          <mesh name="Cube013" geometry={nodes.Cube013.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]} />
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

useGLTF.preload("https://uploads-ssl.webflow.com/65705d0a7b517c17741ec3f1/65872bb51744e63eb44e2f74_scooter-last-transformed.glb.txt");
