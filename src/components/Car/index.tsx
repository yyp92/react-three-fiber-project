import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    useGLTF,
    Gltf,
    SpotLight,
} from '@react-three/drei';
import { useControls } from 'leva'
import { Button } from 'antd'
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import styles from './index.module.scss'

const carBodyColorList = [
    {
        text: '海湾蓝',
        color: new THREE.Color(0x0077B5)
    },
    {
        text: '熔岩橙',
        color: new THREE.Color(0xFF5733)
    },
    {
        text: '雅灰',
        color: new THREE.Color(0x999999)
    },
    {
        text: '流星蓝',
        color: new THREE.Color(0x3399FF)
    },
    {
        text: '霞光紫',
        color: new THREE.Color(0x9933FF)
    },
    {
        text: '橄榄绿',
        color: new THREE.Color(0x336633)
    },
    {
        text: '寒武岩灰',
        color: new THREE.Color(0x666666)
    },
    {
        text: '珍珠白',
        color: new THREE.Color(0xFFFFF0)
    },
    {
        text: '钻石黑',
        color: new THREE.Color(0x000000)
    },
]


export const Car = () => {
    const canvasRef = useRef<any>(null);
    const [carBodyColor, setCarBodyColor] = useState<any>(carBodyColorList[0].text)

    const { ...props }: any = useControls(
        'Car Controls',
        {
            //     background: true,
            //     preset: {
            //         options: [
            //             undefined,
            //             'city',
            //             'apartment', 
            //             'dawn',
            //             'forest',
            //             'lobby',
            //             'night',
            //             'park',
            //             'studio',
            //             'sunset',
            //             'warehouse',
            //         ],
            //         value: undefined
            //     },
            //     // 控制背景模糊程度
            //     backgroundBlurriness: {
            //         min: 0,
            //         max: 10,
            //         value: 0
            //     }      
        }
    )

    const gltf = useGLTF('/models/su7.glb')
    // console.log('-----gltf', gltf)


    useEffect(() => {
        if (gltf) {
            // 设置模型的旋转角度
            gltf.scene.rotation.set(0, -Math.PI / 2, -Math.PI / 10)

            handleChangeCarBodyColor(carBodyColorList[0])
        }
    }, [gltf])


    const handleChangeCarBodyColor = (item: any) => {
        setCarBodyColor(item.text)

        gltf.scene.traverse((obj: any) => {
            if (obj.name === 'DOOR1_8_30') {
                const list = obj.children

                for (const mesh of list) {
                    // * 汽车的车身
                    if (mesh.children[0].material.name === "Car_body") {
                        // console.log('======mesh.children[0].material', mesh.children[0].material)
                        mesh.children[0].material.color = item.color
                        mesh.children[0].material.roughness = 0.1
                        mesh.children[0].material.metalness = 0.5
                        mesh.children[0].material.clearcoat = 1
                        mesh.children[0].material.clearcoatRoughness = 0.05
                    }
                }
            }
        })
    }



    // ******** 渲染 ********
    const renderCanvas = () => {
        return (
            <Canvas>
                <OrbitControls />

                <Environment background>
                    <mesh scale={100}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <meshBasicMaterial color="#393939" side={THREE.BackSide} />
                    </mesh>
                </Environment>

                <ambientLight
                    intensity={5}
                    color={0xffffff}
                />

                {/* <SpotLight
                    position={[0, 5, 0]}

                    // 散射角度，和水平线的夹角
                    angle={Math.PI / 4}
                    // 横向，聚光锥的半影衰减百分比
                    penumbra={0.1}
                    // 纵向，沿着光照距离的衰减量
                    decay={2}

                    color={0xffffff}
                    intensity={2}

                    castShadow={true}
                /> */}

                <directionalLight
                    position={[0, 5, 0]}
                    color={0xffffff}
                    intensity={1}
                />

                <group>
                    <primitive
                        object={gltf.scene}
                    />
                </group>
            </Canvas>
        )
    }

    const renderOprate = () => {
        return (
            <div
                className={styles.operate}
            >
                <div
                    className={styles.operateTitle}
                >汽车设置</div>

                <div
                    className={styles.operateInner}
                >
                    <div className={styles.black}>
                        <div className={styles.title}>
                            车身颜色: {carBodyColor}
                        </div>

                        <div className={styles.content}>
                            {
                                carBodyColorList.map((item: any) => {
                                    return (
                                        <Button
                                            key={item.text}
                                            style={{
                                                marginRight: '8px',
                                                marginBottom: '8px'
                                            }}
                                            type='primary'
                                            onClick={() => handleChangeCarBodyColor(item)}
                                        >{item.text}</Button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className={styles.carWraper}
        >
            <div
                className={styles.carInner}
            >
                {renderCanvas()}
            </div>

            {renderOprate()}
        </div>
    )
}
