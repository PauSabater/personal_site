import { RGBELoader } from 'three-stdlib'
import { Canvas, ThreeEvent, useFrame, useLoader, useThree } from '@react-three/fiber'
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
  useScroll,
  useGLTF,
  meshBounds
} from '@react-three/drei'

// import { Physics, usePlane, useBox } from '@react-three/cannon'

import { RigidBody, Physics } from '@react-three/rapier'


// import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'

import { useControls, button } from 'leva'
import { EffectComposer, HueSaturation, BrightnessContrast, N8AO, TiltShift2 } from '@react-three/postprocessing'
import { Fragment, Suspense, useLayoutEffect, useRef, useState } from 'react'
import THREE, { MeshStandardMaterial } from 'three'
import { Perf } from 'r3f-perf'
import parse from 'html-react-parser'
import styles from "./TopBanner.module.scss"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { ellipse, underline } from '../../../assets/svg/ts/strokes'
import { setTopBannerAnimations } from '../TopBanner.animations'
gsap.registerPlugin(ScrollTrigger)

useGLTF.preload("/pencil.gbl")
useGLTF.preload("/logo3d.gbl")


export function TopBannerCanvas() {
    const refCamera = useRef(null)

    useLayoutEffect(()=> {
        gsap.set(document.getElementById("header"), {opacity: 0})
        gsap.set(document.getElementById("page-overlay"), {opacity: 1})
        gsap.to(document.getElementById("page-overlay"), {opacity: 0, duration: 1})
    })

    // useFrame(() => {
    //         camera.position.lerp(vec.set((mouse.x * 0.5) + -3.2, (mouse.y * 0.5) + 0.3, 4.2), 0.01)
    // })




  return (


    <Canvas gl={{ preserveDrawingBuffer: false, precision: "mediump" }} dpr={[1, 1]}>

      <color attach="background" args={['hsl(136, 0%, 96%)']} />

      <Perf position="bottom-left" />
            <PerformanceMonitor />

    <Camera />


    <Suspense>
        {/* @ts-ignore */}
        <TextQ></TextQ>
        <Environment preset="warehouse"></Environment>
    </Suspense>
      {/** Controls */}
      <OrbitControls
        enabled={false}
        // autoRotateSpeed={-0.1}
        // zoomSpeed={0.25}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        // dampingFactor={0.05}
      />
    </Canvas>
  )
}

function PhysicsScene() {
    const refYellowPencil = useRef(null)
    const refPurplePencil = useRef(null)


    return (
    <Physics >
        <RigidBody
            restitution={ 0.25 }
            friction={1}
            position={[11, 4.7, -5.25]}
            rotation={[-Math.PI / 1.2, 0, -Math.PI / 1.3]}
            ref={refYellowPencil}
        ><Pencil onClick={ ()=> pencilJump(refYellowPencil.current) } color={"hsl(54, 67%, 28%)"}></Pencil>
        </RigidBody>
        <RigidBody
            restitution={ 0.25 }
            friction={1}
            position={[10, 10.7, -5.25]}
            rotation={[-Math.PI / 2.7, 0, -Math.PI / 1.8]}
            ref={refPurplePencil}
        ><Pencil onClick={ ()=> {
            console.log(refPurplePencil)
            pencilJump(refPurplePencil.current)}
             } color={"hsl(248, 30%, 50%)"}></Pencil>
        </RigidBody>
        <RigidBody type="fixed">
            <mesh position={[0, 0, 0]} receiveShadow={false} rotation={[Math.PI / 2, Math.PI, 0]} scale={[50, 50, 50]}>
                    <planeBufferGeometry />
                <meshBasicMaterial attach="material" transparent opacity={0} />
            </mesh>
        </RigidBody>
    </Physics>
    )
}

function Camera() {

    const { camera, mouse } = useThree()

    useThree(() => {
        // @ts-ignore
        gsap
        .to(camera.lookAt, {
            x: 10,
            y: 10,
            z: 20,
            duration: 1.5,
            ease: "sine.inOut",
        })
    })


    return (
        <PerspectiveCamera
            makeDefault
            // ref={refCamera}
            near={55}
            far={68} // should be 30
            fov={20}
            position={[0, 65, 0]}
            // rotation={[-Math.PI / 2, -0.3, 0]}
            // zoom = {65}
    />
    )
}

function pencilJump(pencil: any) {
    pencil.applyImpulse({ x: 0, y: 7, z: 0 })
    pencil.applyTorqueImpulse({ x: 0, y: 1, z: 0 })

}

function Pencil(props: any) {
    // @ts-ignore
    const { nodes } = useGLTF("/pencil.glb")
    // console.log(nodes)

    return (
        <Fragment>
            <group
                onPointerEnter={ () => { document.body.style.cursor = 'pointer' } }
                onPointerLeave={ () => { document.body.style.cursor = 'default' } }
                scale={0.2}
            >
            <mesh
                raycast={ meshBounds }
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Pencil_1.geometry}
                {...props}>
                {/* <MeshTransmissionMaterial backside backsideThickness={10} thickness={5} distortionScale={0} temporalDistortion={0} attach="material" color={"lightgrey"}/> */}
                <meshStandardMaterial attach="material" color={props.color} />
            </mesh>
            <mesh
                raycast={ meshBounds }
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Pencil_2.geometry}
                {...props}>
                <meshBasicMaterial attach="material" color={"grey"} />
            </mesh>
            <mesh
                raycast={ meshBounds }
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Pencil_3.geometry}
                {...props}>
                <meshBasicMaterial attach="material" color={props.color} />
            </mesh>
            </group>
        </Fragment>
    )
  }

const Grid = ({ number = 7, lineWidth = 0.025, height = 0.3 }) => {

    return (
    // Renders a grid and crosses as instances
    <Instances position={[0, -0.1, -4]}>
        <gridHelper args={[50, 50, 'hsl(136, 0%, 86%)', 'hsl(136, 0%, 86%)']} position={[0, -0.01, 0]} />
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

function TextQ({ font = '/Inter_Medium_Regular.json', ...props }: {font?: string}) {
    // const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')

    const refPretitle = useRef(null)
    const refPretitleMaterial = useRef(null)
    const refTitle = useRef(null)
    const refTitleMaterial = useRef(null)
    const refGlass = useRef(null)
    const refGradiendLight = useRef(null)

    {/* @ts-ignore */}
    const { nodes } = useGLTF("/logo3d.glb")

    const [elCanvas, setElCanvas] = useState<HTMLElement | null>(null)
    const [windowHeight, setWindowHeight] = useState<number | null>(null)
    const [physics, setPhysics] = useState(false)

    const finalXCoordinate = useState(-8.7)


    useFrame(() => {
     // if (!tl.current) return
     // @ts-ignore
     const distToTop = elCanvas?.getBoundingClientRect().top

     if (distToTop && windowHeight) {
        const percentage = (windowHeight - Math.abs(distToTop)) / windowHeight
        if (percentage < 0.95 && percentage > 0) {
            // @ts-ignore
            gsap.to(refGlass.current.position, {x: -14 + percentage * 2, z: 1.5, duration: 0.1})
        }
     }

   });

    useLayoutEffect(() => {

        setElCanvas(document.querySelector("#top-banner-container") as HTMLElement)
        setWindowHeight(window.innerHeight)


        if (refPretitle.current !== null && refPretitleMaterial !== null && refTitle.current !== null && refTitleMaterial !== null) {
            const tl = gsap.timeline().pause()
            tl
            // @ts-ignore
                    .to(refPretitle.current.position, {
                        z: -8,
                        duration: 0.6
                    }, 0)
                    .to(refPretitleMaterial.current, {
                        opacity: 1,
                        duration: 0.6
                    }, 0)
                    // @ts-ignore
                    .to(refTitle.current.position, {
                        z: 4.6,
                        duration: 0.6,
                        delay: 0.4
                    }, 0)
                    .to(refTitleMaterial.current, {
                        opacity: 1,
                        duration: 0.6,
                        delay: 0.4,
                        onStart: ()=> {
                            // @ts-ignore
                            gsap.to(refGlass.current.position, {
                                x: -12,
                                z: 1.5,
                                duration: 0.45,
                                delay: 0.35,
                            })

                            setTimeout(() => {
                                setPhysics(true)
                                setTopBannerAnimations(refGradiendLight.current)
                            }, 200)
                        }
                    }, 0)

                .play()
            }
    }, [])


    return (
        <>
        <group>
            <Html
                position={ [ -3.5, 0, -9.5 ] }
                center
                distanceFactor={ 16 }
            >
                <div ref={refGradiendLight} className={styles.gradientLight} id="top-banner-gradient"></div>
                <div id="top-banner-ellipse">{parse(ellipse)}</div>
            </Html>
            <Html
                position={ [ -9.5, 0, -4.5 ] }
                center
                distanceFactor={ 16 }
            >
                <div id="top-banner-underline">{parse(underline)}</div>
            </Html>

            <group
                position={[-7,0,-6.5]}
                rotation={[0, 0, 0]}
                ref={refPretitle}>
                 <Text
                    font="/Inter-ExtraBold.ttf"
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={1.6} lineHeight={1}
                    letterSpacing={-0.01}
                    position={[0, 0.1, 0.5]}>
                    {parse(("frontend dev").split('+').join('\n'))}
                    <meshStandardMaterial ref={refPretitleMaterial} attach='material' opacity={0} color={"#756c17"}/>
                </Text>

                <Text
                    ref={refTitle}
                    font="/Inter-ExtraBold.ttf"
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={2.9} lineHeight={1.2}
                    letterSpacing={-0.05}
                    position={[3 ,0.1, 6]}>
                    {parse(("casting light+to ideas").split('+').join('\n'))}
                        <meshBasicMaterial opacity={0} ref={refTitleMaterial} attach='material' color={'black'}/>
                </Text>
            </group>



                <ContactShadows frames={700} scale={40} position={[-0.1, 0, 0]} blur={0.7} far={50} opacity={0.6} />
                    {/* <mesh
                        ref={refGlass}
                        receiveShadow
                        castShadow
                        position={[-22,1.35,0]} //[-11,1.1,1.2]
                        rotation={[-Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[4, 1.5, 64, 64]} />
                        <MeshTransmissionMaterial backside backsideThickness={4} thickness={1} />
                    </mesh> */}
                    <mesh
                        ref={refGlass}
                        receiveShadow
                        castShadow
                        position={[-25,1.35,4]}
                        rotation={[-Math.PI / 2, -Math.PI / 1, -Math.PI / 1]}
                        scale={0.08}
                            raycast={ meshBounds }
                            geometry={nodes.logoRounded.geometry}
                            {...props}>
                            {/* <MeshTransmissionMaterial backside backsideThickness={10} thickness={5} distortionScale={0} temporalDistortion={0} attach="material" color={"lightgrey"}/> */}
                            {/* @ts-ignore */}
                            <MeshTransmissionMaterial backside backsideThickness={8} thickness={2} />
                        </mesh>
            <Grid />
            {physics === true ? <PhysicsScene/> : ''}
        </group>
        </>
    )
}

function Logo(props: any) {
    // @ts-ignore
    const { nodes } = useGLTF("/logo3d.glb")

    return (
        // <Fragment></Fragment>
        <mesh
        position={[-22,1.35,0]}
        rotation={[-Math.PI / 2, -Math.PI / 1, -Math.PI / 1]}
        scale={0.1}
            raycast={ meshBounds }
            castShadow={false}
            receiveShadow={false}
            geometry={nodes.logoRounded.geometry}
            {...props}>
            {/* <MeshTransmissionMaterial backside backsideThickness={10} thickness={5} distortionScale={0} temporalDistortion={0} attach="material" color={"lightgrey"}/> */}
            {/* @ts-ignore */}
            <MeshTransmissionMaterial backside backsideThickness={4} thickness={1} />
        </mesh>
    )
}