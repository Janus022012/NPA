import { app, BrowserWindow } from 'electron';
import { PythonShell, Options } from 'python-shell';

const createWindow = (): void => {
  // レンダープロセスとなる、ウィンドウオブジェクトを作成する。
  const window = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
    },
  });

  // tsc でコンパイルするので、出力先の dist の相対パスで指定する。
  window.loadFile('./index.html');

  // 開発者ツールを起動する
  // window.webContents.openDevTools();
};

// Electronの起動準備が終わったら、ウィンドウを作成する。
app.whenReady().then(createWindow);

app.on('ready', () => {
  const options: Options = {
    mode: 'text',
    pythonPath: '../backend/venv/Scripts/python.exe',
    pythonOptions: [],
  };

  PythonShell.run('../backend/src/app.py', options, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
    }
  });
});

// すべての ウィンドウ が閉じたときの処理
app.on('window-all-closed', () => {
  // macOS 以外では、メインプロセスを停止する
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
