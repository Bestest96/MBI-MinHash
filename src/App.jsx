import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {val: 'xd'};
    }
    render() {
        const { val } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p className="title-text my-0">MBI</p>
                    <p>
                        Edit
                        {' '}
                        <code>src/App.js</code>
                        {' '}
                        and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <input onChange={(e) => {console.log(e); this.setState({ val: e.target.value })}} value={val} />
                    <h5>
                        {this.hash(val)}
                    </h5>
                </header>
            </div>
        );
    }

    hash(str) {
        const p = 127;
        const q = 2147483647;
        const sum = str.split("")
            .reduce((sum, chr, idx) => (sum + chr.charCodeAt(0) * Math.pow(p, idx) % q), 0);
        return sum % q;
    }
}
