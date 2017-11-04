<?php 
    session_start();
    session_destroy();
    header("location:login.php");  /* Redirect to login page */
    exit;
?>