import { MouseEventHandler } from 'react';
import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';

const namer = createSimpleClassNamer(style);

type ButtonProps = {
  name: string;
  toggled?: boolean;
  color?: 'default' | 'primary';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: string;
};
export default function CommonButton({
  name,
  toggled = false,
  color = 'default',
  onClick = () => {},
  width = 'auto',
}: ButtonProps) {
  return (
    <button
      style={{ width }}
      className={namer('wrapper', [color !== 'default', `color-${color}`], [toggled, 'toggled'])}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
