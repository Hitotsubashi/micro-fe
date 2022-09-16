// import { useShared } from '@/context/SharedContext';
// import { useEffect } from 'react';

function Page404() {
  // const shared = useShared();

  // useEffect(() => {
  //   // @ts-ignore
  //   if (window.__POWERED_BY_QIANKUN__) {
  //     shared!.dispatch({
  //       type: 'CHANGE_ROUTE',
  //       payload: '/404',
  //     });
  //   }
  // }, [shared]);

  return <div style={{ marginTop: '20vh', fontSize: '18px', textAlign: 'center' }}>404</div>;
}

export default Page404;
