import format from "date-fns/format";

const now = new Date();
export default class Api {
    constructor() {
        this.TAGS_URL = "http://cs-mock-timeseries-api.azurewebsites.net/api/Tag";
        this.DATA_POINTS_URL = "http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint";
        this.REQUEST_HEADERS = {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };
        this.DEFAULT_START_TS = now.toUTCString();
        this.DEFAULT_END_TS = now.toUTCString();
    }

    async getTags() {
        const res = await fetch(`${this.TAGS_URL}`, {...this.REQUEST_HEADERS});
        return await res.json();
    }

    async getData(tagId, startTS = this.DEFAULT_START_TS, endTS = this.DEFAULT_END_TS) {
        const res = await fetch(
            `${this.DATA_POINTS_URL}/${tagId}?startTS=${startTS}&endTS=${endTS}`,
            {...this.REQUEST_HEADERS}
        );
        return await res.json();
    }
}
