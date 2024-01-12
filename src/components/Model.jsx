import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThree } from '@react-three/fiber';
import { IconT1 } from "./Icons/IconT1.jsx";
import { IconT3 } from "./Icons/IconT3.jsx";
import { IconT4 } from "./Icons/IconT4.jsx";
import { IconT5 } from "./Icons/IconT5.jsx";
import { IconT6 } from "./Icons/IconT6.jsx";
import { IconT7 } from "./Icons/IconT7.jsx";
import { IconT8 } from "./Icons/IconT8.jsx";
import { IconT9 } from "./Icons/IconT9.jsx";
import { IconT10 } from "./Icons/IconT10.jsx";
import { useInitializeMaterial } from "../composables/useInitializeMaterial.jsx";
import { config } from "../config.js";
import { useAnimateMaterial } from "../composables/useAnimateMaterial.jsx";
import { useGetAnchorPosition } from "../composables/useGetAnchorPosition.jsx";
import { useLedAnimation } from "../composables/useLedAnimation.jsx";
import { Annotation } from "./Annotation.jsx";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger)

export function Model(props) {
  const { nodes, materials } = useGLTF(config.modelPath);
  const model = useRef()
  const cameraControlsRef = useRef()
  const animations = useRef({})
  const shouldAnimateRef = useRef(false);
  let lastElementOffScreen = useRef(false);
  const { invalidate } = useThree()

  const led = useRef()
  const led2 = useRef()
  const led3 = useRef()
  const currentLed = useRef('#0047FF')

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
        start: 'top',
        end: '+=150%',
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

  const textWithArrowAnimation = useCallback((trigger, startTrigger, endTrigger) => {
    gsap.to(trigger, {
      scrollTrigger: {
        trigger: startTrigger,
        endTrigger: endTrigger,
        scrub: true,
        start: '+=70%',
        end: '+=50%',
        onEnter: () => { gsap.to(trigger, { opacity: 1, duration: 0.2 }) },
        onEnterBack: () => { gsap.to(trigger, { opacity: 1, duration: 0.2 }) },
        onLeave: () => { gsap.to(trigger, { opacity: 0, duration: 0.2 }) },
        onLeaveBack: () => { gsap.to(trigger, { opacity: 0, duration: 0.2 }) },
      }
    })
  })

  useLedAnimation(led, shouldAnimateRef, invalidate)

  const textTriggerAnimation = useCallback((trigger, startTrigger, endTrigger, prevTrigger, isFirst, isLast) => {
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
  })

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

  const initializeMaterial = (color) => useInitializeMaterial(color);
  const animateMaterial = (ref, delay, animate) => useAnimateMaterial(ref, delay, animate, invalidate);

  useEffect(() => {
    if (!model.current || !cameraControlsRef.current) return
    cameraControlsRef.current.target.set(-2, 0, 0);
    cameraControlsRef.current.object.position.set(-9.75, 1, 15);
    cameraControlsRef.current.update();

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
          led2.current.material = initializeMaterial(config.colors.orange)
          animateMaterial(led2, 0.3, shouldAnimateRef)
        },
        onLeave: () => {
          shouldAnimateRef.current = false
          led2.current.material = initializeMaterial('white')
        },
        onEnterBack: () => {
          shouldAnimateRef.current = true
          led2.current.material = initializeMaterial(config.colors.orange)
          animateMaterial(led2, 0.3, shouldAnimateRef)
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
          led3.current.material = initializeMaterial(config.colors.orange)
          animateMaterial(led3, 0.3, shouldAnimateRef)
        },
        onLeave: () => {
          shouldAnimateRef.current = false
          led3.current.material = initializeMaterial('white')
        },
        onEnterBack: () => {
          shouldAnimateRef.current = true
          led3.current.material = initializeMaterial(config.colors.orange)
          animateMaterial(led3, 0.3, shouldAnimateRef)
        }
      },
    })
  }, [])

  const { t } = useTranslation()

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
            <Annotation anchor={useGetAnchorPosition('t10')} id='t10' icon={<IconT10 />} center comboClass={'is-v7'}>
              <div className="trigger_text order">{t('t10.text')} {t('t10.subText') ? <span className={'text-color-gray'}><br />{t('t10.subText')}</span> : ''}</div>
            </Annotation>
          </mesh>
          <mesh name="Cube011" geometry={nodes.Cube011.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]} />
          <mesh ref={led} name="Cylinder010" geometry={nodes.Cylinder010.geometry} material={materials.emission} position={[0.073, 0.131, -2.183]} rotation={[0, 0, -0.25]}>
            <Annotation anchor={useGetAnchorPosition('t1')} id='t1' icon={<IconT1 />} comboClass={'is-1'}>
              <div className="trigger_text">{t('t1.text')} {t('t1.subText') ? <span className={'text-color-gray'}><br />{t('t1.subText')}</span> : ''}</div>
            </Annotation>
            <Annotation anchor={useGetAnchorPosition('t2')} id='t2' comboClass={'is-v2'}>
              <div id="t2-1" className="trigger_text is-v2">{t('t2-1.text')}</div>
              <div id="t2-2" className="trigger_text is-v2">{t('t2-2.text')}</div>
              <div id="t2-3" className="trigger_text is-v2">{t('t2-3.text')}</div>
              <div id="t2-4" className="trigger_text is-v2">{t('t2-4.text')}</div>
            </Annotation>
            <meshStandardMaterial roughness={0} metalness={0} color={currentLed.current} emissive={currentLed.current} emissiveIntensity={54} />
          </mesh>
          <mesh ref={led3} name="Cube013" geometry={nodes.Cube013.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]}>
            <Annotation anchor={useGetAnchorPosition('t3')} id='t3' icon={<IconT3 />} comboClass={'is-v3'}>
              <div className="trigger_text order">{t('t3.text')} {t('t3.subText') ? <span className={'text-color-gray'}><br />{t('t3.subText')}</span> : ''}</div>
            </Annotation>
            <Annotation anchor={useGetAnchorPosition('t4')} center id='t4' icon={<IconT4 />} comboClass={'is-2'}>
              <div className="trigger_text is-small-2">{t('t4.text')}</div>
            </Annotation>
            <Annotation anchor={useGetAnchorPosition('t5')} center id='t5' icon={<IconT5 />} comboClass={'is-v4'}>
              <div className="trigger_text">{t('t5.text')} {t('t5.subText') ? <span className={'text-color-gray'}><br />{t('t5.subText')}</span> : ''}</div>
            </Annotation>
            <Annotation anchor={useGetAnchorPosition('t6')} id='t6' icon={<IconT6 />} comboClass={'is-v3'}>
              <div className="trigger_text order">{t('t6.text')}</div>
            </Annotation>
            <Annotation anchor={useGetAnchorPosition('t9')} id='t9' icon={<IconT9 />} center>
              <div className="trigger_text is-small">{t('t9.text')}</div>
            </Annotation>
            <meshStandardMaterial roughness={0} metalness={0} color={'white'} emissive={'white'} emissiveIntensity={54} />
          </mesh>
          <mesh ref={led2} name="Cube015" geometry={nodes.Cube015.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]}>
            <Annotation anchor={useGetAnchorPosition('t8')} id='t8' icon={<IconT8 />} comboClass={'is-v6'} center>
              <div className="trigger_text order">{t('t8.text')}</div>
            </Annotation>
            <meshStandardMaterial roughness={0} metalness={0} color={'white'} emissive={'white'} emissiveIntensity={54} />
          </mesh>
          <mesh name="Cube016" geometry={nodes.Cube016.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]} />
          <mesh name="Cube017" geometry={nodes.Cube017.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.104, 0.104, 0.078]}>
            <Annotation anchor={useGetAnchorPosition('t7')} id='t7' icon={<IconT7 />} comboClass={'is-v5'} center>
              <div className="trigger_text is-big">{t('t7.text')} {t('t7.subText') ? <span className={'text-color-gray'}><br />{t('t7.subText')}</span> : ''}</div>
            </Annotation>
          </mesh>
          <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.emission}
            position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.1045, 0.104, 0.078]}>
            <meshStandardMaterial roughness={0} metalness={0} color={config.colors.red} emissive={config.colors.red} emissiveIntensity={54} />
          </mesh>
          <mesh name="Cube002" geometry={nodes.Cube002.geometry} material={materials.emission} position={[0.199, 1.064, -2.184]} rotation={[0, 0, -0.245]} scale={[0.105, 0.105, 0.079]}>
            <meshStandardMaterial roughness={0} metalness={0} color={currentLed.current} emissive={currentLed.current} emissiveIntensity={54} />
          </mesh>
        </group>
      </group >
    </>
  )
}

useGLTF.preload(config.modelPath)
