const INTENDED_ROUTE_KEY = "intended_route";

export interface IntendedRoute {
  path: string;
  query?: Record<string, any>;
  hash?: string;
}

/**
 * Store the intended route before redirecting to login
 * @param route - The route object to store
 */
export const storeIntendedRoute = (route: IntendedRoute): void => {
  try {
    sessionStorage.setItem(INTENDED_ROUTE_KEY, JSON.stringify(route));
  } catch (error) {
    console.warn("Failed to store intended route:", error);
  }
};

/**
 * Get the stored intended route and clear it from storage
 * @returns The intended route or null if none exists
 */
export const getIntendedRoute = (): IntendedRoute | null => {
  try {
    const storedRoute = sessionStorage.getItem(INTENDED_ROUTE_KEY);
    if (!storedRoute) {
      return null;
    }

    // Clear the stored route
    sessionStorage.removeItem(INTENDED_ROUTE_KEY);
    return JSON.parse(storedRoute) as IntendedRoute;
  } catch (error) {
    console.warn("Failed to get intended route:", error);
    // Clear potentially corrupted data
    sessionStorage.removeItem(INTENDED_ROUTE_KEY);
    return null;
  }
};

/**
 * Clear the stored intended route
 */
export const clearIntendedRoute = (): void => {
  sessionStorage.removeItem(INTENDED_ROUTE_KEY);
};
