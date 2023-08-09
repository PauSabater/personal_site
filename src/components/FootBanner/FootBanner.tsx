import styles from "./FootBanner.module.scss"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { KernelSize } from 'postprocessing'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"
import parse from 'html-react-parser'
import * as THREE from 'three'
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, Vector3, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Reflector, Text, useTexture, PerformanceMonitor, MeshTransmissionMaterial, OrbitControls, MeshReflectorMaterial } from '@react-three/drei'
import { Perf } from "r3f-perf"
import { easeOutLong } from "../../assets/ts/styles/styles"
import { getViewportAspectRatio } from "../../assets/ts/utils/utils"
gsap.registerPlugin(ScrollTrigger, CustomEase)


export function FootBanner({}: {}) {

    const refCanvas = useRef(null)
    const refContainer = useRef(null)
    const cameraControlRef = useRef(null)
    const refCamera = useRef(null)

    const [colorMain, setColorMain] = useState("hsl(0, 0%, 5%)")

    const [aspectRatio, setAspectRatio] = useState<number>(window.innerWidth / window.innerHeight)

    const refVideoTexture = useRef(null)

    const [mirrorVal, setMirrorVal] = useState(0.8)

    const [displayVideo, setDisplayVideo] = useState(false)

    const [isObserberSet, setIsObserberSet] = useState(false)

    const [isBannerExpanded, setIsBannerExpanded] = useState(false)

    const [isBannerAnimating, setIsBannerAnimating] = useState(false)

    useLayoutEffect(()=> {

        setAspectRatio(window.innerWidth / window.innerHeight)

        let ctxGsap = gsap.context(() => {
            if (refContainer.current === null) return

            gsap.from((refContainer.current as HTMLElement), {
                scrollTrigger: {
                markers: true,
                    trigger: (refContainer.current as HTMLElement),
                    scrub: true,
                    start: "top bottom",
                    end: "top top+=20%"
                },
                xPercent: -30,
                ease: "none",
                onLeave: ()=> setIsBannerExpanded(false),
                onStart: () => setIsBannerExpanded(false),
                onComplete: () => setIsBannerExpanded(true)
            })
        })
        return () => ctxGsap.revert()
    }, [])


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


        const [video] = useState(() => Object.assign(document.createElement('video'), {
            src: '/video.mov',
            crossOrigin: 'Anonymous',
            loop: true,
            muted: true
        }))

        useEffect(() => {
            void video.pause()

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

        const setVideo = ()=> {
            setTimeout(()=> void video.play(), 0)
        }

        const [isAnimating, setIsAnimating] = useState(false)
        const [isAnimatingFinished, setIsAnimatingFinished] = useState(false)

        const vec = new THREE.Vector3()

        useFrame(() => {
            if (isBannerExpanded && isAnimatingFinished === true) {
                camera.position.lerp(vec.set((mouse.x * 0.5) + -3.2, (mouse.y * 0.5) + 0.3, 4.2), 0.01)
            }
        })


        useThree(() => {

            if (isBannerExpanded && isAnimating === false) {
                console.log("ASPECT RATIO IS")
                const aspectRatio = getViewportAspectRatio()
                console.log(aspectRatio)

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
            {parse(text.split('+').join('\n'))}
            <meshBasicMaterial ref={refVideoTexture} toneMapped={false}>
               <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
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
        //https://github.com/pmndrs/drei#performancemonitor
        <div className={styles.container} ref={refContainer}>
            {/* @ts-ignore */}
            <Canvas ref={refCanvas} concurrent gl={{ alpha: false }}>
            <Perf position="top-left" />
            <PerformanceMonitor />
            <color attach="background" args={['hsl(0, 0%, 7%)']} />
            <Camera />

            <Suspense fallback={null}>
                <group position={[0, -1, 0]}>
                    <Ground />
                    <VideoText text="let's+light some+ideas ?" position={[-1.7, 1.55, -2] as Vector3} />
                    <mesh position={[0.1, 4.8, -2.05] as Vector3}>
                        <planeBufferGeometry attach="geometry" args={[10, 10]} />
                        <meshBasicMaterial reflectivity={1} attach="material" color={colorMain} />
                    </mesh>
                    <mesh rotation={[Math.PI / -2, 0, 0 ]} position={[-5.95, 0.05, -1.5] as Vector3}>
                        <planeBufferGeometry attach="geometry" args={[0.075, 13]} />
                        <meshStandardMaterial emissive="#a29520" emissiveIntensity={1} toneMapped={false} />
                    </mesh>
                    <mesh rotation={[0, Math.PI / 2, 0 ]} position={[-6, 7.4, -3.0] as Vector3}>
                        <planeBufferGeometry attach="geometry" args={[12, 15]} />
                        <meshBasicMaterial reflectivity={1} attach="material" color={"hsl(0, 0%, 6%)"} />
                    </mesh>
                    <Glass position={[-3.55, 0.55, 0.65] as Vector3} radius={0.65} size={0.65} />
                    <Glass position={[-5.5, 0.45, -1] as Vector3} radius={0.1} size={0.45}/>
                    <Glass position={[-1.3, 0.45, -1] as Vector3} radius={0.2} size={0.55}/>
                </group>
                <ambientLight intensity={0.5} />
                <spotLight position={[0, 10, 0]} intensity={2} />
                {/* <EffectComposer>
                <Bloom
                    intensity={2} // The bloom intensity.
                    blurPass={undefined} // A blur pass.
                    kernelSize={KernelSize.LARGE} // blur kernel size
                    luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
                    luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
                    mipmapBlur={false} // Enables or disables mipmap blur.
                    resolutionX={256} // The horizontal resolution.
                    resolutionY={256} // The vertical resolution.
                />
                </EffectComposer> */}
            </Suspense>
            </Canvas>
        </div>
        )
}