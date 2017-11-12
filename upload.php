<?php
session_start();

if(!isset($_SESSION['Username'])){
    // "Not a session";
	exit;
}
// User var
$user = $_SESSION['Username'];
// User's uploads directory
$target_dir = "uploads/" . $user . '/';
// Name of file to be uploaded
$target_file = $target_dir . $_FILES['file']['name'];
$uploadOk = 1;

if(isset($_POST["submit"])) {

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "File already exists. ";
        $uploadOk = 0;
    }
    // Check file size
    // if ($_FILES["file"]["size"] > 5000000) {
    //     echo "Your file is too large. ";
    //     $uploadOk = 0;
    // }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Your file was not uploaded.";

    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            echo $_FILES['file']['name'];
        } 
        else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
?>
