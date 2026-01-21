import { apiSource, getLLMText, source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/docs/[[...slug]]'>) {
  const { slug } = await params;
  const slugs = slug ?? [];
  const page =
    slugs[0] === 'api' ? apiSource.getPage(slugs.slice(1)) : source.getPage(slugs);
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

  return [...source.generateParams(), ...apiParams];
}
