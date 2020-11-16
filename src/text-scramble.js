/*eslint-disable */
//http://jsfiddle.net/m1erickson/CtsY3/
import React, { useRef, useCallback } from "react"
import "./styles.css"

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomChar() {
  const rand = getRandomInt(0, 60)
  return String.fromCharCode(rand + 65)
}

export const TextScramble = ({
  play,
  text,
  speed = 1,
  seed = 1,
  seedInterval = 10,
  step = 1,
  stepInterval = 1,
  scramble = 10,
  onComplete,
  ...rest
}) => {
  // animation frame request
  const requestRef = React.useRef()

  // time elapsed
  const elapsedRef = useRef(0)
  const fpsInterval = 1000 / (60 * speed)

  // scramble tick
  const tickRef = useRef(0)

  // current characted index ref
  const startCharRef = useRef(0)

  // scramble controller
  const scrambleRef = useRef()

  // text node ref
  const textRef = useRef()

  const seedRandomCharacters = () => {
    for (var i = 0; i < seed; i++) {
      const pos = getRandomInt(startCharRef.current, text.length)
      scrambleRef.current[pos] = scrambleRef.current[pos] || 0
    }
  }

  const moveCharIndex = () => {
    for (var i = 0; i < step; i++) {
      const currentIndex = startCharRef.current
      scrambleRef.current[currentIndex] = scrambleRef.current[currentIndex] || 0
      startCharRef.current += 1
    }
  }

  const animate = (time) => {
    const timeElapsed = time - elapsedRef.current

    requestRef.current = requestAnimationFrame(animate)

    if (timeElapsed > fpsInterval) {
      // timeRef.current = time - (timeElapsed % fpsInterval);
      elapsedRef.current = time
      draw()
    }
  }

  const draw = () => {
    if (tickRef.current % seedInterval === 0) {
      seedRandomCharacters()
    }

    if (tickRef.current % stepInterval === 0) {
      moveCharIndex()
    }

    let newString = ""
    let charsDone = 0

    for (var i = 0; i < text.length; i++) {
      const cPos = scrambleRef.current[i]

      switch (true) {
        case text[i] === " ":
          newString += " "
          charsDone++
          break
        case cPos >= scramble:
          newString += text[i]
          charsDone++
          break
        case cPos < scramble && i <= startCharRef.current:
          newString += getRandomChar()
          scrambleRef.current[i] += 1
          break
        case cPos < scramble:
          newString += getRandomChar()
          break
        default:
          newString += "<span>&nbsp;</span>"
      }
    }

    textRef.current.innerHTML = newString

    if (charsDone === text.length) {
      cancelAnimationFrame(requestRef.current)
      if (onComplete) {
        onComplete()
      }
      return
    }

    tickRef.current += 1
  }

  React.useEffect(() => {
    tickRef.current = 0
    startCharRef.current = 0
    scrambleRef.current = new Array(text.length)
  }, [text])

  React.useEffect(() => {
    if (play) {
      requestRef.current = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(requestRef.current)
    }
    return () => {
      cancelAnimationFrame(requestRef.current)
    }
  }, [animate, play]) // Make sure the effect runs only once

  return <span ref={textRef} {...rest} />
}
