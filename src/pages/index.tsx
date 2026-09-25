import Head from "next/head";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
    return (
        <>
            <Head>
                <title>MathTuto</title>
                <meta
                    name="description"
                    content="MathTuto - An interactive educational adventure that builds math and civic skills through real-world problem solving."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={styles.main}>
                <AppWithoutSSR />
            </main>
        </>
    );
}

