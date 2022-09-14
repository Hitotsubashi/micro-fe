import { useShared } from "@/context/SharedContext";
import React, { FC, useEffect } from "react";
import { Link,  matchRoutes,  useLocation,  useRoutes, Outlet } from "react-router-dom";
import './index.scss'
import {basename} from '@/index'

export const routes = [
    {
        path:'/',
        element: <div>MainPage</div>,
    },
    {
        path:'/page-a',
        element: (<div>
                    PageA
                    <div className="change-route-buttons">
                        <Link className="button" to="/page-a/a-1">A1</Link>
                        <Link className="button" to="/page-a/a-2">A2</Link>
                        <Outlet/>
                    </div>
                </div>),
        meta: {title: 'PageA'},
        children:[
            {
                path: 'a-1',
                meta: {title: 'A1'},
                element: <div>A1</div>
            },
            {
                path: 'a-2',
                meta: {title: 'A2'},
                element: <div>A2</div>
            },
        ]
    },
    {
        path:'/page-b',
        element: <div>PageB</div>,
        meta: {title: 'PageB'},
    }
]

const ChangeRoute: FC = ()=>{

    const element = useRoutes(routes)

    const location = useLocation()

    const shared = useShared()

    useEffect(() => {
        // @ts-ignore
        if(window.__POWERED_BY_QIANKUN__){
            const matched = matchRoutes(routes, location.pathname)!
                .map(({route, pathname})=>({
                        path: basename+pathname,
                        // @ts-ignore
                        meta: route.meta
                }))
                .filter(item => 
                    item.meta && item.meta.title && item.meta.breadcrumb !== false
                )
            shared!.dispatch({type:'UPDATE_ROUTES', payload: matched})
        }
    }, [location.pathname,shared])

    return (
        <div>
            <div className="change-route-buttons">
                <Link className="button" to="/page-a">PageA</Link>
                <Link className="button" to="/page-b">PageB</Link>
                <Link className="button" to="/">MainPage</Link>
            </div>
            {element}
        </div>
    )
}

export default ChangeRoute;