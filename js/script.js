
var step = "";

// Функция добавление контента в конец текста консоли.
function buildConsole(currentAnswer){
	var delimiter = "<div class='clear'></div>";
	var history = $("#history").html();
	var currentCommand = "<span>" + $(".tmp-field").text() + "</span>";
	var newCommand = "<span class='tmp-field'></span><div id='cursor'></div>";
	var currentAnswer = "<span>" + currentAnswer + "</span>";

	$("#history").html(history + currentCommand + delimiter + currentAnswer + delimiter); 
	var temp_history = $("#history").html();
	$("#cmd").html("<div id='history'>" + temp_history + "</div>" + delimiter + newCommand);
}

$(function(){
	var cursor;
	var clickFlag = true; // true - нажатия нет, false - есть.
	$('input').click(function(){
		if(clickFlag){ // Если еще не было клика, до последней расфокусировке на поле input.
			//(Предотвращает несколько выполнений функции на которой висит setInterval)
			clickFlag = false;
			$('input').focus();
			cursor = window.setInterval(function(){
				if($('#cursor').css('visibility') === 'visible'){
					$('#cursor').css({ visibility: 'hidden' });
				}else{
					$('#cursor').css({ visibility: 'visible' });  
				}  
			},400);
		}
	});

	$('input').keydown(function(e){
		// Обработка Backspace.
		if(e.keyCode == 8){// Нажат backspace, удаляем последний символ.
			$('#cmd .tmp-field').text($('#cmd .tmp-field').text().substr(0, $('#cmd .tmp-field').text().length - 1));
		}
		// Обработка Enter.
		if(e.keyCode == 13){ // Нажата клавиша Enter приступаем к обработке команды.
			$('input').val('');
			// Передача на обработчик команд.
			buildConsole(commandHandler($('#cmd .tmp-field').text()));
			//buildConsole('"' + $('#cmd .tmp-field').text() + '" is not an internal command.');
	    }	
	});
	
	// Обработка клавиш управления.
	$('input').keyup(function(e){
		if(e.keyCode != 13){
			$('#cmd .tmp-field').text($(this).val());
		}
	});
	
	// Если курсор вышел за пределы консоли.
	$('input').blur(function(){
		clearInterval(cursor);
		clickFlag = true;
		$('#cursor').css({ visibility: 'visible' });    
	});
});


/* Функции вызываемы из консоли. */

// Функция обработки запросов действий с аккаунтами.
function accountAct(act,stp){
	var res = "";
	$.ajax({
		url: 'pages/other/operations/console.php', 
		type:'POST',
		async:false,
		dataType: 'json',
		data: {action: act, cstep: stp},
		success: function(response){
			
			res = response.html;
			step = response.step;
			console.log(response);
			console.log(response.step);
		}
	});
	return([res,step]);
}

// Функция изменения цвета консоли.
function changeCMDColor(bg,text){
	$("#cmd").css("background-color",bg);
	$("#cmd").css("color",text);
	$("#cursor").css("background",text);
}



//-------------------------------------


function commandHandler(command){
	console.log(step);
	if(step == "enterUsername"){
		var result = accountAct("addacc","enterUsername");
		console.log(result[0],result[1]);
		return(dictionary[lang].console_enterUsername);
	}
	if(step == "enterSteamID"){
		var result = accountAct("addacc","enterSteamID");
		console.log(result[0],result[1]);
		return(dictionary[lang].console_enterSteamID);
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
	
	switch (command) {
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
		case "logout":
			return(1);
		case "accounts": // Вывод всех добавленных аккаунтов и прочей информации об аккаунтах.
			var result = accountAct("accounts","");
			step = result[1];
			console.log(result[0],result[1]);
			return(result[0]);
		case "download db": // Вывод всех добавленных аккаунтов и прочей информации об аккаунтах.
			return(dictionary[lang].console_downloadDB);	
			
		// Операции с аккаунтами.
		case "viewstat": // Отображать отправляемые запросы.
			return(dictionary[lang].console_turnON);
		case "addacc":	// Добавить аккаунт.
			return(dictionary[lang].console_addAccount);
		case "removeacc": // Удалить аккаунт.
			return(dictionary[lang].console_addAccount);
		case "changeacc":	// Редактировать аккаунт.
			return(dictionary[lang].console_addAccount);
			
			
			
			
			
			
			
			
			
			
		default:
			console.log("'" + command + "' is not an internal command.");
			return("'" + command + "' is not an internal command.");
	}
}
