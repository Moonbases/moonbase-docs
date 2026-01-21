import { pluginSource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, docsTabs } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs/plugin'>) {
  return (
    <DocsLayout
      tree={pluginSource.getPageTree()}
      sidebar={{ tabs: docsTabs }}
      containerProps={{ className: 'docs-theme-plugin' }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
