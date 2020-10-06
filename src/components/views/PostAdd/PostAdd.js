import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { initialState } from '../../../redux/initialState';
import clsx from 'clsx';
import { getAll, insertPost } from '../../../redux/postsRedux';
import SubmitPost from '../../features/SubmitPost';
import styles from './PostAdd.module.scss';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';

const Component = ({ addPost }) => {
  return (
    <div className={clsx(styles.container, styles.root,)}>
      {(initialState.role === 'user' || initialState.role === 'admin') &&
          <div>
            <div className={styles.flex}> 
              <h2 className={styles.titlemargin}>Add Post</h2>
              <BottomNavigationAction  component={Link} to={`/`} variant="contained" icon={<CancelIcon />}></BottomNavigationAction></div>
            <SubmitPost action={addPost} type='added' />
          </div>
      }
    </div>
  );
};

Component.propTypes = {
  addPost: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(insertPost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostAdd,
  Component as PostAddComponent,
};