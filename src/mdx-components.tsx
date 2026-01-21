import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import * as Tabs from 'fumadocs-ui/components/tabs';
import * as Steps from 'fumadocs-ui/components/steps';
import * as Accordions from 'fumadocs-ui/components/accordion';
import * as Files from 'fumadocs-ui/components/files';
import { TypeTable } from 'fumadocs-ui/components/type-table';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...Tabs,
    ...Steps,
    ...Accordions,
    ...Files,
    TypeTable,
    ...components,
  };
}
