import { RGBELoader } from 'three-stdlib'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import {
  Center,
  Text,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  OrthographicCamera,
  PerformanceMonitor,
  Html,
  MeshReflectorMaterial,
  ContactShadows,
  useScroll
} from '@react-three/drei'


import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'

import { useControls, button } from 'leva'
import { EffectComposer, HueSaturation, BrightnessContrast, N8AO, TiltShift2 } from '@react-three/postprocessing'
import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import THREE from 'three'
import { Perf } from 'r3f-perf'
import parse from 'html-react-parser'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { ellipse, underline } from '../../../assets/svg/ts/strokes'
gsap.registerPlugin(ScrollTrigger)


export function TextBannerCanvas() {
    const refCamera = useRef(null)


    // useLayoutEffect(() => {
    //     // camera.lookAt(0,0,0)

    //     if (refCamera.current !== null) {
    //         console.log("CAMERA IS")
    //         console.log(refCamera.current)
    //         // @ts-ignore
    //         gsap.to(refCamera.current.position, {x: 0, y: 16, z: 0, duration: 1})
    //     }
    // }, [])


  return (
    // <Canvas shadows camera={{ position: [5, 20, 20], zoom: 80 }} gl={{ preserveDrawingBuffer: true }}>
    <Canvas gl={{ preserveDrawingBuffer: false, precision: "lowp" }} dpr={[1, 1]}>


      <color attach="background" args={['white']} />

      {/* <Perf position="bottom-left" />
            <PerformanceMonitor /> */}

      {/* <OrthographicCamera
                makeDefault
                // ref={refCamera}
                near={0.5}
                far={300}
                // fov={5}
                position={[0, 15, 0]}
                zoom = {15}
            /> */}

            <PerspectiveCamera
                ref={refCamera}
                makeDefault
                // ref={refCamera}
                near={20}
                far={30}
                fov={47}
                position={[0, 27, 0]}
                // zoom = {15}
            />
                  <Suspense>
                            <ambientLight intensity={0.5} />
                            {/* <spotLight position={[0, 10, 0]} intensity={50} color={"red"} /> */}
                {/* @ts-ignore */}
                <TextQ rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -5.25]}>
                    {""}
                </TextQ>
                {/* <Environment preset="warehouse" /> */}
                 </Suspense>
      {/** Controls */}
      <OrbitControls
        enabled={false}
        autoRotateSpeed={-0.1}
        zoomSpeed={0.25}
        enablePan={true}
        enableZoom={true}
        // dampingFactor={0.05}
      />
    </Canvas>
  )
}

function TextQ({ position, font = '/Inter_Medium_Regular.json', ...props }: {position: any, font: string}) {
    // const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')

    const refGlass = useRef(null)

    const scroll = useScroll();
    const tl = useRef()

    const [elCanvas, setElCanvas] = useState<HTMLElement | null>(null)
    const [windowHeight, setWindowHeight] = useState<number | null>(null)
    const [scrollPercentage, setScrollPercentage] = useState<number | null>(null)
    const [previousScrollPercentage, setPreviousScrollPercentage] = useState<number>(0)


    useFrame(() => {
     const distToTop = elCanvas?.getBoundingClientRect().top

     if (distToTop && windowHeight) {
        const percentage = (windowHeight - Math.abs(distToTop)) / windowHeight
        // console.log(percentage)
        if (percentage < 0.95 && percentage > 0 && percentage !== scrollPercentage || percentage === null) {
            const isScrollDown = percentage > (scrollPercentage || 0) ? true : false
            setScrollPercentage(percentage)
            console.log("rotate!!");
            // @ts-ignore
            gsap.to(refGlass.current.rotation, {y: isScrollDown ? "+=0.02" : "-=0.02", duration: 0.1})

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
                    position={[-5,1.35,0]} //[-11,1.1,1.2]
                    rotation={[-Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[4, 1.5, 32, 32]} />
                    {/* @ts-ignore */}
                    <MeshTransmissionMaterial backside backsideThickness={4} thickness={1} />
                </mesh>
        </group>
        </>
    )
}