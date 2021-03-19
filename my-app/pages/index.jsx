import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react';
import Navbar from "../Components/navbar";
import Treeview from "../Components/treeView";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Navbar/>
        <Treeview/>
      </main>
    </div>
    
  )
}
