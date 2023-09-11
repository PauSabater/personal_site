import * as THREE from 'three'
import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import Model from './Model'
import { getViewportAspectRatio } from '../../../assets/ts/utils/utils'


RectAreaLightUniformsLib.init()

function Light() {
    const ref = useRef()

    // @ts-ignore
    useFrame((_) => (ref.current.rotation.x = _.clock.elapsedTime * 0.1))
    // @ts-ignore
    return (<group ref={ref}>
          <rectAreaLight width={15} height={100} position={[30, 30, -10]} intensity={5} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      </group>
    )
}

export function FooterCanvas({mode}: {mode: string}) {
    const colorBackground = mode === "light" ? 'hsl(136, 0%, 96%)' : 'hsl(136, 0%, 7%)'
    // const colorBackground = mode === "light" ? 'hsl(136, 0%, 96%)' : 'hsl(136, 0%, 96%)'

    return (
        <Canvas shadows dpr={[1, 1]} camera={{ position: [0, 160, 160], fov: 20 }}>
            <fog attach="fog" args={[colorBackground, 110, 130]} />
            <color attach="background" args={[colorBackground]} />
            <Suspense fallback={null}>
                <Model mode={mode} />
                <pointLight position={[-26, -8, -10]} color="red" intensity={5} />
                <Light />
                <Environment files="city-test.hdr" path="/"></Environment>
            </Suspense>
            <Camera/>
        </Canvas>
    )
}

function Camera() {
    const { camera, mouse } = useThree()
    const [shouldRender, setShouldRender] = useState(true)

    const vec = new THREE.Vector3
    const viewportAspectRatio = getViewportAspectRatio()

    const [isHomepage, setIsHomePage] = useState(window.location.href.includes("projects") === false)

    // Camera setting for responsive view:
    let xPos = -1
    let zPos = 80

    if (viewportAspectRatio >= 1.2 && viewportAspectRatio < 1.4) {
        xPos = -3
        zPos = 100
    } else if (viewportAspectRatio >= 1 && viewportAspectRatio < 1.2) {
        xPos = -5.5
        zPos = 105
    } else if (viewportAspectRatio >= 0.8 && viewportAspectRatio < 1) {
        xPos = -6
        zPos = 115
    } else if (viewportAspectRatio < 0.8) {
        xPos = 4
        zPos = 80
    }

    useLayoutEffect (()=> {
        const elFooter = document.getElementById("footer-canvas")

        setIsHomePage(window.location.href.includes("projects") === false)

        // Set render boolean only when intersection is active
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) setShouldRender(true)
                else setShouldRender(false)
            })
        })

        if (elFooter !== null) io.observe(elFooter)
    }, [])

    // Render when needed and add camera lerp based on mouse pos
    useFrame(({ gl, scene, camera }) => {
        camera.position.lerp(vec.set((
            mouse.x * (mouse.x > 0 ? 9 : 2)) + xPos,
            (mouse.y < 0 ? mouse.y * 1.5 : 0) + 4.5,
            Math.abs(mouse.x > 0 ? 6 : -3) + zPos)
        , 0.01)
        if (shouldRender === true && isHomepage === false) {
            gl.render(scene, camera)
        }
    }, 1)

    return (
        <PerspectiveCamera
            makeDefault
            near={30}
            far={150}
            fov={12}
            position={[xPos, 10, zPos]}
        />
    )
}