import React from 'react';
import PropTypes from 'prop-types';
import { initialState } from '../../../redux/initialState';
import clsx from 'clsx';
// import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import styles from './Homepage.module.scss';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Component = ({ children, posts }) => (
  <div className={clsx(styles.container, styles.root)}>
    {initialState.role === 'user' || initialState.role === 'admin' ?
      <div>
        <BottomNavigation>
          <BottomNavigationAction variant="contained" label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction variant="contained" label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction variant="contained" label="Nearby" icon={<LocationOnIcon />} />
          <BottomNavigationAction component={NavLink} to={`${process.env.PUBLIC_URL}/post/add`} variant="contained" icon={<AddIcon />} fontSize="large">Add</BottomNavigationAction>
        </BottomNavigation>
        <h2>List</h2>
        {posts.map(post =>
          <NavLink key={post.id} to={`/post/${post.id}`}>   
            <p className={styles.mainP}>{post.title}</p>
          </NavLink>
        )}
      </div> :
      null
    }
  </div >
);
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
};
const mapStateToProps = state => ({
  posts: getAll(state),
});
const Container = connect(mapStateToProps,null)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};