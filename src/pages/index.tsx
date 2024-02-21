import { data } from '@/components/data';
import PieChart from '@/components/pie-chart';
import dynamic from 'next/dynamic';

const WebTask = dynamic(() => import('../components/web-task'), { ssr: false })

export default function Page() {
  return (<WebTask />);
}
