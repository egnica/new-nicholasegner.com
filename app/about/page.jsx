import React from "react";
import Head from "next/head";
import Image from "next/image";

function About() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nicholas Egner",
              url: "https://nicholasegner.com",
              image:
                "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner.jpg",
              sameAs: [
                "https://www.linkedin.com/in/nicholas-egner",
                "https://github.com/egnica",
                "https://latestartdev.com",
                "https://www.wikidata.org/wiki/Q133818563",
              ],
              jobTitle: "Web Developer, Digital Strategist",
              worksFor: {
                "@type": "Organization",
                name: "GIGnnovate",
              },
              alumniOf: "Dunwoody College of Technology",
              description:
                "Nicholas Egner is a web developer and digital strategist specializing in online presence optimization, SEO, and custom website solutions for small businesses.",
            }),
          }}
        />
      </Head>
      <div>
        <h1>Nicholas Egner</h1>
        <p>This is the about page</p>
        <div style={{ height: "40%" }}>
          <Image
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner.jpg"
            height={542}
            width={361}
            alt="Picture on Nicholas Egner - Minneapolis Web Developer"
          />
        </div>
      </div>
    </>
  );
}

export default About;
