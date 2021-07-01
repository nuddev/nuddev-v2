import React from "react"
import './App.less'
function App() {
    return (<div>
        <h2>{process.env.HOME}</h2>
        <h3>Date : {new Date().toDateString()}</h3>
    </div>)
}

export default App