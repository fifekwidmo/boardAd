import React from 'react';
import PropTypes from 'prop-types';
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
  Component as MainLayoutComponent,
};
