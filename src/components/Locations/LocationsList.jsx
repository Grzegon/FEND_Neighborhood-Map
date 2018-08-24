import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Location from '../Locations/Location';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';

/**
 * Class renders list of locations
 * 
 * @author Grzegorz Perlak
 */
class LocationsList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            locations: [],
            query: '',
            suggestions: true,
        };
        this.filterLocations = this.filterLocations.bind(this);
        this.toggleSuggestions = this.toggleSuggestions.bind(this);
    }

    /**
     * Filter Locations based on user query
     */
    filterLocations(event) {
        const { value } = event.target;
        const locations = [];

        this.props.closeInfoWindow();
        this.props.locations.forEach(location => {
            if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                location.marker.setVisible(true);
                locations.push(location);
            } else {
                location.marker.setVisible(false);
            }
        });
        this.setState({
            locations: locations,
            query: value
        });
    }

    componentWillMount() {
        this.setState({
            locations: this.props.locations
        });
    }

    /**
     * Show and hide suggestions
     */
    toggleSuggestions() {
        this.setState({
            suggestions: !this.state.suggestions
        });
    }

    render() {
        const locationlist = this.state.locations.map((location, index) => {
            return (
                <Location key={index} openInfoWindow={this.props.openInfoWindow.bind(this)} location={location} />
            );
        }, this);

        return (
            <div className="search">
                <TextField id="search-field" type="text" placeholder="Filter" onChange={this.filterLocations} value={this.state.query} />
                <List>
                    {this.state.suggestions && locationlist}
                </List>
            </div>
        );

    }
}

export default LocationsList;

LocationsList.propTyes = {
    openInfoWindow: PropTypes.func.isRequired,
    closeInfoWindow: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired
}
