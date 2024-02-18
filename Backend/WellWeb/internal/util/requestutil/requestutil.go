package requestutil

import "net/http"

func ValidateRequestMethod(Method string, w http.ResponseWriter, r *http.Request) int {
	if r.Method != Method {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return 1
	}

	return 0
}

func ValidateContentType(ContentType string, w http.ResponseWriter, r *http.Request) int {
	if r.Header.Get("Content-Type") != ContentType {
		http.Error(w, "Unsupported Media Type", http.StatusUnsupportedMediaType)
		return 1
	}

	return 0
}
