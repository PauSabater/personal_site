import { Canvas, useFrame, useThree } from '@react-three/fiber'
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
  meshBounds,
} from '@react-three/drei'

import { RigidBody, Physics } from '@react-three/rapier'
import { Fragment, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Perf } from 'r3f-perf'
import parse from 'html-react-parser'
import styles from "./TopBanner.module.scss"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { ellipse, underline } from '../../../assets/svg/ts/strokes'
import { executeInitialPageAnimation, setTopBannerAnimations } from '../TopBanner.animations'
import { getViewportAspectRatio } from '../../../assets/ts/utils/utils'
import * as THREE from 'three'
gsap.registerPlugin(ScrollTrigger)

useGLTF.preload("/pencil.gbl")
useGLTF.preload("/logo3d.gbl")

export function TopBannerCanvas() {
    const refCamera = useRef(null)

    useLayoutEffect(()=> {
        gsap.set(document.getElementById("header"), {opacity: 0})
    })

    return (
        <Canvas gl={{ preserveDrawingBuffer: false, precision: "mediump" }} dpr={[1, 1]}>
            <color attach="background" args={['hsl(136, 0%, 96%)']} />
            <Camera />
            <Suspense>
                {/* @ts-ignore */}
                <SceneComponents></SceneComponents>
                <Environment preset="warehouse"></Environment>
            </Suspense>
            <OrbitControls
                enabled={false}
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />
        </Canvas>
    )
}

function PhysicsScene() {
    const refYellowPencil = useRef(null)
    const refPurplePencil = useRef(null)

    // Coordinates depending on aspect ratio
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
                colliders="cuboid"
            ><Pencil color={"hsl(54, 67%, 28%)"}></Pencil>
            </RigidBody>
            <RigidBody
                restitution={ 0.25 }
                friction={1}
                position={[xPos, 10.7, zPos]}
                rotation={[-Math.PI / 2.7, yRotate, -Math.PI / 1.8]}
                ref={refPurplePencil}
                colliders="cuboid"
            ><Pencil color={"hsl(248, 30%, 50%)"}></Pencil>
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
    const aspectRatio = getViewportAspectRatio()
    let cameraPositionXY: number[]

    // Camera coordinates depending on aspect ratio
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
            near={55}
            far={cameraPositionXY[0] + 3}
            fov={20}
            position={[0, cameraPositionXY[0], cameraPositionXY[1]]}
        />
    )
}

export function Pencil(props: any) {
    // @ts-ignore
    const { nodes } = useGLTF("/pencil.glb")

    const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(props.color).convertSRGBToLinear(),
        roughness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0,
    })

    return (
        <Fragment>
            <group scale={getViewportAspectRatio() > 0.8 ? 0.2 : 0.3}>
            <mesh
                raycast={ meshBounds }
                castShadow={true}
                receiveShadow={true}
                material={material}
                geometry={nodes.Pencil_1.geometry}
                {...props}>
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
        <meshBasicMaterial color="hsl(136, 0%, 46%)" />
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

function SceneComponents({ font = '/Inter_Medium_Regular.json', ...props }: {font?: string}) {
    const refPretitle = useRef(null)
    const refPretitleMaterial = useRef(null)
    const refTitle = useRef(null)
    const refTitleMaterial = useRef(null)
    const refGlass = useRef(null)
    const refGradiendLight = useRef(null)

    const { size } = useThree()

    {/* @ts-ignore */}
    const { nodes } = useGLTF("/logo3d.glb")

    const [elCanvas, setElCanvas] = useState<HTMLElement | null>(null)
    const [windowHeight, setWindowHeight] = useState<number>(0)
    const [physics, setPhysics] = useState(false)
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(true)
    const [shouldRender, setShouldRender] = useState(true)
    const [previousDistToTop, setPreviousDistToTop] = useState<number | null>(null)
    const [previousCanvasWidth, setPreviousCanvasWidth] = useState(size.width)

    const aspectRatio = getViewportAspectRatio()
    const aspRatVertBreakpoint = 0.8
    const isVerticalBreakpoint: boolean = aspectRatio < aspRatVertBreakpoint

    const glassXCoordinate = isVerticalBreakpoint ? -3 : -6
    const glassZCoordinate = isVerticalBreakpoint ? 8 :  9.5

    useFrame(({ gl, size, scene, camera }) => {

        // Render scene or not depending on conditions:
        if (isAnimationPlaying) gl.render(scene, camera)

        if (shouldRender) {
            // @ts-ignore
            const distToTop = elCanvas?.getBoundingClientRect().top || 0

            if (previousCanvasWidth !== size.width) {
                gl.render(scene, camera)
                setPreviousCanvasWidth(size.width)
            }

            if (previousDistToTop !== null && distToTop === previousDistToTop) {
                return null
            }

            const percentage = (windowHeight - Math.abs(distToTop)) / windowHeight
            if (percentage < 0.95 && percentage > 0) {
                setPreviousDistToTop(distToTop)
                // @ts-ignore
                gsap.set(refGlass.current.position, {x: glassXCoordinate - 2 + percentage * 2, z: glassZCoordinate})
                gl.render(scene, camera)
            }

        } else return null
    }, 1)

    useLayoutEffect(() => {

        setElCanvas(document.querySelector("#top-banner-container") as HTMLElement)
        setWindowHeight(window.innerHeight)

        // Observe to determine when we render:
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) setShouldRender(true)
                else setShouldRender(false)
            })
        }).observe(document.getElementById("top-banner-container") as Element)


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
                    executeInitialPageAnimation()

                    // @ts-ignore
                    gsap.to(refGlass.current.position, {
                        x: glassXCoordinate,
                        z: glassZCoordinate,
                        duration: 0.9,
                        delay: 0.2,
                        ease: "power4.out",
                        onComplete: ()=> {setTimeout(()=> setIsAnimationPlaying(false), 1000)}
                    })

                    setTimeout(() => {
                        setPhysics(true)
                        setTopBannerAnimations(refGradiendLight.current)
                    }, 100)
                }
            }, 0)

            const initiateTopBanner = ()=> {
                document.querySelector(".page-loader")?.classList.remove("is-loading")
                tl.play()
            }

            const elPageLoader = document.querySelector(".page-loader")
            if (elPageLoader?.classList.contains("loader-shown")) initiateTopBanner()
            else setTimeout(() => {
                if (elPageLoader?.classList.contains("loader-shown")) initiateTopBanner()
                else setTimeout(() => initiateTopBanner(), 500)
            }, 1000)
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
                    position={[3 ,0.1, 7]}>
                    {parse((getTitleText()).split('+').join('\n'))}
                        <meshBasicMaterial opacity={0} ref={refTitleMaterial} attach='material' color={'black'}/>
                </Text>

                <group>
                    <Html
                        position={ isVerticalBreakpoint ? [-4, 0.1, -0.5] : [2.25, 0.1, -1.5] }
                        distanceFactor={ getDistanceFactor()  }
                    >
                        <div ref={refGradiendLight} className={styles.gradientLight} id="top-banner-gradient"></div>
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
                    position={[-20,1.35,4]}
                    rotation={[-Math.PI / 2, -Math.PI / 1, -Math.PI / 1]}
                    scale={0.08}
                    raycast={ meshBounds }
                    geometry={nodes.logoRounded.geometry}
                    {...props}>
                    {/* @ts-ignore */}
                    <MeshTransmissionMaterial backside backsideThickness={8} thickness={2} chromaticAberration={0.5} anisotropy={2.5} envMapIntensity={5}/>
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
        ? "frontend dev"
        : "frontend dev"
}

function getTitleText() {
    return getViewportAspectRatio() > 0.8
        ? "giving shape+to ideas"
        : "giving+shape+to ideas"
}

function getPretitlePosition() {
    if (getViewportAspectRatio() < 0.8)  return [3, 0.1, 3.5]
    return [0, 0.1, 0.5]
}

function getDistanceFactor() {
    return window.devicePixelRatio === 2 ? 13 : 16
}