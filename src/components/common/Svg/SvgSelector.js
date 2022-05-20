import React, {Component} from 'react'

class SvgSelector extends Component {
    render() {
        switch (this.props.svgName) {
            case 'critical':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="20" height="20" version="1"
                         style={{strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 40, stroke: '#941100'}}>
                        <g fill="none">
                            <line x1="150.1" y1="271.4" x2="150.1" y2="28.6" className="a"/>
                            <line x1="67.6" y1="111.1" x2="150.1" y2="28.6" className="a"/>
                            <line x1="232.6" y1="111.1" x2="150.1" y2="28.6" className="a"/>
                        </g>
                    </svg>
                )

            case 'high':
                return (

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="20" height="20" version="1"
                         style={{strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 40, stroke: '#ff9300'}}>
                        <g fill="none">
                            <line x1="64.3" y1="235.8" x2="235.9" y2="64.2" className="a"/>
                            <line x1="119.3" y1="64.2" x2="235.9" y2="64.2" className="a"/>
                            <line x1="235.9" y1="180.8" x2="235.9" y2="64.2" className="a"/>
                        </g>
                    </svg>
                )

            case 'normal':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="20" height="20" version="1"
                         style={{strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 40, stroke: '#008f00'}}>
                        <g fill="none">
                            <line x1="28.7" y1="150" x2="271.5" y2="150" className="a"/>
                            <line x1="189" y1="67.5" x2="271.5" y2="150" className="a"/>
                            <line x1="189" y1="232.5" x2="271.5" y2="150" className="a"/>
                        </g>
                    </svg>
                )

            case 'low':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="20" height="20" version="1"
                         style={{strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 40, stroke: '#005493'}}>
                        <g fill="none">
                            <line x1="64.3" y1="64.2" x2="235.9" y2="235.8" className="a"/>
                            <line x1="235.9" y1="119.2" x2="235.9" y2="235.8" className="a"/>
                            <line x1="119.3" y1="235.8" x2="235.9" y2="235.8" className="a"/>
                        </g>
                    </svg>
                )

            case 'unimportant':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="20" height="20" version="1"
                         style={{strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 40, stroke: '#929292'}}>
                        <g fill="none">
                            <line x1="150.1" y1="28.6" x2="150.1" y2="271.4" className="a"/>
                            <line x1="232.6" y1="188.9" x2="150.1" y2="271.4" className="a"/>
                            <line x1="67.6" y1="188.9" x2="150.1" y2="271.4" className="a"/>
                        </g>
                    </svg>
                )

            default :
                return <svg> </svg>
        }
    }
}

export default SvgSelector
