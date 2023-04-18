class PuzzleTile {
    constructor(props) {
        this.state = {
            x: props.x,
            y: props.y,
            width: props.width,
            height: props.height
        }
    }

    render(key, image, dX, dY, dWidth, dHeight) {
        const style = {
            position: "absolute",
            left: dX,
            top: dY,
            width: this.state.width,
            height: this.state.height,
            backgroundImage: "url(" + image + ")",
            backgroundPosition: "-" + this.state.x + "px -" + this.state.y + "px",
            backrgoundSize: dWidth + "px " + dHeight + "px",
            transition: "all 0.5s"
        }

        return (
            <div
                style={style}>
            </div>
        )
    }
}

export default PuzzleTile
