import React from 'react';
import PropTypes from 'prop-types';
import { initialState } from '../../redux/initialState';
import { Link } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CancelIcon from '@material-ui/icons/Cancel';

class SubmitPost extends React.Component {
  state = {
    post: {
      id: initialState.posts.data.length + 1,
      title: '',
      description: '',
      dateOfPublication: '',
      dateOfUpdate: new Date().toISOString().slice(0, 10),
      email: '',
      status: 'draft',
      price: '',
    },
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.node,
    postEdit: PropTypes.object,
    match: PropTypes.object,
    action: PropTypes.func,
    type: PropTypes.string,
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
    e.preventDefault();
    const { action, type } = this.props;
    let error = null;
    if (!error) {
      action(this.state.post);
      alert(`Your post has been ${type}`);
      this.setState({
        post: {
          id: initialState.posts.data.length + 1,
          title: '',
          description: '',
          dateOfPublication: '',
          dateOfUpdate: new Date().toISOString().slice(0, 10),
          email: '',
          status: 'draft',
          price: '',
        },
      });
    }
    else {
      alert(error);
    }
  }
  componentDidMount() {
    const { postEdit } = this.props;
    if (postEdit) {
      this.setState({
        post: {
          id: postEdit.id,
          title: postEdit.title,
          description: postEdit.description,
          dateOfPublication: postEdit.dateOfPublication,
          dateOfUpdate: new Date().toISOString().slice(0, 10),
          email: postEdit.email,
          status: postEdit.status,
          price: postEdit.price,
        },
      });
    }
  }
  render() {
    const { post, value } = this.state;
    const { postEdit } = this.props;
    return (
      <form>
        <label htmlFor='title'> Title:
          <input id='title' type='text' name='title' value={this.state.post.title} onChange={this.handleChange} required />
        </label>
        <label htmlFor='description'>Description:
          <textarea id='description' cols={40} rows={5} name='description' value={this.state.post.description} onChange={this.handleChange} required />
        </label>
        <label htmlFor='price'>Price:
          <input id='price' type='text' name='price' value={post.price} onChange={this.handleChange} />
        </label>
        <label htmlFor='email'> E-mail:
          <input id='email' type='email' name='email' value={post.email} onChange={this.handleChange} required />
        </label>
        <label htmlFor='status'>Status:
          <select id='status' name='status' value={value} onChange={this.handleChange} >
            <option value='draft'>Draft</option>
            <option value='published'>Published</option>
            <option value='closed'>Closed</option>
          </select>
        </label>
        <br />
        <label htmlFor='dateOfPublication'> Date of publication:
          <input type='date' name='dateOfPublication' value={post.dateOfPublication} onChange={this.handleChange} required />
        </label>
        <BottomNavigation>
          <BottomNavigationAction variant='contained' icon={<DoneIcon />} onClick={this.handleSubmit}>{postEdit ? 'Edit' : 'Add'} </BottomNavigationAction>
          <BottomNavigationAction component={Link} to={`${process.env.PUBLIC_URL}/`} variant="contained" icon={<CancelIcon />}></BottomNavigationAction>
        </BottomNavigation>
      </form>
    );
  }
}

export default SubmitPost;