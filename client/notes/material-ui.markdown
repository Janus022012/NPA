# Material-UIまとめ
### CLSXについて
Clsxは、動的にReactにおいてクラス名を動的に設定する時に使用されるライブラリである。
```
具体的な使用例
<Drawer
    className={clsx(classes.drawer, {       // classes.drawerはいつでも適用される。
　　　　　　　　 [classes.drawerAlways]: true, // classes.drawerAlwaysはいつでも適用される。
              [classes.drawerOpen]: open,   // classes.drawerOpenはopen時のみ適用される。
              [classes.drawerClose]: !open, // classes.drawerCloseはclose時のみ適用される。
            })}
/>
```

### AppBar作成時の疑問点
#### Classを使用したスタイルのオーバーライド
#### Themeの使用
#### ToolBar
- ToolBarの役割
    - ToolBarはAppBar上のコンポーネントを水平に並べる。
- ToolBarのプロパティ
    - children 
    - classes
    - component
    - disableGutters
        - trueなら左右のパディングが削除される。
    - variant
        - 'dense'だとappBarの高さが小さくなる。

### 参照
> 