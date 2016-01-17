<html>
<head>
    <title>
    </title>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
</head>
<body>
<b>Console:</b>
<input type="button" onClick="online()" value="ONLINE">
<div class="log" id="log">
	
</div>
</body>
</html>

<script>
	function online(){
		var dataArr = {
			"session_id":"f4f141250bd9cbf2",
			"availability":"online",
			"activity":{
				"type":"watching",
				"game":"Counter-Strike: Global Offensive",
				"channel_display_name":"inetkoxTV",
				"channel_login":"inetkoxtv",
				"channel_id":"80947159"
			}
		};
	
		
		$.ajax({
		type:"POST",
		url: 'requests/online.php', 
		cache: false,
		dataType:"json",
		success: function(response){
			$("#log").append("<p>" + response.status_mckimley + "</p>");

		}
		});
	}
	setInterval(online,20000);
	
	
	/*
	
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://www.twitch.tv
Access-Control-Expose-Headers: Poll-Interval
Cache-control: no-cache="set-cookie"
Date: Sun, 09 Apr 2017 22:01:20 GMT
Poll-Interval: 60
Set-Cookie: AWSELB=8DBBB9C91A74C4A86C13111E6919D22693C31B31F33E8DD5AB7047927D0119511C10CD3FE4BA7DB52CE66CB74B124E1A51C2049509F6A1EEE6165348B8BE6ACE9474A3BF38;PATH=/;MAX-AGE=900
Vary: Origin
Connection: keep-alive


	
	
	*/
</script>



