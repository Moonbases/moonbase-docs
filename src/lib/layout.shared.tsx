import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { SidebarTabWithProps } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import { Package, Rocket, Server } from 'lucide-react';
import { apiSource, guideSource, source } from '@/lib/source';

const pluginUrls = new Set(source.getPages().map((page) => page.url));
const apiUrls = new Set(apiSource.getPages().map((page) => page.url));
const guideUrls = new Set(guideSource.getPages().map((page) => page.url));

export const docsTabs: SidebarTabWithProps[] = [
  {
    title: 'Moonbase Guide',
    description: 'Install, setup, and payments for self-hosted Moonbase.',
    url: '/docs/guide',
    urls: guideUrls,
    icon: (
      <span className="docs-tab-icon docs-tab-icon--guide">
        <Rocket className="size-4" />
      </span>
    ),
    props: {
      className: 'docs-tab-option docs-tab-option--guide',
    },
  },
  {
    title: 'Plugin Docs',
    description: 'Extend Moonbase with backend and frontend plugins.',
    url: '/docs',
    urls: pluginUrls,
    icon: (
      <span className="docs-tab-icon docs-tab-icon--plugin">
        <Package className="size-4" />
      </span>
    ),
    props: {
      className: 'docs-tab-option docs-tab-option--plugin',
    },
  },
  {
    title: 'API Docs',
    description: 'REST endpoints, auth, and request examples.',
    url: '/docs/api',
    urls: apiUrls,
    icon: (
      <span className="docs-tab-icon docs-tab-icon--api">
        <Server className="size-4" />
      </span>
    ),
    props: {
      className: 'docs-tab-option docs-tab-option--api',
    },
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Moonbase Documentation',
    },
  };
}
