import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import Navbar from "../../Components/navbar";



export default function Person({ ownersList }) {
  const router = useRouter();

 const [owners, setOwners] = useState(ownersList);
  useEffect(() => {
    async function loadData() {
      const response = await fetch('http://localhost:4001/information?ownerName=' +
      router.query.info +
      '&type=' +
      router.query.files);
      const ownersList = await response.json();
      setOwners(ownersList);
    }

    if(ownersList.length == 0) {
        loadData();
    }
  }, []);

  if(!owners[0]) { 
      return <div>loading...</div>
  }

  return <div className={styles.container}>
            <main className={styles.main}>
            <Navbar/>
            <h2 > Author: {owners[0]?.ownerName} <br/>{owners[0]?.details}</h2>
            </main>
            </div>;
}

Person.getInitialProps = async ctx => {
    if(!ctx.req) {
        return { ownersList: [] };
    }

  const { query } = ctx;
  const response = await fetch(
    'http://localhost:4001/information?ownerName=' +
      query.info +
      '&type=' +
      query.pages
  );
  const ownersList = await response.json();
  return { ownersList: ownersList };
};
