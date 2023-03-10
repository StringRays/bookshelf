import Head from "next/head";
import React from "react";
import NavBar from "./NavBar";

export default function Layout(props: React.PropsWithChildren) {
    return (
        <>
          <Head>
              <title>Library</title>
              <meta name="description" content="Generated by create next app" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <NavBar />
          <main>
            <div className="h-screenx py-20 px-60">{props.children}</div>
          </main>
        </>
    )
}