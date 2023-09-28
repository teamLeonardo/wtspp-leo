import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      send: (channel: any, data: any) => void,
      on: (channel: any, func: any) => void,
      invoke: (channel: string, ...args: any[]) => Promise
    },
    store: {
      get: (key: string) => any;
      set: (key: string, val: any) => void;
      // any other methods you've defined...
    };

  }
}
