const WINDOW_MESSAGE_PREFIX = "GOGORESUME_MESSAGE";
const WindowMessages = {
  EXT_PING: `${WINDOW_MESSAGE_PREFIX}:EXT_PING`,
  EXT_PING_RESPONSE: `${WINDOW_MESSAGE_PREFIX}:EXT_PING_RESPONSE`,
  SAVE_USER_INFO: `${WINDOW_MESSAGE_PREFIX}:SAVE_USER_INFO`,
  SAVE_USER_INFO_RESPONSE: `${WINDOW_MESSAGE_PREFIX}:SAVE_USER_INFO_RESPONSE`,
};

class GGRWindowEvents {
  static checkExtensionInstalledPromise(timeout = 1000) {
    return new Promise((resolve) => {
      let responded = false;

      // Listen once for a response
      window.addEventListener("message", function handler(event) {
        if (
          event.data &&
          event.data.type === WindowMessages.EXT_PING_RESPONSE
        ) {
          responded = true;
          resolve(true);
          window.removeEventListener("message", handler);
        }
      });

      // Send ping
      window.postMessage(
        { type: WindowMessages.EXT_PING },
        window.location.origin
      );

      // Timeout fallback
      setTimeout(() => {
        if (!responded) resolve(false);
      }, timeout);
    });
  }

  static saveUserInfoPromise(userInfo: any, timeout = 1000) {
    return new Promise((resolve) => {
      let responded = false;

      // Listen once for a response
      window.addEventListener("message", function handler(event) {
        if (
          event.data &&
          event.data.type === WindowMessages.SAVE_USER_INFO_RESPONSE
        ) {
          responded = true;
          resolve(true);
          window.removeEventListener("message", handler);
        }
      });

      // Send ping
      window.postMessage(
        { type: WindowMessages.SAVE_USER_INFO, userInfo },
        window.location.origin
      );

      // Timeout fallback
      setTimeout(() => {
        if (!responded) resolve(false);
      }, timeout);
    });
  }

  static async checkExtensionInstalled() {
    const installed = await this.checkExtensionInstalledPromise();
    return installed;
  }

  static async saveUserInfo(userInfo: any) {
    const saved = await this.saveUserInfoPromise(userInfo);
    return saved;
  }
}

export default GGRWindowEvents;
