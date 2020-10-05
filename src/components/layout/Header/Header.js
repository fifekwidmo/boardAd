import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { initialState } from '../../../redux/initialState';
const Component = ({ className, children, login }) => (
  <div className={clsx(styles.header, styles.root)}>
    {initialState.role === 'user' || initialState.role === 'admin' ?
      <div>
        <Button color="primary" variant="contained">My posts</Button>
        <Button color="primary" variant="contained">Account</Button>
        <Button color="primary" variant="contained">Favorite adds</Button>
        <Button color="primary" variant="contained">Contact</Button>
        <Button color="primary" variant="contained">LogOut</Button>
        <Avatar className={styles.avatar}>F</Avatar>
      </div>
      :
      <a className={clsx(styles.loginBtn, styles.loginBtngoogle)} href='https://www.google.com/'>
				Login with Google
      </a>
    }
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  login: PropTypes.bool,
};

export {
  Component as Header,
  Component as HeaderComponent,
};
