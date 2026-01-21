import { apiDocs, pluginDocs, guideDocs } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const pluginSource = loader({
  baseUrl: '/docs/plugin',
  source: pluginDocs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const apiSource = loader({
  baseUrl: '/docs/api',
  source: apiDocs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const guideSource = loader({
  baseUrl: '/docs/guide',
  source: guideDocs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export type PluginDocsPage = InferPageType<typeof pluginSource>;
export type ApiDocsPage = InferPageType<typeof apiSource>;
export type GuideDocsPage = InferPageType<typeof guideSource>;
export type AnyDocsPage = PluginDocsPage | ApiDocsPage | GuideDocsPage;

export function getPluginPageImage(page: InferPageType<typeof pluginSource>) {
  const segments = ['plugin', ...page.slugs, 'image.png'];

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

export function getGuidePageImage(page: InferPageType<typeof guideSource>) {
  const segments = ['guide', ...page.slugs, 'image.png'];

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
