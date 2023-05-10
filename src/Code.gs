// ベアラートークンと認証用インスタンス
var bearerToken = 'ベアラートークン'
var twitter = TwitterWebService.getInstance(
  'Consumer API Key',         // 作成したアプリケーションのConsumer Key
  'Consumer API Secret Key'  // 作成したアプリケーションのConsumer Secret
);
var userID = '9999999999999999999'    // Twitter ユーザID

// 認証周り
function authorize() { twitter.authorize(); }                            // 認証
function reset() { twitter.reset(); }                                    // 認証解除
function authCallback(request) { return twitter.authCallback(request); } // 認証後のコールバック

// シートを取得
// var sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1"); // 「シート1」はシート名

// APIコール時のオプション(GET)
const getOption = {
  method: 'get',
  contentType: 'application/json',
  muteHttpExceptions: true,
  headers: { Authorization: 'Bearer ' + bearerToken }
}
// APIコール時のオプション(POST)
const postOption = {
  method: 'post',
  contentType: 'application/json',
  muteHttpExceptions: true,
  headers: { Authorization: 'Bearer ' + bearerToken },
}
