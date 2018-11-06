import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { logoutUser } from '../../actions';

const styles = theme => ({

});

class LogoutButton extends Component {
    handleClick() {
        return this.props.logoutUser();
    }
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Button
                    onClick={this.handleClick.bind(this)}
                    color="primary"
                >
                    Logout
                </Button>
            </React.Fragment>
        )
    }
}

export default compose(
    withStyles(styles, { name: 'Logout' }),
    connect(null, { logoutUser })
)(LogoutButton);