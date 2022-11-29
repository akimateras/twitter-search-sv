# Twitter Search SV

ブラウザで開いたTwitterの検索結果を自動リロード　&　特定文字列を見つけたときに通知するブックマークレットです。
デフォルトでは10秒ごとに検索結果をリロードし、連続する6文字の英数字を見つけたときに通知します。

![Screen Shot](/ss.png)

こんな感じで検索画面の上に見つけた文字列を通知します。
ブラウザがサポートしている場合は、音声も鳴らします。

# 実行環境

デスクトップPC上で実行するGoogle Chromeを想定しています。

# 使い方

## ブックマークレットを作る

1. Google Chromeを起動し `Ctrl + Shift + O` でブックマークマネージャを開く。
2. `右クリック` - `ブックマークを追加` でブックマーク追加プロンプトを開く。
3. `名前` 欄に好きな名前を入力する。
4. `URL` 欄に [ブックマークレット](https://raw.githubusercontent.com/akimateras/twitter-search-sv/master/bookmarklet.txt) の内容をコピペする。
5. `保存` ボタンを押して作成完了。

## ブックマークレットを使う

1. Google Chrome で Twitter を開き、好きなキーワードで検索する。
2. 検索結果の `最新` タブに移動する。
3. 作成したブックマークレットを実行する（ブックマークとして開こうとすると実行されます）。

ブックマークレット実行後にTwitter内で画面遷移を行う（別の検索タブを開くなどする）と挙動がおかしくなるので、一度タブを閉じて手順を最初からやり直してください。

# 通知の調整

自分で通知対象のカスタマイズなどを行いたい場合は `script.js` を編集し、以下の手順でブックマークレットを再生成してください（自力で弄れる知識がある方向けです）。

## Install Compiler

https://www.npmjs.com/package/uglify-js

## Compile

```
echo "javascript:$(uglifyjs script.js -c toplevel -m toplevel)" > bookmarklet.txt
```
