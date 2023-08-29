import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useScroll,
  useGLTF
} from '@react-three/drei'

import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

useGLTF.preload("/logo3d.gbl")

const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('rgb(100, 100, 100)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

export function TextBannerCanvas() {
    const refCamera = useRef(null)

  return (
    <Canvas gl={{ preserveDrawingBuffer: false, precision: "lowp" }} dpr={[1, 1]}>
        <color attach="background" args={['white']} />
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

function Model({ position }: {position: any}) {

    const refGlass = useRef(null)

    const scroll = useScroll();
    const tl = useRef()

    const [elCanvas, setElCanvas] = useState<HTMLElement | null>(null)
    const [windowHeight, setWindowHeight] = useState<number | null>(null)
    const [scrollPercentage, setScrollPercentage] = useState<number | null>(null)
    const [previousScrollPercentage, setPreviousScrollPercentage] = useState<number>(0)

    {/* @ts-ignore */}
    const { nodes } = useGLTF("/logo3d.glb")

    useFrame(() => {
        const distToTop = elCanvas?.getBoundingClientRect().top

        if (distToTop && windowHeight) {
            const percentage = (distToTop / windowHeight)
            // console.log(percentage)
            if (percentage < 0.90 && percentage > 0
                && percentage !== scrollPercentage
                || percentage === null
                || Math.abs(distToTop) > windowHeight
            ) {
                setScrollPercentage(percentage)
                // @ts-ignore
                gsap.set(refGlass.current.rotation, {y: Math.PI / 1 - percentage * 0.5})

            } else return null
        }
   })

    useLayoutEffect(() => {
        setElCanvas(document.querySelector("#text-banner-canvas") as HTMLElement)
        setWindowHeight(window.innerHeight)
    }, [])

    const refSphere = useRef(null)

    return (
        <>
        <group>
            <Environment preset="warehouse"></Environment>
                <mesh
                    ref={refGlass}
                    position={[-8,1.35,4]} //[-11,1.1,1.2]
                    rotation={[-Math.PI / 2, -Math.PI / 1, -Math.PI / 1]}
                    geometry={nodes.logoRounded.geometry}
                    scale={0.095}
                    material={material}
                >
                    {/* @ts-ignore */}
                    {/* <MeshTransmissionMaterial backside backsideThickness={8} thickness={2} /> */}
                </mesh>
        </group>
        </>
    )
}