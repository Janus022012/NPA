# Electronについて
### ダウンロードイベント(DownloadItem)について
'''main.js
const {..., session} = require('electron');

function createWindon () {
    let ses = session.defaultSession;
    
    ses.on('will-download', (e, downloadItem, webCntents) => {
    
    // 保存場所を指定する。
    downloadItem.setSavePath(app.getPath('desktop') + `/$(fileName)`);
    
    // プログレスバー
    downloadIten.on('updates', (e, state) => {
        let received = downloadItem.getReceivedBytes()
        
        if (state === 'progressing' && received){
            let progress = Math.round(received/fileSize*100)
        }
        })
    })
}
'''

### カスタムダイアログについて
'''

# dialog.showOpenDialog(ウィンドウ名, コールバック関数)
dialog.showOpenDialog(MainWindow, () => {
    buttonLabel: 'Select a Photo'
    defaultPath: promise関数
})

# dialog.showSaveDialog()
# dialog.showMessageBox()
# dialog.showErrorMessage()

'''

### ショートカット
'''
const {globalShortCut}  = require('electron');

# ショートカットの登録
globalShortCut.register('CommandOrControl+G, () => {
    処理
});

# ショートカットの登録解除
globalShortCut.unregister('CommandOrControl+G)
'''

### プロセス間通信