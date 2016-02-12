/* Функции вызываемы из консоли. */

// Функция обработки запросов действий с аккаунтами.
function accountAct(command,act,stp){
	var res = "";
	$.ajax({
		url: 'pages/other/operations/console.php', 
		type:'POST',
		async:false,
		dataType: 'json',
		data: {ccommand : command, action: act, cstep: stp},
		success: function(response){
			res = response.html;
			GLOBAL_console_step = response.step;
			console.log(response);
		}
	});
	return([res,GLOBAL_console_step]);
}

// Функция изменения цвета консоли.
function changeCMDColor(bg,text){
	$("#cmd").css("background-color",bg);
	$("#cmd").css("color",text);
	$("#cursor").css("background",text);
}



//-------------------------------------


function commandHandler(command){
	if(GLOBAL_console_step == "enterUsername"){
		var result = accountAct(command,"addacc",GLOBAL_console_step);
		return(result[0]);
	}
	if(GLOBAL_console_step == "enterSteamID"){
		var result = accountAct(command,"addacc",GLOBAL_console_step);
		return(result[0]);
	}
	// Если введена команда смены цвета
	if(command.substr(0, command.length - 3) == "color"){
		var bg = command.substr(-2,1);
		var text = command.substr(-1,1);
		var colors = Array(
			"black", 	// 0 = Черный
			"navy",		// 1 = Синий
			"green",	// 2 = Зеленый
			"blue",		// 3 = Голубой
			"red",		// 4 = Красный
			"magenta",	// 5 = Лиловый
			"yellow",	// 6 = Желтый
			"white",	// 7 = Белый
			"grey"		// 8 = Серый
		);
		changeCMDColor(colors[bg],colors[text]);	
	}
	
	switch (command.toLowerCase()) {
		// Системные команды.
		case "help":
			return(dictionary[lang].console_help);
		case "exit":
			fConsole(); // Убираем окно.
			$(".tmp-field").text(""); // Очищаем последнюю команду.
			$("#history").html("");	// Очищаем предыдущии запросы.
			return(dictionary[lang].console_exit);
		case "minimize":
			fConsole();
			return(dictionary[lang].console_minimize);
		case "clear":
			$("#history").html("");
			$(".tmp-field").text("");
			return(dictionary[lang].console_clear);
		case "time":
			var time = new Date();
			return(dictionary[lang].console_time + time);
		case "color":
			return(dictionary[lang].console_color);
		case "version":
			return(dictionary[lang].console_version);
			
		// Незавершенные
		case "reload": // Перезагрузка страницы.	
			return(dictionary[lang].console_reload);		
		case "logout": // Завершение сессии работы с интерфейсом. ЗАВЕРШЕНО
			$.ajax({
				url: '/index.php?exit=1', 
				type:'GET'
			});
			window.location.replace('/index.php');
			return(1);
		case "accs": // Вывод всех добавленных аккаунтов и прочей информации об аккаунтах. ЗАВЕРШЕНО
			var result = accountAct(command,"accounts","");
			return(result[0]);
		case "sdb": // Сохранение базы аккаунтов.
			var result = accountAct(command,"sdb","");
			return(result[0]);	
			
		// Операции с аккаунтами.
		case "viewstat": // Отображать отправляемые запросы.
			return(dictionary[lang].console_turnON);
		
		case "space": // Отобразить информацию о занятом и свободном месте.
			var result = accountAct(command,"space","");
			return(result[0]);
		case "addacc":	// Добавить аккаунт. ЗАВЕРШЕНО
			var result = accountAct(command,"addacc","");
			GLOBAL_console_step = result[1];
			return(result[0]);
		case "removeacc": // Удалить аккаунт.
			return(dictionary[lang].console_addAccount);
		case "changeacc":	// Редактировать аккаунт.
			return(dictionary[lang].console_addAccount);
			
		case "email":	// Редактировать аккаунт.
			$.ajax({
				url: 'pages/other/operations/sendEmail.php', 
				type:'GET',
				dataType:"text",
				success: function(response){
					console.log(response);	
				}
			});
			return(dictionary[lang].console_email);
			
			
			
			
			
			
			
			
			
			
			
		default:
			console.log("'" + command + "' is not an internal command.");
			return("'" + command + "' is not an internal command.");
	}
}