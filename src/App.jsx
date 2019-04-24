import React, { Component } from 'react';
import './App.scss';

import ProgressTable from './ProgressTable';
import MinHash from './MinHash';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            strA: '',
            strB: '',
            k: 3,
            m: 4,
            inProgress: false,
            results: {},
            minHashInstance: undefined,
        };
    }

    getResults(strId) {
        const { results, minHashInstance, inProgress } = this.state;
        if (!inProgress) {
            return {};
        }

        const isA = strId === 'A';

        const {
            [isA ? 'aSteps' : 'bSteps']: steps,
            [isA ? 'posA' : 'posB']: pos,
            [isA ? 'strA' : 'strB']: str,
            xorNumbers,
            k,
            m,
            [isA ? 'minHashA' : 'minHashB']: minHash,
        } = minHashInstance;

        return {
            steps,
            pos,
            str,
            xorNumbers,
            k,
            m,
            minHash,
            hashValues: isA ? results.allHashValuesA : results.allHashValuesB,
        };
    }

    step() {
        const { minHashInstance } = this.state;
        const res = minHashInstance.step();

        this.setState(prevState => ({
            results: {
                allHashValuesA: [
                    ...(prevState.results.allHashValuesA || []),
                    ...(res.hashValuesA.length ? [res.hashValuesA] : []),
                ],
                allHashValuesB: [
                    ...(prevState.results.allHashValuesB || []),
                    ...(res.hashValuesB.length ? [res.hashValuesB] : []),
                ],
            },
            done: res.done,
            simValue: res.simValue,
            match: res.match,
        }));
    }

    finish() {
        const { minHashInstance } = this.state;
        const res = minHashInstance.finish();

        this.setState(prevState => ({
            results: {
                allHashValuesA: [
                    ...(prevState.results.allHashValuesA || []),
                    ...(res.allHashValuesA.length ? res.allHashValuesA : []),
                ],
                allHashValuesB: [
                    ...(prevState.results.allHashValuesB || []),
                    ...(res.allHashValuesB.length ? res.allHashValuesB : []),
                ],
            },
            done: res.done,
            simValue: res.simValue,
            match: res.match,
        }));
    }

    render() {
        const {
            strA, strB, inProgress, k, m, done, simValue, match,
        } = this.state;

        const inputButtons = (
            <div className="d-inline-flex col-8 justify-content-end">
                <button
                    type="button"
                    className="btn btn-lg btn-outline-success m-2 px-5"
                    onClick={() => this.setState({
                        inProgress: true,
                        minHashInstance: new MinHash(strA, strB, k, m),
                        results: {},
                        done: false,
                    })}
                >
                    Start
                </button>
                <button
                    type="button"
                    className="btn btn-lg btn-outline-danger m-2 px-4"
                    onClick={() => this.setState({ strA: '', strB: '' })}
                >
                    Wyczyść
                </button>
            </div>
        );

        const actionButtons = (
            <div className="d-inline-flex col-8 justify-content-end">
                <button
                    type="button"
                    className="btn btn-lg btn-outline-success m-2 px-5"
                    onClick={() => this.step()}
                    disabled={done}
                >
                    Krok
                </button>
                <button
                    type="button"
                    className="btn btn-lg btn-outline-primary m-2 px-4"
                    onClick={() => this.finish()}
                    disabled={done}
                >
                    Do końca
                </button>
                <button
                    type="button"
                    className="btn btn-lg btn-outline-danger m-2 px-4"
                    onClick={() => this.setState({ inProgress: false })}
                >
                    {done ? 'Restart' : 'Przerwij'}
                </button>
            </div>
        );

        const buttons = inProgress ? actionButtons : inputButtons;

        const inputScreen = (
            <div>
                <div className="form-row w-100">
                    <div className="col">
                        <label htmlFor="stringA" className="">Podaj pierwszy łańcuch:</label>
                        <input
                            className="form-control form-control-lg"
                            id="stringA"
                            placeholder="AAGTBA"
                            value={strA}
                            disabled={inProgress}
                            onChange={e => this.setState({ strA: e.target.value.toUpperCase() })}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="stringB">Podaj drugi łańcuch:</label>
                        <input
                            className="form-control form-control-lg"
                            id="stringB"
                            placeholder="AAGTBA"
                            value={strB}
                            disabled={inProgress}
                            onChange={e => this.setState({ strB: e.target.value.toUpperCase() })}
                        />
                    </div>
                </div>
                <div className="form-row mt-3 w-100">
                    <div className="col-2">
                        <label htmlFor="k_value" className="">Podaj długość kmerów:</label>
                        <input
                            className="form-control form-control-lg"
                            id="k_value"
                            type="number"
                            min={1}
                            value={k}
                            disabled={inProgress}
                            onChange={e => this.setState({ k: parseInt(e.target.value, 10) })}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="m_value">Podaj liczbę haszy:</label>
                        <input
                            className="form-control form-control-lg"
                            type="number"
                            id="m_value"
                            min={1}
                            value={m}
                            disabled={inProgress}
                            onChange={e => this.setState({ m: parseInt(e.target.value, 10) })}
                        />
                    </div>
                    {buttons}
                </div>


            </div>
        );

        const resultString = `Podobieństwo ${parseInt(simValue * 100, 10)}% (${match}/${m})`;

        const finalResult = (
            <div className="d-flex justify-content-center">
                <h3 className="border border-primary rounded mt-3 py-4 px-5">
                    {resultString}
                </h3>
            </div>
        );

        const resA = this.getResults('A');
        const resB = this.getResults('B');

        return (
            <div className="m-3">
                <h3 className="mb-3">Algorytm minHash</h3>
                {inputScreen}
                {(done && inProgress) && finalResult}
                {inProgress && <ProgressTable data={resA} otherData={resB} />}
                {inProgress && <ProgressTable data={resB} otherData={resA} />}
            </div>
        );
    }
}
