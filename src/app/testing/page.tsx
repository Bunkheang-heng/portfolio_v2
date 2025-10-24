'use client'

import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

function RobotModel() {
  const { scene, animations } = useGLTF('/model/robot.glb')
  const meshRef = useRef<THREE.Object3D>(null)
  const { actions } = useAnimations(animations, scene)
  
  useEffect(() => {
    console.log('Available animations:', animations)
    console.log('Animation names:', animations.map((anim: THREE.AnimationClip) => anim.name))
    console.log('Available actions:', Object.keys(actions))
    
    if (actions.hello) {
      console.log('Playing hello animation using useAnimations')
      actions.hello.setLoop(THREE.LoopRepeat, Infinity)
      actions.hello.play()
    } else {
      console.log('Hello action not found, trying first animation')
      const firstAction = Object.values(actions)[0] as THREE.AnimationAction
      if (firstAction) {
        firstAction.setLoop(THREE.LoopRepeat, Infinity)
        firstAction.play()
      }
    }
  }, [actions, animations])
  
  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (meshRef.current) {
      // Gentle floating animation only
      meshRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })
  
  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={0.4}
      position={[0, -2, 0]}
    />
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  )
}

export default function Home() {
  return (
    <div className="w-full h-screen flex">
      {/* Left side - 3D Robot */}
      <div className="w-1/2 h-full">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 75 }}
          style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <Suspense fallback={<LoadingFallback />}>
            <RobotModel />
          </Suspense>
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={false}
          />
          
          <Environment preset="city" />
        </Canvas>
      </div>
      
      {/* Right side - Text */}
      <div className="w-1/2 h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
            HENG
          </h1>
          <h2 className="text-5xl font-semibold text-blue-200 tracking-wide">
            BUNKHEANG
          </h2>
        </div>
      </div>
    </div>
  )
}
