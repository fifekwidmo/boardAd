import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { initialState } from '../../../redux/initialState';
import clsx from 'clsx';
import { getAll, createActionAddPost } from '../../../redux/postsRedux';
import styles from './PostAdd.module.scss';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';
class Component extends React.Component {
  state = {
    post: {
      title: '',
      description: '',
      dateOfPublication: '',
      dateOfUpdate: '',
      email: '',
      status: 'draft',
      price: '',
    },
    error: null,
  }
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    addPost: PropTypes.func,
  };
  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      post: {
        ...this.state.post,
        [name]: value,
      },
    });
  }
  handleSubmit = (e) => {
    const { post } = this.state;
    const { addPost } = this.props;
    e.preventDefault();
    addPost(post);
  }
  render() {
    return (
      <div className={clsx(styles.container, styles.root,)}>
        {initialState.role === 'user' || initialState.role === 'admin' ?
          <div>
            <div className={styles.flex}> 
              <h2 className={styles.titlemargin}>Add Post</h2>
              <BottomNavigationAction  component={Link} to={`${process.env.PUBLIC_URL}/`} variant="contained" icon={<CancelIcon />}></BottomNavigationAction></div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor='title'> Title:
                <input id='title' type='text' name='title' value={this.state.post.title} onChange={this.handleChange} />
              </label>
              <label htmlFor='description'>Descripton:
                <textarea id='description' cols={40} rows={5} name='description' value={this.state.post.description} onChange={this.handleChange} />
              </label>
              <label htmlFor='price'>Price:
                <input id='price' type='text' name='price' value={this.state.post.price} onChange={this.handleChange} />
              </label>
              <label htmlFor='email'> E-mail:
                <input id='email' type='email' name='email' value={this.state.post.email} onChange={this.handleChange} />
              </label>
              <label htmlFor='status'>Status:
                <select id='status' name='status' value={this.state.value} onChange={this.handleChange} >
                  <option value='draft'>Draft</option>
                  <option value='published'>Published</option>
                  <option value='closed'>Closed</option>
                </select>
              </label>
              <label htmlFor='dateOfPublication'> Data publikacji:
                <input type='date' name='dateOfPublication' value={this.state.post.dateOfPublication} onChange={this.handleChange} />
              </label>
              <div className={styles.center}>
                <button>Add</button>
              </div>
            </form>
          </div>
          :
          null
        }
      </div>
    );
  }
}
Component.propTypes = {
  addPost: PropTypes.func,
};
const mapStateToProps = state => ({
  posts: getAll(state),
});
const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(createActionAddPost(data)),
});
const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};