
import { FC } from 'react';
import styles from './index.module.scss';

const ChangeRouteButton: FC = () => {

  const changeRoute = () => {
    window.dispatchEvent(new CustomEvent('micro-app-dispatch',{
      detail:{
        type: 'CHANGE_ROUTE',
        payload: '/app-vue/index',
      }
    }))
  };

  return (
    <div className={styles['button-row']}>
      <button onClick={changeRoute}>跳转到vue app 微应用</button>
    </div>
  );
};

export default ChangeRouteButton;
