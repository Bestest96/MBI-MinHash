import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function ProgressTable(props) {
    const { data, otherData } = props;
    const {
        str, steps, m, k, hashValues, pos, minHash, xorNumbers,
    } = data;

    const {
        minHash: otherMinHash,
    } = otherData;

    const getHexString = val => `0x${`00000000${val.toString(16).toUpperCase()}`.slice(-8)}`;

    const tableBody = [...Array(m)].map((_, id) => id).map((rowId) => {
        const tableRow = [...Array(steps)].map((_, id) => id).map((colId) => {
            if (colId < pos) {
                const value = hashValues[colId][rowId];
                return (
                    <td
                        key={`td_${rowId}_${colId}`}
                        className={classnames(
                            { 'table-primary': value === minHash[rowId] && rowId },
                            'text-monospace',
                        )}
                        style={{ borderColor: '#dee2e6' }}
                    >
                        {getHexString(value)}
                    </td>
                );
            }

            return <td key={`td_${rowId}_${colId}`} style={{ borderColor: '#dee2e6' }} />;
        });

        return (
            <tr
                key={`tr_${rowId}`}
                className={classnames({ 'table-secondary': !rowId })}
            >
                <td
                    key={`td_hash_${rowId}`}
                    className="text-monospace table-secondary"
                    style={{ borderColor: '#dee2e6' }}
                >
                    {rowId ? `#^${getHexString(xorNumbers[rowId])}` : '#(Kn)'}
                </td>
                {tableRow}
                <td
                    key={`td_min_${rowId}`}
                    className={classnames(
                        {
                            'table-success': otherMinHash[rowId] === minHash[rowId] && rowId,
                            'table-secondary': !(otherMinHash[rowId] === minHash[rowId] && rowId),
                        },
                        'text-monospace table-secondary',
                    )}
                    style={{ borderColor: '#dee2e6' }}
                >
                    {rowId ? getHexString(minHash[rowId]) : 'n/d'}
                </td>
            </tr>
        );
    });

    const kmers = [...Array(steps)]
        .map((_, id) => str.substr(id, k))
        .map((kmer, id) => <th key={`kmer_${kmer}_${id + 1}`}>{kmer}</th>);

    return (
        <div className="m-4">
            <h3 className="mb-3">
                    Tabelka dla&nbsp;
                {str}
            </h3>
            <div className="table-responsive text-center">
                <table className="table table-bordered table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th colSpan={steps + 2}>{str}</th>
                        </tr>
                        <tr>
                            <th>Funkcja skrótu</th>
                            {kmers}
                            <th>Min</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

ProgressTable.propTypes = {
    data: PropTypes.shape({
        str: PropTypes.string,
        steps: PropTypes.number,
        m: PropTypes.number,
        k: PropTypes.number,
        hashValues: PropTypes.array,
        pos: PropTypes.number,
        minHash: PropTypes.array,
        xorNumbers: PropTypes.array,
    }).isRequired,
    otherData: PropTypes.shape({
        minHash: PropTypes.array,
    }).isRequired,
};
