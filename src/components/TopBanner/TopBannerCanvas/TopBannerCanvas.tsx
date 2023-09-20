import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Text,
  Instance,
  Instances,
  Environment,
  OrbitControls,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Html,
//   ContactShadows,
  useGLTF,
  meshBounds,
} from '@react-three/drei'

import { Fragment, useLayoutEffect, useRef, useState } from 'react'
import styles from "./TopBanner.module.scss"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { ellipse, underline } from '../../../assets/svg/ts/strokes'
import { setTopBannerAnimations } from '../TopBanner.animations'
import { getViewportAspectRatio, hideAllTransitionImages, isMobileScreen, scTransitionPage } from '../../../assets/ts/utils/utils'
import * as THREE from 'three'
// import { TextureLoader } from 'three'

gsap.registerPlugin(ScrollTrigger)

useGLTF.preload("/pencil_low.gbl")
useGLTF.preload("/logo3d_3000.gbl")

export function TopBannerCanvas({mode}: {mode: string}) {

    useLayoutEffect(()=> {
        if (document.getElementById("page-content")?.classList.contains("visited") === false) {
            gsap.set(document.getElementById("header"), {opacity: 0, y: -200})
            document.getElementById("page-content")?.classList.add("visited")
        }
    }, [])

    return (
        <Canvas gl={{ preserveDrawingBuffer: false, precision: "mediump" }} dpr={[1, 1]}>
            <color attach="background" args={[mode === "dark" ? 'hsl(0, 0%, 7%)' : 'hsl(136, 0%, 96%)']} />
            <Camera />
                {/* @ts-ignore */}
                <SceneComponents mode={mode}></SceneComponents>
                <Environment files="warehouse-small.hdr"></Environment>
            <OrbitControls
                enabled={false}
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />
        </Canvas>
    )
}

function PencilsDuo({mode}:{mode: string}) {
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
        xPos = 10
        zPos = -9.25
        yRotate = 0
    } else {
        xPos = -5
        zPos = 8.5
        yRotate = Math.PI / 0.7
    }

    return (
        <group position={[xPos, 1, zPos]} rotation={[0, yRotate, 0]}>
            {/* //YELLOW */}
            <Pencil color={"hsl(54, 67%, 45%)"} rotation={[1, Math.PI / -0.9, 1]} position={[0, 1, 8]} mode={mode}></Pencil>
            <Pencil color={"hsl(248, 30%, 50%)"} rotation={[1,  Math.PI / -1, 1]} position={[0, 1, 0]} mode={mode}></Pencil>
        </group>
    )
}

function Camera() {
    const { size } = useThree()
    const [cameraPositionYZ, setCameraPositionYZ] = useState(getCameraCoordinates())
    const [previousCanvasWidth, setPreviousCanvasWidth] = useState(size.width)

    // Update camera coordinates in case there is a change in viewport width
    useFrame(({ size }) => {
        if (size.width !== previousCanvasWidth) {
            setPreviousCanvasWidth(size.width)
            setCameraPositionYZ(getCameraCoordinates())
        }
    })

    function getCameraCoordinates() {
        const aspectRatio = getViewportAspectRatio()

        if (aspectRatio < 0.6) {
            return [115, 10]
        } else if (aspectRatio < 0.8) {
            return [100, 10]
        } else if (aspectRatio < 1.1) {
            return [90, 10]
        } else if (aspectRatio < 1.4) {
            return [80, 1]
        } else {
            return [65, 0]
        }
    }

    return (
        <PerspectiveCamera
            makeDefault
            near={5} //55
            far={cameraPositionYZ[0] + 3}
            fov={20}
            position={[0, cameraPositionYZ[0], 0]}
        />
    )
}

export function Pencil(props: any) {
    // @ts-ignore
    const { nodes } = useGLTF("/pencil_low.glb")
    const colorCone = props.mode === "light" ? "grey" : "rgb(70, 70, 70)"

    const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(props.color).convertSRGBToLinear(),
        roughness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0,
        // reflectivity: 1
    })

    return (
        <Fragment>
            <group scale={getViewportAspectRatio() > 0.8 ? 0.2 : 0.3}>
                <mesh
                    raycast={ meshBounds }
                    castShadow={false}
                    receiveShadow={false}
                    material={material}
                    geometry={nodes.wood.geometry}
                    {...props}>
                </mesh>
                <mesh
                    raycast={ meshBounds }
                    castShadow={false}
                    receiveShadow={false}
                    geometry={nodes.cone.geometry}
                    {...props}>
                    <meshBasicMaterial attach="material" color={colorCone} />
                </mesh>
                <mesh
                    raycast={ meshBounds }
                    castShadow={false}
                    receiveShadow={false}
                    geometry={nodes.color.geometry}
                    {...props}>
                    <meshBasicMaterial attach="material" color={props.color} />
                </mesh>
            </group>
        </Fragment>
    )
  }

const Grid = ({mode}: {mode: string}) => {
    const number = 7
    const lineWidth = 0.02
    const height = 0.2

    const colorGrid = mode === "light" ? 'hsl(136, 0%, 86%)' : 'hsl(136, 0%, 16%)'
    const colorCross = mode === "light" ? 'hsl(136, 0%, 50%)' : 'hsl(136, 0%, 36%)'

    return (
    // Renders a grid and crosses as instances
    <Instances position={[0, -0.1, -4]}>
        <gridHelper args={[50, 50, colorGrid, colorGrid]} position={[0, -0.03, 0]} />
        <planeGeometry args={[lineWidth, height]} />
        <meshBasicMaterial color={colorCross} />
        {Array.from({ length: number }, (_, y) =>
            Array.from({ length: number }, (_, x) => (
                <group key={x + ':' + y} position={[x * 2 - Math.floor(number / 2) * 2, 0, y * 2 - Math.floor(number / 2) * 2]}>
                    <Instance rotation={[-Math.PI / 2, 0, 0]} />
                    <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
                </group>
            ))
        )}
    </Instances>
    )
}

function SceneComponents({ mode, font = '/Inter_Medium_Regular.json', ...props }: {mode: string, font?: string}) {

    const refPretitle = useRef(null)
    const refPretitleMaterial = useRef(null)
    const refTitle = useRef(null)
    const refTitleMaterial = useRef(null)
    const refGlass = useRef(null)
    const refGradiendLight = useRef(null)

    const { size } = useThree()

    {/* @ts-ignore */}
    const { nodes } = useGLTF("/logo3d_3000.glb")
    const [elCanvas, setElCanvas] = useState<HTMLElement | null>(null)
    const [windowHeight, setWindowHeight] = useState<number>(0)
    const [pencils, setPencils] = useState(false)
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(true)
    const [shouldRender, setShouldRender] = useState(true)
    const [isAnimating, setIsAnimating] = useState(false)
    const [previousDistToTop, setPreviousDistToTop] = useState<number | null>(null)
    const [previousCanvasWidth, setPreviousCanvasWidth] = useState(size.width)
    const [previousMode, setPreviousMode] = useState(mode)

    // Responsive states:
    const aspRatVertBreakpoint = 0.8
    const [isBiggerVerticalBreakpoint, setIsBiggerVerticalBreakpoint] = useState(getViewportAspectRatio() < aspRatVertBreakpoint)
    const [textXCoordinate, setTextXCoordinate] = useState(setTextPositionXCoordinate())

    const glassXCoordinate = isBiggerVerticalBreakpoint ? -3 : -6
    const glassZCoordinate = isBiggerVerticalBreakpoint ? 8 :  9.5

    const colorMainText = mode === "light" ? "black" : "hsl(136, 0%, 96%)"
    const colorPretitle = mode === "light" ? "hsl(54, 67%, 38%)" : "hsl(54, 67%, 65%)"


    useFrame(({ gl, size, scene, camera }) => {

        // Render scene or not depending on conditions:
        if (isAnimationPlaying || previousMode !== mode) {
            gl.render(scene, camera)

            if (previousMode !== mode) setPreviousMode(mode)
        }

        if (shouldRender) {
            // @ts-ignore
            const distToTop = elCanvas?.getBoundingClientRect().top || 0

            if (isAnimating) {
                gl.render(scene, camera)
                return
            }

            if (previousCanvasWidth !== size.width) {
                setPreviousCanvasWidth(size.width)
                updateResponsiveUnits()
                gl.render(scene, camera)
                return
            }

            if (previousDistToTop !== null && distToTop === previousDistToTop) {
                return null
            }

            const percentage = (windowHeight - Math.abs(distToTop)) / windowHeight
            if (percentage < 0.95 && percentage > 0 && size.width > 768) {
                setPreviousDistToTop(distToTop)
                // @ts-ignore
                gsap.set(refGlass.current.position, {x: glassXCoordinate - 2 + percentage * 2, z: glassZCoordinate})
                gl.render(scene, camera)
            }

        } else return null
    }, 1)

    // Function to run when viewport width changes
    const updateResponsiveUnits = ()=> {
        // Text group X coordinate
        const newTextXCoord = setTextPositionXCoordinate()
        if (newTextXCoord !== textXCoordinate) {
            setTextXCoordinate(setTextPositionXCoordinate())
        }

        // Aspect Ratio
        setIsBiggerVerticalBreakpoint(getViewportAspectRatio() < aspRatVertBreakpoint)
    }

    useLayoutEffect(() => {

        setElCanvas(document.querySelector("#top-banner-container") as HTMLElement)
        setWindowHeight(window.innerHeight)

        // Observe only on desktop to determine when we render. On mobile the glass effect is not added:
        if (isMobileScreen() === false) {
            new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) setShouldRender(true)
                    else setShouldRender(false)
                })
            }).observe(document.getElementById("top-banner-container") as Element)
        } else setShouldRender(false)


        if (refPretitle.current !== null && refPretitleMaterial !== null && refTitle.current !== null && refTitleMaterial !== null) {
            const elTopBanner = document.getElementById("top-banner")
            const elPageOverlay = document.getElementById("page-overlay")

            const tl = gsap.timeline().pause()
            tl
            .set(elTopBanner, {
                y: 100
            })
            .set(elPageOverlay, {
                opacity: 1
            })
            // @ts-ignore
            .to(refPretitle.current.position, {
                z: -8,
                duration: 0.6,
                onStart: ()=> hideAllTransitionImages()
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
                    gsap.to(elPageOverlay, {
                        opacity: 0,
                        duration: scTransitionPage - 0.1,
                        ease: "power1.in"
                    })
                    gsap.to(elTopBanner, {
                        y: 0,
                        duration: scTransitionPage - 0.1,
                        delay: 0,
                        ease: "power1.in"
                    })





                    if (!isMobileScreen()) {
                        // @ts-ignore
                        gsap.to(refGlass.current.position, {
                            x: glassXCoordinate,
                            z: glassZCoordinate,
                            duration: 0.9,
                            delay: 0.2,
                            ease: "power4.out",
                        })
                    }

                    setTimeout(() => setIsAnimationPlaying(false), 3000)

                    setTimeout(() => {
                        setPencils(true)
                        setTopBannerAnimations(refGradiendLight.current)
                    }, 100)
                }
            }, 0)

            const initiateTopBanner = ()=> {
                window.scrollTo(0,0)
                document.querySelector(".page-loader")?.classList.remove("is-loading")
                tl.play()
            }

            const elPageLoader = document.querySelector(".page-loader")
            const isMobile = isMobileScreen()
            if (elPageLoader?.classList.contains("loader-shown")) {
                document.querySelector(".page-loader")?.classList.add("is-loading")

                setTimeout(() => {
                    document.querySelector(".page-loader")?.classList.remove("is-loading")
                    setTimeout(() => initiateTopBanner(), isMobile ? 500 : 0)
                }, isMobile ? 500 : 1500)
            }
            else setTimeout(() => initiateTopBanner(), isMobile ? 4000 : 2000)
        }
    }, [])

    function glassScaleEffect(isEnter: boolean, isClick = false) {
        if (refGlass.current === null) return
        setIsAnimating(true)

        const scale = isEnter && !isClick ? 0.0825
            : isClick ? 0.084 : 0.08

        // @ts-ignore
        gsap.to(refGlass.current.scale, {
            x: scale,
            y: scale,
            z: scale,
            duration: isClick ? 0.15 : 0.5,
            ease: !isClick ? "bounce.out" : "power1.out",
            onComplete: ()=> setIsAnimating(false),
        })
        // @ts-ignore
        if(isClick) gsap.to(refGlass.current.scale, {
            onStart: ()=> setIsAnimating(true),
            x: 0.0825,
            y: 0.0825,
            z: 0.0825,
            duration: 0.25,
            delay: 0.15,
            ease: "power1.out",
            onComplete: ()=> setIsAnimating(false),
        })
    }

    // const glassShadow = useLoader(TextureLoader, 'logoshade.jpg')

    return (
        <>
        <group>
            <group
                position={[textXCoordinate, 0, -6.5]}
                rotation={[0, 0, 0]}
                ref={refPretitle}>
                 <Text
                    font="/Inter-ExtraBold.ttf"
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={1.6} lineHeight={1}
                    letterSpacing={-0.01}
                    position={isBiggerVerticalBreakpoint  ? [3, 0.1, -1.25] : [0, 0.1, 0.5]}
                    >
                    {getPreTitleText().split('+').join('\n')}
                    <meshStandardMaterial ref={refPretitleMaterial} attach='material' opacity={0} color={colorPretitle}/>
                </Text>

                <Text
                    ref={refTitle}
                    font="/Inter-ExtraBold.ttf"
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={2.9} lineHeight={1.2}
                    letterSpacing={-0.05}
                    position={[3 ,0.1, 7]}>
                    {getTitleText().split('+').join('\n')}
                        <meshBasicMaterial opacity={0} ref={refTitleMaterial} attach='material' color={colorMainText}/>
                </Text>

                <group position={[1, 0, 2]}>
                    <Html
                        position={ isBiggerVerticalBreakpoint ? [-4, 0.1, -0.5] : [2.25, 0.1, -1.5] }
                    >
                        <div ref={refGradiendLight} className={styles.gradientLight} id="top-banner-gradient"></div>
                        <div id="top-banner-ellipse" dangerouslySetInnerHTML={{__html: ellipse}}></div>
                    </Html>
                    <Html
                        position={ isBiggerVerticalBreakpoint ?  [-3, 0.1, 4.5] : [-3, 0.1, 3.5] }
                    >
                        <div id="top-banner-underline" dangerouslySetInnerHTML={{__html: underline}}></div>
                    </Html>
                </group>

                {!isMobileScreen() ?
                <group>
                    <mesh
                        ref={refGlass}
                        receiveShadow
                        castShadow
                        position={[-20,4,4]}
                        rotation={[-Math.PI / 2, -Math.PI / 1, -Math.PI / 1]}
                        scale={0.08}
                        raycast={ meshBounds }
                        geometry={nodes.logo3000.geometry}
                        onPointerEnter={(e) => {
                            document.body.style.cursor = "pointer"
                            glassScaleEffect(true)
                        }}
                        onPointerLeave={(e) => {
                            document.body.style.cursor = "auto"
                            // @ts-ignore
                            glassScaleEffect(false)
                        }}
                        onClick={(e) => {
                            glassScaleEffect(true, true)
                            document.body.getAttribute("data-theme") === "light"
                                ? document.body.setAttribute("data-theme", "dark")
                                : document.body.setAttribute("data-theme", "light")
                            document.dispatchEvent(new CustomEvent('themeChange', {bubbles: false}))
                        }}

                        {...props}>
                        {/* @ts-ignore */}
                        <MeshTransmissionMaterial backside backsideThickness={isMobileScreen() ? 2 : 8} thickness={2} chromaticAberration={isMobileScreen() ? 0 : 0.5} anisotropy={isMobileScreen() ? 0 : 2.5} envMapIntensity={isMobileScreen() ? 2 : 5}/>
                    </mesh>
                    {/* <mesh position={[-2.75, 1, 5.2]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeBufferGeometry args={[8.7, 8.7]} />
                        <meshBasicMaterial
                            color="0x000000"
                            // opacity={0.8}
                            transparent
                            map={glassShadow}
                            // alphaMap={simpleShadow}
                        />
                    </mesh> */}
                </group>
                : ""}
            </group>

            {/* {isMobileScreen() === false ? <ContactShadows frames={500} scale={40} position={[-0.1, 0, 0]} blur={0.7} far={50} resolution={256} opacity={0.6} color={mode === "light" ? "hsl(248, 57%, 42%)" : "yellow"} /> : ''} */}
            <Grid mode={mode} />
            <PencilsDuo mode={mode}/>
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

function getDistanceFactor() {
    return window.devicePixelRatio === 2 ? 13 : 16
}