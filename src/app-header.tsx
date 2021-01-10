import React from "react"
import { css } from "@emotion/css"

const headerClassName = css`
  width: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 4vw;

  > h1 {
    margin: 0;
  }
`

export const AppHeader = () => {
  return (
    <header className={headerClassName}>
      <h1>Scramble</h1>

      <div>
        <a
          href="https://twitter.com/a7sc11u"
          target="new"
          rel="noopener noreferrer"
          className={css`
            margin-right: 1rem;
          `}>
          @a7sc11u
        </a>
        <a href="https://github.com/a7sc11u/scramble" target="new">
          Github
        </a>
      </div>
    </header>
  )
}
