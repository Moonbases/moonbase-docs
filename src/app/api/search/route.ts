import { apiSource, source } from '@/lib/source';
import { findPath } from 'fumadocs-core/page-tree';
import { createSearchAPI } from 'fumadocs-core/search/server';
import path from 'node:path';

type DocsPage = ReturnType<typeof source.getPages>[number];
type ApiPage = ReturnType<typeof apiSource.getPages>[number];

async function buildIndexForSource(
  activeSource: typeof source | typeof apiSource,
  page: DocsPage | ApiPage,
) {
  let structuredData;

  if ('structuredData' in page.data) {
    structuredData = page.data.structuredData;
  } else if ('load' in page.data && typeof page.data.load === 'function') {
    structuredData = (await page.data.load()).structuredData;
  }

  if (!structuredData) {
    throw new Error('Cannot find structured data from page, please define the page to index function.');
  }

  const pageTree = activeSource.getPageTree(page.locale);
  const pathSegments = findPath(
    pageTree.children,
    (node) => node.type === 'page' && node.url === page.url,
  );

  let breadcrumbs: string[] | undefined;
  if (pathSegments) {
    breadcrumbs = [];
    pathSegments.pop();
    if (typeof pageTree.name === 'string' && pageTree.name.length > 0) {
      breadcrumbs.push(pageTree.name);
    }

    for (const segment of pathSegments) {
      if (typeof segment.name !== 'string' || segment.name.length === 0) continue;
      breadcrumbs.push(segment.name);
    }
  }

  return {
    title: page.data.title ?? path.basename(page.path, path.extname(page.path)),
    breadcrumbs,
    description: page.data.description,
    url: page.url,
    id: page.url,
    structuredData,
  };
}

export const { GET } = createSearchAPI('advanced', {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
  indexes: async () => {
    const docsIndexes = await Promise.all(
      source.getPages().map((page) => buildIndexForSource(source, page)),
    );
    const apiIndexes = await Promise.all(
      apiSource.getPages().map((page) => buildIndexForSource(apiSource, page)),
    );

    return [...docsIndexes, ...apiIndexes];
  },
});
