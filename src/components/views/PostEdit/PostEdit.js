import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getPostById, updatePost } from '../../../redux/postsRedux';
import SubmitPost from '../../features/SubmitPost.js';
import styles from './PostEdit.module.scss';
const Component = ({ className, children, match, post, editPost }) => {
  const id = match.params.id;
  return (
    <div className={clsx(className, styles.root)}>
      <h2>Edition: {id} </h2>
      <SubmitPost postEdit={post} action={editPost} type='edited' />
    </div>
  );
};
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  match: PropTypes.object,
  post: PropTypes.object,
  editPost: PropTypes.object,
};
const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
});
const mapDispatchToProps = dispatch => ({
  editPost: (id, data) => dispatch(updatePost(id, data)),
});
const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
export {
  Container as PostEdit,
  Component as PostEditComponent,
};