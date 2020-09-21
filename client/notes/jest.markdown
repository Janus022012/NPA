# JESTについて
### 概要
Jestは、JSDOMを使用して、仮想ブラウザを使用する事でフロントエンドのコンポーネントをテストするライブラリである。
### ディレクトリ構成
```
--/components
 |_　/__test__
 |    |_ App.test.js
 |    |_ App.spec.js
 |
 |_ App.js

```

### 例
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
// 基本構文 it('テストの概要', テストロジック)

it('show a comment box', () => {
  // expect(検査しようとしているDOM要素).Matcher statement(期待される要素)
  const div = document.createElement('div');
  React.render(<App/>, div);
  expect(div.innerHTML).toContain('Comment Box') 
  
  ReactDOM.unmountComponentAtNode(div);　

})
```
### 参照