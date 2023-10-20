import { PerspectiveCamera } from "@react-three/drei"
import { useFrame, useThree } from '@react-three/fiber'
// @ts-ignore -- TODO: solve declaration file from package
import { getViewportAspectRatio } from '@pausabater/utils/dist/index.esm.js'
import { useState } from "react"

export function Camera() {
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

        console.log(aspectRatio)

        if (aspectRatio < 0.6) {
            return [115, 10]
        } else if (aspectRatio < 0.8) {
            return [80, 10]
        } else if (aspectRatio < 1.2) {
            return [80, 1]
        // } else if (aspectRatio < 1.3) {
        //     return [90, 1]
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
            position={[0, cameraPositionYZ[0], cameraPositionYZ[1]]}
        />
    )
}