function GetMap(options){
  // マップの作成
  const map = new Bmap("#myMap");

  // 現在地
  // 現在地の円の色・範囲
  // G's 付近を中心とする地図 // ズーム値
  map.startMap(35.667299, 139.714134, "load", 12);

  // イベント開催地
  map.infoboxLayers(options, true);
}



