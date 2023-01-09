import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { Heading } from '../../components/mdx/Heading';
import matter from 'gray-matter';

// custom components
import Para from '../../components/mdx/Para';
import UnorderedList from '../../components/mdx/UnorderedList';
import ReactMarkdown from 'react-markdown';
import CustomImage from '../../components/mdx/Image';
import Layout from '../../components/layout';

// syntax-highlighter
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// use this inside the getStaticProps function if anything goes wrong - for now it looks good - Georgey
// const articles = path.join(process.cwd(), 'database');

function ArticlePage({
  data,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Layout
          meta={{
            author: data.author,
            title: data.title,
            slug: data.slug,
            topics: data.topics.split(', '),
          }}
        >
          <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={content}
            components={{
              h1: Heading.H1,
              h2: Heading.H2,
              p: Para,
              ul: UnorderedList,
              image({ src, alt, ...props }) {
                return <CustomImage src={src} alt={alt} {...props} />;
              },
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, '')}
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <div className={className} {...props}>
                    {children}
                  </div>
                );
              },
            }}
          />
        </Layout>
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
    path.join('database', slug as string, (slug + '.md') as string),
    'utf8'
  );

  const { data, content } = matter(source);

  return {
    props: {
      data,
      content,
    },
  };
}

export default ArticlePage;
