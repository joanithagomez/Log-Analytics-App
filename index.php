<?php 
    session_start(); /* Starts the session */

    if(!isset($_SESSION['Username'])){
        header("location:login.php");
        exit;
    }
?>

Welcome <?php echo $_SESSION['Username']; ?>. You have logged in. </br>
<a href="logout.php">Click here</a> to Logout. </br></br>

<form action="upload.php" method="post" enctype="multipart/form-data">
    Select file to upload:</br>
    <input type="file" name="fileToUpload" id="fileToUpload"></br>
    <input type="submit" value="Upload" name="submit">
</form>