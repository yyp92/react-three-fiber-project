import * as THREE from 'three'
import { AxesHelper, GridHelper } from 'three';
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    useGLTF,
    Gltf,
    SpotLight,
    useHelper
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

const carDoorList = [
    {
        value: 'leftFront',
        text: '左前'
    },
    {
        value: 'leftBack',
        text: '左后'
    },
    {
        value: 'rightFront',
        text: '右前'
    },
    {
        value: 'rightBack',
        text: '右后'
    },
]

// @ts-ignore
extend(() => {
    return {
        AxesHelper,
        GridHelper
    }
})

  
export const Car = () => {
    const [carBodyColor, setCarBodyColor] = useState<any>(carBodyColorList[0].text)
    const openDoor = useRef<string[]>([])
    const [openDoorName, setOpenDoorName] = useState<any>('')


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
            // gltf.scene.rotation.set(0, -Math.PI / 2, -Math.PI / 10)

            handleChangeCarBodyColor(carBodyColorList[0])
        }
    }, [gltf])


    const handleChangeCarBodyColor = (item: any) => {
        setCarBodyColor(item.text)

        gltf.scene.traverse((obj: any) => {
            const list = obj.children

            if (obj.name.indexOf('DOOR') > -1) {
                for (const mesh of list) {
                    // * 汽车的车身
                    if (mesh.children[0].material.name === 'Car_body') {
                        // console.log('======mesh.children[0].material', mesh.children[0].material)
                        mesh.children[0].material.color = item.color
                        mesh.children[0].material.roughness = 0.1
                        mesh.children[0].material.metalness = 0.5
                        mesh.children[0].material.clearcoat = 1
                        mesh.children[0].material.clearcoatRoughness = 0.05
                    }
                }
            }

            // 轮胎
            if (obj.name === 'Wheel1001_12_55') {
                for (const mesh of list) {
                    if (mesh.children[0].material.name === 'M_Wheel_ALL.002') {
                        mesh.children[0].material.color = new THREE.Color(0x333333)
                        mesh.children[0].material.roughness = 0.8
                        mesh.children[0].material.metalness = 0.2
                    }
                }
            }

            // logo
            if (obj.name === 'logo3_4_11') {
                for (const mesh of list) {
                    if (mesh.children[0].material.name === 'M_ChePai.004') {
                        // mesh.children[0].material.color = new THREE.Color(0x000000)
                        mesh.children[0].material.roughness = 0.8
                        mesh.children[0].material.metalness = 0.8
                    }
                    else if (mesh.children[0].material.name === 'M_LOGO.004' || mesh.name === 'Object_12_12') {
                        mesh.children[0].material.color = new THREE.Color(0xcccccc)
                        mesh.children[0].material.roughness = 0.2
                        mesh.children[0].material.metalness = 0.8
                    }
                }
            }

            // 车灯
            if (obj.name === 'OUTSIDE_6_17') {
                for (const mesh of list) {
                    // 前车灯
                    if (mesh.children[0].material.name === 'Car_frontlight') {
                        mesh.children[0].material.color = new THREE.Color(0xffff00)
                        mesh.children[0].material.emissive = new THREE.Color(0xffff00)
                        mesh.children[0].material.emissiveIntensity = 1000
                    }
                    // 后车灯
                    else if (mesh.children[0].material.name === 'Car_backlight') {
                        // console.log('mesh', mesh.children[0].material)
                    }
                }
            }
        })
    }


    const handleChangeCarDoorOpenStatus = (item: any) => {
        if (openDoor.current.includes(item.value)) {
            openDoor.current = openDoor.current.filter((data: any) => data !== item.value)
        }
        else {
            openDoor.current.push(item.value)
        }
        
        setOpenDoorName(openDoor.current ? item.text : '')

        gltf.scene.traverse((obj: any) => {
            // 左前
            if (obj.name === 'DOOR1_8_30') {
                if (openDoor.current.includes('leftFront')) {
                    obj.rotation.z = Math.PI / 2
                    obj.position.x = -1.85
                }
                else {
                    obj.rotation.z = 0
                    obj.position.x = 0
                }
            }
            // 左后
            else if (obj.name === 'DOOR2_9_37') {
                if (openDoor.current.includes('leftBack')) {
                    obj.rotation.z = Math.PI / 2
                    obj.position.x = -0.7
                    obj.position.z = 1.15
                }
                else {
                    obj.rotation.z = 0
                    obj.position.x = 0
                    obj.position.z = 0
                }
            }
            // 右前
            else if (obj.name === 'DOOR3_10_43') {
                if (openDoor.current.includes('rightFront')) {
                    obj.rotation.z = -Math.PI / 2
                    obj.position.x = 1.85
                }
                else {
                    obj.rotation.z = 0
                    obj.position.x = 0
                }
            }
            // 右后
            else if (obj.name === 'DOOR4_11_50') {
                if (openDoor.current.includes('rightBack')) {
                    obj.rotation.z = -Math.PI / 2
                    obj.position.x = 0.7
                    obj.position.z = 1.15
                }
                else {
                    obj.rotation.z = 0
                    obj.position.x = 0
                    obj.position.z = 0
                }
            }
        })
    }



    // ******** 渲染 ********
    const renderCanvas = () => {
        return (
            <Canvas>
                <OrbitControls />

                {/* 坐标轴辅助对象 */}
                <axesHelper args={[5]} />

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

                    <div className={styles.black}>
                        <div className={styles.title}>
                            打开车门
                        </div>

                        <div className={styles.content}>
                            {
                                carDoorList.map((item: any) => {
                                    return (
                                        <Button
                                            key={item.text}
                                            style={{
                                                marginRight: '8px',
                                                marginBottom: '8px'
                                            }}
                                            type='primary'
                                            onClick={() =>  handleChangeCarDoorOpenStatus(item)}
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
