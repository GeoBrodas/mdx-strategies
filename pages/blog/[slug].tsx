import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';

const articles = path.join(process.cwd(), 'database');

function ArticlePage({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>{source.frontmatter.title}</title>
      </Head>
      <MDXRemote {...source} />
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
    path.join(articles, slug as string, (slug + '.mdx') as string),
    'utf8'
  );

  const mdxSource = await serialize(source, { parseFrontmatter: true });

  return {
    props: {
      source: mdxSource,
    },
  };
}

export default ArticlePage;
