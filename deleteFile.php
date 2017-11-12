<?php
session_start();

if(!isset($_SESSION['Username'])){
    // "Not a session";
	exit;
}

$filename = $_POST['file']; //get the filename
$Username = $_SESSION['Username'];
$dir = $_SERVER['DOCUMENT_ROOT'] . "/uploads/" .$Username . '/'. $filename;
if (!file_exists($dir)) {
    echo false;
    exit;
}

unlink($dir);

if(!file_exists($dir)){
    echo true;
}else{
	echo false;
}

?>