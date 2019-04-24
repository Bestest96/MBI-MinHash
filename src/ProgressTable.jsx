import React from 'react';
import PropTypes from 'prop-types';

export default function ProgressTable(props) {
    const { data, otherData } = props;
    const {
        str, steps, m, k, hashValues, pos, minHash,
    } = data;

    const {
        minHash: otherMinHash,
    } = otherData;

    const tableBody = [...Array(m)].map((_, id) => id).map((rowId) => {
        const tableRow = [...Array(steps)].map((_, id) => id).map((colId) => {
            if (colId < pos) {
                const value = hashValues[colId][rowId];
                return (
                    <td
                        key={`td_${rowId}_${colId}`}
                        className={value === minHash[rowId] ? 'alert-primary' : ''}
                    >
                        {value}
                    </td>
                );
            }

            return <td key={`td_${rowId}_${colId}`} />;
        });

        return (
            <tr key={`tr_${rowId}`}>
                <td
                    key={`td_min_${rowId}`}
                    className={otherMinHash[rowId] === minHash[rowId] ? 'alert-success' : ''}
                >
                    {minHash[rowId]}
                </td>
                {tableRow}
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
                <table className="table table-striped table-bordered table-hover table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th colSpan={steps + 1}>{str}</th>
                        </tr>
                        <tr>
                            <th>Min</th>
                            {kmers}
                        </tr>
                    </thead>
                    <tbody>{tableBody}</tbody>
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
    }).isRequired,
    otherData: PropTypes.shape({
        minHash: PropTypes.array,
    }).isRequired,
};
