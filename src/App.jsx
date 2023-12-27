import {Canvas} from '@react-three/fiber'
import {Suspense, useRef} from 'react'
import { Model } from './components/model'
import './App.css'
import { Center, Stats, useProgress, Backdrop } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
function App() {
    const container = useRef()
  return (
    <>
      <div id="trigger1"></div>
      <div id="trigger2-1"></div>
      <div id="trigger2-2"></div>
      <div id="trigger2-3"></div>
      <div id="trigger2-4"></div>
      <div id="trigger2-5"></div>
      <div id="trigger3"></div>
      <div id="trigger4"></div>
      <div id="trigger5"></div>
      <div id="trigger6"></div>
      <div id="trigger7"></div>
      <div id="trigger8"></div>
      <div id="trigger9"></div>
      <div className='canvas-container' ref={container}>
        <Canvas camera={{ fov: 45 }} frameloop="demand" shadows resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}>
            {import.meta.env.DEV ? <Stats /> : ''}
          <Suspense fallback={<Loader />}>
            <Center>
              <Model currRef={container} />
            </Center>
            <Center position={[0, -5.9, 0]}>
              <Backdrop
                floor={0.25}
                segments={20}
                scale={[50, 0, 50]}
                receiveShadow={true}
              >
                <meshPhongMaterial color="#181614" />
              </Backdrop>
            </Center>
            <directionalLight intensity={Math.PI} position={[-10.6, 9.4, -0.2]} castShadow={false} />
            <directionalLight color={'white'} intensity={Math.PI} castShadow={false} position={[-6.20, 2.4, 3.6]} />
            <pointLight intensity={2} />
            <ambientLight intensity={1} color={'black'} />
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.1} radius={0.3} mipmapBlur luminanceThreshold={0.001} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div >
    </>
  )
}

function Loader() {
  const { progress } = useProgress()
  sessionStorage.removeItem('modelIsLoaded')
  if (progress === 100) {
    sessionStorage.setItem('modelIsLoaded', true)
  }
}

export default App
