import Link from "next/link";

export default function PostList({ posts }) {
  if (posts === "undefined") return null;

  const categoriedPosts = posts.reduce((acc, p, i, a) => {
    if (p?.frontmatter?.hasOwnProperty("categorySlug")) {
      if (!acc.hasOwnProperty(p.frontmatter.categorySlug)) {
        acc[p.frontmatter.categorySlug] = {
          title: p.frontmatter.categoryTitle,
          posts: [],
        };
      }
      acc[p.frontmatter.categorySlug].posts.push(p);
    }
    return acc;
  }, {});

  const freeformPosts = posts.filter(
    (p) => !p?.frontmatter?.hasOwnProperty("categorySlug")
  );

  return (
    <div>
      {!posts && <div>No posts!</div>}
      {categoriedPosts &&
        Object.keys(categoriedPosts).map((slug) => (
          <div>
            <h3>{categoriedPosts[slug].title}</h3>
            <ul>
              {categoriedPosts[slug].posts.map((post) => (
                <li key={post.slug}>
                  <Link href={{ pathname: `/post/${post.slug}` }}>
                    <a className="post-li">
                      <span className="date">{post?.frontmatter?.date}</span>
                      <span className="bar">|</span>
                      <span className="title">{post?.frontmatter?.title}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      <h3>Generalist Fancies</h3>
      <ul>
        {freeformPosts &&
          freeformPosts
            .sort((a, b) =>
              Date.parse(a?.frontmatter?.date) >
              Date.parse(b?.frontmatter?.date)
                ? -1
                : 1
            )
            .map((post) => (
              <li key={post.slug}>
                <Link href={{ pathname: `/post/${post.slug}` }}>
                  <a className="post-li">
                    <span className="date">{post?.frontmatter?.date}</span>
                    <span className="bar">|</span>
                    <span className="title">{post?.frontmatter?.title}</span>
                  </a>
                </Link>
              </li>
            ))}
      </ul>
      <style jsx>{`
        .post-li {
          display: flex;
          flex-direction: row;
          text-decoration: none;
          margin: 5px;
          flex-wrap: wrap;
        }
        .post-li:hover {
          color: rgb(171, 129, 177);
        }
        .date {
          width: 100px;
        }
        .bar {
          width: 15px;
        }
        @media all and (max-width: 800px) {
          .title {
            width: auto;
            padding-left: 15px;
          }
        }
      `}</style>
    </div>
  );
}
