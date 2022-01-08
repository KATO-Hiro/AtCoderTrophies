# AtCoderTrophies

<p align="center">
  <img width="140" src="https://user-images.githubusercontent.com/13990347/143733378-4dafebc9-855c-4a8f-9019-c54edb330827.png" />
  <p align="center">🏆 AtCoderに関連する統計情報を利用してトロフィーアイコンを動的に生成し、READMEに貼ることができます。</p>
</p>
<p align="center">
  <a href="https://github.com/KATO-Hiro/AtCoderTrophies/issues">
    <img alt="GitHub Repo Issues" src="https://img.shields.io/github/issues/KATO-Hiro/AtCoderTrophies?style=plastic"/>
  </a>
  <a href="https://github.com/KATO-Hiro/AtCoderTrophies/stargazers">
    <img alt="GitHub Repo Stars" src="https://img.shields.io/github/stars/KATO-Hiro/AtCoderTrophies?style=plastic">
  </a>
  <a href="https://github.com/KATO-Hiro/AtCoderTrophies/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=plastic" alt="License: MIT" />
  </a>

</p>
<p align="center">
  <a>
    <a href="https://twitter.com/intent/tweet?text=Add%20dynamically%20generated%20AtCoder%20Stat%20Trophies%20to%20your%20readme.%0D%0A&url=https%3A%2F%2Fgithub.com%2FKATO-Hiro%2FAtCoderTrophies">
    <img alt="Twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2FKATO-Hiro%2FAtCoderTrophies">
  </a>
</p>

***DEMO***

<div align="center">
  <video width= 300 src="https://user-images.githubusercontent.com/13990347/147845353-d154bb01-1050-47b6-87b6-b53780de0785.mp4" autoplay muted controls loop></video>
</div>

## 主な機能

- [AtCoder](https://atcoder.jp/)に関連する統計APIを利用して、トロフィーアイコンを動的に生成します。
- 生成したトロフィーをREADMEに貼ることができます。
  - 対応形式: HTML, Markdown

## クイックスタート

以下のコードをREADMEに追加するだけです。その際に、`?username=`の値をAtCoderで登録しているユーザ名に変更してください。

<p align="center">
  <img width=660 src="https://user-images.githubusercontent.com/13990347/144709620-3b7db39b-133a-42d8-af8c-c0ce808ed7cd.png" />
</p>

```md
[![AtCoder Trophies](https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp)](https://github.com/KATO-Hiro/AtCoderTrophies)
```

### テーマを利用する

テーマに関するオプションのパラメータを追加します(**[詳細](#theme---テーマを適用する)**)。

以下のサンプルは、`monokai`を適用したものです。

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709732-37dbc25b-6c7b-4852-a493-7251d3849872.png">
</p>

```md
[![AtCoder Trophies](https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=monokai)](https://github.com/KATO-Hiro/AtCoderTrophies)
```

## トロフィーのランク

ランクは、`SSS`, `SS`, `S`, `AAA`, `AA`, `A`, `B`, `C`, `UNKNOWN`,  `SECRET`の10種類です。

|  ランク  |  説明  |
| ---- | ---- |
|  SSS, SS, S  | ごく一部のユーザだけが到達できるランクです。大いに自慢してください。 |
|  AAA, AA, A  | 継続的に努力できれば到達可能です。まずは、このランクを目指しましょう。 |
|  B, C  | 順調です。もう少し上を目指してみましょう。 |
| UNKNOWN | [AtCoder](https://atcoder.jp/)のアカウントを登録して、簡単な問題を解いてみましょう。 |
| SECRET | 非常に珍しいランクです。特定の条件を満たすと、トロフィーが表示されます。 |

### シークレット・トロフィー

獲得条件は秘密ですが、本プロジェクトのソースコードを読めば知ることができます。

<p align="center">
  <img width="110" src="https://user-images.githubusercontent.com/13990347/144745914-57ebdb32-dfb2-4bf8-80e7-4869b5ba6eda.png" />
</p>

シークレット・トロフィーは、まだまだ少ないです。面白い条件を思いついたら、[Issue](https://github.com/KATO-Hiro/AtCoderTrophies/issues)や[Pull Request](https://github.com/KATO-Hiro/AtCoderTrophies/pulls)の投稿をお待ちしています。

## トロフィーの詳細

<p align="center">
  <img width="220" src="https://user-images.githubusercontent.com/13990347/144746506-8d08bfb0-ba7e-4c33-be96-3b029a71292d.png" />
</p>

1. トロフィーの名称
2. 現在のランク
3. 現在のランクに応じた称号
4. 獲得ポイント
5. プロセスバー(次のランクに上がるために必要なポイントに対する達成率を表示)

## (オプション) リクエスト・パラメータ

* [title](#title---タイトルでフィルタリング)
* [rank](#rank---トロフィーのランクでフィルタリング)
* [row](#row-and-column---最大の行数と列数を指定する)
* [column](#row-and-column---最大の行数と列数を指定する)
* [theme](#theme---テーマを適用する)
* [margin_w](#margin---余白)
* [margin_h](#margin---余白)
* [no_bg](#no_bg---トロフィーの背景を透明にする)
* [no_frame](#no_frame---トロフィーの枠線を非表示にする)

### title - タイトルでフィルタリング

トロフィーのタイトル(一部の言語は略称も可能)を指定することで、表示する内容を絞り込むことができます。

以下のサンプルでは、`CPlusPlus`を選択しています。

<p align="center">
  <img width="110" src="https://user-images.githubusercontent.com/13990347/144745947-8a78a9ff-16dc-46e5-baea-08e383681027.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&title=CPlusPlus
```

複数のタイトルを指定する場合は、カンマ(前後の空白は不要)で区切ります。

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&title=AC,CPlusPlus
```

### rank - トロフィーのランクでフィルタリング

トロフィーのランクを指定することで、表示する内容を絞り込むことができます。

`指定できる値: SECRET SSS SS S AAA AA A B C`

以下のサンプルでは、ランク`AAA`を選択しています。

<p align="center">
  <img width="330" src="https://user-images.githubusercontent.com/13990347/144745957-2fde0596-19a5-4844-bd5d-1db98e8ef572.png" />
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&rank=AAA
```

複数のランクを指定する場合は、カンマ(前後の空白は不要)で区切ります。

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&rank=AAA,AA,A
```

### row and column - 最大の行数と列数を指定する

トロフィーを表示する最大の行数と列数を指定することができます。なお、指定した行・列の範囲を超えた分については表示されません。

`指定できる値: number 型`

`デフォルト値: row=3 column=7`

行のみ指定:

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&row=2
```

列のみ指定:

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&column=2
```

行・列ともに指定:

以下のサンプルでは、2行3列を指定した場合を表示しています。

<p align="center">
  <img width="330" src="https://user-images.githubusercontent.com/13990347/144745971-a6cae6ea-715c-47a7-b314-35448955224f.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&row=2&column=3
```

### theme - テーマを適用する

利用可能なテーマの一覧です。

|  テーマ  |
| ---- |
| [alduin](#alduin) |
| [algolia](#algolia) |
| [apprentice](#apprentice)|
| [buddhism](#buddhism) |
| [chalk](#chalk) |
| [darkdimmed](#darkdimmed) |
| [darkhub](#darkhub) |
| [discord](#discord) |
| [dracula](#dracula) |
| [flat](#flat) |
| [gitdimmed](#gitdimmed) |
| [gruvbox](#gruvbox) |
| [juicyfresh](#juicyfresh) |
| [matrix](#matrix) |
| [monokai](#monokai) |
| [nord](#nord) |
| [oldie](#oldie) |
| [onedark](#onedark) |
| [onestar](#onestar) |
| [radical](#radical) |
| [tokyonight](#tokyonight) |

#### alduin

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709630-211ee5d3-1d27-4118-800a-a47daed93ece.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=alduin
```

#### algolia

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709639-b73008b0-5084-40f6-be48-26a98e531e97.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=algolia
```

#### apprentice

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709643-ecb94107-94b5-43dd-b7a4-38e9c1d509af.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=apprentice
```

#### buddhism

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709650-e2871d86-0da0-4223-8bdf-4c027b6e59c3.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=buddhism
```

#### chalk

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709657-b060cd26-fd27-4c3f-9e8a-12efd3cbbf05.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=chalk
```

#### darkdimmed

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/146775285-b47e3ab2-098d-4512-9fd6-75f3fcad80e6.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=darkdimmed
```

#### darkhub

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709670-49d96660-c594-43bf-86c8-224712d56e86.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=darkhub
```

#### discord

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709680-51d86d4c-bc5b-4a24-b780-d7d8311ac500.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=discord
```

#### dracula

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709688-e023770a-ed71-4248-a24e-906580c3eec8.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=dracula
```

#### flat

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709695-2b779ae7-c0e6-43c1-83a0-ba9cbdfa7e54.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=flat
```

#### gitdimmed

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709704-0de2a649-a399-45f6-914b-1b94158b87f9.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=gitdimmed
```

#### gruvbox

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709711-d51afe90-5cce-4d0c-b5ba-25bd4576dbfd.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=gruvbox
```

#### juicyfresh

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709721-5b7d2463-55bc-437b-9fa7-af41196683a8.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=juicyfresh
```

#### matrix

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709728-38491766-bcab-4064-8bed-78537ddfb79e.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=matrix
```

#### monokai

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709732-37dbc25b-6c7b-4852-a493-7251d3849872.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=monokai
```

#### nord

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709740-23f37002-16cc-4366-a49f-a58f69eb7da8.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=nord
```

#### oldie

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709747-94d4dbc6-e462-4436-bb38-a7f2de01ea48.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=oldie
```

#### onedark

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709756-9ad20719-be6f-49e4-b036-0daf07370986.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=onedark
```

#### onestar

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709767-07329fc8-c75f-4159-9b07-9b3079b84c5a.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=onestar
```

#### radical

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709773-30d163c2-1b63-4ed7-9bfc-f3b54aaca636.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=radical
```

#### tokyonight

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709783-8a1fb78e-9170-4842-aada-7dc98a43bc7a.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=tokyonight
```

## margin - 余白

### 余白(幅)

トロフィーとトロフィーの間に余白(幅)を入れることができます。

`指定できる値: number 型`

`デフォルト値: margin_w=0`

```
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&margin_w=15
```

### 余白(高さ)

トロフィーとトロフィーの間に余白(高さ)を入れることができます。

`指定できる値: number 型`

`デフォルト値: margin_h=0`

```
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&margin_h=15
```

### レイアウトのサンプル

以下のサンプルでは、幅と高さの余白がいずれも15の場合を表示しています。

<p align="center">
  <img width="360" src="https://user-images.githubusercontent.com/13990347/144745981-9efd046a-9c20-4856-8ec6-8422bad66dcc.png">
</p>

```
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&margin_w=15&margin_h=15
```

## no_bg - トロフィーの背景を透明にする

トロフィーの背景を透明にすることができます。

`指定できる値: boolean 型 (true or false)`

`デフォルト値: no_bg=false`

<p align="center">
  <img width=660 src="https://user-images.githubusercontent.com/13990347/145216185-0e6def4c-6438-4350-be0a-9ef3c9a24cbb.png">
</p>

```
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&no_bg=true
```

## no_frame - トロフィーの枠線を非表示にする

トロフィーの枠線を非表示にすることができます。

`指定できる値: boolean 型 (true or false)`

`デフォルト値: no_frame=false`

<p align="center">
  <img width=660 src="https://user-images.githubusercontent.com/13990347/145216231-948034ac-3944-4998-89b5-71f965474a2f.png">
</p>

```
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&no_frame=true
```

## コントリビューションに関するガイドライン

[Contribution Guide](https://github.com/KATO-Hiro/AtCoderTrophies/blob/main/docs/CONTRIBUTING.md)

## スペシャルサンクス

[AtCoder](https://atcoder.jp/)

[AtCoder Problems API / Datasets](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md)

[Champion Vectors by Vecteezy](https://www.vecteezy.com/free-vector/champion)

[Github Profile Trophy](https://github.com/ryo-ma/github-profile-trophy)

[Readme Driven Development; RDD](https://qiita.com/b4b4r07/items/c80d53db9a0fd59086ec)

## 関連プロジェクト

[AtCoder Badges](https://atcoder-badges.vercel.app/)

[GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)

[Zenn.badge](https://zenn-badge-nikaera.vercel.app/)

## 作者

[@KATO-Hiro](https://twitter.com/k_hiro1818)

## ライセンス

[MIT](https://github.com/KATO-Hiro/AtCoderTrophies/blob/main/LICENSE)
