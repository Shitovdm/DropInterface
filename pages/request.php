
<?php
/*		README!!
*	При смене канала необходимо не только вписать id и имя канала, но и подобрать нужную длинну, которую вписать в Content-lenght.
*/
require_once("../service/dbconnect.php");
$full_response = "";
$short_response = "";
$select_data = mysql_query("SELECT * FROM twitch_user_data");
$i=0;
while ($row = mysql_fetch_assoc($select_data)) {	
	$user_name[$i] =$row['user_name'];
	$steam_id[$i] =$row['steamid'];
	
	$i++;
}

//	Формируем массивы данных. Отправляем запросы.
for($j=80;$j<100;$j++){	

	//	Формируем данные.
	
	$headers = array( 
		":authority:api.twitch.tv",
		":method:GET",
		":path:/steam/watching?channel=76561198304717106&viewer=" . $steam_id[$j],
		":scheme:https",
		"accept:*/*",
		"accept-encoding:gzip, deflate, br",
		"accept-language:ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"origin:https://www.twitch.tv",
		"referer:https://www.twitch.tv/eleaguetv",
		"user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
	);
	
	$url = "https://api.twitch.tv/steam/watching?channel=76561198304717106&viewer=" . $steam_id[$j];
	//	Отправляем запрос.
	$c = curl_init();
	curl_setopt($c, CURLOPT_HEADER, true);
	curl_setopt($c, CURLOPT_URL, $url);
	curl_setopt($c, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36");
	curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($c, CURLOPT_HTTPHEADER, $headers);
	$response[$j] = curl_exec($c);
	curl_close($c);

	if(substr($response[$j],0,12) == "HTTP/1.1 204"){
		$status = "Ok";
	}else{
		$status = "Unsuccessfully";
	}
	
	//	Формируем лог.
	$full_response .= "User: " . $user_name[$j] . "; SteamID: " . $steam_id[$j] . " [" . date("d.m.Y H:i:s") . "] Server response: " . $status . "<br>";
}


$res = array(
	"full" => $full_response
);
echo json_encode($res);
?>