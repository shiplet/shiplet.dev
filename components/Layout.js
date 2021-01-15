import Head from "next/head";

import Header from "./Header";

export default function Layout({
  children,
  pageTitle,
  description,
  ogData,
  ...props
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogData.url} />
        <meta property="og:title" content={ogData.fb.title} />
        <meta property="og:description" content={ogData.description} />
        <meta property="og:image" content={ogData.imgUrl} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" value={ogData.tw.domain} />
        <meta name="twitter:title" value={ogData.tw.title} />
        <meta name="twitter:description" value={ogData.description} />
        <meta name="twitter:image" content={ogData.imgUrl} />
        <meta name="twitter:url" value={ogData.url} />
        <meta name="Description" content={description}></meta>
        <title>{pageTitle}</title>
      </Head>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800;900&display=swap");

        html,
        body {
          background-color: rgb(74, 74, 77);
          margin: 0;
          padding: 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          color: rgba(255, 255, 255, 0.78);
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
          color: rgb(228, 171, 236);
        }
        a:hover {
          color: rgb(171, 129, 177);
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
          align-items: flex-start;
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

        hr {
          width: 100%;
          height: 1px;
          background-color: #445566;
          border: none;
        }

        code {
          background-color: rgb(47, 47, 47);
          color: rgb(199, 146, 234); 
          padding: 3px 6px;
          border-radius: 4px;
        }

        pre {
          align-self: center;
        }

        @media all and (max-width: 800px) {
          .content ul {
            padding-left: 10px;
          }
        }
      `}</style>
      <section className="layout">
        <Header />
        <div className="content">{children}</div>
      </section>
      <footer>
        <p>
          Thanks for reading 🙏🏻
          <br/>- Ship
        </p>
      </footer>
    </>
  );
}
