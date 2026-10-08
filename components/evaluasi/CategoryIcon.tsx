import { BankOutlined, CalendarOutlined, MessageOutlined, TeamOutlined } from '@ant-design/icons';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  acara: CalendarOutlined,
  sekbid: TeamOutlined,
  fasilitas: BankOutlined,
  general: MessageOutlined,
};

/** Ikon kategori evaluasi (pengganti emoji). */
export default function CategoryIcon({ value, className = '' }: { value: string; className?: string }) {
  const Icon = ICONS[value] ?? MessageOutlined;
  return <Icon className={`text-[#4F86C6] ${className}`} />;
}
