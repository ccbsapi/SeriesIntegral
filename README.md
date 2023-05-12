# SeriesIntegral
級数・積分bot

# Gas
```clasp```とGithub Actionsを使用してGoogle Apps Scriptに反映.
GAS側ではScriptPropertiesとして```consumerKey```,```consumerSecret```を保存

# 数式データの管理
```/assets/```内に色々なデータを置く。```/src/```は**弄らない** (GASに反映されてしまう)

ツイートは```/assets/formulae.json```からランダムに行われる。

# コーディング規約
数式を表示する際のルールについて

- $\mathrm{d} x$ の $\mathrm{d}$ は ```\mathrm{d}``` を使う。
- 逆関数は ```arc``` や ```ar``` を使わずに $-1$ 乗を使う。 ex) $\arcsin$ ではなく $\sin^{-1}$
- 自然対数は $\log$ ではなく $\ln$ を使う。
