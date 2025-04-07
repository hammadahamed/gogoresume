import config from "../../../../config/config.production.json";
import { AxiosError } from "axios";

class ApiUtils {
  static getBaseURL() {
    const hostname = window.location.host;
    const isDevelopment =
      hostname.startsWith("localhost") || hostname.startsWith("127.0.0.1:8080");
    const baseURL = isDevelopment ? "http://localhost:3001" : config.baseURL;
    return baseURL;
  }

  static handleApiError(error) {
    if (error instanceof AxiosError) {
      throw error.response.data.error.toString();
    } else {
      throw error;
    }
  }
}

export default ApiUtils;
