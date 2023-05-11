'use strict';

const { consumerKey, consumerSecret } = PropertiesService.getScriptProperties().getProperties();

const client = TwitterClient2.getInstance(consumerKey, consumerSecret)

/**
 * * ①Twitterで作ったアプリに登録するための callbackUrl を取得する
 * * 実行後 『表示』→『ログ』でURLを確認してTwitterアプリに登録
 * */
 function getCallbackUrl() {
   Logger.log('以下のURLをTwitterアプリのCallbackURLに登録');
   Logger.log(client.getCallbackUrl());
 }
 
 /**
  * * ②認証を実行する
  * * 実行後『表示』→『ログ』で表示されたURLに移動
  * */
  function authorize () {
    client.authorize()
  }
  
  
  
  /**
   * * ③ APIを実行する（この辺はアレンジしてください）
   * * ※この処理では「シート1」から投稿内容を取得してツイートしてます
   * */
   function postTweet () {
     // pickUpTweetInOrderは用意しました
     const message = "メディアツイート";
     const media = ["1656307125419921408"];
     client.postTweet(message,null,media);
   }
   
   
   /**
    * * 認証を削除したい時はこれを実行する
    * */
    function reset () {
      client.reset()
    }
    
    
    /**
     * * authorizeでTwitterでの認証後に実行される処理
     * * ※手動で実行はしません
     * */
     function authCallback (request) {
       return client.authCallback(request)
     }
     
     
     /**
      * * Googleドライブから画像を取得してアップロード
      * * @return {String}
      * */
      TwitterClient2.prototype.uploadTwitterForDriveMedia = function (fileId) {
        // ファイルアップロード処理
        const fileByApp = DriveApp.getFileById(fileId)
        const uploadData = fileByApp.getBlob().getBytes();
        const segment = 5000000; // 5.0MB
        const segmentMax = Math.ceil(uploadData.length / segment);
        const uploadUrl = 'https://upload.twitter.com/1.1/media/upload.json';
        // INIT
        const mimeType = fileByApp.getMimeType();
        const isVideo = mimeType.match(/video/);
        const initParams = {
          command: 'INIT',
          total_bytes: fileByApp.getSize(),
          media_type: mimeType,
          media_category: isVideo ? 'amplify_video' : 'tweet_image'
        }
        console.log(initParams);
        console.log('INIT');
        const initResult = this.postRequestForm(uploadUrl, initParams);
        // APPEND
        for (let i=0; i< segmentMax; i++) {
          const sliceData = uploadData.slice(segment * i, segment * (i + 1)); 
          const appendParams = {
            command: 'APPEND',
            media_id: initResult.media_id_string,
            media_data: Utilities.base64Encode(sliceData), 
            segment_index: i
          }
          console.log('APPEND');
          this.postRequestForm(uploadUrl, appendParams);
        }
        // FINALIZE
        const finalizeParams = {
          command: 'FINALIZE',
          media_id: initResult.media_id_string,
        }
        console.log('FINALIZE');
        this.postRequestForm (uploadUrl, finalizeParams);
        if (isVideo) {
          for (let i = 0; i < 10; i++) {
            // STATUS
            const statusParams = {
              command: 'STATUS',
              media_id: initResult.media_id_string,
            }
            console.log('STATUS');
            const statusResult = this.getRequest(uploadUrl, statusParams); 
            if (statusResult.processing_info) {
              console.log(statusResult.processing_info.progress_percent + '%完了');
              if (statusResult.processing_info.state === 'succeeded')  break;
            Utilities.sleep(2000);
            }
          }
        }
            return initResult.media_id_string;
      }