import React, { Component } from 'react';
import 'particles.js'
// import './style/index.css';


class ParticlesBG extends Component {

    componentDidMount() {
        window.particlesJS('partBG1', this.props.settings);
    }


    render() {
        return (
            <div id="partBG1"></div>
        );
    }
}


export default ParticlesBG;

