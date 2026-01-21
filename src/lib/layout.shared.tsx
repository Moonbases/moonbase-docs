import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { SidebarTabWithProps } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import { Package, Rocket, Server } from 'lucide-react';
import { apiSource, guideSource, pluginSource } from '@/lib/source';

const pluginUrls = new Set(pluginSource.getPages().map((page) => page.url));
const apiUrls = new Set(apiSource.getPages().map((page) => page.url));
const guideUrls = new Set(guideSource.getPages().map((page) => page.url));

export const docsTabs: SidebarTabWithProps[] = [
  {
    title: 'Moonbase Guide',
    description: 'Get Moonbase up and running.',
    url: '/docs/guide',
    urls: guideUrls,
    icon: <Rocket className="size-4 text-teal-600 dark:text-teal-400" />,
  },
  {
    title: 'Plugin Docs',
    description: 'Extend Moonbase easily.',
    url: '/docs/plugin',
    urls: pluginUrls,
    icon: <Package className="size-4 text-blue-600 dark:text-blue-300" />,
  },
  {
    title: 'API Docs',
    description: 'Integrate Moonbase with your app.',
    url: '/docs/api',
    urls: apiUrls,
    icon: <Server className="size-4 text-rose-600 dark:text-rose-400" />,
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Moonbase Documentation',
    },
  };
}
