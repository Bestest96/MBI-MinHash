class MinHash {
    constructor(strA, strB, k, m) {
        this.strA = strA;
        this.strB = strB;
        this.k = k;
        this.m = m;
        this.posA = 0;
        this.posB = 0;
        this.xorNumbers = new Set([0]);
        while (this.xorNumbers.size < m) {
            this.xorNumbers.add(parseInt((Math.random() - 0.5) * 2 * Number.MAX_SAFE_INTEGER, 10));
        }
        this.xorNumbers = [...this.xorNumbers];
        this.minHashA = [...Array(m)].map(() => Number.MAX_SAFE_INTEGER);
        this.minHashB = [...this.minHashA];
    }

    static hashString(str) {
        const p = 127;
        const q = 2147483647;
        const sumAll = str.split('')
            .reduce((sum, chr, idx) => (sum + ((chr.charCodeAt(0) * (p ** idx)) % q)), 0);
        return sumAll % q;
    }

    getHashValues(str) {
        const hash = MinHash.hashString(str);
        return this.xorNumbers.map(xorNum => hash ^ xorNum);
    }

    step() {
        const results = {
            hashValuesA: [],
            hashValuesB: [],
            minHashA: [],
            minHashB: [],
            posA: this.posA,
            posB: this.posB,
            match: 0,
            simValue: 0.0,
            done: false,
        };
        if (this.posA < this.strA.length - this.k + 1) {
            const hashValues = this.getHashValues(this.strA.substr(this.posA, this.k));
            this.minHashA = this.minHashA.map((minHashVal, idx) => Math.min(minHashVal, hashValues[idx]));
            results.hashValuesA = hashValues;
            results.minHashA = this.minHashA;
            this.posA += 1;
        } else if (this.posB < this.strB.length - this.k + 1) {
            const hashValues = this.getHashValues(this.strB.substr(this.posB, this.k));
            this.minHashB = this.minHashB.map((minHashVal, idx) => Math.min(minHashVal, hashValues[idx]));
            results.hashValuesB = hashValues;
            results.minHashB = this.minHashB;
            this.posB += 1;
        }
        if (this.posA === this.strA.length - this.k + 1 && this.posB === this.strB.length - this.k + 1) {
            results.minHashA = this.minHashA;
            results.minHashB = this.minHashB;
            results.match = this.minHashA.filter((hashA, idx) => hashA === this.minHashB[idx]).length;
            results.simValue = results.match / this.m;
            results.done = true;
        }
        return results;
    }

    finish() {
        let result = {};
        do {
            result = this.step();
        } while (!result.done);
        const {
            minHashA, minHashB, match, simValue,
        } = result;
        return {
            minHashA, minHashB, match, simValue,
        };
    }
}

module.exports = MinHash;
