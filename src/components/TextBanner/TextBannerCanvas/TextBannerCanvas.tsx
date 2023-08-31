import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useGLTF
} from '@react-three/drei'
import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from "gsap"

useGLTF.preload("/logo3d.gbl")

const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('rgb(135, 135, 135)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

export function TextBannerCanvas({mode}:{mode: string}) {
    const refCamera = useRef(null)

  return (
    <Canvas gl={{ preserveDrawingBuffer: false, precision: "lowp" }} dpr={[1, 1]}>
        {/* <color attach="background" args={["transparent"]} /> */}
              <PerspectiveCamera
                  ref={refCamera}
                  makeDefault
                  near={10}
                  far={50}
                  fov={47}
                  position={[0, 27, 0]}
              />
              <Suspense>
                  <ambientLight intensity={0.5} />
                  {/* @ts-ignore */}
                  <Model rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -5.25]}>{""}</Model>
              </Suspense>
        {/** Controls */}
        <OrbitControls
            enabled={false}
            enablePan={true}
            enableZoom={true}
        />
    </Canvas>
  )
}

function Model() {

    const refGlass = useRef(null)

    const [elCanvas, setElCanvas] = useState<HTMLElement | null>(null)
    const [windowHeight, setWindowHeight] = useState<number | null>(null)
    const [scrollPercentage, setScrollPercentage] = useState<number | null>(null)
    const [shouldRender, setShouldRender] = useState(false)

    {/* @ts-ignore */}
    const { nodes } = useGLTF("/logo3d.glb")

    useFrame(({ gl, scene, camera }) => {

        if (shouldRender && windowHeight) {
            const distToTop = elCanvas?.getBoundingClientRect().top || 0
            const percentage = (distToTop / windowHeight)
            if (percentage < 0.95 && percentage > 0
                && percentage !== scrollPercentage
                || percentage === null
                || Math.abs(distToTop) > windowHeight
            ) {
                setScrollPercentage(percentage)
                // @ts-ignore
                gsap.set(refGlass.current.rotation, {y: Math.PI / 1 - percentage * 0.5})
                gl.render(scene, camera)

            } else return null
        }
    }, 1)

    useLayoutEffect(() => {
        setElCanvas(document.querySelector("#text-banner-canvas") as HTMLElement)
        setWindowHeight(window.innerHeight)

        // Observe to determine when we render:
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) setShouldRender(true)
                else setShouldRender(false)
            })
        }).observe(document.getElementById("text-banner-canvas") as Element)
    }, [])


    return (
        <>
        <group>
            <Environment preset="warehouse"></Environment>
                <mesh
                    ref={refGlass}
                    position={[-8,1.35,4]}
                    rotation={[-Math.PI / 2, -Math.PI / 1, -Math.PI / 1]}
                    geometry={nodes.logoRounded.geometry}
                    scale={0.095}
                    material={material}
                >
                </mesh>
        </group>
        </>
    )
}