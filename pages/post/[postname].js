import Link from "next/link";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import CodeBlock from "@renderers/CodeBlock";

import Layout from "@components/Layout";
import getSlugs from "@utils/getSlugs";

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>;
  var ogData = {
    url: frontmatter.host,
    description: frontmatter.description,
    imgUrl: frontmatter.imgUrl,
    fb: {
      url: frontmatter.fbUrl,
      title: frontmatter.title,
    },
    tw: {
      domain: frontmatter.twDomain,
      title: frontmatter.title,
    },
  };

  return (
    <>
      <Layout pageTitle={`shiplet.dev | ${frontmatter.title}`} ogData={ogData}>
        <div className="back">
          ←{" "}
          <Link href="/">
            <a>Back to post list</a>
          </Link>
        </div>
        <article>
          <h1>{frontmatter.title}</h1>
          <p>
            {frontmatter.date} | {frontmatter.author}
          </p>
          {frontmatter.hero_image && (
            <img
              src={frontmatter.hero_image}
              className="hero"
              alt={frontmatter.title}
            />
          )}
          <div>
            <ReactMarkdown
              renderers={{ code: CodeBlock }}
              source={markdownBody}
              className="content"
            />
          </div>
        </article>
      </Layout>
      <style jsx>{`
        article {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          font-size: 3rem;
        }
        h3 {
          font-size: 2rem;
        }
        .hero {
          width: 100%;
        }
        .back {
          width: 100%;
          max-width: 1200px;
          color: rgb(228, 171, 236);
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params;

  const content = await import(`../../posts/${postname}.md`);
  const config = await import(`../../siteconfig.json`);
  const data = matter(content.default);

  return {
    props: {
      siteTitle: data.data.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    return getSlugs(context);
  })(require.context("../../posts", true, /\.md$/));

  const paths = blogSlugs.map((slug) => `/post/${slug}`);

  return {
    paths, // An array of path names, and any params
    fallback: false, // so that 404s properly appear if something's not matching
  };
}
