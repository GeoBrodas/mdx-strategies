import { MDXProvider } from '@mdx-js/react';
import Head from 'next/head';

import { Heading } from '../components/mdx/Heading';
import Para from '../components/mdx/Para';
import UnorderedList from '../components/mdx/UnorderedList';

interface LayoutProps {
  children: React.ReactNode;
  meta: { author: string; title: string; slug: string; topics: string[] };
}

const components = {
  h1: Heading.H1,
  h2: Heading.H2,
  p: Para,
  ul: UnorderedList,
};

function Layout({ children, ...props }: LayoutProps) {
  return (
    <MDXProvider components={components}>
      <div className="w-[80%] mx-auto p-6">
        {/* meta data */}
        <Head>
          <title>{props.meta.title}</title>
          <meta name="description" content={props.meta.title} />
        </Head>

        {/* header */}
        <div className="flex flex-col mt-6 mb-10 items-center justify-center text-center">
          <h1 className="text-3xl font-bold">{props.meta.title}</h1>
          <p className="text-md text-gray-500">By {props.meta.author}</p>

          {/* topics */}
          <div className="flex flex-wrap gap-2 mt-4">
            {props.meta.topics.map((topic) => (
              <span
                key={topic}
                className="text-sm text-gray-500 bg-gray-200 rounded-full px-2 py-1"
              >
                {topic.slice(0, 1).toUpperCase() + topic.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="border-b border-gray-400 mb-10"></div>

        {children}
      </div>
    </MDXProvider>
  );
}

export default Layout;
