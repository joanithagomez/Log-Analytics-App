<?php
session_start();
    if(isset($_SESSION['Username'])){
       echo $_SESSION['Username'];
    }
?>