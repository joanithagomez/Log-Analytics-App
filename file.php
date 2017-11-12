<?php
session_start();

if(!isset($_SESSION['Username'])){
	exit;
}

$Username = $_SESSION['Username'];
$name = $_REQUEST["name"];
$type =  $_REQUEST["type"];
$file = file($_SERVER['DOCUMENT_ROOT'] . "/uploads/". $Username .'/'.$name);
$objArr = array();

$usage = array("DockerVolumeController","ProvisionController","BlueprintController", "DockerServerController");

$errors = array(
    "AccessDeniedException", "transport", "WARN", "RemoteException", "RuntimeException"
);


foreach($file as $line)
    {
        $object = new stdClass();     
	
	if($type == "error"){
		$list = $errors;
	}
	else{
		$list = $usage;
	}
	
    
        foreach($list as $element){
            if( strpos( $line, $element ) !== false ) {
                $object->type = $element;
                $object->time = substr($line, 0, 16);  
                array_push($objArr, $object);                
            }
        }
    
    }

    echo json_encode($objArr);
?>


