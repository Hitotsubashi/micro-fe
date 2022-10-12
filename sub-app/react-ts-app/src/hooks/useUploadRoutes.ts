import { UNSAFE_NavigationContext } from 'react-router-dom';
import { matchRoutes, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { routes } from '@/App';

export default function useUploadRoutes() {
  const { basename } = useContext(UNSAFE_NavigationContext);

  const location = useLocation();

  useEffect(() => {
    if (window.__POWERED_BY_QIANKUN__) {
      console.log(1);

      const matched = matchRoutes(routes, location.pathname)!.map(({ route, pathname }) => ({
        path: basename + pathname,
        // @ts-ignore
        meta: route.meta,
      }));

      window.dispatchEvent(
        new CustomEvent('micro-app-dispatch', {
          detail: {
            type: 'UPDATE_ROUTES',
            payload: matched,
          },
        }),
      );
    }
  }, [basename, location.pathname]);

  useEffect(
    () => () => {
      if (window.__POWERED_BY_QIANKUN__) {
        console.log(2);

        window.dispatchEvent(
          new CustomEvent('micro-app-dispatch', {
            detail: {
              type: 'UPDATE_ROUTES',
              payload: [],
            },
          }),
        );
      }
    },
    [1],
  );
}
