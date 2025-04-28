import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export const CubeTextureLoader = () => {
    return (
        <Canvas>
            <OrbitControls />

            <Environment
                background
                path="/images/city/"
                files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
            />
        </Canvas>
    )
}
