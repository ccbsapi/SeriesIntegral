# SeriesIntegral
Twitterの[級数・積分bot](https://twitter.com/SeriesIntegral)のプログラム

# GASとの連携
```clasp```とGithub Actionsを使用してGoogle Apps Scriptに反映.
GAS側ではScriptPropertiesとして```consumerKey```,```consumerSecret```を保存

# 数式データの管理
```/assets/```内に色々なデータを置く。```/src/```は**弄らない** (GASに反映されてしまう)

ツイートは```/assets/series.json```か```/assets/integral.json```からランダムに行われる。

# コーディング規約
数式を表示する際のルールについて

- $\mathrm{d} x$ の $\mathrm{d}$ は ```\mathrm{d}``` を使う。
- 逆関数は ```arc``` や ```ar``` を使わずに $-1$ 乗を使う。 ex) $\arcsin$ ではなく $\sin^{-1}$
- 自然対数は $\log$ ではなく $\ln$ を使う。
- 調和数は $H_n$ を用いる。
- フィボナッチ数は $F_n$ を用いる。
- 二項係数は $\displaystyle \binom{n}{k}$ を用いる。

## 定数の表記
- 黄金比 $\displaystyle\frac{-1+\sqrt 5}2$ は $\phi$ ではなく $\varphi$ で表す。
- カタラン定数は $C$ や $G$ ではなく $\beta(2)$ と表す。

# 識別子の振り分け
各ツイート内容には識別子(formulae.jsonのkey)を割り当てる。
以下を大まかなキーワードとする(多重ポリログはゼータ扱い)。
## 級数
| 番号 | 内容 |
| --- | --- |
| 1 | 雑多 |
| 2 | ゼータ |
| 3 | 超幾何 |
| 4 | モジュラー形式 |
## 積分
| 番号 | 内容 |
| --- | --- |
| 1 | 雑多 |
| 2 | ゼータ |
| 3 | 超幾何 |
| 4 | モジュラー形式 |
| 5 | 留数定理 |
| 6 | メリン変換等 | 
