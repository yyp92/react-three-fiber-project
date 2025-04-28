import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useControls } from 'leva'

export const HDR = () => {
    const {...props }: any = useControls(
        'Environment Controls',
        {
            background: true,
            preset: {
                options: [
                    undefined,
                    'city',
                    'apartment', 
                    'dawn',
                    'forest',
                    'lobby',
                    'night',
                    'park',
                    'studio',
                    'sunset',
                    'warehouse',
                ],
                value: undefined
            },
            // 控制背景模糊程度
            backgroundBlurriness: {
                min: 0,
                max: 10,
                value: 0
            }      
        }
    )


    return (
        <Canvas>
            <OrbitControls />

            <Environment
                files="/images/pic.hdr"
                resolution={1024}
                {...props}
            />
        </Canvas>
    )
}
