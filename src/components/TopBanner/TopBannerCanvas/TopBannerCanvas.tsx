import { Canvas } from '@react-three/fiber'
import {
  Environment,
  OrbitControls,
  useGLTF,
} from '@react-three/drei'

import { useLayoutEffect } from 'react'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
// @ts-ignore -- TODO: solve declaration file from package
import { Camera } from './components/Camera'
import { SceneComponents } from './components/Model'

gsap.registerPlugin(ScrollTrigger)

useGLTF.preload("/logo3d_3000.gbl")

export function TopBannerCanvas({mode}: {mode: string}) {

    useLayoutEffect(()=> {
        if (document.getElementById("page-content")?.classList.contains("visited") === false) {
            gsap.set(document.getElementById("header"), {opacity: 0, y: -200})
            document.getElementById("page-content")?.classList.add("visited")
        }
    }, [])

    return (
        <Canvas
            gl={{
                preserveDrawingBuffer: false,
                precision: "mediump",
                powerPreference: "high-performance",
                autoClear: false,
                autoClearColor: true,
                autoClearDepth: true,
                autoClearStencil: false
            }}
            dpr={[1, 1]}
        >
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