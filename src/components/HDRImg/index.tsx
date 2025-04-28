import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export const HDRImg = () => {
    return (
        <Canvas>
            <OrbitControls />

            <Environment
                background
                files="/images/pic.jpg"
            />
        </Canvas>
    )
}
