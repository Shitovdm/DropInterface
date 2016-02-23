<?php
// В скрипте объединены 2 функции, 1я - Проверка наличия в БД username и e-mail.
// 2-я - Обработка регистрационных данных.

// Функция проверки наличия данных в базе.
function presenceCheck($field,$value){
	$flag = false;
	require_once("db.php"); 
	// Достаем из БД все записи пользователя об активных аккаунтах.
	$select_user_data = mysql_query("SELECT * 
										FROM TABLE 
										WHERE ".$field." = '".$value."' 
										LIMIT 1");
	if(mysql_num_rows($select_user_data) > 0){
		// Совпадения нашлись.
		$flag = true;
	}else{
		// В заданном параметре совпадений не найдено.
		$flag = false;
	}
	return $flag;
}
// Функция проверки введенных данных.
function isValide($field,$value){
	$flag = false;
	if($field == "login"){ // Проверка логина.
		if( (strlen($value) >= 3) && (strlen($value) < 15) ){
			if(preg_match("#^[aA-zZ0-9_]+$#",$value)){ // Проверка отсутствия постононних символов.
				if(!presenceCheck("username",$value)){ // Проверка на присутствие в БД.
					return true;
				}
			}
		}
	}
	if($field == "password"){
		if( (strlen($value) > 7) && (strlen($value) < 20) ){
			if(preg_match("#^[aA-zZ0-9_]+$#",$value)){ // Проверка отсутствия постононних символов.
				return true;
			}
		}
	}
	if($field == "email"){
		if(preg_match("/^(?:[a-z0-9]+(?:[-_.]?[a-z0-9]+)?@[a-z0-9_.-]+(?:\.?[a-z0-9]+)?\.[a-z]{2,5})$/i", $value)){
			if(!presenceCheck($field,$value)){ // Проверка на присутствие в БД.
				return true;
			}
		}
	}
	return $flag;
}
// Получение хеша пароля с солью.
function hashingPassword($password){
	// $encodePassword = ENCODE;
	$passwordHash = md5($encodePassword);
	return $passwordHash;
}
// Функция отправки e-mail.
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
function sendEmail($recipientEmail,$name,$activation){
	require_once('../external/PHPMailer.php');
	require_once('../external/POP3.php');
	require_once('../external/SMTP.php');
	
	// Выбор языка.
	$preferred_lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2);
	switch($preferred_lang){
		case "ru":
			$title = "Пожалуйста, подтвердите Ваш аккаунт";
			$appreciation = "Благодарим за регистрацию на ...... Для активации Вашего профиля, пожалуйста, кликните по кнопке 'Подтвердить E-mail'.";
			$warning = "Это сообщение автоматическое, не отвечайте на него.<br> Если письмо доставлено не по адресу, перейдите по <a href='#'>ссылке</a>.";
			$info = "По всем вопросам обращаться по адресу";
			$confirmation = "Подтвердить E-mail";
			break;
		case "ge":
			
			break;
		default: // en
			$title = "Please, confirm your account"; 
			$appreciation = "Thank you for registration at ..... To activate your account, please, click 'Confirm E-mail'."; 
			$warning = "The message is automatic, do not answer it.<br> If the message was not meant to you, follow <a href='#'>link</a>."; 
			$info = "For any further information, please, contact link";
			$confirmation = "Confirm E-mail.";	
			break;
	}
	
	// Помещаем стили.
	$css = file_get_contents("....../email.css");
	// Формируем текст сообщения.
$html = <<<EOD
<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
<head>
	<style type='text/css'>
		$css
	</style>
</head>
<table id='table-main' align='center' border='0' cellpadding='0' cellspacing='0' width='600' height='700'>
	<tr>
		<td height='280'>
			<a id='link-logo' href='.....'>
				<img id='image-logo' src='....../image.png' alt='Logo' width='220px;'>
				<img id='image-title' src='....../title.png' alt='Title'>
			</a>
		</td>
	</tr>
	<tr>
		<td id='td-message'>
			<div id='div-message'>
				<h2 id='h2-message'>$title</h2>
				<p>$appreciation</p>
				<p>$warning</p>
				<p>$info <a href='#'>...</a></p>
			</div>
		</td>
	</tr>
	<tr>
		<td id='td-confirmation'>
			<a id='link-confirmation' href='#'>$confirmation</a>
		</td>
	</tr>
</table>
EOD;

	// Формируем и отправляем сообщение.
	$mail = new PHPMailer(true);                             
	try {
		//Server settings
		$mail->SMTPDebug = 2;
		$mail->isSMTP();
		$mail->Host = 'smtp.gmail.com';
		$mail->SMTPAuth = true;
		$mail->Username = 'USERNAME';
		$mail->Password = 'PASS';
		$mail->SMTPSecure = 'tls';
		$mail->Port = 587;
		$mail->setFrom('EMAIL', 'NAME');
		//Recipients
		$mail->addAddress($recipientEmail,"Steve Wozniak");
		//Content
		$mail->isHTML(true);
		$mail->Subject = 'Registration at ...';
		$mail->Body = $html;
		$mail->AltBody = 'Non-HTML mail client!';
	
		$mail->send();
		return true;
	}
	catch(Exception $e){
		return false;
	}
}	

$coincidenceFlag = false;
$result = false;
$error = false;
// Выполняется выбор действия, выполняемого скриптом.
if($_POST['action'] == "check"){
	// Проверка.
	$field = $_POST['field'];
	$data = $_POST['data'];
	require_once("db.php"); // ИЗМЕНИТЬ
	try{ // Подключение 
		$DBH = new PDO("mysql:host=$server;dbname=$database", $username, $password);
		// Запрашиваем данные.
		$STH = $DBH->query("SELECT * FROM TABLE WHERE ".$field." = '".$data."' LIMIT 1");
		
		$STH->setFetchMode(PDO::FETCH_ASSOC);   
		while($row = $STH->fetch()){  
			if(isset($row['num'])){
				$coincidenceFlag = true;
			}else{
				$coincidenceFlag = false;
			}
		}	
	}  
	catch(PDOException $e){  
		$error = $e->getMessage(); 
	}
}else{
	// Если это проверка капчи.
	if($_POST['action'] == "checkCapcha"){
		session_start();
		if($_SESSION['capcha'] == $_POST['data']){
			// Капча введена верно.
			$coincidenceFlag = true;
		}else{ // Неверно.
			$coincidenceFlag = false;
		}
	}else{
		// Если это не проверка, то это обработка.
		// Получаем данные.
		$login = $_POST['username'];
		$password = $_POST['password'];
		$passwordRepeat = $_POST['password-repeat'];
		$email = $_POST['email'];
		$capcha = $_POST['capcha'];
		session_start();
		$lang = $_SESSION['lang'];
		// Проверяем корректность введенных данных.
		try{
			if(isValide("login",$login)){
        		if(isValide("password",$password)){
					if($password == $passwordRepeat){
						if(isValide("email",$email)){
							if($capcha == $_SESSION['capcha']){
								$activation = md5($email.time()); // encrypted email + timestamp.
								// Отправляем письмо.
								if(sendEmail($email,$login,$activation)){
									// Помещаем данные в БД. Сохраняем имя, пароль, и почту.
									require_once("db.php"); // ИЗМЕНИТЬ
									try{ // Подключение 
										$DBH = new PDO("mysql:host=$server;dbname=$database", $username, $password); 
										$STH = $DBH->prepare("INSERT INTO TABLE (/*FIELDS*/) values ('".$login."','".$lang."','".$email."','".$activation."','".hashingPassword($password)."')");  
										$STH->execute(); 
									}  
									catch(PDOException $e){  
										$error = $e->getMessage();  
									}
									// Формируем ответ.
									$result = "You have successfully registered. A confirmation email has been sent to e-mail address ".$email.". Before entering please go confirmation.";
								}else{
									// Формируем ответ.
									$result = "An error occurred while sending the email. Re-register later, if the problem persists, contact support.";
								}
								unset($_SESSION['capcha']);
							}else{
								throw new Exception("Invalid capcha!");
							}
						}else{
							throw new Exception("Uncorrect e-mail or already present!");
						}
					}else{
						throw new Exception("Password mismatch!");
					}
				}else{
					throw new Exception("Uncorrect password!");
				}
    		}else{
				throw new Exception("Uncorrect username or already present!");
			}
		}
		catch(Exception $ex){  
   			$error = $ex->getMessage(); 
		}
	}	
}
$response = array(
	"coincidence" => $coincidenceFlag,
	"result" => $result,
	"error" => $error
);

echo(json_encode($response));

?>