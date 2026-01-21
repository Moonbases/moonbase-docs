import { apiSource, getLLMText, guideSource, pluginSource } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/docs/[[...slug]]'>) {
  const { slug } = await params;
  const slugs = slug ?? [];
  const page =
    slugs[0] === 'api'
      ? apiSource.getPage(slugs.slice(1))
      : slugs[0] === 'guide'
        ? guideSource.getPage(slugs.slice(1))
        : slugs[0] === 'plugin'
          ? pluginSource.getPage(slugs.slice(1))
          : null;
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  const apiParams = apiSource.generateParams().map((param) => ({
    ...param,
    slug: ['api', ...(param.slug ?? [])],
  }));

  const guideParams = guideSource.generateParams().map((param) => ({
    ...param,
    slug: ['guide', ...(param.slug ?? [])],
  }));

  const pluginParams = pluginSource.generateParams().map((param) => ({
    ...param,
    slug: ['plugin', ...(param.slug ?? [])],
  }));

  return [...pluginParams, ...apiParams, ...guideParams];
}
