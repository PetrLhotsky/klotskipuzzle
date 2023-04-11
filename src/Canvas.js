import React from 'react';
import Tile from './Tile';

class Canvas extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            width: props.width,
            height: props.height,
            color: props.color,
            image: props.image,
            grid: props.grid,
            tiles: [],
            order: [],
            missing: Math.floor(Math.random() * Math.pow(props.grid, 2))
        }

        this.canvasRef = React.createRef()
        this.generateTiles = this.generateTiles.bind(this)
        this.generateOrder = this.generateOrder.bind(this)
        this.click = this.click.bind(this)
        this.keyDown = this.keyDown.bind(this)
    }

    render() {
        const style = { backgroundColor: this.state.color }

        return (
            <canvas
                ref={this.canvasRef}
                width={this.state.width}
                height={this.state.height}
                style={style}
                onClick={this.click}
                onKeyDown={(e) => {this.keyDown(e)}}
                tabIndex={0}>
            </canvas>
        )
    }

    componentDidMount() {
        this.context = this.canvasRef.current.getContext("2d")

        this.generateTiles()
        this.generateOrder()

        this.canvasRef.current.focus()

        let squareGrid = Math.pow(this.state.grid, 2),
            partWidth = this.state.width / this.state.grid,
            partHeight = this.state.height / this.state.grid

        for (let i = 0; i < squareGrid; i++)
            if (this.state.order[i] !== this.state.missing)
                this.state.tiles[this.state.order[i]].render(this.context, this.background, partWidth * (i % 3), partHeight * Math.floor(i / 3), partWidth, partHeight)
    }

    componentDidUpdate() {
        
    }

    generateTiles() {
        this.background = new Image()
        this.background.src = this.state.image

        let partWidth = this.background.width / this.state.grid,
            partHeight = this.background.height / this.state.grid

        for (let y = 0; y < this.state.grid; y++)
            for (let x = 0; x < this.state.grid; x++)
                this.state.tiles.push(new Tile({
                    x: x * partWidth,
                    y: y * partHeight,
                    width: partWidth,
                    height: partHeight
                }))
    }

    generateOrder() {
        let numbers = Array.from({length: Math.pow(this.state.grid, 2)}, (_, i) => i)

        var temp = numbers.length, index
        while (temp-- > 1) {
            do index = Math.floor(Math.random() * (temp + 1))
            while (numbers[index] === numbers[temp])
            
            numbers[temp] += numbers[index]
            numbers[index] = Math.abs(numbers[temp] - numbers[index])
            numbers[temp] -= numbers[index]
        }

        this.state.order.push(...numbers)
    }

    click() {
        console.log("click")
    }

    keyDown(e) {
        switch (e.which) {
            case 37:
            case 65:
                console.log("Left")
                break
            
            case 38:
            case 87:
                console.log("Up")
                break
            
            case 39:
            case 68:
                console.log("Right")
                break
            
            case 40:
            case 83:
                console.log("Down")
                break
            
            default:
                break
        }
    }
}

export default Canvas
