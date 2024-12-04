import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';

const namer = createSimpleClassNamer(style);

type ButtonProps = {
  name: string;
  active?: boolean;
  onChangeMode?: () => void;
};
export default function Button({ name, active = false, onChangeMode = () => {} }: ButtonProps) {
  return (
    <button className={namer('wrapper', [active, 'active'])} onClick={onChangeMode}>
      {name}
    </button>
  );
}
