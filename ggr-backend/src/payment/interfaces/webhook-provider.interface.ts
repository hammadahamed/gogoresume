export interface WebhookHeaders {
  [key: string]: string;
}

export interface IWebhookProvider {
  verifyWebhookSignature(
    payload: any,
    headers: WebhookHeaders,
  ): Promise<boolean>;
  processWebhook(payload: any): Promise<any>;
}
