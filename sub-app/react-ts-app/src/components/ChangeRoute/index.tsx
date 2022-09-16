import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.scss';

const ChangeRoute: FC = () => {
  return (
    <div>
      <div className="change-route-buttons">
        <Link className="button" to="/page-a">
          PageA
        </Link>
        <Link className="button" to="/page-b">
          PageB
        </Link>
        <Link className="button" to="/">
          MainPage
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default ChangeRoute;
