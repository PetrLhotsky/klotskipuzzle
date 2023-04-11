import React from 'react';
import Tile from './Tile';

class Canvas extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            width: props.width,
            height: props.height,
            color: props.color
        }

        this.image = new Image()
        this.image.src = props.image

        this.grid = parseInt(props.grid)
        this.tiles = []
        this.order = []
        this.missing = Math.floor(Math.random() * Math.pow(props.grid, 2))

        this.canvasRef = React.createRef()
        this.generateTiles = this.generateTiles.bind(this)
        this.generateOrder = this.generateOrder.bind(this)
        this.redraw = this.redraw.bind(this)
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
        this.generateTiles()
        this.generateOrder()

        this.canvasRef.current.focus()

        this.redraw()
    }

    generateTiles() {
        let partWidth = this.image.width / this.grid,
            partHeight = this.image.height / this.grid

        for (let y = 0; y < this.grid; y++)
            for (let x = 0; x < this.grid; x++)
                this.tiles.push(new Tile({
                    x: x * partWidth,
                    y: y * partHeight,
                    width: partWidth,
                    height: partHeight
                }))
    }

    generateOrder() {
        let numbers = Array.from({length: Math.pow(this.grid, 2)}, (_, i) => i)
        this.randomizeOrder(numbers)
        this.order.push(...numbers)
    }

    randomizeOrder(numbers) {
        var temp = numbers.length, index

        while (temp-- > 1) {
            do index = Math.floor(Math.random() * (temp + 1))
            while (numbers[index] === numbers[temp])
            
            [numbers[temp], numbers[index]] = [numbers[index], numbers[temp]]
        }
    }

    redraw() {
        this.context = this.canvasRef.current.getContext("2d")

        let squareGrid = Math.pow(this.grid, 2),
            partWidth = this.state.width / this.grid,
            partHeight = this.state.height / this.grid

        this.context.clearRect(0, 0, this.state.width, this.state.height)

        for (let i = 0; i < squareGrid; i++)
            if (this.order[i] !== this.missing)
                this.tiles[this.order[i]].render(this.context, this.image, partWidth * (i % 3), partHeight * Math.floor(i / 3), partWidth, partHeight)
    }

    click() {
        
    }

    keyDown(e) {
        let index = parseInt(this.order.indexOf(this.missing))

        switch (e.which) {
            case 37:
            case 65:
                if (index % this.grid !== this.grid - 1) {
                    [this.order[index + 1], this.order[index]] = [this.order[index], this.order[index + 1]]
                }
                break
            
            case 38:
            case 87:
                if (Math.floor(index / 3) !== this.grid - 1) {
                    [this.order[index + this.grid], this.order[index]] = [this.order[index], this.order[index + this.grid]]
                }
                break
            
            case 39:
            case 68:
                if (index % this.grid !== 0) {
                    [this.order[index - 1], this.order[index]] = [this.order[index], this.order[index - 1]]
                }
                break
            
            case 40:
            case 83:
                if (Math.floor(index / 3) !== 0) {
                    [this.order[index - this.grid], this.order[index]] = [this.order[index], this.order[index - this.grid]]
                }
                break
            
            default:
                break
        }

        this.redraw()
    }
}

export default Canvas
