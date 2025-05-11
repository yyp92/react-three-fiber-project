import {
    Home,
    HDR,
    HDRImg,
    CubeTextureLoader,
    Car
} from '@/components'

export const routeList: any = [
    {
        path: '/',
        element: Home
    },

    {
        path: '/hdr',
        element: HDR
    },
    {
        path: '/hdr-img',
        element: HDRImg
    },
    {
        path: '/cubeTextureLoader',
        element: CubeTextureLoader
    },

    {
        path: '/car',
        element: Car
    },

    {
        path: '*',
        element: '404'
    }
]