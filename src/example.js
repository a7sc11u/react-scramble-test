import React, { useCallback, useEffect, useState, useRef } from "react"
import { useTweaks, makeButton, makeSeparator } from "use-tweaks"
import { css } from "@emotion/css"
import { LoremIpsum } from "lorem-ipsum"
import { TextScramble } from "@a7sc11u/scramble"

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 10,
    min: 4,
  },
})

export const Example = () => {
  const paneRef = useRef(null)

  const [sample, setSample] = useState("")
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount((count) => count + 1)
  }

  const tweaks = useTweaks(
    "Scramble",
    {
      play: true,
      speed: { value: 0.4, min: 0.1, max: 1, step: 0.1 },
      scramble: { value: 5, min: 0, max: 42, step: 1 },
      step: { value: 2, min: 1, max: 6, step: 1 },
      stepInterval: { value: 1, min: 1, max: 20, step: 1 },
      seed: { value: 6, min: 0, max: 42, step: 1 },
      seedInterval: { value: 10, min: 1, max: 20, step: 1 },
      lipsum: { value: 2, min: 1, max: 10, step: 1 },
      ...makeButton("Randomize Text", () => increment()),
    },
    { container: paneRef },
  )

  useEffect(() => {
    const sample = lorem.generateSentences(tweaks.lipsum)
    setSample(sample)
  }, [tweaks.lipsum, count])

  return (
    <section
      className={css`
        display: flex;
        width: 100%;
        padding: 4vw 4vw 4vw 4vw;
        @media only screen and (max-width: 767px) {
          flex-direction: column;
        }
      `}>
      <div
        className={css`
          flex: 1 1 100%;
          @media only screen and (max-width: 767px) {
            order: 1;
          }
        `}>
        <TextScramble
          text={sample}
          as="p"
          play={tweaks.play}
          speed={tweaks.speed}
          scramble={tweaks.scramble}
          seed={tweaks.seed}
          seedInterval={tweaks.seedInterval}
          step={tweaks.step}
          stepInterval={tweaks.stepInterval}
          className={css`
            display: block;
            padding-right: 2vw;
          `}
        />
      </div>
      <div
        className={css`
          flex: 0 1;
        `}
        ref={paneRef}
      />
    </section>
  )
}
