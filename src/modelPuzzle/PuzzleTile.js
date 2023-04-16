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
            width: dWidth,
            height: dHeight,
            backgroundImage: "url(" + image + ")",
            backgroundPosition: "-" + this.state.x + "px -" + this.state.y + "px",
            backrgounSize: dWidth + "px " + dHeight + "px",
            transition: "all 0.5s"
        }

        return (
            <div
                key={key}
                style={style}>
            </div>
        )
    }
}

export default PuzzleTile
