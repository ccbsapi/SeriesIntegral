'use strict';

const consumerKey = 'OBHGSZUPAM7jWA7rDBuPZAEJ6'
const consumerSecret = 'nF3HE0lyMZkg1i0cwu5j27gBbmutny1PD25c6fXBOugqPsWS07'

const client = TwitterClient2.getInstance(consumerKey, consumerSecret)

/**
 * ①Twitterで作ったアプリに登録するための callbackUrl を取得する
 * 実行後 『表示』→『ログ』でURLを確認してTwitterアプリに登録
 */
function getCallbackUrl() {
  Logger.log('以下のURLをTwitterアプリのCallbackURLに登録');
  Logger.log(client.getCallbackUrl());
}

/**
 * ②認証を実行する
 * 実行後『表示』→『ログ』で表示されたURLに移動
 */
function authorize () {
  client.authorize()
}


/**
 * ③ APIを実行する（この辺はアレンジしてください）
 * ※この処理では「シート1」から投稿内容を取得してツイートしてます
 */
function postTweet () {
  // pickUpTweetInOrderは用意しました
  const message = "テストツイート";
  client.postTweet(message);
}


/**
 * 認証を削除したい時はこれを実行する
 */
function reset () {
  client.reset()
}


/**
 * authorizeでTwitterでの認証後に実行される処理
 * ※手動で実行はしません
 */
function authCallback (request) {
  return client.authCallback(request)
}