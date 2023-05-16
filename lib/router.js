export function getCurrentURL() {
    return window.location.pathname;
}

export function pushToHistory(url) {
    window.history.pushState({}, '', url);
}
