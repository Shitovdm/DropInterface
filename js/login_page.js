
var lang = "<?php echo($user_lang); ?>";
console.log(lang);
// Слайдер между страницами регистрации и логина.
$(document).ready(function(){
	<?php
		if($_GET['act'] == "login"){
			echo('$("#registration-page").hide();');
			echo('$("#login-page").show();');
		}else{
			echo('$("#login-page").hide();');
			echo('$("#registration-page").show();');
		}
	?>
	// Генерируем капчу.
	$(".login-capcha img").attr("src",'pages/other/capcha/generator.php');
	
	$("#btn-slide").click(function(){
		$("#login-page").hide();
		$("#registration-page").slideToggle("slow");
		return false;
	});
	$("#btn-slide-back").click(function(){
		$("#registration-page").hide();
		$("#login-page").slideToggle("slow");
		return false;
	});
});

// Функция обновления каптчи
$(".login-capcha img").click(function(e){
	$(".login-capcha img").attr("src",'pages/other/capcha/generator.php');
	if($("#reg-capcha").val() != ""){
		// Очищаем поле
		$("#reg-capcha").val("");	
	}
	fieldState("#reg-capcha","empty");
	appropriate_capcha = false;
});

// Функция делает запрос на сервер, где ищутся совпадения параметра ранее внесенными в БД.
function checkField(action,field,data){
	var flag = false;
	$.ajax({
        url: 'pages/other/handlers/registration.php', 
        cache: false,
        type:'POST',
        dataType: 'json',
		async: false,
		data: {action: action, field: field, data: data},
		success: function(response){
			flag = response.coincidence;
			console.log('Server response: ' , response.coincidence);
		}
    });
	return flag;
}

// Функция устанавливает нужный класс полю ввода данных.
function fieldState(obj,state){
	if(state == "correct"){
		$(obj).removeClass('incorrect-field');
		$(obj).addClass('correct-field');
	}else{ // Uncorrect
		if(state == "empty"){
			$(obj).removeClass('correct-field');
			$(obj).removeClass('incorrect-field');
		}else{
			$(obj).removeClass('correct-field');
			$(obj).addClass('incorrect-field');
		}	
	}
}

// Валидация e-mail
function check_mail(mail){
    mail = (mail != undefined) ? mail : '';
    var reg = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    if(!mail.match(reg)){
		return false;
	}else{
		return true;
	}    
}

function showErrorDescription(state,field,text){
	if(state){
		var top = "";
		switch(field){
			case "username":
				top = "-277px";
				break;
			case "password":
				top = "-237px";
				break;
			case "r_password":
				top = "-197px";
				break;
			case "email":
				top = "-157px";
				break;
		}
		$("#error-desctiption p").html(text); // Изменяем содержимое.
		$("#error-desctiption").css("top",top); // Перемещаем к полю.
		$("#error-desctiption").show(100); // Показываем блок.
		setTimeout(function() { $("#error-desctiption").hide('fast'); }, 4000); // Убираем.
	}else{
		$("#error-desctiption").hide('fast'); // Убираем.
	}
}

// Проверна введенных данных.
// Проверка выполняется последовательно для каждого поля, по разным параметрам.
var appropriate_login = false; // Флаг соответствия логина заданным требованиям.
var appropriate_pass = false; // Флаг соответствия пароля необходимым параметрам.
var appropriate_repeat_pass = false; // Флаг соответстви обоих значений полей паролей.
var appropriate_email = false; // Флаг соответствия адреса почты необходимым параметрам.
var appropriate_capcha = false; // Флаг соответствия капчи.

// Проверка имени пользователя.
$("#reg-username").change(function(){
	if($(this).val() != ""){
		// Проверка длинны. Более 3-х символов.
		if($(this).val().length >= 3){
			fieldState(this,"correct");
			appropriate_login = true;
			showErrorDescription(false);
			// Проверка длинны. Менее 15-ти символов.
			if($(this).val().length < 15){
				fieldState(this,"correct");
				appropriate_login = true;
				showErrorDescription(false);
				// Проверка присутствия только допустимых символов. [a-zA-Z0-9_]
				var reg = /^[A-Za-z0-9_]+$/i;
				if(reg.test($(this).val())){
					fieldState(this,"correct");
					appropriate_login = true;
					showErrorDescription(false);
					// Проверка наличия в БД.
					if(!checkField("check","username",$(this).val())){
						fieldState(this,"correct");
						appropriate_login = true;
						showErrorDescription(false);
					}else{
						fieldState(this,"uncorrect");
						appropriate_login = false;
						showErrorDescription(true,"username",reg_dictionary[lang].error_username_already_available);
					}
				}else{ // Имеются недопустимы символы.
					fieldState(this,"uncorrect");
					appropriate_login = false;
					showErrorDescription(true,"username",reg_dictionary[lang].error_username_unacceptable_symbols);
				}
			}else{ // Слишком длинный.
				fieldState(this,"uncorrect");
				appropriate_login = false;
				showErrorDescription(true,"username",reg_dictionary[lang].error_username_exceeding_size);
			}
		}else{ // Слишком короткий.
			fieldState(this,"uncorrect");
			appropriate_login = false;
			showErrorDescription(true,"username",reg_dictionary[lang].error_username_not_enough_size);
		}	
	}else{
		fieldState(this,"empty");
		appropriate_login = false;
	}
});

// Проверка пароля.
$("#reg-password").change(function(){
	if($(this).val() != ""){
		// Проверка по длинне, необходимо минимум 7 символов..
		if($(this).val().length > 7){ 
			fieldState(this,"correct");
			appropriate_pass = true;
			showErrorDescription(false);
			// Проверка по длине, не более 20 символов.
			if($(this).val().length < 20){
				fieldState(this,"correct");
				appropriate_pass = true;
				showErrorDescription(false);
				// Проверка на посторонние символы.
				var reg = /^[A-Za-z0-9_]+$/i;
				if(reg.test($(this).val())){
					fieldState(this,"correct");
					appropriate_pass = true;
					showErrorDescription(false);
					// Проверка на совпадение с именем.
					if($(this).val() != $("#reg-username").val()){
						fieldState(this,"correct");
						appropriate_pass = true;
						showErrorDescription(false);
					}else{ // Совпадает с именем.
						fieldState(this,"uncorrect");
						appropriate_pass = false;
						showErrorDescription(true,"password",reg_dictionary[lang].error_password_equal_to_login);
					}
				}else{ // Присутствуют посторонние символы.
					fieldState(this,"uncorrect");
					appropriate_pass = false;
					showErrorDescription(true,"password",reg_dictionary[lang].error_password_unacceptable_symbols);
				}
			}else{ // Слишком длинный пароль.
				fieldState(this,"uncorrect");
				appropriate_pass = false;
				showErrorDescription(true,"password",reg_dictionary[lang].error_password_exceeding_size);
			}
		}else{ // Слишком короткий пароль.
			fieldState(this,"uncorrect");
			appropriate_pass = false;
			showErrorDescription(true,"password",reg_dictionary[lang].error_password_not_enough_size);
		}
	}else{
		fieldState(this,"empty");
		appropriate_pass = false;
	}
	
	
	// Перепроверка повторного ввода пароля.
	if($("#reg-password-repeat").val() != ""){
		if($("#reg-password-repeat").val() == $("#reg-password").val()){ // Если введенные данные не совпадают.
			fieldState("#reg-password-repeat","correct");
			appropriate_repeat_pass = true;
			showErrorDescription(false);
		}else{
			fieldState("#reg-password-repeat","uncorrect");
			appropriate_repeat_pass = false;
			if(appropriate_pass){
				showErrorDescription(true,"r_password",reg_dictionary[lang].error_repeat_password_discrepancy);	
			} 
		}
	}else{
		fieldState("#reg-password-repeat","empty");
		appropriate_repeat_pass = false;
	}
});
// Проверка повторного ввода пароля.
$("#reg-password-repeat").change(function(){
	if($(this).val() != ""){
		if(($("#reg-password-repeat").val() == $("#reg-password").val()) && (appropriate_pass)){ // Если введенные данные не совпадают.
			fieldState("#reg-password-repeat","correct");
			appropriate_repeat_pass = true;
			showErrorDescription(false);
		}else{
			fieldState("#reg-password-repeat","uncorrect");
			appropriate_repeat_pass = false;
			showErrorDescription(true,"r_password",reg_dictionary[lang].error_repeat_password_discrepancy);	
		}
	}else{
		fieldState(this,"empty");
		appropriate_repeat_pass = false;
	}
});

// Проверка email.
$("#reg-email").change(function(){
	if($(this).val() != ""){
		// Проверка на наличие запрещенных символов по RFC2821\22; Разрешены только {a-z , A-z , 0-9 , @ , - , _ , .}
		if(check_mail($(this).val())){
			fieldState(this,"correct");
			appropriate_email = true;
			showErrorDescription(false);
			// Проверка наличия в БД данного адреса
			if(!checkField("check","email",$(this).val())){
				fieldState(this,"correct");
				appropriate_email = true;
				showErrorDescription(false);
			}else{ // Адрес уже используется другим аккаунтом.
				fieldState(this,"uncorrect");
				appropriate_email = false;
				showErrorDescription(true,"email",reg_dictionary[lang].error_email_already_available);
			}
		}else{ // Не корректный адрес.
			fieldState(this,"uncorrect");
			appropriate_email = false;
			showErrorDescription(true,"email",reg_dictionary[lang].error_email_uncorrect);
		}	
	}else{
		fieldState(this,"empty");
		appropriate_email = false;
	}
});

// Проверка капчи.
$("#reg-capcha").change(function(){
	if($(this).val() != ""){
		// Проверка соответствия
		if(checkField("checkCapcha","",$(this).val())){
			fieldState(this,"correct");
			appropriate_capcha = true;
		}else{
			fieldState(this,"uncorrect");
			appropriate_capcha = false;
		}
	}else{
		fieldState(this,"empty");
		appropriate_capcha = false;
	}
});

// Сведение всех проверок при сабмите.
function chechData(form){
	console.log(appropriate_login,appropriate_pass,appropriate_repeat_pass,appropriate_email,appropriate_capcha);
	if(appropriate_login && appropriate_pass && appropriate_repeat_pass && appropriate_email && appropriate_capcha){
		return true;
	}else{	// Если есть незаполненные поля.
		var not_filled = new Array();
		// Заполнение массива незаполненных полей, значениями, которые служат номерами при получении через nth-child().
		if(!appropriate_login){
			not_filled.push("1")
		}if(!appropriate_pass){
			not_filled.push("2")
		}if(!appropriate_repeat_pass){
			not_filled.push("3")
		}if(!appropriate_email){
			not_filled.push("4")
		}if(!appropriate_capcha){
			not_filled.push("5")
		}
		blinkFields(not_filled); // Моргаем незаполненными полями.
		return false;
	}	
}

// Функция моргает 2 раза всеми полями ввода, вызывается если нажата кнопка Регистрация до ввода всех данных в поля.
function blinkFields(childArray){
	var count = 0;
	for(var i = 0; i < childArray.length; i++){
		$("#reg-form .input-field:nth-child("+childArray[i]+") input").addClass("incorrect-field");
	}
	var blinkField = setInterval(function(){
		console.log(childArray.length);
		for(var i = 0; i < childArray.length; i++){
			
			if($("#reg-form .input-field:nth-child("+childArray[i]+") input").hasClass("incorrect-field")){
				$("#reg-form .input-field:nth-child("+childArray[i]+") input").removeClass("incorrect-field");
			}else{
				$("#reg-form .input-field:nth-child("+childArray[i]+") input").addClass("incorrect-field");
			}
		}
		if(count > 1){
			for(var i = 0; i < childArray.length; i++){
				$("#reg-form .input-field:nth-child("+childArray[i]+") input").addClass("incorrect-field");
			}
			clearInterval(blinkField);
		}else{
			count++;
		}
	},200);	
}