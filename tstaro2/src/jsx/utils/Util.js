export default class Util {
    static emptyResults() {
        return {
            "results": [],
            "totalCount": 0
        };
    }

    static jsonDateToDate(value) {
        var d = new Date(value);
        return d.toISOString().substring(0, 10);
    }
}
