import React from "react"

const Container = ({ className, style, children }) => (
    <div className={className} style={{ margin: '0 auto', ...style }}>{ children }</div>
)

export default Container;
