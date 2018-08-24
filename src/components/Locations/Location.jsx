import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

/**
 * Class renders single location button
 * 
 * @author Grzegorz Perlak
 */
class Location extends PureComponent {
    render() {
        return (
            <ListItem
                button={true}
                onKeyPress={this.props.openInfoWindow.bind(this, this.props.location)}
                onClick={this.props.openInfoWindow.bind(this, this.props.location)}
            >
                <Typography variant={'button'}>
                    {this.props.location.longname}
                </Typography>
            </ListItem>
        )
    }
}

export default Location;

Location.propTypes = {
    openInfoWindow: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
}
