
import styles from "./PersonalSiteCanvas.module.scss"
import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, Environment, CameraControls, MeshTransmissionMaterial, useGLTF, PerspectiveCamera } from '@react-three/drei'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'
import gsap from "gsap"
import { getViewportAspectRatio } from "../../../assets/ts/utils/utils"

export function PersonalSiteCanvas({mode}: {mode: string}) {

    const siteCanvas = useRef(null)

    useLayoutEffect(()=> {
        // Page load animation only for this project:
        gsap.to(siteCanvas.current, {opacity: 1, duration: 0.5, delay: 0})
        gsap.to(document.getElementById("transition-img-personal-site.svg"), {opacity: 0, duration: 0.5, delay: 0})
    }, [])


    return (
        <div className={styles.canvasContainer} ref={siteCanvas} id="personal-site-canvas">
            <Canvas dpr={[1, 1]}>
                <group >
                    <Camera />
                    <Suspense>
                        <Model mode={mode}/>
                    </Suspense>
                    <Environment preset="city"  resolution={512}></Environment>
                    <CameraControls enabled={false} makeDefault dollyToCursor minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
                    {/* <EffectComposer multisampling={ 4 }>
                        <DepthOfField
                            focusDistance={ -0.7 }
                            focalLength={ 0.005 }
                            bokehScale={ 6 }
                        />
                    </EffectComposer> */}
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
    const [colorGrid, setColorGrid] = useState(mode === "light" ? "hsl(136, 0%, 80%)" : "hsl(136, 0%, 40%)")

    const canvasHeight = size.height

    useLayoutEffect(()=> {
        setTimeout(()=> {
            // After initial animation, set render boolean only when intersection is active
            setShouldRender(false)

            const elTopBanner = document.getElementById("personal-site-canvas")

            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) setShouldRender(true)
                    else setShouldRender(false)
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
                y: -1 - scrolledHeight * 0.025,
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
            <Physics gravity={[0, -60, 0]}>
                <Logo position={[-4, 50, 0]} rotation={[0, 0, 0]} />
                <Logo position={[0, 80, 0.5]} rotation={[0, 1, 2]} />
                <Pencil scale={0.6} position={[4, 110, 40]} rotation={[0, 0.55, 0]} color={"hsl(54, 67%, 75%)"} />
                <Pencil scale={0.6} position={[-6, 110, 45]} rotation={[0, 0.55, Math.PI / 2]} color={"hsl(248, 30%, 50%)"} />
                {/** @ts-ignore */}
                <CuboidCollider position={[0, -6, 0]} type="fixed" args={[100, 1, 100]} />
            </Physics>
            <gridHelper
                scale={4}
                args={[150, 150, colorGrid, colorGrid]}
                position={[0, -6, 0]}
            />
        </group>
    )
}

function Camera() {

    let yPos = 10
    let zPos = -40
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
            fov={22}
            near={1}
            far={far}
        ></PerspectiveCamera>
    )
}

function Logo({ stencilBuffer = false, ...props }) {
    // @ts-ignore
    const { nodes } = useGLTF('/shapes-footer.glb')

    return (
        /** A physics rigid body */
        <RigidBody restitution={0.1} colliders="cuboid" {...props}>
            <Center>
              <mesh
                    scale={[0.2, 0.2, 0.3]}
                    geometry={nodes.logoRounded.geometry}
                >
                    <MeshTransmissionMaterial backside backsideThickness={8} thickness={2} chromaticAberration={0.5} anisotropy={1.5} envMapIntensity={3} distortionScale={0} temporalDistortion={0}/>
              </mesh>
            </Center>
        </RigidBody>
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
    const {nodes} = useGLTF('/pencil2.glb')

    return (
        /** A physics rigid body */
        <RigidBody restitution={0.1} colliders="cuboid" {...props}>
            <Center>
                <group>
                    <mesh
                        castShadow={true}
                        receiveShadow={false}
                        material={material}
                        geometry={nodes.Pencil_1.geometry}
                        {...props}>
                        {/* <meshBasicMaterial attach="material" color={props.color} /> */}
                    </mesh>
                    <mesh
                        castShadow={false}
                        receiveShadow={false}
                        geometry={nodes.Pencil_2.geometry}
                        {...props}>
                        <meshBasicMaterial attach="material" color={"grey"} />
                    </mesh>
                    <mesh
                        castShadow={false}
                        receiveShadow={false}
                        geometry={nodes.Pencil_3.geometry}
                        {...props}>
                        <meshBasicMaterial attach="material" color={props.color} />
                    </mesh>
                </group>
            </Center>
        </RigidBody>
    )
}

useGLTF.preload('/shapes-footer.glb')
useGLTF.preload('/pencil2.glb')
























