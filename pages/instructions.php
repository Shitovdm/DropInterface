<?php
session_start();
// Проверка пользователя.
if(!isset($_SESSION['username_login'])){
	header('Location: patterns/access_denied.php');
}
?>
<h3>Итак, приступим....</h3>