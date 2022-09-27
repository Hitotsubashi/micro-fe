import { Link, Outlet, UNSAFE_NavigationContext, useRoutes } from 'react-router-dom';
import Index from '@/pages/index';
import { matchRoutes, useLocation } from 'react-router-dom';
import { useShared } from '@/context/SharedContext';
import { useContext, useEffect } from 'react';
import Page404 from '@/pages/404';

export const routes = [
  {
    path: '/',
    element: <Index />,
    children: [
      {
        index: true,
        element: <div>MainPage</div>,
      },
      {
        path: 'page-a',
        element: (
          <div>
            PageA
            <div className="change-route-buttons">
              <Link className="button" to="/page-a/a-1">
                A1
              </Link>
              <Link className="button" to="/page-a/a-2">
                A2
              </Link>
              <Outlet />
            </div>
          </div>
        ),
        meta: { title: 'PageA' },
        children: [
          {
            path: 'a-1',
            meta: { title: 'A1' },
            element: <div>A1</div>,
          },
          {
            path: 'a-2',
            meta: { title: 'A2' },
            element: <div>A2</div>,
          },
        ],
      },
      {
        path: 'page-b',
        element: <div>PageB</div>,
        meta: { title: 'PageB' },
      },
    ],
  },
  { path: '*', element: <Page404 /> },
];

function App() {
  const {basename} = useContext(UNSAFE_NavigationContext);

  const location = useLocation();

  const shared = useShared();

  useEffect(() => {
    if (window.__POWERED_BY_QIANKUN__) {
      const matched = matchRoutes(routes, location.pathname)!.map(({ route, pathname }) => ({
        path: basename + pathname,
        // @ts-ignore
        meta: route.meta,
      }));

      shared!.dispatch({
        type: 'UPDATE_ROUTES',
        payload: matched,
      });
    }
  }, [basename, location.pathname, shared]);

  const element = useRoutes(routes);

  return element;
}

export default App;
