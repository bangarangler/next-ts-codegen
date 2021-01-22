const envSettings = window as any;

export class Config {
  static api_url = envSettings.REACT_APP_API_ADDRESS;
}
