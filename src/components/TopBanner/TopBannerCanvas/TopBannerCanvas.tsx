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
import styles from "./TopBanner.module.scss"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { ellipse, underline } from '../../../assets/svg/ts/strokes'
gsap.registerPlugin(ScrollTrigger)


export function TopBannerCanvas() {
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
    <Canvas gl={{ preserveDrawingBuffer: true }}>


      <color attach="background" args={['hsl(136, 0%, 96%)']} />

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

const Grid = ({ number = 7, lineWidth = 0.025, height = 0.3 }) => {

    const refGrid = useRef(null)

    useLayoutEffect(() => {
        // camera.lookAt(0,0,0)

        if (refGrid.current !== null) {
            // @ts-ignore
            //gsap.to(refGrid.current.position, {z: -4, duration: 0.6})
        }
    }, [])

    return (
    // Renders a grid and crosses as instances
    <Instances position={[0, -0.1, -4]}>
        <gridHelper ref={refGrid} args={[50, 50, 'hsl(136, 0%, 86%)', 'hsl(136, 0%, 86%)']} position={[0, -0.01, 0]} />
        <planeGeometry args={[lineWidth, height]} />
        <meshBasicMaterial color="hsl(136, 0%, 56%)" />
        {Array.from({ length: number }, (_, y) =>
        Array.from({ length: number }, (_, x) => (
            <group key={x + ':' + y} position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}>
            <Instance rotation={[-Math.PI / 2, 0, 0]} />
            <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
            </group>
        ))
        )}
    </Instances>
    )
}

function TextQ({ position, font = '/Inter_Medium_Regular.json', ...props }: {position: any, font: string}) {
    // const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')

    const { camera, mouse } = useThree()
    const refPretitle = useRef(null)
    const refPretitleMaterial = useRef(null)
    const refTitle = useRef(null)
    const refTitleMaterial = useRef(null)
    const refGlass = useRef(null)

    const scroll = useScroll();
    const tl = useRef()

    const [elCanvas, setElCanvas] = useState<HTMLElement | null>(null)
    const [windowHeight, setWindowHeight] = useState<number | null>(null)

    useFrame(() => {
     // if (!tl.current) return
     // @ts-ignore
     // tl.current.seek(scroll.offset * tl.current.duration());
     const distToTop = elCanvas?.getBoundingClientRect().top

     if (distToTop && windowHeight) {
        const percentage = (windowHeight - Math.abs(distToTop)) / windowHeight
        if (percentage < 0.95 && percentage > 0) {
            // @ts-ignore
            // refGlass.current.position.x.lerp(vec.set((mouse.x * 0.5) + -3.2, (mouse.y * 0.5) + 0.3, 4.2), 0.01)
            gsap.to(refGlass.current.position, {x: -15 + percentage * 2, z: -1.2, duration: 0.1})
        }
     }

   });

    useLayoutEffect(() => {

        setElCanvas(document.querySelector("#top-banner-container") as HTMLElement)
        setWindowHeight(window.innerHeight)
            // camera.lookAt(0,0,0)

        //  window.scrollTo(0, 0)
        // if (tl.current !== undefined) {
        //     tl.current = gsap.timeline();

        //     // VERTICAL ANIMATION
        //     tl.current.to(
        //     ref.current.position,
        //     {
        //         duration: 2,
        //         y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
        //     },
        //     0
        //     );
       // }


        if (refPretitle.current !== null && refPretitleMaterial !== null && refTitle.current !== null && refTitleMaterial !== null) {
            // @ts-ignore
                        gsap.to(refPretitle.current.position, {z: -8, duration: 0.6})
                        gsap.to(refPretitleMaterial.current, {opacity: 1, duration: 0.6})
                        // @ts-ignore
                        gsap.to(refTitle.current.position, {z: -3.3, duration: 0.6, delay: 0.5})
                        gsap.to(refTitleMaterial.current, {opacity: 1, duration: 0.6, delay: 0.5})

                        // [-11,1.1,1.2]
                        // @ts-ignore
                        gsap.to(refGlass.current.position, {x: -13, z: -1.2, duration: 0.6, delay: 0.5})
                    }
            setTimeout(()=> {


            const elCanvasContainer = document.querySelector("#top-banner-container")
            if (elCanvasContainer === null) return

            // @ts-ignore
            // gsap.to(refGlass.current.position, {
            //     scrollTrigger: {
            //     markers: true,
            //         trigger: (elCanvasContainer as HTMLElement),
            //         scrub: true,
            //         start: "top top",
            //         end: "bottom bottom"
            //     },
            //     x: -8,
            //     // ease: "none",
            //     // onLeave: ()=> setIsBannerExpanded(false),
            //     // onStart: () => setIsBannerExpanded(false),
            //     // onComplete: () => setIsBannerExpanded(true)
            // })

           //  ScrollTrigger.refresh()

            }, 1000)



    }, [])

    const refSphere = useRef(null)

    return (
        <>
        <group>
            {/* <Center scale={[1, 1, 1]} front top {...props}> */}
            <Html
                position={ [ -2, 0, -9.5 ] }
                center
                distanceFactor={ 16 }
            >
                <div className={styles.gradientLight}></div>
                {parse(ellipse)}
            </Html>
            <Html
                position={ [ -8, 0, -4.5 ] }
                center
                distanceFactor={ 16 }
            >
                {parse(underline)}
            </Html>

            <group
                position={[-5.5,0,-7]}
                rotation={[0, 0, 0]}
                ref={refPretitle}>
                 <Text
                    font="/Inter-ExtraBold.ttf"
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={1.6} lineHeight={1}
                    letterSpacing={-0.01}
                    position={[0, 0, 0]}>
                    {parse(("frontend dev").split('+').join('\n'))}
                    <meshStandardMaterial ref={refPretitleMaterial} attach='material' opacity={0} color={"#756c17"}/>
                </Text>
            </group>

                <Text
                    ref={refTitle}
                    font="/Inter-ExtraBold.ttf"
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={2.8} lineHeight={1.2}
                    letterSpacing={-0.05}
                    position={[-2,1.6,-2]}>
                    {parse(("casting light+to ideas").split('+').join('\n'))}
                        <meshBasicMaterial opacity={0} ref={refTitleMaterial} attach='material' color={'black'}/>
                </Text>

                <ContactShadows scale={100} position={[0, 0, 0]} blur={1} far={100} opacity={1} />
                <Environment preset="warehouse">
                    {/* <Lightformer color={"#a29520"} intensity={8} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} /> */}
                </Environment>

                {/* <Physics gravity={[0, -2, 0]}>
                    <RigidBody> */}
                        <mesh
                            ref={refGlass}
                            receiveShadow
                            castShadow
                            position={[-22,1.35,0]} //[-11,1.1,1.2]
                            rotation={[-Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[4, 1.5, 64, 64]} />
                            {/* @ts-ignore */}
                            <MeshTransmissionMaterial backside backsideThickness={4} thickness={1} />
                        </mesh>
                    {/* </RigidBody>
                </Physics> */}
            <Grid />
        </group>
        </>
    )
}