import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../actions/index';
import LogoutButton from '../auth/LogoutButton';

class Index extends Component {
    componentDidMount() {
        this.props.fetchPosts();
        console.log('post index');
    }

    renderPosts() {
        return _.map(this.props.posts.data, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    {post.title}
                </li>
            )
        })
    }
    
    render() {
        console.log(this.props.auth);
        console.log('state above')
        return (
            <div>
                <div className="text-xs-right">
                    <LogoutButton />
                    <Link to="/posts/create" className="btn btn-primary">
                        Create Posts
                    </Link>
                    <Link to="/register" className="btn btn-primary">
                        Register
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts, auth: state.auth }
}

export default connect(mapStateToProps, { fetchPosts })(Index);