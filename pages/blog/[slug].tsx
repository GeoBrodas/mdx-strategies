import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import { Heading } from '../../components/mdx/Heading';
import Para from '../../components/mdx/Para';
import UnorderedList from '../../components/mdx/UnorderedList';

// use this inside the getStaticProps function if anything goes wrong - for now it looks good - Georgey
// const articles = path.join(process.cwd(), 'database');

function ArticlePage({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>{source.frontmatter.title}</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MDXRemote
          {...source}
          components={{
            h1: Heading.H1,
            h2: Heading.H2,
            p: Para,
            ul: UnorderedList,
          }}
        />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync('database');

  return {
    paths: files.map((file) => ({
      params: {
        slug: file,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { slug } = ctx.params;

  const source = fs.readFileSync(
    path.join('database', slug as string, (slug + '.mdx') as string),
    'utf8'
  );

  const mdxSource = await serialize(source, { parseFrontmatter: true });

  console.log(mdxSource);

  return {
    props: {
      source: mdxSource,
    },
  };
}

export default ArticlePage;
