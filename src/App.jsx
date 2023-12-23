import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Model } from './components/model'
import './App.css'
import { Center, Stage, Stats, useProgress, Backdrop } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
function App() {
  return (
    <>
      <div className='canvas-container'>
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
        <div data-split-text=""></div>
        <Canvas camera={{ fov: 45 }} frameloop="demand" performance={{ min: 0.5 }} shadows>
          {import.meta.env.DEV ? <Stats /> : ''}
          <fog attach="fog" args={['black', 17, 25]} />
          <Suspense fallback={<Loader />}>
            <Center>
              <Model />
            </Center>
            <Center position={[0, -5.9, 0]}>
              <Backdrop
                floor={0.25} // Stretches the floor segment, 0.25 by default
                segments={20} // Mesh-resolution, 20 by default
                scale={[50, 0, 50]}
                receiveShadow={true}
              >
                <meshStandardMaterial color="#181614" />
              </Backdrop>
            </Center>
            <directionalLight intensity={Math.PI} position={[-10.6, 9.4, -0.2]} />
            <directionalLight color={'white'} intensity={1} castShadow={false} position={[-6.20, 2.4, 3.6]} />
            <pointLight intensity={2} />
            <ambientLight intensity={1} />
            {/* <Stage intensity={1} castShadow={false} preset={'portrait'} environment={'forest'} adjustCamera={false}>
            </Stage> */}
            {/* <pointLight castShadow={false} position={[3, 6, 0]} intensity={15}></pointLight> */}
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
