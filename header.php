<?php
// default стойности на променливите
if (!isset($title)) $title = "";
if (!isset($description)) $description = "Ротативка - ".$title;
if (!isset($keywords)) $keywords = "softuni,софтуни,ротативка,игра";
?>
<!DOCTYPE html>
<html lang="bg">

	<head>
		<meta charset="utf-8"/>
		<title>Ротативка - <?= $title; ?></title>
		<meta name="author" content="TeamCockscombCrested"/>
		<meta name="description" content="<?= $description; ?>"/>
		<meta name="keywords" content="<?= $keywords; ?>"/>
		<meta name="robots" content="noindex,follow"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="/css/bootstrap.min.css">
		<link rel="stylesheet" href="/css/bootstrap-theme.min.css">
		<link rel="stylesheet" type="text/css" href="/css/default.css?"/>
		<link rel="stylesheet" type="text/css" href="/css/game.css"/>
		<script src="js/jquery-1.11.1.min.js"></script>
	</head>

	<body class="container">

		<nav>
			<ul class="nav nav-pills nav-justified">
				<li><a href="/index.php">Начало</a></li>
				<li><a href="/profile.php">Профил</a></li>
				<li><a href="/stats.php">Класиране</a></li>
				<li><a href="/rules.php">Правила</a></li>
				<li><a href="/team.php">Екип</a></li>
				<li><a href="/contacts.php">Контакти</a></li>
				<li><a href="/login.php">Вход</a></li>
			</ul>

			<div class="clear"></div>
		</nav>