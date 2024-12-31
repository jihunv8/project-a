import Link from 'next/link';
import style from './index.module.scss';

import { createSimpleClassNamer } from '@/modules/class-namer';

const namer = createSimpleClassNamer(style);

type NavMenuProps = {
  href: string;
  text: string;
  selected?: boolean;
};

export default function NavMenu({ href, text, selected = false }: NavMenuProps) {
  return (
    <div className={namer('wrapper')}>
      <Link className={namer('menu', [selected, 'selected'])} href={href}>
        {text}
      </Link>
    </div>
  );
}
