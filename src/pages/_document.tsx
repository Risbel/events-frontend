import { Head, Html, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <title>MyEvents</title>
      <Head>
        {/* Character, robots, and OG image */}
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/MyEvents-logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="MyEvents" />
        <meta name="description" content="Quickly and easily build virtual spaces to promote your events with us." />
        <meta name="keywords" content="MyEvents, Events, event generator, tickets, reservation" />

        <meta
          property="og:description"
          content="Quickly and easily build virtual spaces to promote your events with us."
        />
        <meta property="og:url" content="https://event.myaipeople.com" />
        <meta property="og:image" content="/og-event-tickets.jpg" />
        <meta property="og:image:width" content="340" />
        <meta property="og:image:height" content="340" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
