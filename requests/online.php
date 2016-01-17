<?php
/*
{"session_id":"51cfffc0c6b33d36","availability":"idle","activity":{"type":"watching","game":"Counter-Strike: Global Offensive","channel_display_name":"inetkoxTV","channel_login":"inetkoxtv","channel_id":"80947159"}}

{"session_id":"303f79e3e2ca50d6","availability":"online","activity":{"type":"watching","game":"Counter-Strike: Global Offensive","channel_display_name":"Starladder5","channel_login":"starladder5","channel_id":"28633374"}}:
*/

/*
{"session_id":"473b3cc08074f7f3","availability":"online","activity":{"type":"watching","game":"Poker","channel_display_name":"loodoman888","channel_login":"loodoman888","channel_id":"146174292"}}:

z3u8z7yanu9904nvvzds09h90gams7
{"session_id":"5390dba499ced2ef","availability":"online","activity":{"type":"watching","game":"Counter-Strike: Global Offensive","channel_display_name":"ScreaM","channel_login":"scream","channel_id":"39393054"}}:

$data_alfa09 = array(
	"session_id" => "5390dba499ced2ef",
	"availability" => "online",
	"activity" => array(
		"type" => "watching",
		"game" => "Poker",
		"channel_display_name" => "loodoman888",
		"channel_login" => "loodoman888",
		"channel_id" => "146174292"
	)
);

*/


$data_mckimley = array(
	"session_id" => "8c9dc6dd09e0ca39",//cfe338ec3903b639 //8c9dc6dd09e0ca39
	"availability" => "online",
	"activity" => array(
		"type" => "watching",
		"game" => "Counter-Strike: Global Offensive",
		"channel_display_name" => "ScreaM",
		"channel_login" => "scream",
		"channel_id" => "39393054"
	)
);

$data_mckimley = json_encode($data_mckimley);

$headers_mckimley = array( 'Host: presence.twitch.tv',
				  'Connection: keep-alive',
				  'Content-Length: 211',
				  'Pragma: no-cache',
				  'Cache-Control: no-cache',
				  'Accept: application/json, text/javascript, */*; q=0.01',
				  'Origin: https://www.twitch.tv',
				  'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
				  'Authorization: OAuth ja50c3mpmoinpr1puvllt5br8jvtz1',
				  'Content-Type: application/x-www-form-urlencoded; charset=UTF-8',
				  'Referer: https://www.twitch.tv/scream',
				  'Accept-Encoding: gzip, deflate, br',
				  'Accept-Language: ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4'
			);

$url = "https://presence.twitch.tv/v2/online";
/*Первый запрос*/
	$c = curl_init();
	curl_setopt($c, CURLOPT_HEADER, true);
	curl_setopt($c, CURLOPT_NOBODY, true);
	curl_setopt($c, CURLOPT_URL, $url);
	curl_setopt($c, CURLOPT_POST, 1);
	curl_setopt($c, CURLOPT_POSTFIELDS, $data_mckimley);
	curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($c, CURLOPT_HTTPHEADER, $headers_mckimley);
	$output_curl_mckimley = curl_exec($c);
	curl_close($c);



$response_mckimley = ("[" . date("d.m.Y H:i:s") . "] Server response: " . $output_curl_mckimley);

$JSON_response = array(
	'status_mckimley' => $response_mckimley
);
echo json_encode($JSON_response);
?>