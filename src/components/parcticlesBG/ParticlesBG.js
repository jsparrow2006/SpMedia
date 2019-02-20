import React, { Component } from 'react';
// import './style/index.css';


class ParticlesBG extends Component {

    componentDidMount() {
        let client = new XMLHttpRequest();
        client.open('GET', './src/particles.js');
        client.onreadystatechange = function() {
            // console.log(client.responseText);
            let  obj = eval(client.responseText)
            console.log(obj)
        }
        // client.send();
        // const script = document.createElement("script");
        // script.src = "./src/components/parcticlesBG/src/particles.js";
        // script.async = true;
        // let el = document.getElementById('partBG1')
        // el.appendChild(script)
        // // document.head.appendChild(script);
        // script.onload = () => {
        //     console.log(window)
        //     // window.particlesJS.load('partBG1', './src/config.json', function() {
        //     //     console.log('callback - particles.js config loaded');
        //     //     console.log(this.props.settings)
        //     // });
        // }
        // console.log(window.particlesJS)
    }


    render() {
        return (
            <div id="partBG1">
                {/*<div id="partBG"></div>*/}
                {/*<script src='./src/particles.js'></script>*/}
                {/*<script>*/}

                {/*</script>*/}
            </div>
        );
    }
}


export default ParticlesBG;

