const createRequest = (options = {}) => {
    
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    const formData = new FormData();
    let url = options.url;
    
    if (options.data) {
        if (options.method === "GET") {
            url += "?" + Object.entries(options.data).map(
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                ).join("&");
        } else {
            Object.entries(options.data).forEach(elem => formData.append(elem[0], elem[1]));
        }
    }
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            
            let err = null;
            let response = null;

            if (xhr.status === 200) {
                const resp = xhr.response;
                if (resp?.success) {
                    response = resp;
                } else {
                    err = resp;
                }
            } else {
                err = new Error ("Что-то пошло не так...");
            }
            options.callback(err, response);
        }
    }
    
    xhr.open(options.method, url, true);
    xhr.send(formData);
}
