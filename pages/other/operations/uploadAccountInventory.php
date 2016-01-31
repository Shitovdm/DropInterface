<?php
$steamID = $_POST['steamid'];
session_start();
$lang = $_SESSION['lang'];

$url = "https://steamcommunity.com/profiles/".$steamID."/inventory/json/730/2/";

$inv = curl_init($url);

curl_setopt($inv, CURLOPT_RETURNTRANSFER, true);
curl_setopt($inv, CURLOPT_CONNECTTIMEOUT, 3);
$output_curl = curl_exec($inv);
curl_close($inv);	

$error = 0;
if($output_curl != "null"){
	if(isset(json_decode($output_curl)->Error)){
		// Обработка ошибок.
		if(json_decode($output_curl)->Error == "This profile is private."){
			// Профиль скрыт.
			if($lang == 1){
				$error = "Инвентарь скрыт, пожалуйста откройте инвентарь аккаунта.";
			}else{
				$error = "Profile inventory is private.";
			}
		}else{
			// Другая ошибка.
			$error = json_decode($output_curl)->Error;
		}
	}else{
		// Если ошибок нет.
		$error = false;
		
		$data = json_decode($output_curl)->rgDescriptions;
		$k = 0;
		$counter = 0;
		foreach($data as $element ){
			// Отбираем только сувенирные коробки.
			if(substr($element->market_name, -16) == "Souvenir Package"){
				//$classid_instanceid[$counter] = $element->classid . '_' . $element->instanceid;
				//$market_hash_name[$counter] = $element->market_hash_name;
				$icon_url[$counter] = $element->icon_url;
				//$item_image[$counter] = "http://community.edgecast.steamstatic.com/economy/image/" . $icon_url[$k] ."/360fx360f";
				$counter++;
			}
			$k++;
			if($counter == 4){ break; }
		}	
	}
	$content = '';
	for($k = 0; $k < $counter; $k++){
		$content .= '<div class="account-package">';
			$content .= '<img src="http://community.edgecast.steamstatic.com/economy/image/' . $icon_url[$k] . '/130fx130f">';
		$content .= '</div>';
	}
}else{
	if($lang == 1){
		$error = 'Сервер Стима не отвечает на запросы. Попробуйте позже.';
	}else{
		$error = 'Server of Steam is offline. Try later again.';
	}	
}



$response = array(
	'error' => $error,
	'content' => $content,
	'curl' => $output_curl
);
echo json_encode($response);

?>