export {}

declare global {
  interface Window {
    showOpenFilePicker: (arg) => Promise<string>
  }
}
