import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import './index.scss';

const ThemeColor: FC = () => {
  const theme = useSelector<RootState, RootState['app']['theme']>((state) => state.app.theme);

  return (
    <div className="tips">
      当前主题色：
      <div className="color-well" style={{ background: `${theme}` }} />
    </div>
  );
};

export default ThemeColor;
