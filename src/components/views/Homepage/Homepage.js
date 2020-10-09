import React from 'react';
import PropTypes from 'prop-types';
import { initialState } from '../../../redux/initialState';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux';
import styles from './Homepage.module.scss';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Component = ({ children, posts, fetchPublishedPosts }) => (
  <div className={clsx(styles.container, styles.root)}>
    {/* {fetchPublishedPosts()} */}
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
          <NavLink key={post._id} to={`/post/${post._id}`}>   
            <p className={styles.mainP}>{post.title}</p>
          </NavLink>
        ).reverse()}
      </div> :
      null
    }
  </div >
);
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  fetchPublishedPosts: PropTypes.func,
};
const mapStateToProps = state => ({
  posts: getAll(state),
});
const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});
const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
export {
  Container as Homepage,
  Component as HomepageComponent,
};