import Head from "next/head";

import Header from "./Header";

export default function Layout({ children, pageTitle, description, ogData, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogData.url} />
        <meta property="og:title" content={ogData.fb.title} />
        <meta
            property="og:description"
            content={ogData.description}
        />
        <meta
            property="og:image"
            content={ogData.imgUrl}
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" value={ogData.tw.domain} />
        <meta name="twitter:title" value={ogData.tw.title} />
        <meta
            name="twitter:description"
            value={ogData.description}
        />
        <meta
            name="twitter:image"
            content={ogData.imgUrl}
        />
        <meta name="twitter:url" value={ogData.url} />
        <meta name="Description" content={description}></meta>
        <title>{pageTitle}</title>
      </Head>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800;900&display=swap");

        html,
        body {
          margin: 0;
          padding: 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          color: #445566;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: bold;
        }

        a {
          color: #00a395;
        }

        .content p,
        .content ul,
        .content ol,
        .content li {
          line-height: 1.5em;
        }

        .content {
          padding: 2rem 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          font-size: 0.625em;
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          padding: 0 5px;
          height: 1rem;
        }
      `}</style>
      <section className="layout">
        <Header />
        <div className="content">{children}</div>
      </section>
      <footer>
        <p>
          I borrowed this blog template from {` `}
          <a href="https://github.com/cassidoo/next-netlify-blog-starter">
            cassidoo
          </a>
          . (Thank you 🙏🏻)
        </p>
      </footer>
    </>
  );
}
