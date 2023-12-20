import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Model } from './components/model'
import './App.css'
import { Center, Stage, Stats } from '@react-three/drei'
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
        <Canvas resize shadows camera={{ fov: 45 }}>
          <Stats />
          <Suspense>
            <Stage preset="soft" environment={'city'} shadows={{ type: 'accumulative', color: '#131313', colorBlend: 1, opacity: 1 }} adjustCamera={false}>
              <Center top>
                <Model />
              </Center>
            </Stage>
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.1} radius={0.3} mipmapBlur={true} luminanceThreshold={0.001} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}

export default App
