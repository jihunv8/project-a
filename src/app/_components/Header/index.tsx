import style from './index.module.scss';

import { createSimpleClassNamer } from '@/modules/class-namer';
import Logo from '@/images/logo.svg';
import NavMenu from './NavMenu';
import Link from 'next/link';

const namer = createSimpleClassNamer(style);

type HeaderProps = {
  currentPage?: 'chord';
};

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className={namer('wrapper')}>
      <section className={namer('header-area')}>
        <Link className={namer('logo')} href="/">
          <Logo />
          <h1>Pianest</h1>
        </Link>

        <nav className={namer('gnb')}>
          <NavMenu href="./chord-dictionary" text="코드" selected={currentPage === 'chord'} />
        </nav>
      </section>
    </header>
  );
}
