import React from "react"

import { AppHeader } from "./app-header"
import { Intro } from "./intro"
import { Example } from "./example"
import { Instructions } from "./instructions"

export const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <Example />
      <hr />
      <Intro />
      <Instructions />
    </div>
  )
}
