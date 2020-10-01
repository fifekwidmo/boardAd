import React from 'react';
import PropTypes from 'prop-types';
// import styles from './MainLayout.module.scss';
import { Header } from '../Header/Header';
class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        {children}
      </div >
    );
  }
}
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export {
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
