import { useState } from 'react';
import Head from 'next/head';
import Router from "next/router";

import styles from '../styles/Home.module.css';
import Input from '../components/common/Input';

export default function Home() {

  const [familyId, setFamilyId] = useState();

  const handleChange = (e) => {
    setFamilyId(e.target.value)
  }

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

      <main className={styles.main}>
        <Input name="familyId" onChange={handleChange} />
        <button onClick={() => Router.push(`/user/${familyId}`)}>Submit</button>
      </main>
    </div>
  );
}
