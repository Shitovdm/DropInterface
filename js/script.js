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


function commandHandler(command){
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
		case "help":
			return(dictionary[lang].console_help);
		case "exit":
			console.log();
			return("EXIT FROM CONSOLE!");
		case "color":
			return(dictionary[lang].console_color);
			
		default:
			console.log("'" + command + "' is not an internal command.");
			return("'" + command + "' is not an internal command.");
	}
}


/* Функции вызываемы из консоли. */

// Функция изменения цвета консоли.
function changeCMDColor(bg,text){
	$("#cmd").css("background-color",bg);
	$("#cmd").css("color",text);
	$("#cursor").css("background",text);
}



//-------------------------------------
