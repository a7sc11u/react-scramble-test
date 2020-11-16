import React, { useCallback, useEffect, useState } from "react"
import { useTweaks } from "use-tweaks"
import { css } from "@emotion/css"
import { LoremIpsum } from "lorem-ipsum"
import { TextScramble } from "./text-scramble"

import "./styles.css"

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 10,
    min: 4,
  },
})

export default function App() {
  const [sample, setSample] = useState(lorem.generateSentences(1))

  const tweaks = useTweaks("Scramble", {
    play: true,
    speed: { value: 0.4, min: 0.1, max: 1, step: 0.1 },
    scramble: { value: 5, min: 0, max: 42, step: 1 },
    seed: { value: 6, min: 0, max: 42, step: 1 },
    seedInterval: { value: 10, min: 1, max: 20, step: 1 },
    step: { value: 2, min: 1, max: 6, step: 1 },
    stepInterval: { value: 1, min: 1, max: 20, step: 1 },
  })

  const text = useTweaks("Text", {
    sentences: { value: 1, min: 1, max: 10, step: 1 },
    fontSize: { value: 20, min: 1, max: 32, step: 1 },
    leading: { value: 1.5, min: 0, max: 3, step: 0.01 },
    tracking: { value: 0.6, min: -0.2, max: 3, step: 0.01 },
    measure: { value: 50, min: 25, max: 75, step: 1 },
  })

  const handleComplete = useCallback(() => {
    setTimeout(() => {
      const sample = lorem.generateSentences(text.sentences)
      setSample(sample)
    }, 850)
  }, [text.sentences])

  useEffect(() => {
    const sample = lorem.generateSentences(text.sentences)
    setSample(sample)
  }, [text.sentences])

  return (
    <div className="App">
      <div>
        <TextScramble
          text={sample}
          {...tweaks}
          onComplete={handleComplete}
          className={css`
            display: block;
            font-family: "Courier New", Courier, monospace;
            letter-spacing: ${text.tracking}em;
            line-height: ${text.leading};
            max-width: ${text.measure}ch;
            font-size: ${text.fontSize}px;
          `}
        />
      </div>
    </div>
  )
}
