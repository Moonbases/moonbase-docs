import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { SidebarTabWithProps } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import { Package, Server } from 'lucide-react';

export const docsTabs: SidebarTabWithProps[] = [
  {
    title: 'Plugin Docs',
    description: 'Extend Moonbase with backend and frontend plugins.',
    url: '/docs',
    icon: <Package className="size-4" />,
  },
  {
    title: 'API Docs',
    description: 'REST endpoints, auth, and request examples.',
    url: '/docs/api',
    icon: <Server className="size-4" />,
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Moonbase Documentation',
    },
  };
}
