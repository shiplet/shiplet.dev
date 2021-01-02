import Link from "next/link";

export default function PostList({ posts }) {
  if (posts === "undefined") return null;

  return (
    <div>
      {!posts && <div>No posts!</div>}
      <ul>
        {posts &&
          posts
            .sort((a, b) =>
              Date.parse(a?.frontmatter?.date) >
              Date.parse(b?.frontmatter?.date)
                ? -1
                : 1
            )
            .map((post) => {
              return (
                <li key={post.slug}>
                  <Link href={{ pathname: `/post/${post.slug}` }}>
                    <a className="post-li">
                      <span className="date">{post?.frontmatter?.date}</span>
                      <span className="bar">|</span>
                      <span className="title">{post?.frontmatter?.title}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
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
          color: black;
        }
        .date {
          width: 100px;
        }
        .bar {
          width: 15px;
        }
        @media all and (max-width: 800px) {
          .title {
            width: 100%;
            padding-left: 15px;
          }
        }
      `}</style>
    </div>
  );
}
