import React from "react"

export default ({ className, style, children }) => (
    <div className={className} style={{ margin: '0 auto', ...style }}>{ children }</div>
)