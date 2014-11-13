<script type="text/javascript">
var userPassword = prompt("Enter your password","");
if ("rotativka" == userPassword)
{
	alert("Updating..");
}
else
{
	window.location= "../index.php";
}
</script>
<?php
$title = "Update";
require_once("header.php");
// изпълнява shell скрипта, който извършва синхронизацията с github
$status = shell_exec('sh -x update.sh');
?>

		<!-- Заглавие -->
		<header>
			<h1>Синхронизация с GitHub</h1>
		</header>

		<!-- Основно съдържание на страницата -->
		<div id="content">
			<p>Статус: <?= $status ?></p>
		</div>
<?php require_once("footer.php"); ?>