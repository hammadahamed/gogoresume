import { App } from "vue";
import vue3GoogleLogin from "vue3-google-login";

export class GoogleAuth {
  private static CLIENT_ID: string;

  /**
   * @param app - supply the created vue app
   */
  static initializeGoogleApp(app: App) {
    GoogleAuth.CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? "";

    app.use(vue3GoogleLogin, {
      clientId: GoogleAuth.CLIENT_ID,
    });
  }
}
