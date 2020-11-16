import React, { useCallback, useState } from "react"
import { useTweaks } from "use-tweaks"
import { css } from "@emotion/css"
import { loremIpsum } from "lorem-ipsum"

import { TextScramble } from "./text-scramble"

import "./styles.css"

export default function App() {
  const [sample, setSample] = useState(loremIpsum())

  const config = useTweaks("Config", {
    play: true,
    fontSize: { value: 20, min: 1, max: 32, step: 1 },
    leading: { value: 1.5, min: 0, max: 3, step: 0.01 },
    tracking: { value: 0.6, min: -0.2, max: 3, step: 0.01 },
  })

  const tweaks = useTweaks("Scramble", {
    speed: { value: 0.4, min: 0.1, max: 1, step: 0.1 },
    scramble: { value: 5, min: 0, max: 42, step: 1 },
    seed: { value: 6, min: 0, max: 42, step: 1 },
    seedInterval: { value: 10, min: 1, max: 20, step: 1 },
    step: { value: 2, min: 1, max: 6, step: 1 },
    stepInterval: { value: 1, min: 1, max: 20, step: 1 },
  })

  const handleComplete = useCallback(() => {
    setTimeout(() => {
      setSample(loremIpsum())
    }, 850)
  }, [])

  return (
    <div className="App">
      <div>
        <TextScramble
          play={config.play}
          text={sample}
          {...tweaks}
          onComplete={handleComplete}
          className={css`
            display: block;
            font-family: "Courier New", Courier, monospace;
            letter-spacing: ${config.tracking}em;
            line-height: ${config.leading};
            max-width: 50ch;
            font-size: ${config.fontSize}px;
          `}
        />
      </div>
    </div>
  )
}
