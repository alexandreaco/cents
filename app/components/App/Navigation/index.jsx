import React from 'react';
import { Link } from 'react-router';
import styles from './navigation.styles.css';

function Navigation() {
  return (
    <nav className={styles.root}>
      <Link className={styles.link} to={'/welcome'}>Welcome</Link>
      <Link className={styles.link} to={'/'}>Calendar</Link>
    </nav>
  );
}

export default Navigation;
