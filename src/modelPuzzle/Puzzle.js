import React from 'react';
import ReactDOM from 'react-dom';
import PuzzleTile from './PuzzleTile';

class Puzzle extends React.Component {
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

        this.puzzleRef = React.createRef()
        this.generateTiles = this.generateTiles.bind(this)
        this.generateOrder = this.generateOrder.bind(this)
        this.move = this.move.bind(this)
        this.click = this.click.bind(this)
        this.keyDown = this.keyDown.bind(this)
    }

    render() {
        const style = {
            width: this.state.width + "px",
            height: this.state.height + "px",
            backgroundColor: this.state.color
        }

        return(
            <div
                id="puzzle"
                ref={this.puzzleRef}
                style={style}
                onClick={this.click}
                onKeyDown={(e) => {this.keyDown(e)}}
                tabIndex={0}>
            </div>
        )
    }

    componentDidMount() {
        this.generateTiles()
        this.generateOrder()

        this.puzzleRef.current.focus()

        let partWidth = this.state.width / this.grid,
            partHeight = this.state.height / this.grid,
            parts = this.tiles.map((_, i) => this.tiles[this.order[i]].render(this.order[i], this.order[i] !== this.missing ? this.image.src : "", partWidth * (i % 3), partHeight * Math.floor(i / 3), partWidth, partHeight))
        
        ReactDOM.render(parts, document.querySelector("#puzzle"))
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

    move(toMove1, toMove2) {
        toMove1 += toMove2;

        [this.order[toMove1], this.order[toMove2]] = [this.order[toMove2], this.order[toMove1]]

        let nodes = document.querySelector("#puzzle").childNodes,
            node1 = Object.assign({}, nodes[this.order[toMove1]].style),
            node2 = Object.assign({}, nodes[this.order[toMove2]].style)

        document.querySelector("#puzzle").childNodes[this.order[toMove1]].style.left = node2.left
        document.querySelector("#puzzle").childNodes[this.order[toMove2]].style.left = node1.left

        document.querySelector("#puzzle").childNodes[this.order[toMove1]].style.top = node2.top
        document.querySelector("#puzzle").childNodes[this.order[toMove2]].style.top = node1.top
    }

    click() {
        
    }

    keyDown(e) {
        let index = parseInt(this.order.indexOf(this.missing))

        switch (e.which) {
            case 37:
            case 65:
                if (index % this.grid !== this.grid - 1) this.move(1, index)
                break
            
            case 38:
            case 87:
                if (Math.floor(index / 3) !== this.grid - 1) this.move(this.grid, index)
                break
            
            case 39:
            case 68:
                if (index % this.grid !== 0) this.move(-1, index)
                break
            
            case 40:
            case 83:
                if (Math.floor(index / 3) !== 0) this.move(-this.grid, index)
                break
            
            default:
                break
        }
    }
}

export default Puzzle