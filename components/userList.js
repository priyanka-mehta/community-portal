import React from 'react';
import styles from '../styles/Home.module.css';

const UserList = ({tests}) => {
  return (
    <div className={styles.grid}>
      {tests.map((test) => (
        <a
          href=""
          key={test._id}
          className={styles.card}
        >
          <h2>{test.name} &rarr;</h2>
          <p>{test.email}</p>
        </a>
      ))}
    </div>
  );
}

export default UserList;
