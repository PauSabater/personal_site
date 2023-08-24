import { Canvas } from "@react-three/fiber"



export function FooterCanvas() {
    // const refCamera = useRef(null)

  return (
    <Canvas gl={{ preserveDrawingBuffer: false, precision: "mediump" }} dpr={[1, 1]}>

    </Canvas>
  )
}
