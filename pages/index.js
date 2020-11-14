import Layout from "@components/Layout";
import PostList from "@components/PostList";

import getPosts from "@utils/getPosts";

const Index = ({ posts, title, description, ...props }) => {
  var ogData = {
    url: "https://shiplet.dev",
    imgUrl: "https://shiplet.dev/static/triangle",
    fb: {
      url: "https://shiplet.dev",
      title: "shiplet.dev"
    },
    tw: {
      domain: "shiplet.dev",
      title: "shiplet.dev"
    }
  }
  return (
    <>
      <Layout pageTitle={title} description={description} ogData={ogData}>
        <section className="hero">
          <img
            className="bio-img"
            src="/static/ship.jpg"
            alt="Shiplet bio picture"
          />
          <h1 className="title">shiplet.dev</h1>
        </section>

        <p className="description">
          My name is Michael Shiplet. I'm a software engineer,
          guitarist/composter, illustrator, runner, rower, and general tinkerer.
          I love going all-in on the things that interest me, and at the
          encouragement of friends and family, I've decided to keep a record of
          things I've learned.
        </p>
        <p className="description">
          This is a blog about what I do, and how I do it. I hope you enjoy 🙂
        </p>
        <main>
          <PostList posts={posts} />
        </main>
      </Layout>
      <style jsx>{`
        .hero {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }

        .title {
          margin: 1rem auto;
          font-size: 3rem;
        }

        .bio-img {
          border-radius: 50%;
          width: 100px;
          margin-right: 15px;
        }

        .description {
          line-height: 1.5em;
          max-width: 800px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  const posts = ((context) => {
    return getPosts(context);
  })(require.context("../posts", true, /\.md$/));

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
