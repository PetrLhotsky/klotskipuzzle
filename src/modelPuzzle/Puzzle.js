import React from 'react';
import PuzzleTile from './PuzzleTile';

class Puzzle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            width: props.width,
            height: props.height,
            color: props.color,
            order: []
        }

        this.image = new Image()
        this.image.src = props.image

        this.grid = parseInt(props.grid)
        this.tiles = []
        this.missing = Math.floor(Math.random() * Math.pow(props.grid, 2))

        this.puzzleRef = React.createRef()
        this.generateTiles = this.generateTiles.bind(this)
        this.generateOrder = this.generateOrder.bind(this)
        this.click = this.click.bind(this)
        this.keyDown = this.keyDown.bind(this)

        this.generateTiles()
        this.generateOrder()
    }

    render() {
        const style = {
            width: this.state.width + "px",
            height: this.state.height + "px",
            backgroundColor: this.state.color
        }

        console.log(this.tiles)
        console.log(this.missing)

        let partWidth = this.state.width / this.grid,
            partHeight = this.state.height / this.grid,
            parts = this.tiles.map((_, i) => this.tiles[this.state.order[i]].render(i, this.state.order[i] !== this.missing ? this.image.src : "", partWidth * (i % 3), partHeight * Math.floor(i / 3), partWidth, partHeight))

        return(
            <div
                id="puzzle"
                ref={this.puzzleRef}
                style={style}
                onClick={this.click}
                onKeyDown={(e) => {this.keyDown(e)}}
                tabIndex={0}>
                    {parts}
            </div>
        )
    }

    componentDidMount() {
        this.puzzleRef.current.focus()
    }

    generateTiles() {
        let partWidth = this.image.width / this.grid,
            partHeight = this.image.height / this.grid

        for (let y = 0; y < this.grid; y++)
            for (let x = 0; x < this.grid; x++)
                this.tiles.push(new PuzzleTile({
                    x: x * partWidth,
                    y: y * partHeight,
                    width: partWidth,
                    height: partHeight
                }))
    }

    generateOrder() {
        let numbers = Array.from({length: Math.pow(this.grid, 2)}, (_, i) => i)
        //this.randomizeOrder(numbers)
        this.state.order.push(...numbers)
    }

    randomizeOrder(numbers) {
        var temp = numbers.length, index

        while (temp-- > 1) {
            do index = Math.floor(Math.random() * (temp + 1))
            while (numbers[index] === numbers[temp])
            
            [numbers[temp], numbers[index]] = [numbers[index], numbers[temp]]
        }
    }

    click() {
        
    }

    keyDown(e) {
        let index = parseInt(this.state.order.indexOf(this.missing)),
            order = this.state.order

        switch (e.which) {
            case 37:
            case 65:
                if (index % this.grid !== this.grid - 1) {
                    [order[index + 1], order[index]] = [order[index], order[index + 1]]
                }
                break
            
            case 38:
            case 87:
                if (Math.floor(index / 3) !== this.grid - 1) {
                    [order[index + this.grid], order[index]] = [order[index], order[index + this.grid]]
                }
                break
            
            case 39:
            case 68:
                if (index % this.grid !== 0) {
                    [order[index - 1], order[index]] = [order[index], order[index - 1]]
                }
                break
            
            case 40:
            case 83:
                if (Math.floor(index / 3) !== 0) {
                    [order[index - this.grid], order[index]] = [order[index], order[index - this.grid]]
                }
                break
            
            default:
                break
        }

        this.setState({order: order})
    }
}

export default Puzzle
