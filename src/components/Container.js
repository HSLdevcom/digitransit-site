import React from "react"

export default ({ style, children }) => (
    <div style={{ margin: '0 auto', ...style }}>{ children }</div>
)