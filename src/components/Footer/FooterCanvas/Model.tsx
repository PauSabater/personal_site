import styles from "./FooterCanvas.module.scss"
import * as THREE from 'three'
import { useRef } from 'react'
import { useGLTF, Reflector, MeshTransmissionMaterial, Html } from '@react-three/drei'
import { Pencil } from '../../TopBanner/TopBannerCanvas/TopBannerCanvas'
import { getViewportAspectRatio } from "../../../assets/ts/utils/utils"

// Material used on shapes:
const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('hsl(248, 29%, 62%)').convertSRGBToLinear(),
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
})

export default function Model(props: any) {
    const group = useRef()
    const viewportAspectRatio = getViewportAspectRatio()
    // @ts-ignore
    const { nodes } = useGLTF('/shapes_low.glb')

    return (
        <group position={[0, -2.5, 0]} rotation={[0, -3.2, 0]} ref={group} {...props} dispose={null} >
            <Reflector
                resolution={512}
                receiveShadow={false}
                castShadow={false}
                mirror={0.7}
                mixBlur={1}
                mixStrength={0.3}
                depthScale={1}
                minDepthThreshold={0.85}
                maxDepthThreshold={1}
                position={[0, 0, 8]}
                scale={[2, 2, 1]}
                rotation={[-Math.PI / 2, 0, Math.PI]}
                args={[70, 70]}>
                {// @ts-ignore
                (Material, props) => <Material metalness={0.8} color={"hsl(248, 19%, 65%)"} roughness={1} {...props} />}
            </Reflector>

          <planeGeometry  />
          <mesh
            receiveShadow={false}
            castShadow={false}
            material={material}
            geometry={nodes.Sphere001.geometry}
            position={[-16, 5, 17]}
            rotation={[-0.26, 0.04, -0.16]}
            scale={[5, 5, 5]}
          />
          <mesh
              receiveShadow={false}
              castShadow={false}
              material={material}
              geometry={nodes.Sphere002.geometry}
              position={[-5.28, 4.8, 5.12]}
          />
          <mesh
              receiveShadow={false}
              castShadow={false}
              material={material}
              geometry={nodes.Sphere003.geometry}
              position={[15.13, 1.3, -3.95]}
              rotation={[-0.15, 0.01, -0.02]}
          />
          <mesh
              receiveShadow={false}
              castShadow={false}
              material={material}
              geometry={nodes.Icosphere001.geometry}
              position={[-18.17, 1.4, -2.35]}
              scale={[1.5, 1.5, 1.5]}
          />
          <mesh
            receiveShadow={false}
            castShadow={false}
            material={material}
            geometry={nodes.logo3000.geometry}
            position={[-0.36, 0.37, 0.0]}
            rotation={[0.25, 0.5, -2.8]}
            scale={[0.055, 0.055, 0.055]}
          />

          <mesh
              receiveShadow={false}
              castShadow={false}
              material={material}
              geometry={nodes.Cone.geometry}
              position={[-22.3, 1.5, 2.41]}
              scale={[1.5, 1.5, 1.5]}
          />
          <mesh
              receiveShadow={false}
              castShadow={false}
              material={material}
              geometry={nodes.Cone001.geometry}
              position={[-4.82, 0.47, -5.51]}
              rotation={[2.14, 0, -0.58]}
          />
          <mesh
              receiveShadow={false}
              castShadow={false}
              material={material}
              geometry={nodes.Cube.geometry}
              position={[-5.36, 1.94, 5.46]}
              rotation={[0, 0.42, 0]}
              scale={[1.9, 1.9, 1.9]}
          />
          <mesh
              receiveShadow={false}
              castShadow={false}
              material={material}
              geometry={nodes.Cylinder001.geometry}
              position={[-10.47, 1.57, -8.75]}
              rotation={[Math.PI / 2, 0, -1.87]}
              scale={[1.55, 1.8, 1.55]}
          />
          {/* standing next to screen */}
          <mesh
              receiveShadow={false}
              castShadow={false}
              material={material}
              geometry={nodes.Cylinder001.geometry}
              position={[3.15, 3.45, 14.39]}
              rotation={[0, Math.PI, 0]}
              scale={[3.5, 3.5, 3.5]}
          />
          <mesh
              receiveShadow={false}
              castShadow={false}
              material={material}
              geometry={nodes.logo3000.geometry}
              position={[5.29, 1.2, -13.63]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[0.055, 0.055, 0.055]}
          />
          <group
              position={[2, -0.5, 10]}
              rotation={[0.15, 0.2, -0.025]}
          >
              <mesh
                  scale={[viewportAspectRatio < 0.8 ? 0.094 : 0.102, 0.102, 0.102]}
                  geometry={nodes.screen.geometry}
                  rotation={[0, 0, viewportAspectRatio < 0.8 ? Math.PI / 2 : 0]}
              >
                  {/* @ts-ignore */}
                  <MeshTransmissionMaterial
                      backside={true}
                      roughness={0}
                      backsideThickness={8}
                      thickness={2}
                      chromaticAberration={0.5}
                      anisotropy={1.5}
                      envMapIntensity={0.5}
                  />
              </mesh>
              <Html
                  className="canvas-html"
                  position={[
                      viewportAspectRatio < 0.8 ? -4.5 : 8.5,
                      viewportAspectRatio < 0.8 ? 11 : 4.5,
                      -1,
                  ]}
                  rotation={[0, Math.PI, 0]}
                  transform
                  occlude>
                  <CanvasScreenContent/>
              </Html>
          </group>
              <Pencil scale={0.6} position={[-34, 1.37, -56]} rotation={[0, 0.55, 13.985]} color={"hsl(54, 67%, 28%)"} />
              <Pencil scale={0.6} position={[-34, 1.5, -52]} rotation={[0, 0.4, 14]} color={"hsl(248, 30%, 50%)"} />
          </group>
    )
}

function CanvasScreenContent() {
    const strTalk = ['PROJECTS', 'NEW IDEAS', 'CODING', 'DESIGN', 'UX', 'WORK', 'CYCLING', 'PIZZA']

        return (
            <div className={styles.container} onPointerDown={(e) => e.stopPropagation()}>
                <h1 className={styles.title}>LET'S GET IN TOUCH ?</h1>
                <a href="mailto:pau.sabater.vilar@gmail.com">pau.sabater.vilar@gmail.com
                    <svg width="29" height="16" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM28.7071 8.70711C29.0976 8.31658 29.0976 7.68342 28.7071 7.29289L22.3431 0.928932C21.9526 0.538408 21.3195 0.538408 20.9289 0.928932C20.5384 1.31946 20.5384 1.95262 20.9289 2.34315L26.5858 8L20.9289 13.6569C20.5384 14.0474 20.5384 14.6805 20.9289 15.0711C21.3195 15.4616 21.9526 15.4616 22.3431 15.0711L28.7071 8.70711ZM1 9L28 9V7L1 7L1 9Z" fill="currentColor"/>
                    </svg>
                </a>
                <p className={styles.textTitle}>ALWAYS GLAD TO TALK ABOUT :</p>
                {strTalk.map((str, i) => <p key={`item-${i}`} className={styles.item}>{str}</p>)}
            </div>
        )
}

useGLTF.preload('/shapes_low.glb')