import { useEffect, useLayoutEffect, useRef } from "react";
import { Gltf, OrbitControls, useGLTF } from "@react-three/drei";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Color, MeshStandardMaterial } from 'three';

gsap.registerPlugin(ScrollTrigger)

export function Model(props) {
  const { nodes } = useGLTF("https://uploads-ssl.webflow.com/65705d0a7b517c17741ec3f1/65837cf896d18909133f7d41_scooter-final.glb.txt");
  const model = useRef()
  const cameraControlsRef = useRef()
  const animations = useRef({});

  const ledColors = {
    led1: '#0047FF',
    led2: '#00FF19',
    led3: '#FF0004'
  };

  // Функция для инициализации материала
  const initializeMaterial = (material, color) => {
    material.emissive = new Color(color);
    material.color = new Color(color);
    material.emissiveIntensity = 30;
  };

  // Функция для создания GSAP таймлайнов
  const createTimeline = (triggers, targetProps, positionProps, rotationProps) => {
    // cameraControlsRef.current и его свойства доступны
    if (!cameraControlsRef.current || !cameraControlsRef.current.target || !cameraControlsRef.current.object) {
      console.error("Camera controls are not initialized");
      return;
    }

    const timeline = gsap.timeline({
      ease: 'ease',
      duration: 5,
      scrollTrigger: {
        trigger: triggers.trigger,
        endTrigger: triggers.endTrigger,
        scrub: true,
        start: 'top top',
        end: 'bottom bottom',
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
  };

  const animateMaterial = (material, duration, delay) => {
    gsap.to(material.color, {
      r: 1,
      g: 1,
      b: 1,
      repeat: -1,
      stagger: 1,
      yoyo: true,
      ease: 'none',
      duration: 0,
      repeatDelay: delay
    });
    gsap.to(material.emissive, {
      r: 1,
      g: 1,
      b: 1,
      repeat: -1,
      stagger: 1,
      duration: 0,
      ease: 'none',
      yoyo: true,
      repeatDelay: delay
    });
  };

  const createLedScrollTrigger = (startTrigger, endTrigger, enterCallback, leaveCallback) => ({
    trigger: startTrigger,
    endTrigger: endTrigger,
    scrub: false,
    start: 'top top',
    end: 'bottom bottom',
    onEnter: enterCallback,
    onLeaveBack: leaveCallback // Обработка скролла вверх
  });

  useLayoutEffect(() => {
    gsap.to({}, {
      scrollTrigger: createLedScrollTrigger(
        '#trigger2-1',
        '#trigger2-2',
        () => initializeMaterial(model.current.children[2].material, ledColors.led2), // Действие при скролле вниз
        () => initializeMaterial(model.current.children[2].material, ledColors.led1) // Действие при скролле вверх
      )
    });

    gsap.to({}, {
      scrollTrigger: createLedScrollTrigger(
        '#trigger2-2',
        '#trigger2-3',
        () => {
          gsap.killTweensOf(model.current.children[2].material.color)
          gsap.killTweensOf(model.current.children[2].material.emissive)
          initializeMaterial(model.current.children[2].material, ledColors.led3)
          animateMaterial(model.current.children[2].material, 0.5, 0.25)
        }, // Действие при скролле вниз
        () => {
          gsap.killTweensOf(model.current.children[2].material.color)
          gsap.killTweensOf(model.current.children[2].material.emissive)
          initializeMaterial(model.current.children[2].material, ledColors.led2)
        } // Действие при скролле вверх
      )
    });

    gsap.to({}, {
      scrollTrigger: createLedScrollTrigger(
        '#trigger2-3',
        '#trigger2-4',
        () => {
          gsap.killTweensOf(model.current.children[2].material.color)
          gsap.killTweensOf(model.current.children[2].material.emissive)
          animateMaterial(model.current.children[2].material, 0.2, 0.1);
        }, // Действие при скролле вниз
        () => {
          gsap.killTweensOf(model.current.children[2].material.color)
          gsap.killTweensOf(model.current.children[2].material.emissive)
          animateMaterial(model.current.children[2].material, 0.5, 0.25);
        } // Действие при скролле вверх
      )
    });

    gsap.to({}, {
      scrollTrigger: createLedScrollTrigger(
        '#trigger2-4',
        '#trigger2-5',
        () => { initializeMaterial(model.current.children[2].material, ledColors.led1) }, // Действие при скролле вниз
        () => {
          gsap.killTweensOf(model.current.children[2].material.color)
          gsap.killTweensOf(model.current.children[2].material.emissive)
          initializeMaterial(model.current.children[2].material, ledColors.led3)
          animateMaterial(model.current.children[2].material, 0.2, 0.1);
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
      { start: { x: -9.75, y: 1, z: 14 }, end: { x: -4.74, y: 1, z: 5 } },
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

    animations.current.tl7 = createTimeline(
      { trigger: '#trigger8', endTrigger: '#trigger9' },
      { start: { x: 0, y: -4, z: 0 }, end: { x: 0, y: -3, z: 0 } },
      { start: { x: 9, y: 3, z: -8 }, end: { x: 6, y: 3, z: 9 } },
      { start: { x: -2, y: 0, z: 3 }, end: { x: -2, y: 1, z: 2 } }
    );
  }, [nodes, ledColors])

  useEffect(() => {
    if (!cameraControlsRef.current) return;

    const frontLedMaterial = new MeshStandardMaterial({ roughness: 0, metalness: 0 });
    const backLedMaterial = new MeshStandardMaterial({ roughness: 0, metalness: 0 });

    // Установка начальной позиции и направления камеры
    cameraControlsRef.current.target.set(-2, 0, 0);
    cameraControlsRef.current.object.position.set(-9.75, 1, 14);

    // Обновление камеры
    cameraControlsRef.current.update();

    if (model.current) {
      frontLedMaterial.copy(nodes.Cylinder010.material);
      backLedMaterial.copy(nodes.Cube001.material);
      model.current.children[2].material = frontLedMaterial;
      model.current.children[7].material = backLedMaterial;
    }

    initializeMaterial(frontLedMaterial, ledColors.led1);
    initializeMaterial(backLedMaterial, ledColors.led3);
  })

  return (
    <>
      <OrbitControls
        ref={cameraControlsRef}
        enableZoom={false}
        enableRotate={false}
        enableDamping={false}
      />
      <Gltf src='https://uploads-ssl.webflow.com/65705d0a7b517c17741ec3f1/65837cf896d18909133f7d41_scooter-final.glb.txt' castShadow receiveShadow ref={model} scale={5} />
    </>
  );
}

useGLTF.preload("https://uploads-ssl.webflow.com/65705d0a7b517c17741ec3f1/65837cf896d18909133f7d41_scooter-final.glb.txt");
