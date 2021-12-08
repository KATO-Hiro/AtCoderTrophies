# AtCoderTrophies

<p align="center">
  <img width="140" src="https://user-images.githubusercontent.com/13990347/143733378-4dafebc9-855c-4a8f-9019-c54edb330827.png" />
  <p align="center">🏆 Add dynamically generated AtCoder Stat Trophies to your readme.</p>
</p>
<p align="center">
  <a href="https://github.com/KATO-Hiro/AtCoderTrophies/issues">
    <img alt="GitHub Repo Issues" src="https://img.shields.io/github/issues/KATO-Hiro/AtCoderTrophies"/>
  </a>
  <a href="https://github.com/KATO-Hiro/AtCoderTrophies/stargazers">
    <img alt="GitHub Repo Stars" src="https://img.shields.io/github/stars/KATO-Hiro/AtCoderTrophies">
  <a href="https://github.com/KATO-Hiro/AtCoderTrophies/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/KATO-Hiro/AtCoderTrophies"/>
  </a>

</p>
<p align="center">
  </a>
    <a href="https://twitter.com/intent/tweet?text=Add%20dynamically%20generated%20AtCoder%20Stat%20Trophies%20to%20your%20readme.%0D%0A&url=https%3A%2F%2Fgithub.com%2FKATO-Hiro%2FAtCoderTrophies">
    <img alt="Twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2FKATO-Hiro%2FAtCoderTrophies">
  </a>
</p>

***DEMO***

<div align="center">

  ![demo]()

  <img width src="https://user-images.githubusercontent.com/13990347/144709620-3b7db39b-133a-42d8-af8c-c0ce808ed7cd.png" />
</p>

</div>

## Features

- TODO: Write here.

## Quick Start

Add the following code to your readme. When pasting the code into your profile's readme, change the `?username=` value to your AtCoder's username.

```md
[![AtCoder Trophies](https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai)](https://github.com/KATO-Hiro/AtCoderTrophies)
```

### Use theme

Add an optional parameter of the theme. **[More details](#apply-theme)**

In the following sample, `monokai` is applied.

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/13990347/144709732-37dbc25b-6c7b-4852-a493-7251d3849872.png">
</p>

```md
[![AtCoder Trophies](https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&theme=monokai)](https://github.com/KATO-Hiro/AtCoderTrophies)
```

## About Rank

The ranks are `SSS`, `SS`, `S`, `AAA`, `AA`, `A`, `B`, `C`, `UNKNOWN` and `SECRET`.

|  Rank  |  Description  |
| ---- | ---- |
|  SSS, SS, S  | You are at a hard to reach rank. You can brag. |
|  AAA, AA, A  | You will reach this rank if you do your best. Let's aim here first. |
|  B, C  | You are currently making good process. Let's aim a bit higher. |
| UNKNOWN | You have not taken action yet. Let's act first. |
| SECRET | This rank is very rare. The trophy will not be displayed until certain conditions are met. |

### Secret Rank

The conditions for earning it are secret, but you can find out the conditions by reading this repository code.

<p align="center">
  <img width="110" src="https://user-images.githubusercontent.com/13990347/144745914-57ebdb32-dfb2-4bf8-80e7-4869b5ba6eda.png" />
</p>

There are still few secret trophies.
Therefore, if you come up with interesting conditions, I am waiting for contributions.

## About Display Details

<p align="center">
  <img width="220" src="https://user-images.githubusercontent.com/13990347/144746506-8d08bfb0-ba7e-4c33-be96-3b029a71292d.png" />
</p>

1. Trophy name.
2. Current rank.
3. Title based on rank.
4. Earned points.
5. Process bar that shows the points needed to get from your current rank to the next rank.

## Optional Request Parameters

* [title](#filter-by-titles)
* [rank](#filter-by-ranks)
* [row](#specify-the-maximum-row--column-size)
* [column](#specify-the-maximum-row--column-size)
* [theme](#apply-theme)
* [margin-w](#margin-width)
* [margin-h](#margin-height)
* [no-bg](#transparent-background)
* [no-frame](#hide-frames)

### Filter by titles

You can filter the display by specifying the titles of the trophy.

In the following sample, `CPlusPlus` is selected.

<p align="center">
  <img width="110" src="https://user-images.githubusercontent.com/13990347/144745947-8a78a9ff-16dc-46e5-baea-08e383681027.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&title=CPlusPlus
```

If you want to specify multiple titles.

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&title=AC,CPlusPlus
```

### Filter by ranks

You can filter the display by specifying the ranks.

`Available values: SECRET SSS SS S AAA AA A B C`

In the following sample, rank `AAA` is selected.

<p align="center">
  <img width="330" src="https://user-images.githubusercontent.com/13990347/144745957-2fde0596-19a5-4844-bd5d-1db98e8ef572.png" />
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&rank=AAA
```

If you want to specify multiple ranks.

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&rank=AAA,AA,A
```

### Specify the maximum row & column size

You can specify the maximum size of rows and columns.
Trophies will be hidden if they exceed the range of both rows and columns.

`Available value: number type`

`Default: row=3 column=7`

Restrict only row:

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&row=2
```

Restrict only column:

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&column=2
```

Restrict row & column:

The following sample shows the case of two rows and three columns.

<p align="center">
  <img width="330" src="https://user-images.githubusercontent.com/13990347/144745971-a6cae6ea-715c-47a7-b314-35448955224f.png">
</p>

```md
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&row=2&column=3
```

### Apply theme

List of available themes.

|  theme  |
| ---- |
| [alduin](#alduin) |
| [algolia](#algolia) |
| [apprentice](#apprentice)|
| [buddhism](#buddhism) |
| [chalk](#chalk) |
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

## Margin

### Margin Width

You can put a margin in the width between trophies.

`Available value: number type`

`Default: margin_w=0`

```
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&margin_w=15
```

### Margin Height

You can put a margin in the height between trophies.

`Available value: number type`

`Default: margin_h=0`

```
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=chokudai&margin_h=15
```

### Example layout

The following sample shows a case where the width and height margins are 15.

<p align="center">
  <img width="360" src="https://user-images.githubusercontent.com/13990347/144745981-9efd046a-9c20-4856-8ec6-8422bad66dcc.png">
</p>

```
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&margin_w=15&margin_h=15
```

## Transparent background

You can turn the background transparent.

`Available value: boolean type (true or false)`

`Default: no_bg=false`

<p align="center">
  <img width=660 src="">
</p>

```
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&no_bg=true
```

## Hide frames

You can hide the frames around the trophies.

`Available value: boolean type (true or false)`

`Default: no_frame=false`

<p align="center">
  <img width=660 src="">
</p>

```
https://atcoder-trophies.vercel.app/api/v1/atcoder?username=semiexp&no_frame=true
```

## Contribution Guide

- TODO: Add link.

## Special Thanks

[AtCoder](https://atcoder.jp/)

[AtCoder Problems API / Datasets](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md)

[Champion Vectors by Vecteezy](https://www.vecteezy.com/free-vector/champion)

[Github Profile Trophy](https://github.com/ryo-ma/github-profile-trophy)

[Readme Driven Development; RDD](https://qiita.com/b4b4r07/items/c80d53db9a0fd59086ec)

## Related Projects

[AtCoder Badges](https://atcoder-badges.vercel.app/)

[GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)

[Zenn.badge](https://zenn-badge-nikaera.vercel.app/)

## Author

[@KATO-Hiro](https://twitter.com/k_hiro1818)

## License

[MIT](https://github.com/KATO-Hiro/AtCoderTrophies/blob/main/LICENSE)