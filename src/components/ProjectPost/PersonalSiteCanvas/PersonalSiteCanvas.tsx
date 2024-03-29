
import styles from "./PersonalSiteCanvas.module.scss"
import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, CameraControls, MeshTransmissionMaterial, useGLTF, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import gsap from "gsap"
// @ts-ignore -- TODO: solve declaration file from package
import { getViewportAspectRatio } from "@pausabater/utils/dist/index.esm.js"

export function PersonalSiteCanvas({mode}: {mode: string}) {

    const siteCanvas = useRef(null)

    useLayoutEffect(()=> {
        // Page load animation only for this project:
        gsap.to(siteCanvas.current, {opacity: 1, duration: 0.75, delay: 0})
        gsap.to(document.getElementById("transition-img-personal-site.svg"), {opacity: 0, duration: 0.75, delay: 0.2})
    }, [])

    return (
        <div className={styles.canvasContainer} ref={siteCanvas} id="personal-site-canvas">
            <Canvas
                dpr={[1, 1]}
                gl={{
                    preserveDrawingBuffer: false,
                    precision: "lowp",
                    // autoClear: true,
                    // autoClearColor: true,
                    // autoClearDepth: false,
                    // autoClearStencil: false
                }}
            >
            <fog attach="fog" args={[mode === "light" ? "hsl(136, 0%, 96%)" : "hsl(0, 0%, 7%)", 50, 130]} />
                <group >
                    <Camera />
                    <Suspense>
                        <Model mode={mode}/>
                    </Suspense>
                    <Environment files="city-small.hdr"  resolution={256}></Environment>
                    <CameraControls enabled={false} makeDefault dollyToCursor minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
                </group>
            </Canvas>
        </div>
    )
}

function Model({mode}: {mode: string}) {

    const refGroup = useRef(null)
    const { size } = useThree()
    const [shouldRender, setShouldRender] = useState(true)
    const [previousCanvasWidth, setPreviousCanvasWidth] = useState(size.width)
    const [colorGrid] = useState(mode === "light" ? "hsl(136, 0%, 80%)" : "hsl(136, 0%, 40%)")

    useLayoutEffect(()=> {
        setTimeout(()=> {
            // After initial animation, set render boolean only when intersection is active
            setShouldRender(false)

            const elTopBanner = document.getElementById("personal-site-canvas")

            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    console.log(entry.intersectionRatio)
                    if (entry.intersectionRatio > 0) {
                        setShouldRender(true)
                    }
                    else {
                        setShouldRender(false)
                    }
                })
            })

            if (elTopBanner !== null) io.observe(elTopBanner)

        }, 5500)
    }, [])

    // Will take over the render-loop depending on the need
    useFrame(({ gl, scene, camera, size }) => {
        if (shouldRender === true) {
            const scrolledHeight = window.scrollY

            if (refGroup.current === null) return
            // @ts-ignore
            gsap.set(refGroup.current.rotation, {y: scrolledHeight * 0.001})
            // @ts-ignore
            gsap.set(refGroup.current.position, {
                y: -0.5 - scrolledHeight * 0.025,
                z: 0 + scrolledHeight * 0.025
            })
            gl.render(scene, camera)

        } else if (size.width !== previousCanvasWidth) {
            setPreviousCanvasWidth(size.width)
            gl.render(scene, camera)

        } else return null
    }, 1)


    return (
        <group ref={refGroup}>
                <Logo position={[0, 1, -5]} rotation={[-Math.PI / 2, 0, 0]} />
                {/* <Logo position={[0, 80, 0.5]} rotation={[0, 1, 2]} /> */}
                <Pencil scale={0.4} mode={mode} position={[8, -3.5, 38]} rotation={[0, 0.55, Math.PI / 2]} color={"hsl(54, 67%, 75%)"} />
                <Pencil scale={0.4} mode={mode} position={[-6, -3.5, 30]} rotation={[0, -0.45, Math.PI / 2]} color={"hsl(248, 30%, 50%)"} />
                {/** @ts-ignore */}
            <gridHelper
                scale={4}
                args={[150, 150, colorGrid, colorGrid]}
                position={[0, -4, 0]}
            />
        </group>
    )
}

function Camera() {

    let yPos = 6
    let zPos = -30
    let far = 200

    // Camera setting for vertical viewport:
    if (getViewportAspectRatio() < 1) {
        yPos = 40
        zPos = -70
        far = 300
    }

    return (
        <PerspectiveCamera
            makeDefault
            position={[-10, yPos, zPos]}
            fov={19}
            near={1}
            far={far}
        ></PerspectiveCamera>
    )
}

function Logo({ stencilBuffer = false, ...props }) {
    // @ts-ignore
    const { nodes } = useGLTF('/logo3d.glb')

    return (
              <mesh
                    scale={[0.2, 0.2, 0.3]}
                    position={props.position}
                    rotation={props.rotation}
                    geometry={nodes.logoRounded.geometry}
                >
                        <MeshTransmissionMaterial backside backsideThickness={8} thickness={2} chromaticAberration={0.5} anisotropy={2.5} envMapIntensity={5} distortionScale={0} temporalDistortion={0}/>
              </mesh>
    )
}

function Pencil({...props}) {

    const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(props.color).convertSRGBToLinear(),
        roughness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0,
    })

    // @ts-ignore
    const {nodes} = useGLTF('/pencil_low.glb')
    const colorCone = props.mode === "light" ? "grey" : "rgb(70, 70, 70)"

    return (
        /** A physics rigid body */
                <group>
            <mesh
                castShadow={false}
                receiveShadow={false}
                material={material}
                geometry={nodes.wood.geometry}
                {...props}>
            </mesh>
            <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.cone.geometry}
                {...props}>
                <meshBasicMaterial attach="material" color={colorCone} />
            </mesh>
            <mesh
                castShadow={false}
                receiveShadow={false}
                geometry={nodes.color.geometry}
                {...props}>
                <meshBasicMaterial attach="material" color={props.color} />
            </mesh>
                </group>
    )
}

useGLTF.preload('/logo3d.glb')
useGLTF.preload('/pencil_low.glb')