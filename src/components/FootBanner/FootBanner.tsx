import styles from "./FootBanner.module.scss"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"
import * as THREE from 'three'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, Vector3, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Text, MeshTransmissionMaterial, MeshReflectorMaterial } from '@react-three/drei'
import { isMobileScreen } from "../../assets/ts/utils/utils"

gsap.registerPlugin(ScrollTrigger, CustomEase)

export function FootBanner() {

    const refCanvas = useRef(null)
    const refContainer = useRef(null)
    const refCamera = useRef(null)
    const refContactContainer = useRef(null)
    const refContactLink = useRef(null)
    const refSvgBorder = useRef(null)

    const [colorMain] = useState("hsl(0, 0%, 10%)")
    const [aspectRatio, setAspectRatio] = useState<number>(window.innerWidth / window.innerHeight)
    const refVideoTexture = useRef(null)
    const [isBannerExpanded, setIsBannerExpanded] = useState(false)

    useLayoutEffect(()=> {

        setAspectRatio(window.innerWidth / window.innerHeight)

        let ctxGsap = gsap.context(() => {
            if (refContainer.current === null) return

            gsap.from((refContainer.current as HTMLElement), {
                scrollTrigger: {
                // markers: true,
                    trigger: (refContainer.current as HTMLElement),
                    scrub: true,
                    start: "top bottom",
                    end: "top top+=20%"
                },
                xPercent: -30,
                ease: "none",
                onLeave: ( )=> {
                    setIsBannerExpanded(false)
                },
                onStart: () => setIsBannerExpanded(false),
                onComplete: () => {
                    animateContactLink()
                    setIsBannerExpanded(true)
                }
            })
        })
        return () => ctxGsap.revert()
    }, [])

    function animateContactLink() {
        if (refSvgBorder.current === null) return

        const svgPath: SVGPathElement | null = (refSvgBorder.current as HTMLElement).querySelector(".path")
        if (svgPath === null) return
        const lenghtPath = svgPath.getTotalLength()

        gsap.timeline()
            .pause()
            .set(refContactContainer.current, {opacity: 0})
            .set(svgPath, {fillOpacity: 0})
            .set(refContactLink.current, {
                opacity: 0,
                y: 10,
            })
            .set(svgPath, {
                strokeDashoffset: 200,
                strokeDasharray: lenghtPath
            })
            .set(svgPath, {strokeDashoffset: 0, delay: 1})
            .to(refContactContainer.current, {
                opacity: 1,
                duration: 0.5,
                onComplete: ()=> { gsap.set(svgPath, {fillOpacity: 0.5, delay: 1}) }
            }, 'start')
            .to(refContactLink.current, {
                opacity: 1,
                duration: 0.5,
                delay: 0.8,
                y: 0,
            }, 'end')
        .play()
    }

    function Camera() {
        let fov: number = 40
        if (aspectRatio > 1.8) fov = 40
        else if (aspectRatio > 1.5) fov = 50
        else if (aspectRatio > 1.3) fov = 55
        else if (aspectRatio > 1) fov = 60
        else if (aspectRatio > 0.6) fov = 70
        else fov = 90

        return (
            <PerspectiveCamera
                makeDefault
                ref={refCamera}
                near={0.5}
                far={12}
                fov={fov}
                position={[-3.2, 1.6, -0.2]}
            />
        )
    }

    function VideoText({text, position}: {text: string, position: Vector3}) {
        const { camera, mouse } = useThree()
        const [shouldRender, setShouldRender] = useState(false)


        const [video] = useState(() => isMobileScreen()
        ? null
        : Object.assign(document.createElement('video'), {
            src: '/video-comp.mp4',
            crossOrigin: 'Anonymous',
            loop: true,
            muted: true
        }))

        useEffect(() => {
            if (video !== null) void video.pause()

            if (isBannerExpanded === false && camera !== null) {
                gsap
                // @ts-ignore
                .to(camera.position, {
                    x: -3.2,
                    y: 1.6,
                    z: -0.2,
                    duration: 1.5,
                    ease: "sine.inOut",
                })
            }
        }, [isBannerExpanded])

        useLayoutEffect(()=> {
            // Observe to determine when we render:
            new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) setShouldRender(true)
                    else setShouldRender(false)
                })
            }).observe(document.getElementById("foot-banner") as Element)
        }, [])

        const setVideo = ()=> {
            if(video !== null ) setTimeout(()=> void video.play(), 0)
        }

        const [isAnimating, setIsAnimating] = useState(false)
        const [isAnimatingFinished, setIsAnimatingFinished] = useState(false)
        const vec = new THREE.Vector3()

        useFrame(({ gl, scene, camera }) => {
            if (shouldRender === true) {
                gl.render(scene, camera)

                if (isBannerExpanded && isAnimatingFinished === true) {
                    camera.position.lerp(vec.set((mouse.x * 0.5) + -3.2, (mouse.y * 0.5) + 0.3, 4.2), 0.01)
                }
            }
        }, 1)


        useThree(() => {

            if (isBannerExpanded && isAnimating === false) {
                let posX = -3.2

                if (aspectRatio > 1) posX = -3.2
                else if (aspectRatio > 0.6) posX = -2.75
                else posX = -2

                gsap
                // @ts-ignore
                .to(camera.position, {
                    x: posX,
                    y: 0.3,
                    z: 4.2,
                    duration: 1.5,
                    ease: "sine.inOut",
                    onStart: ()=> setIsAnimating(true),
                    onComplete: ()=> {
                        setIsAnimatingFinished(true)
                        setVideo()
                    }
                })
            }
        })

        return (
            <Text font="/Inter-ExtraBold.ttf" fontSize={1} lineHeight={1} letterSpacing={-0.05} position={position}>
                {text.split('+').join('\n')}
                <meshBasicMaterial ref={refVideoTexture} toneMapped={false}>
                {!isMobileScreen() ? <videoTexture attach="map" args={[video as HTMLVideoElement]} encoding={THREE.sRGBEncoding} /> : ''}
                </meshBasicMaterial>
            </Text>
        )
      }

      function Ground() {
        return (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[800, 500]}
                    resolution={256}
                    mixBlur={1}
                    mixStrength={120}
                    roughness={50}
                    depthScale={1.2}
                    mirror={20}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="hsl(0, 0%, 5%)"
                    metalness={0.4}
                />
          </mesh>
        )
      }

      function Glass({position, radius, size}: {position: Vector3, radius: number, size: number}) {
        return (
            <mesh position={position}>
                <icosahedronBufferGeometry radius={radius} detail={5} args={[size, 10, 10]} />
                {/* @ts-ignore */}
                <MeshTransmissionMaterial transmission={1} thickness={0.15} roughness={0.2} />
            </mesh>
          )
      }

      return (
        <div className={styles.container} ref={refContainer} id="foot-banner">
            {/* @ts-ignore */}
            <Canvas ref={refCanvas} concurrent="true" gl={{ alpha: false }} gl={{ preserveDrawingBuffer: false, precision: "mediump" }} dpr={[1, 1]}>
            <color attach="background" args={['hsl(0, 0%, 15%)']} />
            <Camera />
                <group position={[0, -1, 0]}>
                    <Ground />
                    <VideoText
                        text={isMobileScreen() ? "let's+shape some+ideas ?" : "let's+light some+ideas ?"}
                        position={[-1.7, 1.55, -2] as Vector3}
                    />
                    <mesh position={[0.1, 4.8, -2.05] as Vector3}>
                        <planeGeometry attach="geometry" args={[10, 10]} />
                        <meshBasicMaterial reflectivity={1} attach="material" color={colorMain} />
                    </mesh>
                    <mesh rotation={[Math.PI / -2, 0, 0 ]} position={[-5.95, 0.05, -1.5] as Vector3}>
                        <planeGeometry attach="geometry" args={[0.075, 13]} />
                        <meshStandardMaterial emissive="#a29520" emissiveIntensity={1} toneMapped={false} />
                    </mesh>
                    <mesh rotation={[0, Math.PI / 2, 0 ]} position={[-6, 7.4, -3.0] as Vector3}>
                        <planeGeometry attach="geometry" args={[12, 15]} />
                        <meshBasicMaterial reflectivity={1} attach="material" color={colorMain} />
                    </mesh>
                    <Glass position={[-3.55, 0.55, 0.65] as Vector3} radius={0.65} size={0.65} />
                    <Glass position={[-5.5, 0.45, -1] as Vector3} radius={0.1} size={0.45}/>
                    <Glass position={[-1.3, 0.45, -1] as Vector3} radius={0.2} size={0.55}/>
                </group>
                <spotLight position={[0, 10, 0]} intensity={2} />
            </Canvas>

            <div ref={refContactContainer} className={styles.contactContainer}>
                <div className={styles.relativeContainer}>
                    <svg ref={refSvgBorder} className={styles.svgBorder} viewBox="0 0 500 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={`${styles.path} path`} d="M490 5H10C7.23858 5 5 7.23858 5 10V85C5 87.7614 7.23857 90 10 90H490C492.761 90 495 87.7614 495 85V10C495 7.23858 492.761 5 490 5Z" fill="black" fillOpacity="0.2" stroke="url(#paint0_linear_53_13)" strokeWidth="10"/>
                        <defs>
                        <linearGradient id="paint0_linear_53_13" x1="495" y1="5.00002" x2="7.16941" y2="101.022" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#EAE195"/>
                        <stop offset="1" stopColor="#975BA4"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <a href="mailto:pau.sabater.vilar@gmail.com" ref={refContactLink}>pau.sabater.vilar@gmail.com
                        <svg width="29" height="16" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM28.7071 8.70711C29.0976 8.31658 29.0976 7.68342 28.7071 7.29289L22.3431 0.928932C21.9526 0.538408 21.3195 0.538408 20.9289 0.928932C20.5384 1.31946 20.5384 1.95262 20.9289 2.34315L26.5858 8L20.9289 13.6569C20.5384 14.0474 20.5384 14.6805 20.9289 15.0711C21.3195 15.4616 21.9526 15.4616 22.3431 15.0711L28.7071 8.70711ZM1 9L28 9V7L1 7L1 9Z" fill="currentColor"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}