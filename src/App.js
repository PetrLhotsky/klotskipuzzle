import './App.css';
import React, { useRef } from 'react';
//import Canvas from './modelCanvas/Canvas';
import Puzzle from './modelPuzzle/Puzzle';

const URL = "https://teachablemachine.withgoogle.com/models/j1Ti1eTk2/",
      modelFile = "model.json",
      metadataFile = "metadata.json",
      buttonName = "initButton",
      startText = "Start",
      webcamName = "webcamContainer",
      webcamWidth = 343,
      webcamHeight = 343,
      labelName = "labelContainer",
      loadingText = "Načítání...",
      probabilityThreshold = 0.6,
      counterThreshold = 10,
      width = 501,
      height = 501,
      color = "#0d6efd",
      image = "/falls.jpg",
      grid = 3

let puzzleRef, model, totalCases, webcam, labelContainer, lastIndex, counter

function App() {
  puzzleRef = useRef()

  return (
    <>
    <div class="flexbox-container">
      <Puzzle
        width={width}
        height={height}
        color={color}
        image={image}
        grid={grid}
        ref={puzzleRef}>
      </Puzzle>

      <div class="controls">
        <button type="button" id={buttonName} class="btn btn-outline-primary" onClick={init}>{startText}</button>
        <div id={webcamName}></div>
        <div id={labelName}></div>
      </div>
    </div>
    </>
  )
}

async function init() {
  document.getElementById(buttonName).remove()
  labelContainer = document.getElementById(labelName)

  labelContainer.innerText = loadingText

  model = await window.tmImage.load(URL + modelFile, URL + metadataFile)
  totalCases = model.getTotalClasses()

  webcam = new window.tmImage.Webcam(webcamWidth, webcamHeight, true)
  await webcam.setup()
  await webcam.play()
  document.getElementById(webcamName).appendChild(webcam.canvas)

  labelContainer.innerText = ""
  for (let i = 0; i < totalCases; i++) {
      labelContainer.appendChild(document.createElement("p"))
  }

  lastIndex = -1
  counter = 0
  window.requestAnimationFrame(loop)
}

async function loop() {
  webcam.update()
  await predict()
  window.requestAnimationFrame(loop)
}

async function predict() {
  const predictions = await model.predict(webcam.canvas)
  let maxIndex = -1

  for (let i = 0; i < totalCases; i++) {
    labelContainer.childNodes[i].innerHTML = predictions[i].className + ": " + (100 * predictions[i].probability).toFixed(2) + " %"
    if (predictions[i].probability > probabilityThreshold) maxIndex = i
  }

  checkPlay(maxIndex)
}

function checkPlay(index) {
    if (index === lastIndex) {
        counter++

        if (counter === counterThreshold) {
            puzzleRef.current.gesture(index)
            counter = 0
        }
    }
    else {
        lastIndex = index;
        counter = 0;
    }
}

export default App
