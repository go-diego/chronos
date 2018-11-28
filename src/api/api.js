export default class Api {
    constructor() {
        this.TAGS_URL = "http://cs-mock-timeseries-api.azurewebsites.net/api/Tag";
        this.DATA_POINTS_URL = "http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint";
        this.REQUEST_HEADERS = {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };
    }

    async getTags() {
        const res = await fetch(`${this.TAGS_URL}`, {...this.REQUEST_HEADERS});
        return await res.json();
    }
}
