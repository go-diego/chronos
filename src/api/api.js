import format from "date-fns/format";
import subHours from "date-fns/sub_hours";

export default class Api {
    constructor() {
        this.TAGS_URL = "http://cs-mock-timeseries-api.azurewebsites.net/api/Tag";
        this.DATA_POINTS_URL = "http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint";
        this.REQUEST_HEADERS = {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };
        this.DEFAULT_START_TS = format(subHours(new Date(), 48), "YYYY-MM-DD");
        this.DEFAULT_END_TS = format(new Date(), "YYYY-MM-DD");
    }

    async getTags() {
        const res = await fetch(`${this.TAGS_URL}`, {...this.REQUEST_HEADERS});
        return await res.json();
    }

    async getTagById(tagId) {
        const tags = await this.getTags();
        const tag = tags.filter(tag => tag.tagId === tagId);
        return tag.length > 0 ? tag[0] : {};
    }

    async getData(tagId, startTS = this.DEFAULT_START_TS, endTS = this.DEFAULT_END_TS) {
        const res = await fetch(
            `${this.DATA_POINTS_URL}/${tagId}?startTS=${startTS}&endTS=${endTS}`,
            {...this.REQUEST_HEADERS}
        );
        return await res.json();
    }

    get defaultTimeSeriesRange() {
        return {
            startTS: this.DEFAULT_START_TS,
            endTS: this.DEFAULT_END_TS
        };
    }
}
