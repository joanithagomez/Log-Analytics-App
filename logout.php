<?php 
    session_start();
    if(isset($_SESSION['Username'])){
        session_destroy();
       echo false;
    }else {
        true;
    }
    
    exit;
?>