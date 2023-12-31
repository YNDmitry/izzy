import {Canvas} from '@react-three/fiber'
import {Suspense, useRef} from 'react'
import { Model } from './components/model'
import './App.css'
import { Center, Stats, useProgress, Backdrop } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import {Triggers} from "./components/Triggers.jsx";
import {Loader} from "./components/Loader.jsx";
function App() {
    const container = useRef()
  return (
    <>
      <Triggers/>
      <div className='canvas-container' ref={container}>
        <Canvas camera={{ fov: 45 }} frameloop="demand" shadows resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }} style={{'pointerEvents': 'none'}}>
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

export default App
