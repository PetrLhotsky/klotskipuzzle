class Tile {
    constructor(props) {
        this.state = {
            x: props.x,
            y: props.y,
            width: props.width,
            height: props.height
        }
    }

    render(context, image, dx, dy, dWidth, dHeight) {
        context.drawImage(image, this.state.x, this.state.y, this.state.width, this.state.height, dx, dy, dWidth, dHeight)
    }
}

export default Tile
