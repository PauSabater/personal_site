import { Canvas, Vector3, useFrame, useThree } from '@react-three/fiber'
import {
  Text,
  Instance,
  Instances,
  Environment,
  OrbitControls,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  PerformanceMonitor,
  Html,
  ContactShadows,
  useGLTF,
  meshBounds
} from '@react-three/drei'

import { RigidBody, Physics } from '@react-three/rapier'
import { Fragment, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Perf } from 'r3f-perf'
import parse from 'html-react-parser'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { ellipse, underline } from '../../../assets/svg/ts/strokes'
import { getViewportAspectRatio } from '../../../assets/ts/utils/utils'
import THREE from 'three'
import { setTopBannerAnimations } from '../../TopBanner/TopBanner.animations'
gsap.registerPlugin(ScrollTrigger)

useGLTF.preload("/pencil.gbl")
useGLTF.preload("/logo3d.gbl")

export function FooterCanvas() {
    const refCamera = useRef(null)

    useLayoutEffect(()=> {
        gsap.set(document.getElementById("header"), {opacity: 0})
    })

  return (

    <Canvas gl={{ preserveDrawingBuffer: false, precision: "mediump" }} dpr={[1, 1]}>
        <color attach="background" args={['hsl(136, 0%, 96%)']} />
        <Perf position="bottom-left" />
        <PerformanceMonitor />
        <Camera />
        <Suspense>
            {/* @ts-ignore */}
            <SceneComponents></SceneComponents>
            <Environment preset="warehouse"></Environment>
        </Suspense>
        {/** Controls */}
        <OrbitControls
            enabled={true}
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

    const aspectRatio = getViewportAspectRatio()
    let xPos: number
    let zPos: number
    let yRotate: number

    if (aspectRatio > 1.2) {
        xPos = 10
        zPos = -5.25
        yRotate = 0
    } else if (aspectRatio > 1) {
        xPos = 6
        zPos = -5.25
        yRotate = 0
    } else {
        xPos = -3
        zPos = 6
        yRotate = Math.PI / 0.95
    }


    return (
        <Physics >
            <RigidBody
                restitution={ 0.25 }
                friction={1}
                position={[xPos + 1, 4.7, zPos]}
                rotation={[-Math.PI / 1.2, yRotate, -Math.PI / 1.3]}
                ref={refYellowPencil}
            ><Pencil onClick={()=> pencilJump(refYellowPencil.current) } color={"hsl(54, 67%, 28%)"}></Pencil>
            </RigidBody>
            <RigidBody
                restitution={ 0.25 }
                friction={1}
                position={[xPos, 10.7, zPos]}
                rotation={[-Math.PI / 2.7, yRotate, -Math.PI / 1.8]}
                ref={refPurplePencil}
            ><Pencil onClick={()=> pencilJump(refPurplePencil.current)} color={"hsl(248, 30%, 50%)"}></Pencil>
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


    const aspectRatio = getViewportAspectRatio()
    let cameraPositionXY: number[]

    // const normalisedVal = aspectRatio - 0.6

    if (aspectRatio < 0.6) {
        cameraPositionXY = [115, 10]
    } else if (aspectRatio < 0.8) {
        cameraPositionXY = [100, 10]
    } else if (aspectRatio < 1.1) {
        cameraPositionXY = [90, 10]
    } else if (aspectRatio < 1.4) {
        cameraPositionXY = [80, 1]
    } else {
        cameraPositionXY = [65, 0]
    }

    return (
        <PerspectiveCamera
            makeDefault
            // ref={refCamera}
            near={10}
            far={100} // should be 30
            fov={20}
            position={[0, cameraPositionXY[0], cameraPositionXY[1]]}
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

    return (
        <Fragment>
            <group
                onPointerEnter={ () => { document.body.style.cursor = 'pointer' } }
                onPointerLeave={ () => { document.body.style.cursor = 'default' } }
                scale={getViewportAspectRatio() > 0.8 ? 0.2 : 0.3}
            >
            <mesh
                raycast={ meshBounds }
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.Pencil_1.geometry}
                {...props}>
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

const Grid = ({ number = 0, lineWidth = 10, height = 10 }) => {

    return (
    // Renders a grid and crosses as instances
    <Instances position={[0, -0.1, -4]}>
        <gridHelper args={[30, 20, 'white', 'white']} position={[0, -0.01, 0]} />
        <planeGeometry />
        <meshBasicMaterial color="red" />z
        <mesh position={[0, -0.4, 0]} receiveShadow={false} rotation={[Math.PI / 2, Math.PI, 0]} scale={[30, 30, 50]}>
            <planeBufferGeometry />
            <meshBasicMaterial attach="material" color={"darkgrey"} opacity={1} />
        </mesh>
    </Instances>
    )
}

function SceneComponents({ font = '/Inter_Medium_Regular.json', ...props }: {font?: string}) {
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

    const aspectRatio = getViewportAspectRatio()
    const aspRatVertBreakpoint = 0.8
    const isVerticalBreakpoint: boolean = aspectRatio < aspRatVertBreakpoint
    const glassXCoordinate = isVerticalBreakpoint ? -3 : -6
    const glassZCoordinate = isVerticalBreakpoint ? 8 : 9.5


    // x: aspectRatio < 0.8 ? -3 : -6,
    // z: aspectRatio < 0.8 ? 8 :  9.5,

    useFrame(() => {
        // @ts-ignore
        const distToTop = elCanvas?.getBoundingClientRect().top

        if (distToTop && windowHeight) {
            const percentage = (windowHeight - Math.abs(distToTop)) / windowHeight
            if (percentage < 0.95 && percentage > 0) {
                // @ts-ignore
                gsap.to(refGlass.current.position, {x: glassXCoordinate - 2 + percentage * 2, z: glassZCoordinate, duration: 0.1})
            }
        }
    })

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
                        x: isVerticalBreakpoint ? -3 : -6,
                        z: isVerticalBreakpoint ? 8 :  9.5,
                        duration: 0.45,
                        delay: 0.35,
                    })

                    setTimeout(() => {
                        setPhysics(true)
                        setTopBannerAnimations(refGradiendLight.current)
                    }, 200)
                }
            }, 0)

            setTimeout(() => tl.play(), 1000)
        }
    }, [])


    return (
        <>
        <group>
            <group
                position={[setTextPositionXCoordinate(), 0, -6.5]}
                rotation={[0, 0, 0]}
                ref={refPretitle}>
                 <Text
                    font="/Inter-ExtraBold.ttf"
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={1.6} lineHeight={1}
                    letterSpacing={-0.01}
                    position={isVerticalBreakpoint  ? [3, 0.1, -1.25] : [0, 0.1, 0.5]}>
                    {parse((getPreTitleText()).split('+').join('\n'))}
                    <meshStandardMaterial ref={refPretitleMaterial} attach='material' opacity={0} color={"#756c17"}/>
                </Text>

                <Text
                    ref={refTitle}
                    font="/Inter-ExtraBold.ttf"
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={2.9} lineHeight={1.2}
                    letterSpacing={-0.05}
                    position={[3 ,0.1, 6]}>
                    {parse((getTitleText()).split('+').join('\n'))}
                        <meshBasicMaterial opacity={0} ref={refTitleMaterial} attach='material' color={'black'}/>
                </Text>

                <group>
                    <Html
                        position={ isVerticalBreakpoint ? [-4, 0.1, -0.5] : [2.25, 0.1, -1.5] }
                        distanceFactor={ getDistanceFactor()  }
                    >
                        <div ref={refGradiendLight} id="top-banner-gradient"></div>
                        <div id="top-banner-ellipse">{parse(ellipse)}</div>
                    </Html>
                    <Html
                        position={ isVerticalBreakpoint ?  [-3, 0.1, 4.5] : [-3, 0.1, 3.5] }
                        distanceFactor={ getDistanceFactor() }
                    >
                        <div id="top-banner-underline">{parse(underline)}</div>
                    </Html>
                </group>

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
                    {/* @ts-ignore */}
                    <MeshTransmissionMaterial backside backsideThickness={8} thickness={2} />
                </mesh>
            </group>

            <ContactShadows frames={500} scale={40} position={[-0.1, 0, 0]} blur={0.7} far={50} resolution={512} opacity={0.6} color={"hsl(54, 67%, 38%)"} />
            <Grid />
            {physics === true ? <PhysicsScene/> : ''}
        </group>
        </>
    )
}

function setTextPositionXCoordinate() {
    const aspectRatio = getViewportAspectRatio()
    if (aspectRatio < 0.6)  return -3
    if (aspectRatio < 0.8)  return 0
    if (aspectRatio < 1.1)  return -2
    if (aspectRatio >= 1.1 && aspectRatio < 1.4)  return -3
    if (aspectRatio >= 1.4 && aspectRatio < 1.85)  return -5
    return -6
}

function getPreTitleText() {
    return getViewportAspectRatio() > 0.8
        ? ""
        : ""
}

function getTitleText() {
    return getViewportAspectRatio() > 0.8
        ? "keep in touch?"
        : "keep in touch?"
}

function getPretitlePosition() {
    if (getViewportAspectRatio() < 0.8)  return [3, 0.1, 3.5]
    return [0, 0.1, 0.5]
}

function getDistanceFactor() {
    return window.devicePixelRatio === 2 ? 13 : 16
}
