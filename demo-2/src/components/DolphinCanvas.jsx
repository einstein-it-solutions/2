import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import dolphinModelUrl from '../assets/echovision-dolphin.glb?url'
import dolphinFallback from '../assets/optimized/dolphin-700.webp'

function DolphinModel({ variant }) {
  const group = useRef()
  const { scene } = useGLTF(dolphinModelUrl)
  const model = useMemo(() => scene.clone(true), [scene])

  useFrame((state, delta) => {
    if (!group.current) return
    const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1)
    const pointerX = state.pointer.x
    const pointerY = state.pointer.y
    const baseY = variant === 'hero' ? .12 : -.12
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -.3 + pointerX * .32 + scroll * .32, 4.2, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointerY * .13 - scroll * .13, 4.2, delta)
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -.08 - pointerX * .08, 4.2, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, baseY + Math.sin(state.clock.elapsedTime * 1.04) * .12, 3.5, delta)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, pointerX * .18, 3.5, delta)
  })

  return <group ref={group} scale={variant === 'hero' ? 1.24 : .9}><primitive object={model} /></group>
}

export function DolphinCanvas({ variant = 'hero' }) {
  const isHero = variant === 'hero'
  return <div className={`dolphin-canvas dolphin-canvas-${variant}`} aria-hidden="true">
    <img className="dolphin-canvas-fallback" src={dolphinFallback} alt="" />
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, .15, isHero ? 6.6 : 6.2], fov: 34 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.45} />
      <directionalLight position={[4, 5, 5]} intensity={3.2} color="#b9f3ff" />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#087cae" distance={8} />
      <Suspense fallback={null}><DolphinModel variant={variant} /><Sparkles count={isHero ? 42 : 24} scale={isHero ? [5.5, 3.4, 2] : [4.2, 3, 1.6]} size={1.8} speed={.28} color="#8de7ff" /></Suspense>
    </Canvas>
  </div>
}

useGLTF.preload(dolphinModelUrl)
