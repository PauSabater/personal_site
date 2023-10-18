import { meshBounds } from "@react-three/drei"
import { Fragment } from "react"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
// @ts-ignore -- TODO: solve declaration file from package
import { getViewportAspectRatio } from '@pausabater/utils/dist/index.esm.js'

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
            <PencilShadow mode={mode} rotation={[Math.PI / -2, 0 , Math.PI / -4.8]} position={[1.55, -1, 2.6]}/>
            <Pencil color={"hsl(248, 30%, 50%)"} rotation={[1,  Math.PI / -1, 1]} position={[0, 1, 0]} mode={mode}></Pencil>
            <PencilShadow mode={mode} rotation={[Math.PI / -2, 0 , Math.PI / -7.1]} position={[1.7, -1, 0.65]}/>
        </group>
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

const PencilShadow = (props: any) => {
    const pencilShadow = useLoader(TextureLoader, 'pencilShade.svg')

    return (
        <mesh
            // rotation={[0.5, Math.PI / 1, 2]}
            rotation={props.rotation}
            position={props.position}
        >
            <planeBufferGeometry args={[10.5, 0.75]} />
            <meshBasicMaterial
                transparent
                map={pencilShadow}
                color={props.mode === "light" ? "#727088" : "black"}
            />
        </mesh>
    )
}