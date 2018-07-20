<!DOCTYPE html>

<head>
 
<title>WASSCE Quiz</title>
<link href="main.css"rel="stylesheet"type="text/css"/>
<meta name=viewport content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

</head>
<body>

<div id="topbar">WASSCE Quiz</div>
<div class="spacer"></div>

<div id="homescreen">
<h2>Welcome!</h2>
<p class="description">This quiz is aimed at West African students taking West African Senior School Certificate Examination (WASSCE) History Paper 1, <i>West Africa and the Wider World from Earliest Times to 2000</i>. Don't forget to read <a href="https://wasscehistorytextbook.com/">our textbook</a> before answering the questions.</p>
<button type="button" class="start" onclick="move()">Start Quiz</button>
</div>

<div id="navContent">
<div id="game1"></div>
<div id="game2"></div>
</div>

<script src="jquery.js"></script>
<script src="controller.js"></script>
<script>function move(){$('.start').parents('#homescreen').fadeOut();$('#navContent').fadeIn();}</script>


</body>
</html>
