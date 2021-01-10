import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"

import theme from "./code-themes/ultramin"

export const Code = ({ code, language, ...props }) => {
  return (
    <Highlight {...defaultProps} code={code} theme={theme} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => {
            return (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}
