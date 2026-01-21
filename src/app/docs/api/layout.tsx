import { apiSource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, docsTabs } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs/api'>) {
  return (
    <DocsLayout tree={apiSource.getPageTree()} sidebar={{ tabs: docsTabs }} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
