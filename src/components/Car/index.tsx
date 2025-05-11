import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Gltf } from '@react-three/drei';
import { useControls } from 'leva'
import {Button} from 'antd'
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import styles from './index.module.scss'

const carBodyColor = [
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
    // 存储上一次的窗口宽度和高度
    const [prevWidth, setPrevWidth] = useState(window.innerWidth);
    const [prevHeight, setPrevHeight] = useState(window.innerHeight);

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
    console.log('-----gltf', gltf)


    // useEffect(() => {
    //     gltf.scene.traverse((obj: any) => {
    //         if (obj.name === 'DOOR1_8_30') {
    //             // obj.material = {
    //             //     ...obj.material,
    //             //     color: 'red'
    //             // }

    //             const list = obj.children

    //             // console.log('----list', Array.isArray(list))

    //             for (const mesh of list) {
    //                 if (mesh.children[0].material.name === "Car_body") {
    //                     console.log('======mesh.children[0].material', mesh.children[0].material)
    //                     mesh.children[0].material.color = new THREE.Color(0xff0000)
    //                 }
    //             }
    //         }
    //     })
    // }, [gltf])


    const handleChangeCarBodyColor = (value: any) => {
        gltf.scene.traverse((obj: any) => {
            if (obj.name === 'DOOR1_8_30') {
                const list = obj.children

                for (const mesh of list) {
                    if (mesh.children[0].material.name === "Car_body") {
                        console.log('======mesh.children[0].material', mesh.children[0].material)
                        mesh.children[0].material.color = value
                    }
                }
            }
        })
    }



    return (
        <div
            className={styles.carWraper}
        >
            <div
                className={styles.carInner}
            >
                <Canvas>
                    <OrbitControls />

                    <Environment background>
                        <mesh scale={100}>
                            <sphereGeometry args={[1, 64, 64]} />
                            <meshBasicMaterial color="#393939" side={THREE.BackSide} />
                        </mesh>
                    </Environment>

                    <ambientLight intensity={1} />

                    <group>
                        <primitive
                            object={gltf.scene}
                        />
                    </group>
                </Canvas>
            </div>

            <div
                className={styles.operate}
            >
                <div className={styles.black}>
                    <div className={styles.title}>车身颜色</div>

                    <div className={styles.content}>
                        {
                            carBodyColor.map((item: any) => {
                                return (
                                    <Button
                                        style={{
                                            marginRight: '8px',
                                            marginBottom: '8px'
                                        }}
                                        type='primary'
                                        onClick={() => handleChangeCarBodyColor(item.color)}
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
