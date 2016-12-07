import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './app.styles.css';
import Navigation from './Navigation';

class App extends Component {
  componentWillMount() {
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        <Navigation />
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default connect()(App);
