import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CancelIcon from '@material-ui/icons/Cancel';

class SubmitPost extends React.Component {
  state = {
    post: {
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
    history:PropTypes.shape({push:PropTypes.func}),
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
    const { post } = this.state;
    let error = null;
    if (post.title.length < 10) error = `Title should has min 10 signs`;
    else if (post.description.length < 20) error = `Description should has min 20 signs`;
    else if (!post.dateOfPublication) error = 'Please insert correct date ';
    else if (!post.email) error = 'Please insert correct email ';

    if (!error) {
      const formularData = {};
      for (let key of ['title', 'description', 'dateOfPublication', 'dateOfUpdate', 'email', 'status', 'price']) {
        formularData[key] = post[key];
      }
      if (type === 'edited') {
        action(this.props.postEdit._id, formularData);
      } else 
        action(formularData);
      this.setState({
        post: {
          title: '',
          description: '',
          dateOfPublication: '',
          dateOfUpdate: new Date().toISOString().slice(0, 10),
          email: '',
          status: '',
          price: '',
        },
      });
      this.props.history.push('/');
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
          dateOfPublication: (postEdit.dateOfPublication === undefined) ? postEdit.dateOfPublication : postEdit.dateOfPublication.slice(0, 10),
          dateOfUpdate: new Date().toISOString().slice(0, 10),
          email: postEdit.email,
          status: postEdit.status,
          price: postEdit.price,
        },
      });
    }
  }

  render() {
    const { post } = this.state;
    const { postEdit } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='title'> Title:
          <input id='title' type='text' name='title' value={post.title} onChange={this.handleChange} required />
        </label>
        <label htmlFor='description'>Description:
          <textarea id='description' cols={40} rows={5} name='description' value={post.description} onChange={this.handleChange} required />
        </label>
        <label htmlFor='price'>Price:
          <input id='price' type='text' name='price' value={post.price} onChange={this.handleChange} />
        </label>
        <label htmlFor='email'> E-mail:
          <input id='email' type='email' name='email' value={post.email} onChange={this.handleChange} required />
        </label>
        <label htmlFor='status'>Status:
          <select id='status' name='status' value={post.status} onChange={this.handleChange} >
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
          <BottomNavigationAction variant='contained' icon={<DoneIcon />} component={Link} to="/" onClick={this.handleSubmit}>{postEdit ? 'Edit' : 'Add'} </BottomNavigationAction>
          <BottomNavigationAction component={Link} to="/" variant="contained" icon={<CancelIcon />}></BottomNavigationAction>
        </BottomNavigation>
      </form>
    );
  }
}
export default withRouter(SubmitPost);
