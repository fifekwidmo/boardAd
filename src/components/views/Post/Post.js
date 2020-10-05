import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById, loadPostById  } from '../../../redux/postsRedux';
import { Link } from 'react-router-dom';
import styles from './Post.module.scss';
import EditIcon from '@material-ui/icons/Edit';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CancelIcon from '@material-ui/icons/Cancel';

class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    match: PropTypes.object,
    post: PropTypes.object,
    getPost: PropTypes.func,
  };
	
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { match, post } = this.props;
    const id = match.params.id;
    return (
      <div className={styles.center}>
        <BottomNavigation>
          <BottomNavigationAction icon={<EditIcon />} component={Link} to={`${process.env.PUBLIC_URL}/post/${id}/edit`}> </BottomNavigationAction>
          <BottomNavigationAction component={Link} to={`${process.env.PUBLIC_URL}/`} variant="contained" icon={<CancelIcon />}></BottomNavigationAction>
        </BottomNavigation>
        <h1>{post.title}</h1>
        <h3>Desc: {post.description}</h3>
        <h3>Date of published: {post.dateOfPublication}</h3>
        <h3>Date of update: {post.dateOfUpdate}</h3>
        <h3>Email: {post.email}</h3>
        <h3>Status: {post.status}</h3>
        <h3>Price: {post.price}</h3>
      </div>);
  }
}
const mapStateToProps = (state, props) => ({
  post: getPostById(state),
});

//to delete props

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(loadPostById(id)),
});
const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
export {
  Container as Post,
  Component as PostComponent,
};