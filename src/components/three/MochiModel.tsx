import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, ContactShadows, Environment, Lightformer, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js'

const BASE = import.meta.env.BASE_URL
export const DRACO_PATH = `${BASE}draco/`

export const MODELS = [
  { id: 'cat-2', file: `${BASE}models/cat-2.glb`, label: 'Pose 02', title: 'Window Watcher', cn: '窗边观察员', yaw: 0.75 },
  { id: 'cat-3', file: `${BASE}models/cat-3.glb`, label: 'Pose 03', title: 'Bean Keeper', cn: '咖啡豆守护者', yaw: 0 },
] as const
export type ModelId = (typeof MODELS)[number]['id']

MODELS.forEach((m) => useGLTF.preload(m.file, DRACO_PATH))

export interface StageOptions {
  autoRotate?: boolean
  wireframe?: boolean
  rimColor?: string
  keyIntensity?: number
  background?: string | null
  hop?: number
  floating?: boolean
}

function Mochi({ url, yaw = 0, wireframe, hop = 0, floating = true, onPet, onReady }: { url: string; yaw?: number; wireframe?: boolean; hop?: number; floating?: boolean; onPet?: () => void; onReady?: () => void }) {
  const { scene } = useGLTF(url, DRACO_PATH)
  const model = useMemo(() => {
    const c = scene.clone(true)
    c.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.isMesh) {
        mesh.castShadow = true
        mesh.material = (mesh.material as THREE.Material).clone()
      }
    })
    return c
  }, [scene])
  const group = useRef<THREE.Group>(null)
  const hopStart = useRef(-10)
  const clock = useThree((s) => s.clock)

  useEffect(() => {
    model.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.isMesh) (mesh.material as THREE.MeshStandardMaterial).wireframe = !!wireframe
    })
  }, [model, wireframe])

  useEffect(() => {
    if (hop > 0) hopStart.current = clock.elapsedTime
  }, [hop, clock])

  useEffect(() => {
    onReady?.()
    return () => {
      document.body.style.cursor = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const k = (t - hopStart.current) / 0.9
    let y = floating ? Math.sin(t * 1.4) * 0.015 : 0
    let spin = 0
    let squash = 1
    if (k >= 0 && k <= 1) {
      y += Math.sin(k * Math.PI) * 0.28
      spin = k * Math.PI * 2
      squash = 1 + Math.sin(k * Math.PI * 2) * 0.06
    }
    g.position.y = y
    g.rotation.y = yaw + spin
    g.scale.set(1 / Math.sqrt(squash), squash, 1 / Math.sqrt(squash))
  })

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation()
        onPet?.()
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = '')}
    >
      <Center top>
        <primitive object={model} />
      </Center>
    </group>
  )
}

export interface MochiStageProps extends StageOptions {
  model?: ModelId
  className?: string
  controlsRef?: React.RefObject<OrbitControlsImpl | null>
  onPet?: () => void
  enableZoom?: boolean
  enablePan?: boolean
  cameraZ?: number
  children?: ReactNode
  preserveDrawingBuffer?: boolean
}

/** Interactive WebGL stage for the Mochi GLB models. Drag to orbit, scroll to zoom, click the cat to make it hop. */
export function MochiStage({
  model = 'cat-2',
  className,
  autoRotate = true,
  wireframe = false,
  rimColor = '#ff7a1a',
  keyIntensity = 1.4,
  background = null,
  hop = 0,
  floating = true,
  controlsRef,
  onPet,
  enableZoom = true,
  enablePan = false,
  cameraZ = 2.6,
  children,
  preserveDrawingBuffer = false,
}: MochiStageProps) {
  const def = MODELS.find((m) => m.id === model)!
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [loadedModel, setLoadedModel] = useState<ModelId | null>(null)

  // Only create a WebGL context once the stage approaches the viewport.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true)
        io.disconnect()
      }
    }, { rootMargin: '300px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const positioned = /\b(absolute|fixed|relative)\b/.test(className ?? '') ? className : `relative ${className ?? ''}`
  return (
    <div ref={wrap} className={positioned} style={{ touchAction: 'none' }}>
      {visible && (
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0.4, 0.75, cameraZ], fov: 32 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer }}
      >
        {background && <color attach="background" args={[background]} />}
        <ambientLight intensity={0.35} />
        <directionalLight position={[2.5, 4, 3]} intensity={keyIntensity} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-2, 1.2, -1.5]} intensity={6} color={rimColor} distance={6} />
        <pointLight position={[2, 0.5, -2]} intensity={3} color="#c6ff3d" distance={5} />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.2} position={[0, 3, 2]} scale={[4, 2, 1]} color="#fff4e6" />
          <Lightformer form="rect" intensity={1.4} position={[-3, 1, 0]} rotation-y={Math.PI / 2} scale={[3, 2, 1]} color={rimColor} />
          <Lightformer form="rect" intensity={1} position={[3, 1, 0]} rotation-y={-Math.PI / 2} scale={[3, 2, 1]} color="#c9a27a" />
          <Lightformer form="circle" intensity={0.8} position={[0, -2, 0]} rotation-x={Math.PI / 2} scale={2} color="#ffffff" />
        </Environment>
        <Suspense fallback={null}>
          <group position={[0, -0.02, 0]}>
            <Mochi key={model} url={def.file} yaw={def.yaw} wireframe={wireframe} hop={hop} floating={floating} onPet={onPet} onReady={() => setLoadedModel(model)} />
          </group>
          <ContactShadows position={[0, -0.01, 0]} opacity={0.55} scale={3} blur={2.4} far={1.2} color="#000000" />
        </Suspense>
        {children}
        <OrbitControls
          ref={controlsRef as never}
          makeDefault
          target={[0, 0.48, 0]}
          autoRotate={autoRotate}
          autoRotateSpeed={1.6}
          enableDamping
          enableZoom={enableZoom}
          enablePan={enablePan}
          minDistance={1.1}
          maxDistance={5}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Canvas>
      )}
      {loadedModel !== model && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 font-display text-[10px] uppercase tracking-[0.3em] text-latte">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-latte/20 border-t-tangerine" />
          Brewing Mochi…
        </div>
      )}
    </div>
  )
}
