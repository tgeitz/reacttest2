import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from '@material-ui/core';

import { logoutUser } from '../../actions';

const styles = theme => ({

});

class LogoutButton extends Component {
    handleClick() {
        return logoutUser();
    }
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Button
                    onClick={this.handleClick()}
                    type="submit"
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