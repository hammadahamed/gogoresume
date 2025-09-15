import { AxiosError } from "axios";

class ApiUtils {
  // This method returns the base URL depending on the environment (development or production)
  static getBaseURL(): string {
    const hostname = window.location.host;
    const isDevelopment =
      hostname.startsWith("localhost") || hostname.startsWith("127.0.0.1:8080");
    const baseURL = isDevelopment
      ? "http://localhost:3010"
      : process.env.SERVER_BASE_URL;
    return baseURL as string;
  }

  // Handle API errors, and throw the error message
  static handleApiError(error: AxiosError): void {
    if (error instanceof AxiosError && error.response) {
      throw (error as any).response.data.error.toString();
    } else {
      throw error;
    }
  }
}

export default ApiUtils;

export function parseErrorMessage(
  error: AxiosError | any,
  defaultText: string
) {
  return error?.response?.data?.message?.toString() ?? defaultText;
}
