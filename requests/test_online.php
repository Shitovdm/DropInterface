<?php

$headers = array( 
	":authority:api.twitch.tv",
	":method:GET",
	":path:/steam/watching?channel=76561198206307391&viewer=76561198269415170",
	":scheme:https",
	"accept:*/*",
	"accept-encoding:gzip, deflate, br",
	"accept-language:ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
	"origin:https://www.twitch.tv",
	"referer:https://www.twitch.tv/tenshixgod",
	"user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
);


//	Отправляем запрос.
$c = curl_init();
curl_setopt($c, CURLOPT_HEADER, true);
curl_setopt($c, CURLOPT_URL, "https://api.twitch.tv/steam/watching?channel=76561198206307391&viewer=76561198269415170");
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
curl_setopt($c, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($c);
curl_close($c);

//	Формируем лог.
$full_response = " [" . date("d.m.Y H:i:s") . "] Server response: " . $response . "<br>";

$res = array(
	"short" => $response,
	"full" => $full_response
);
echo json_encode($res);
?>
    