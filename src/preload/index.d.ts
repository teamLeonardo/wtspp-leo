import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown,
    store: {
      get: (key: string) => any;
      set: (key: string, val: any) => void;
      // any other methods you've defined...
    };

  }
}
