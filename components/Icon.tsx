
import React from 'react';
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  BadgeCheck,
  Building,
  User,
  ShieldCheck,
  QrCode,
  Globe,
  Star,
  Sparkles,
  MessageSquare,
  Link,
  Users,
  Heart,
  Skull,
  Twitter,
  Linkedin,
  Github,
  Sun,
  Moon,
  type LucideIcon
} from 'lucide-react';

export type IconName =
  | 'arrowRight'
  | 'checkCircle'
  | 'xCircle'
  | 'badgeCheck'
  | 'building'
  | 'user'
  | 'shieldCheck'
  | 'qrCode'
  | 'globe'
  | 'star'
  | 'sparkles'
  | 'messageSquare'
  | 'link'
  | 'users'
  | 'heart'
  | 'skull'
  | 'twitter'
  | 'linkedin'
  | 'github'
  | 'sun'
  | 'moon';


const iconMap: Record<IconName, LucideIcon> = {
  arrowRight: ArrowRight,
  checkCircle: CheckCircle,
  xCircle: XCircle,
  badgeCheck: BadgeCheck,
  building: Building,
  user: User,
  shieldCheck: ShieldCheck,
  qrCode: QrCode,
  globe: Globe,
  star: Star,
  sparkles: Sparkles,
  messageSquare: MessageSquare,
  link: Link,
  users: Users,
  heart: Heart,
  skull: Skull,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  sun: Sun,
  moon: Moon,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  const LucideIconComponent = iconMap[name];
  if (!LucideIconComponent) {
    return null; // or a default icon
  }
  return <LucideIconComponent className={className} {...props} />;
};

export default Icon;
