<?php
session_start();

// User var
$user = $_SESSION['Username'];
// User's uploads directory
$target_dir = "uploads/" . $user . '/';
// Name of file to be uploaded
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;

if(isset($_POST["submit"])) {

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "File already exists.</br>";
        $uploadOk = 0;
    }
    // Check file size
    if ($_FILES["fileToUpload"]["size"] > 5000000) {
        echo "Your file is too large.</br>";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Your file was not uploaded.</br>";

    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.</br>";
        } 
        else {
            echo "Sorry, there was an error uploading your file.</br>";
        }
    }
}
?>
Welcome <?php echo $user; ?>. Your session is continuing. </br>
<a href="index.php">Click here</a> to go back.