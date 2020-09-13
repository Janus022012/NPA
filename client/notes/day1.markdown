## NPA(Network Process Automation)開発 Day1

### TODO
    - 開発環境を整える。
        - 今回使用する環境は以下の通りである。
            - TypeScript + Electron + React
            - Webpack
                - 複数に分けた拡張子の異なるモジュールをひとつのファイルにまとめる事が出来る。
            - ESLint
                - JavaScriptやTypeScriptのLinter（リンター）です。Linterとは、コードの構文チェッカーである。
            - Prettier
                - コードを指定したルールに従って整形するためのツール
            - Jest
                - JavaScript のテストフレームワーク
    - フロントエンドの見た目を整える。
### 環境作成
#### 1-1 必要なライブラリのインストール
```shell script
# 実行時に必要なライブラリのインストール
$ npm install --save react react-dom redux react-redux
# 開発時に必要なライブラリのインストール
$ npm install --save-dev electron typescript eslint prettier eslint-config-prettier eslint-plugin-prettier webpack webpack-cli ts-loader
# typescriptの型定義ファイルのインストール
$ npm install --save-dev @types/react @types/react-dom @types/redux @types/react-redux
```
#### 1-2 TypeScriptのコンパイラオプションファイルの作成
```shell script
# tsconfig.jsonの作成
$ npx tsc --init
```
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "jsx": "react",
    "sourceMap": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "sourceRoot": "./src",
    "forceConsistentCasingInFileNames": true
  },
  "files": [
    "src/main.ts"
  ]
}
```

#### 1-3 eslintのセットアップ
```shell script
# tsconfig.jsonの作成
$ npm install --save-dev eslint
```

```shell script
$ npx eslint --init
# or
$ yarn eslint --init

# ESLint をどのように利用するか？
? How would you like to use ESLint?
  To check syntax only
  To check syntax and find problems
> To check syntax, find problems, and enforce code style

# モジュールの解決方法はどれを利用するか？
? What type of modules does your project use? (Use arrow keys)
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

# どのフレームワークを使う？
? Which framework does your project use? (Use arrow keys)
> React
  Vue.js
  None of these

# TypeScript は使う？
? Does your project use TypeScript? (y/N) y

# 何でコードを実行する？
? Where does your code run? (スペースキーで選択)
>(*) Browser
 (*) Node

# スタイル定義はどれを使う？
? How would you like to define a style for your project? (Use arrow keys)
> Use a popular style guide # 一般的なスタイルガイド
  Answer questions about your style
  Inspect your JavaScript file(s)

# どのスタイルガイドを利用するか？
? Which style guide do you want to follow?
  Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
> Google: https://github.com/google/eslint-config-google

# 設定ファイルのフォーマットはどうする？
? What format do you want your config file to be in?
  JavaScript
> YAML
  JSON

# 必要なライブラリを npm でインストールしていいか？
? Would you like to install them now with npm? (Y/n) y
```
#### 1-4 prettierの設定
```shell script
$ npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
# or
$ yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```
```yaml
printWidth: 80 # 行の文字数を"80"文字に制限
tabWidth: 2 # インデント幅をスペース"2"個
semi: true # 文末のセミコロンを強制する
singleQuote: true # 文字列リテラルのシングルクォーテーションとする
quoteProps: as-needed # オブジェクトリテラルのプロパティ名のクォーテーションは"必要なときのみ"とする
jsxSingleQuote: false # JSX のプロパティの値は、ダブルクォーテーションとする
trailingComma: all # オブジェクトリテラルなどの最後のカンマを強制する
bracketSpacing: true # {}のカッコに隣接するスペースをいれる
jsxBracketSameLine: true # JSXの後ろの'>'を同じ行にする
arrowParens: avoid # Arrow関数の引数のカッコは必要な場合のみつける
endOfLine: lf # 改行コードを "lf" にする
```
```yaml
env:
  browser: true
  es6: true
  node: true
extends:
  - 'plugin:react/recommended'
  - google
  - prettier # 上の定義の整形に関するルールを無効化
globals:
  Atomics: readonly
  SharedArrayBuffer: readonly
parser: '@typescript-eslint/parser'
parserOptions:
  ecmaFeatures:
    jsx: true
  ecmaVersion: 2018
  sourceType: module
plugins:
  - react
  - '@typescript-eslint'
  - prettier # eslint-plugin-prettier の追加
rules:
  # 関数の複雑さを 10 以下にする
  complexity: ['error', 10]
  # React のプロパティの型チェックを省略する (TypeScript でチェックされるため)
  react/prop-types: off
  # インターフェースの先頭文字を "I" にする
  '@typescript-eslint/interface-name-prefix':
    - error
    - prefixWithI: 'always'
  # prettier のチェックでErrorとするための設定。
  prettier/prettier:
    - error
```
#### 1-5 webpackの設定
```shell script
$ npm install --save eslint-loader
# or
$ yarn add eslint-loader
```
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Electronのレンダラプロセスで動作することを指定する
  target: 'electron-renderer',
  // 起点となるファイル
  entry: './src/index.tsx',
  // webpack watch したときに差分ビルドができる
  cache: true,
  // development は、 source map file を作成、再ビルド時間の短縮などの設定となる
  // production は、コードの圧縮やモジュールの最適化が行われる設定となる
  mode: 'development', // "production" | "development" | "none"
  // ソースマップのタイプ
  devtool: 'source-map',
  // 出力先設定 __dirname は node でのカレントディレクトリのパスが格納される変数
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // ファイルタイプ毎の処理を記述する
  module: {
    rules: [
      {
        // コンパイルの事前に eslint による
        // 拡張子 .ts または .tsx の場合
        test: /\.tsx?$/,
        // 事前処理であることを示す
        enforce: 'pre',
        // TypeScript をコードチェックする
        loader: 'eslint-loader',
      },
      {
        // 正規表現で指定する
        // 拡張子 .ts または .tsx の場合
        test: /\.tsx?$/,
        // ローダーの指定
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  // 処理対象のファイルを記載する
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js', // node_modulesのライブラリ読み込みに必要
    ],
  },
  plugins: [
    // Webpack plugin を利用する
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ],
};
```
#### 1-6 コンパイル
```shell script
# メインプロセスのコンパイル
$ npx tsc
# レンダープロセスのコンパイル
$ npx webpack
# or
$ yarn tsc
$ yarn webpack
```
#### 1-7 Electronの起動
```shell script
$ npx electron ./dist/main.js
# or
$ yarn electron ./dist/main.js
```
#### 1-8 ディレクトリ構成
```
src
├─ redux  
│   └─ UserActions.ts
├─ ui
│   ├─ theme
│   ├─ ui
│   └─ 
├─ index.tsx 
├─ Store.ts
└─ main.ts
```
### 調査事項
#### npmとyarnの相違点
yarnはFacebook発のパッケージマネージャである。<br/>
また、yarnをnpmの以下の問題解決を目的として開発された後発のパッケージマネージャである。<br/>
- npmの問題点
    - インストールパッケージの速度が遅い。
    - インストールパッケージの一貫性が不十分である。
    - npmはパッケージがインストール時にコードを実行する事を許可しているため、セキュリティー上の問題がある。
 - 機能の相違点
    - npmはセマンティックバージョンと呼ばれるバージョン管理を行っており、ある特定のメジャーリリース以下を使用するなどの管理方式であるが、
    　パッケージの運用が第三者によって行われている以上、正しく運用されているかは不明である。そのため、yarn.lockファイルを作成して、同一
    　のバージョンを異なるクライアントにインストールするようにする。(npmでもnpm shrinkwrapコマンドが同様にロックファイルを作成する。)
    - yarnは並列にパッケージをインストールするのに対して、npmは単一のインストールを行う。
- CLI
    - yarn global = npm install -g
    - yarn install = npm install 
    - yarn add --dev = npm install --save-dev
#### npm install --save-devと--save(yarn add --devとyarn add)の相違点
- dependencies
    - 開発には必要ないパッケージ
    - yarn install --production or npm install --productionではインストールされる。
- devDependencies
    - 開発に必要なパッケージのみ
    - yarn install --production or npm install --productionではインストールされない。
    
#### tsconfig.jsonのオプションまとめ
```metadata json
{
# コンパイル時のオプション
  "compilerOptions": {
    # 
    "target": "es2020", // Webpack で ES5に変換されるのでここでは最新の仕様
    "module": "commonjs",
    "jsx": "react",
    "sourceMap": true,
    "outDir": "./dist", // Webpack で出力先は指定するが、念の為・・・
    "strict": true,
    "esModuleInterop": true,
    "sourceRoot": "./src",
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true
  },
  # コンパイル対象のファイル(include・excludeと異なり、ワイルドカードを使用出来ない。)
  # 優先度は、files > exclude > includeである。
  "files": [
    "src/main.ts"
  ],
  # コンパイルする対象ファイルを記述する。
  "include": [
    
  ],
  # コンパイルする対象から外すファイルを記述する。
　# 記述しない場合は、node_modules・bower_components・jspm_packages・outDirがデフォルトで含まれているが
　# 記述する場合はそれが消えてしまうため注意
  "exclude": [
  ],
　"extends": 異なるtsconfig.jsonのファイルパス
　"compilerOnSave": true/false # tsconfig.jsonを保存した際にコンパイルが走るようになる。
  "references": #Project Referencesを有効にする際に使用する。
}
```
#### eslintrcのオプションまとめ
- [ESLint Rules 早見表](https://github.com/cawpea/eslint-rules)
#### prettierまとめ
- Eslintとの相違点
   - ESLintでは成型出来ないコードを整形出来る。
   - ESLintと比較して手軽で確実に整形する事が可能である。→デフォルトの整形スタイルが決まっている。
#### eslintとprettierの結合
- 併用に必要なパッケージのインストール
    - eslint
    - eslint-config-prettier
        - rettier が整形した箇所に関してエラーを出さなくなる
    - eslint-plugin-prettier
        - Prettier を ESLint 上で実行する
```metadata json
npm install eslint eslint-config-prettier eslint-plugin-prettier -D
```
- 設定ファイルの変更
    - extendsに"plugin:prettier/recommended"を設定する。(必ず末尾に設定する。)
#### webpack情報まとめ
- webpackとは<br/>
    1 複数の.jsファイルの依存関係を解決し、1つにバンドルする<br/>
    2 .jsファイルを読み込むときに変換する<br/>
    3  圧縮したり、ソースマップを出力したりする<br/>
- webpackの動作
    - webpackは指定されたファイルを起点として、そこからimport文を頼りに芋づる式にファイルを繋げてゆき、一つにまとめたJavaScriptファイルを出力する。

#### セキュアなElectron
- 結論
    - セキュアなIPC通信にはcontextBridgeを使う必要がある。
- Electronの構造
    - メインプロセス
        - Electronのプロセス(MVCでいうところのModel・Controller)を起動する。
    - レンダラープロセス
        - Electronの表示プロセス(Viewer)を起動する。
    - IPC通信
        - レンダラープロセスからの信号や情報をメインプロセスへ伝える
#### よりよいReact
    - 
    - 
### 参考文献
- [Webアプリケーション開発のツールやライブラリのまとめ](https://qiita.com/EBIHARA_kenji/items/3123eadd2dc2eb577bbc)
- [npm vs yarnどっち使うかの話](https://blog.minimalcorp.com/users/jigen/posts/3c08ecb4391ae4836cd84d27378440ae)
- [Intro to the TSConfig Reference](https://www.staging-typescript.org/tsconfig)
- [tsconfig.jsonの全オプションを理解する（随時追加中）](https://qiita.com/ryokkkke/items/390647a7c26933940470)
- [ElectronでcontextBridgeによる安全なIPC通信](https://qiita.com/pochman/items/64b34e9827866664d436)
- [ESLint 最初の一歩](https://qiita.com/mysticatea/items/f523dab04a25f617c87d)
- [Prettier 入門 ～ESLintとの違いを理解して併用する～](https://qiita.com/soarflat/items/06377f3b96964964a65d)
- [Step by Stepで始めるESLint](https://qiita.com/howdy39/items/6e2c75861bc5a14b2acf)
- [ESLint Rules 早見表](https://github.com/cawpea/eslint-rules)
- [webpackとBabelの基本を理解する(1) ―webpack編―](https://qiita.com/koedamon/items/3e64612d22f3473f36a4)
- [ElectronでcontextBridgeによる安全なIPC通信（受信編）](https://qiita.com/pochman/items/62de713a014dcacbad68)