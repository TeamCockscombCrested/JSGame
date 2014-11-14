<?php

// заглавието на страницата
$title = "Начало";
// meta тагове
$description = "Описание";
$keywords = "softuni,ротативка,игра";

// извикване хедъра
require_once("header.php");
?>
		<!-- Заглавие -->
		<header>
			<h2>Начална страница</h2>
		</header>

		<!-- Основно съдържание на страницата -->
		<div id="content" class="container">
			<!-- start game -->
			<div id="game">
				<div id="info">
				</div>
				
				<div id="panel">
				</div>
				
				<div id="dashboard">
				</div>
			</div>
			<!-- end game -->
		</div>
<?php require_once("footer.php"); ?>