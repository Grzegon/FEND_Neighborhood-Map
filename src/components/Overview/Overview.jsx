import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LocationsList from '../Locations/LocationsList';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
        width: `calc(100% - 240px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarShiftLeft: {
        marginLeft: '240px',
    },
    barColor: {
        backgroundColor: '#212121'
    },
    drawerPaper: {
        position: 'relative',
        width: '240px',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentLeft: {
        marginLeft: -240,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    contentShiftLeft: {
        marginLeft: 0,
    },
    appFrame: {
        height: window.innerHeight + "px",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
});
const script = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBTCg1WK-2cjQPy0M3xCpJXoClOXX9IXx8&libraries=places&callback=initMap';

/**
 * Load Google API in script tag and append to document 
 * 
 * @param {*} src 
 */
function loadScript(src) {
    // With help from https://stackoverflow.com/questions/49530089/using-google-map-api-inside-a-react-component
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', function () {
            resolve();
        });
        script.addEventListener('error', function (e) {
            reject(e);
        });
        document.body.appendChild(script);
    });
}

/**
 * @author Grzegorz Perlak
 */
class Overview extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            markers: [
                {
                    'name': "Uniwersytet Wrocławski",
                    'type': "University",
                    'latitude': 51.1085846,
                    'longitude': 17.0278644,
                    'streetAddress': "plac Uniwersytecki 1, 50-137 Wrocław, Polska",
                    'placeID': "ChIJi7BXA9_pD0cRQzVsROEKOmk"
                },
                {
                    'name': "Hala Targowa",
                    'type': "Shopping Mall",
                    'latitude': 51.112559,
                    'longitude': 17.03981,
                    'streetAddress': "Piaskowa 17, 50-359 Wrocław, Polska",
                    'placeID': "ChIJF4XX9tjpD0cRDzM_nahxFQU"
                },
                {
                    'name': "Panorama Racławicka",
                    'type': "Museum",
                    'latitude': 51.1101287,
                    'longitude': 17.0443431,
                    'streetAddress': "Jana Ewangelisty Purkyniego 11, 50-155 Wrocław, Polska",
                    'placeID': "ChIJt3QO4tfpD0cRGn3pBQc7SDc"
                },
                {
                    'name': "Galeria Dominikańska",
                    'type': "Shopping Mall",
                    'latitude': 51.108452,
                    'longitude': 17.0403578,
                    'streetAddress': "plac Dominikański 3, 50-159 Wrocław, Polska",
                    'placeID': "ChIJCZ_-hHfCD0cRl4Z7EkuomM0"
                },
                {
                    'name': "Ratusz",
                    'type': "Museum",
                    'latitude': 51.11086109999999,
                    'longitude': 17.0315217,
                    'streetAddress': "Ratusz, 11-400 Wrocław, Polska",
                    'placeID': "ChIJr4mPpHXCD0cR2l_6MFnVGac"
                },
                {
                    'name': "Muzeum Archeologiczne Oddział Muzeum Miejskiego Wrocławia",
                    'type': "Museum",
                    'latitude': 51.11285689999999,
                    'longitude': 17.0264284,
                    'streetAddress': "Antoniego Cieszyńskiego 9, 50-001 Wrocław, Polska",
                    'placeID': "ChIJqfdKJ-DpD0cRx9wikRK_PHI"
                },
                {
                    'name': "Ogród Botaniczny Uniwersytetu Wrocławskiego",
                    'type': "Park",
                    'latitude': 51.1158737,
                    'longitude': 17.0475612,
                    'streetAddress': "Sienkiewicza 23, 50-335 Wrocław, Polska",
                    'placeID': "ChIJA-TdBt_pD0cRmMlI7p6Kmtw"
                },
                {
                    'name': "Opera Wrocławska",
                    'type': "Music Center",
                    'latitude': 51.10561109999999,
                    'longitude': 17.0305658,
                    'streetAddress': "Świdnicka 35, 50-066 Wrocław, Polska",
                    'placeID': "ChIJASfR7nPCD0cRMi2uKhtmevg"
                },
                {
                    'name': "Narodowe Forum Muzyki",
                    'type': "Music Center",
                    'latitude': 51.1070628,
                    'longitude': 17.0263299,
                    'streetAddress': "plac Wolności 1, 50-071 Wrocław, Polska",
                    'placeID': "ChIJZ1PHZHPCD0cR6_pEv0czOxw"
                },
                {
                    'name': "Kino Nowe Horyzonty",
                    'type': "Movie Theater",
                    'latitude': 51.1094618,
                    'longitude': 17.0261334,
                    'streetAddress': "Kazimierza Wielkiego 19a-21, 50-077 Wrocław, Polska",
                    'placeID': "ChIJKRsHMgvCD0cR9lKtBj8BzWs"
                }
            ],
            map: null,
            infowindow: null,
            prevmarker: null,
            open: true,
            anchor: 'left',
        };

        // retain object instance when used in the function
        this.initMap = this.initMap.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }

    componentDidMount() {
        window.initMap = this.initMap;
        // Load the script into html
        loadScript(script);
    }

    /**
     * Initialize the map once the google map script is loaded
     */
    initMap() {
        const self = this;
        const markers = [];
        const mapContainer = document.getElementById('map');
        const map = new window.google.maps.Map(mapContainer, {
            center: { lat: 51.1099731, lng: 17.0350754 },
            zoom: 15,
            mapTypeControl: false
        });
        const InfoWindow = new window.google.maps.InfoWindow({});

        mapContainer.style.height = '100%';

        window.google.maps.event.addListener(InfoWindow, 'closeclick', () => {
            self.closeInfoWindow();
        });

        this.setState({
            map: map,
            infowindow: InfoWindow
        });

        window.google.maps.event.addDomListener(window, "resize", () => {
            const center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            self.state.map.setCenter(center);
        });

        window.google.maps.event.addListener(map, 'click', () => {
            self.closeInfoWindow();
        });

        this.state.markers.forEach(location => {
            const longname = location.name + ' - ' + location.type;
            const marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                animation: window.google.maps.Animation.DROP,
                map: map,
                title: longname,
            });

            location.longname = longname;
            location.marker = marker;
            location.display = true;
            markers.push(location);

            location.marker.addListener('click', () => {
                self.openInfoWindow(location);
            });
        });

        this.setState({
            markers: markers
        });
    }

    /**
     * Open the infowindow for the marker
     * 
     * @param {object} location marker
     */
    openInfoWindow(location) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, location.marker);
        location.marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            prevmarker: location.marker
        });
        this.state.infowindow.setContent('Loading Data...');
        this.state.map.setCenter(location.marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(location);
    }

    /**
     * Retrive the location data from google API
     * 
     * @param {object} location marker
     */
    getMarkerInfo(location) {
        const self = this;
        const service = new window.google.maps.places.PlacesService(self.state.map);

        service.getDetails({
            placeId: location.placeID
        }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const name = '<b>Name: </b>' + place.name + '<br>';
                const address = '<b>Address: </b>' + place.formatted_address + '<br>';

                self.state.infowindow.setContent(name + address);
            } else {
                self.state.infowindow.setContent('<b>Could not load data!</b>');
            }
        });
    }

    /**
     * Close the infowindow for the marker
     * @param {object} location marker
     */
    closeInfoWindow() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }

        this.setState({
            prevmarker: null
        });
        this.state.infowindow.close();
    }

    /**
     * Open drawer
     */
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    /**
     * Close drawer
     */
    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { anchor, open } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        color="primary"
                        classes={{ colorPrimary: classes.barColor }}
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                            [classes.appBarShiftLeft]: open,
                        })}>
                        <Toolbar disableGutters={!open}>
                            <Tooltip title={open ? "Hide Suggestions" : "Show Suggestions"} leaveTouchDelay={0}>
                                <IconButton
                                    className={classes.menuButton}
                                    color="inherit" aria-label={open ? "Hide Suggestions" : "Show Suggestions"}
                                    onClick={open ? this.handleDrawerClose : this.handleDrawerOpen}>
                                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            </Tooltip>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Neighborhood Map
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="persistent"
                        anchor={anchor}
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <LocationsList closeInfoWindow={this.closeInfoWindow} locations={this.state.markers} openInfoWindow={this.openInfoWindow} />
                    </Drawer>
                    <main className={classNames(classes.content, classes.contentLeft, {
                        [classes.contentShift]: open,
                        [classes.contentShiftLeft]: open,
                    })}>
                        <div className={classes.drawerHeader} />
                        <div id="map"></div>
                    </main>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Overview);
