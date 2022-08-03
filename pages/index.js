import React from 'react';
import Head from 'next/head';

import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Login from '../components/Login';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous"
        />
      </Head>

      <Navbar />
      <main className="container">
        <Login />
      </main>
    </div>
  );
}
