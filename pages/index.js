import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import connectMongo from '../utils/connectMongo';
import User from '../models/userModel';
import AddUser from '../components/addUserComponent';
import UserContainer from '../components/userContainer';

export const getServerSideProps = async () => {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING DOCUMENTS');
    const users = await User.find();
    console.log('FETCHED DOCUMENTS');

    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default function Home({ users }) {
  return (
    <div className={styles.container}>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossorigin="anonymous"
        />
      </Head>

      <main className={styles.main}>
        <UserContainer users={users} />
      </main>
    </div>
  );
}
