import React, { FC } from "react";
import { Link, Route, Routes, useRoutes } from "react-router-dom";
import './index.scss'

const ChangeRoute: FC = ()=>{
    const routes = [
        {
            path:'/',
            element: <div>MainPage</div>,
        },
        {
            path:'/PageA',
            element: <div>PageA</div>,
            breadcrumb: 'PageA'
        },
        {
            path:'/PageB',
            element: <div>PageB</div>,
            breadcrumb: 'PageB'
        }
    ]

    const element = useRoutes(routes)

    return (
        <div>
            <div className="change-route-buttons">
                <Link className="button" to="/PageA">PageA</Link>
                <Link className="button" to="/PageB">PageB</Link>
                <Link className="button" to="/">MainPage</Link>
            </div>
            {element}
        </div>
    )
}

export default ChangeRoute;