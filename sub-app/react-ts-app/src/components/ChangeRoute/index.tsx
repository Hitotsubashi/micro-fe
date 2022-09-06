import React, { FC } from "react";
import { Link, Route, Routes } from "react-router-dom";
import './index.scss'

const ChangeRoute: FC = ()=>{
    return (
        <div>
            <div className="change-route-buttons">
                <Link className="button" to="/PageA">PageA</Link>
                <Link className="button" to="/PageB">PageB</Link>
                <Link className="button" to="/">MainPage</Link>
            </div>
            <Routes>
                <Route path="/PageA" element={<div>PageA</div>} />
                <Route path="/PageB" element={<div>PageB</div>} />
                <Route path="/" element={<div>MainPage</div>} />
            </Routes>
        </div>
    )
}

export default ChangeRoute;