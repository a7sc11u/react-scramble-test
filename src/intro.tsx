import React from "react"
import { css } from "@emotion/css"

import { Code } from "./code"

const codeString = `
import { TextScramble } from '@a7sc11u/scramble';

export const App = () => {

  const handleComplete = () => {
    console.log('scramble is done');
  }

  return (
    <TextScramble 
      as="div"
      play={true}
      speed={0.4}
      scramble={8}
      step={1}
      stepInterval={1}
      seed={3}
      seedInterval={10}
      onComplete={handleComplete}
      text="Fugiat ullamco non magna dolor excepteur." 
    />
  );
};
`

export const Intro = () => {
  return (
    <section
      className={css`
        width: 100%;
        padding: 2vw 4vw;
      `}>
      <p>A scramble text UI component for react.</p>
      <p>
        The animation maintains an internal ticking clock, that runs up to 60 times per second, or once per animation frame. The animation
        starts from the beginning of the input text, and scrambles until the end of the input, given a set of control parameters that allow
        you to control how often characters are added, and how many times each character is randomized.
      </p>
    </section>
  )
}
