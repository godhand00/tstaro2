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
}
