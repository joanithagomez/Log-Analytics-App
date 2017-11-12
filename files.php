<?php
session_start();

if(!isset($_SESSION['Username'])){
    // echo "Not a session";
	exit;
}
$Username = $_SESSION['Username'];

$dir = $_SERVER['DOCUMENT_ROOT'] . "/uploads/" . $Username;
$fileArr = array_diff(scandir($dir, 1), array('..', '.'));

$objectArr = array();
foreach ($fileArr as $value)
{   
    $object = new stdClass();    
    $object->name = $value;
    array_push($objectArr, $object);
}

print json_encode($objectArr);

?>