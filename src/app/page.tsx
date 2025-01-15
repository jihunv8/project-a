import Header from '@/app/_components/Header';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/chord-dictionary');
  return (
    <div>
      <Header />
      HOME
    </div>
  );
}
