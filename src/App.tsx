import { useState, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { getDarkTheme } from '@/utils'
import {routeList} from './routeConfig'

import './app.scss'

const renderLoading = () => {
    return (
        <div className="loading">
            <div>
                <img src="/images/loading/loading.png" />

                <div>加载中...</div>
            </div>
        </div>
    )
}

const Layout = () => {
    return (
        <div className="layout-wraper">
            <Suspense
                fallback={renderLoading()}
            >
                <Outlet />
            </Suspense>
        </div>
    );
}

function App() {
    useEffect(() => {
        getDarkTheme(0)
    }, [])



    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {
                        routeList.map((item: any, index: number) => {
                            if (!index) {
                                return (
                                    <Route
                                        index
                                        element={<item.element />}
                                    />
                                )
                            }

                            return (
                                <Route
                                    path={item.path}
                                    element={<item.element />} 
                                />
                            )
                        })
                    }
                </Route>
            </Routes>
        </Router>
    )
}

export default App
