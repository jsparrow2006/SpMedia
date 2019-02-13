import React, { Component } from 'react';
import ReactFlowPlayer from 'react-flow-player';
import M3U8FileParser from 'm3u8-file-parser'
import './style.css'
import Collapsible from 'react-collapsible';


const electron = window.require('electron');
const fs = electron.remote.require('fs');
var context = require.context('./icons', false, /\.png$/);
var files = {};

context.keys().forEach((filename) => {
    files[filename] = context(filename);
});

class IpTv extends Component {

    constructor(state, props) {
        super();
        this.state = {
            chenals: [],
            groupChanel: {},
            selectedChenal: {
                inf: {title: ''},
                url: ''
            },
            openCh: false
        }
    }

    componentDidMount() {
        const content = fs.readFileSync('./src/edem_pl.m3u8', {encoding: 'utf-8'});
        const reader = new M3U8FileParser();
        reader.read(content);
        let chenalsRes = reader.getResult();
        let groupCanels = {}
        // console.log(chenalsRes.segments)
        this.setState({chenals: chenalsRes.segments})
        chenalsRes.segments.map((ch, i) => {
            !groupCanels[ch.grp] ? groupCanels[ch.grp] = [] : groupCanels[ch.grp].push(ch)
        })
        this.setState({groupChanel: groupCanels})
        console.log(groupCanels)
        console.log(Object.keys(groupCanels))

    }

    shouldComponentUpdate(nextProps, nextState) {
        // if (this.props !== nextProps){
        return true
        // }
    }

    selectCH = (item) => {
        this.setState({selectedChenal: item})
        this.player.load({
            sources: [
                {type: 'application/x-mpegurl', src: item.url}
            ]
        })
    }

    togleChList =() => {
        this.setState({openCh: !this.state.openCh})
    }

    render() {
        return (
            <div className='mainContainer'>
                <div className={this.state.openCh ? 'chanelWraperOpen' : 'chanelWraperClose'}>
                    <div className='listChanel'>
                        {Object.keys(this.state.groupChanel).map((gr, i) => {
                            return (
                                <Collapsible trigger={gr} open={true}>
                                    {this.state.groupChanel[gr].map((item, i) => {
                                        var linkToIcon = './' + item.inf.title + '.png'
                                        return <div key={i} className='itemChenel'
                                                    onClick={() => this.selectCH(item)}>
                                            <img src={files[linkToIcon] ? files[linkToIcon] : files['./none.png']} alt=''
                                                 className='iconChanel'/>
                                            {i + 1}. {item.inf.title}
                                        </div>
                                    })}
                                </Collapsible>
                            )
                        })}
                    </div>
                    <div className='toggleChanel' onClick={this.togleChList}></div>
                </div>
                <ReactFlowPlayer
                    playerInitScript="http://releases.flowplayer.org/7.2.1/flowplayer.min.js"
                    playerId="reactFlowPlayer"
                    title={this.state.selectedChenal.inf.title}
                    // autoplay={true}
                    live={true}
                    getPlayerApi={(player => this.player = player)}
                    sources={[
                        {
                            type: 'application/x-mpegurl',
                            // src: "http://a74a1c03.krasnafhg.ru/iptv/KB2Z5ASZCME46R/838/index.m3u8"
                            src: this.state.selectedChenal.url ? this.state.selectedChenal.url : 'http://a74a1c03.krasnafhg.ru/iptv/KB2Z5ASZCME46R/136/index.m3u8'
                        }
                    ]}
                />
            </div>
        );
    }
}

export default IpTv;