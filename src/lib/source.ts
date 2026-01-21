import { apiDocs, docs } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const apiSource = loader({
  baseUrl: '/docs/api',
  source: apiDocs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export type DocsPage = InferPageType<typeof source>;
export type ApiDocsPage = InferPageType<typeof apiSource>;
export type AnyDocsPage = DocsPage | ApiDocsPage;

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export function getApiPageImage(page: InferPageType<typeof apiSource>) {
  const segments = ['api', ...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: AnyDocsPage) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}
