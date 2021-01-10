import React from "react"
import { css } from "@emotion/css"

import { Code } from "./code"

const installString = `yarn add @a7sc11u/scramble
//or
npm install @a7sc11u/scramble `

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

export const Instructions = () => {
  return (
    <section
      className={css`
        width: 100%;
        padding: 2vw 4vw;
      `}>
      <div
        className={css`
          margin-bottom: 2vw;
        `}>
        <Code code={installString} language="js" />
      </div>
      <Code code={codeString} language="js" />
    </section>
  )
}
