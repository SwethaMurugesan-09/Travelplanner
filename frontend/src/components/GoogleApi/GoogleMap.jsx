import { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
 
class MapContainer extends Component{
    render()
    {
        return(
            <Map
            google={this.props.google}
            style={{width:"100%", height:"100%"}}
            zoom={10}
            initialCenter={{
                lat:28.704060,
                lng:77.102493
            }}/>
        )
    }
}
export default GoogleApiWrapper({
    apiKey:"AIzaSyAF3aQxKUDTMlOXVv0eWp_aBIQFMMHsEzI"
})(MapContainer)