import React from 'react';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            height: props.height,
            backgroundColor: props.backgroundColor
        }
    }

    render() {
        const style = { backgroundColor: this.state.backgroundColor }
        return (
            <canvas width={this.state.width} height={this.state.height} style={style}></canvas>
        );
    }
}

export default Canvas;
