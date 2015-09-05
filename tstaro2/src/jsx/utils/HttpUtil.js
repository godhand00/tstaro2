export default class HttpUtil {
    static get(url, resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.response);
                resolve(data);
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
                var data = JSON.parse(xhr.response);
                if (data.totalCount > 0)
                    resolve(data.results[0]);
                else
                    resolve(null);
            } else
                reject(new Error(xhr.statusText));
        };
        xhr.onerror = () => reject(new Error(xhr.statusText));
        xhr.send(null);
    }
}
