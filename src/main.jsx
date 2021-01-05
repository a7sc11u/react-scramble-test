import React, { useCallback, useEffect, useRef, useState } from "react"
import { useTweaks, makeButton, makeSeparator } from "use-tweaks"
import { css } from "@emotion/css"
import { LoremIpsum } from "lorem-ipsum"
import { TextScramble } from "@a7sc11u/scramble"

import { Row, Content, Pane } from "./layout"

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 10,
    min: 4,
  },
})

export const Main = () => {
  const [sample, setSample] = useState(lorem.generateSentences(1))

  const paneRef = useRef(null)

  const tweaks = useTweaks(
    "Scramble",
    {
      play: true,
      speed: { value: 0.4, min: 0.1, max: 1, step: 0.1 },
      scramble: { value: 5, min: 0, max: 42, step: 1 },
      seed: { value: 6, min: 0, max: 42, step: 1 },
      seedInterval: { value: 10, min: 1, max: 20, step: 1 },
      step: { value: 2, min: 1, max: 6, step: 1 },
      stepInterval: { value: 1, min: 1, max: 20, step: 1 },
      ...makeSeparator(),
      ...makeButton("Randomize Text", () => randomize()),
    },
    { container: paneRef },
  )

  const randomize = useCallback(() => {
    const sample = lorem.generateSentences(2)
    setSample(sample)
  }, [])

  useEffect(() => {
    const sample = lorem.generateSentences(2)
    setSample(sample)
  }, [])

  return (
    <Row>
      <Content>
        <TextScramble
          text={sample}
          {...tweaks}
          className={css`
            display: block;
            font-family: "Courier New", Courier, monospace;
            line-height: 1.2;
            font-size: calc(12px + 1vw);
            max-width: 38ch;
          `}
        />
      </Content>
      <Pane ref={paneRef} />
    </Row>
  )
}
