export function getApiUrl() {
    if (process.env.API_URL) {
        return process.env.API_URL;
    }
    return "http://localhost:4000"
}