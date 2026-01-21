import { guideSource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, docsTabs } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs/guide'>) {
  return (
    <DocsLayout
      tree={guideSource.getPageTree()}
      sidebar={{ tabs: docsTabs }}
      containerProps={{ className: 'docs-theme-guide' }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
