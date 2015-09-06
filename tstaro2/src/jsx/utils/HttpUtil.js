export default class HttpUtil {
    static get(url, resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var resp = JSON.parse(xhr.response);
                resolve(resp);
            } else
                reject(new Error(xhr.statusText));
        };
        xhr.onerror = () => reject(new Error(xhr.statusText));
        xhr.send(null);
    }

    static firstOrDefault(url, resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var resp = JSON.parse(xhr.response);
                if (resp.totalCount > 0)
                    resolve(resp.results[0]);
                else
                    resolve(null);
            } else
                reject(new Error(xhr.statusText));
        };
        xhr.onerror = () => reject(new Error(xhr.statusText));
        xhr.send(null);
    }

    static post(url, data, resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200)
                resolve(xhr.response);
            else
                reject(new Error(xhr.statusText));
        };
        xhr.onerror = () => reject(new Error(xhr.statusText));
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }

    static put(url, data, resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200)
                resolve(xhr.response);
            else
                reject(new Error(xhr.statusText));
        };
        xhr.onerror = () => reject(new Error(xhr.statusText));
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }

    static delete(url, data, resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', url, true);
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200)
                resolve(xhr.response);
            else
                reject(new Error(xhr.statusText));
        };
        xhr.onerror = () => reject(new Error(xhr.statusText));
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }

    static createUrl(url, params) {
        var query = "";
        for (var key in params) {
            if (params[key]) {
                if (query)
                    query += "&";
                query += key + "=" + params[key];
            }
        }
        return url + (query ? "?" : "") + query;
    }
}
