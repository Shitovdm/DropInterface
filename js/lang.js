dictionary = new Array(
	{ // en
		// Header
		Main : "Main",
		Instruction : "Instruction",
		Payment : "Payment",
		Log_out : "Log out",
		// Main page
		add_account : "Add account",
		add_accounts_block : "Add block of accounts(if possible)",
		
		
		console : "Console"
	},	
	{ // ru
		// Header
		Main : "Главная",
		Instruction : "Инструкция",
		Payment : "Оплата",
		Log_out : "Выход",
		// Main page
		add_account : "Добавить аккаунт",
		add_accounts_block : "Добавить блок аккаунтов(если доступно)",
		// Tools
		minimize : "Свернуть",
		update_accounts_status : "Обновить все статусы",
		auto_update_accounts_status: "Автоматически обновлять статусы аккаунтов",
		edit_accounts : "Редактирование информации",
		delete_account : "Удалить аккаунт",
		show_in_blocks : "Отобразить в виде блоков",
		show_in_list : "Отобразить в виде списка",
		show_console : "Показать консоль",
		show_all_items : "Показать все коробки на аккаунтах",
		show_modal_window : "Показывать коробки на аккаунтах",
		update_inventories : "Обновить инвентари аккаунтов",
		// Tips & Tricks
		tips_and_tricks : "Отключить подсказки",
		download_db : "Скачать базу данных",
		// Errors and messages
		error_adding_account : "Добавление аккаунтов невозможно. Достигнут предел аккаунтов.",
		error_adding_block : "Создать блок невозможно, так как предыдущий еще не заполнен",
		error_addint_block_payment : "Достигнут предел аккаунтов. Произведите оплату за дополнительное пространство.",
		error_deleting_account : "Удаление аккаунта невозможно, повторите позже или обратитель в службу поддержки.",
		error_loading_userInventory : "Ошибка при загрузке инвентаря пользователя, повторите попытку позже.",
		message_turnON_editor : "Включен режим редактирования полей",
		message_turnON_deleting : "Включен режим удаления аккаунтов",
		message_turnOFF_tips : "Подсказки отключены",
		message_turnON_tips : "Подсказки включены",
		message_turnON_modalUserInventory : "Включен просмотр инвентарей пользователей. Для просмотра инвентаря навелите на порядковый номер аккаунта.",
		message_turnON_console : "Консоль включена",
		message_turnOFF_console : "Консоль отключена",
		// Консоль
		console : "Консоль",
		console_exit : "!Drop Interface [Version 1.0] by Dmitry Shitov &copy;</span><div class='clear'></div><span>To display help, type the following command \"help\"",
		console_clear : "!Drop Interface [Version 1.0] by Dmitry Shitov &copy;",
		console_time : "Время: ",
		console_version : "!Drop Interface [Version 1.0]",
		console_minimize : "Консоль свернута",
		console_email : "Письмо успешно отправлено",
		
		console_help :  "Для получения сведений об определенной команде наберите HELP <имя команды></span>" +
						"<div class='clear'></div>" +
						"<span> </span>" +
						"<div class='clear'></div>" +
						"<span>Общие команды:</span>" +
						"<div class='clear'></div>" +
						"<span>VERSION		Выводит информацию о текущей версии интерфейса.</span>" +
						"<div class='clear'></div>" +
						"<span>HELP		Вызывает справочную информацию о командах.</span>" +
						"<div class='clear'></div>" +
						"<span>CLEAR		Очищает рабочее поле консоли.</span>" +
						"<div class='clear'></div>" +
						"<span>EXIT		Закрывает консоль с последующем ее очищением.</span>" +
						"<div class='clear'></div>" +
						"<span>COLOR		Изменяет цвет представления информации в консоли.</span>" +
						"<div class='clear'></div>" +
						"<span>TIME		Выводит информацию о текущем времени.</span>" +
						"<div class='clear'></div>" +
						"<span>MINIMIZE	Сворачивает окно консоли.</span>" +
						"<div class='clear'></div>" +
						"<span> </span>" +
						"<div class='clear'></div>" +
						"<span>Команды управления аккаунтом:</span>" +
						"<div class='clear'></div>" +
						"<span>LOGOUT		Завершает текущую сессию работы с интерфейсом.</span>" +
						"<div class='clear'></div>" +
						"<span>RELOAD		Перезагружает страницу.</span>" +
						"<div class='clear'></div>" +
						"<span>ACCS		Выводит список всех добавленных аккаунтов.</span>" +
						"<div class='clear'></div>" +
						"<span>SPACE		Выводит информацию о количестве доступных и занятых аккаунтов.</span>" +
						"<div class='clear'></div>" +
						"<span>SDB		Загружает текущую базу данных с аккаунтами пользователя.</span>" +
						"<div class='clear'></div>" +
						"<span>ADDACC		Добавляет новый аккаунт.</span>" +
						"<div class='clear'></div>" +
						"<span>REMOVEACC	Удаляет существующий аккаунт.</span>" +
						"<div class='clear'></div>" +
						"<span>CHANGEACC	Изменяет существующий аккаунт.</span>" +
						"<div class='clear'></div>" +
						"<span>START		Запускает все введенные аккаунты.</span>" +
						"<div class='clear'></div>" +
						"<span>VIEWSTAT	Отображает активность аккаунтов при их включении.</span>" +
						"<div class='clear'></div>"
						,
		
		
		
		
		console_color : "color [attr]</span>" + 
						"<div class='clear'></div>" +
						"<span> </span>" +
						"<div class='clear'></div>" +
						"<span>Атрибуты цветов задаются в виде ДВУХ шестнадцатеричных цифр — первая</span>" +
						"<div class='clear'></div>" +
						"<span>задает цвет фона, а вторая определяет цвет переднего плана. Каждая цифра</span>" +
						"<div class='clear'></div>" +
						"<span>может иметь следующие значения:</span>" +
						"<div class='clear'></div>" +
						"<span> </span>" +
						"<div class='clear'></div>" +
						"<span>0 = Черный 	5 = Лиловый</span>" +
						"<div class='clear'></div>" +
						"<span>1 = Синий	6 = Желтый</span>" +
						"<div class='clear'></div>" +
						"<span>2 = Зеленый	7 = Белый</span>" +
						"<div class='clear'></div>" +
						"<span>3 = Голубой	8 = Серый</span>" +
						"<div class='clear'></div>" +
						"<span>4 = Красный</span>" +
						"<div class='clear'></div>" +
						"<span> </span>" +
						"<div class='clear'></div>" +
						"<span>Пример: \"color 02\" задает зелёный передний план на черном фоне"

	}
	
	
);