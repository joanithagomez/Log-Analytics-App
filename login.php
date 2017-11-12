<?php session_start(); /* Starts the session */
    
        // Assign User/pass to a variable
        $Username = isset($_POST['Username']) ? $_POST['Username'] : '';
        $Password = isset($_POST['Password']) ? $_POST['Password'] : '';

        $userinfo = fopen("./users.txt", "r");
        $found = false;

        // Reading file line by line
        while (($line = fgets($userinfo)) != false) {
            // [username, salt, hashed password]
            $info = explode(":", $line);
            if($Username == $info[0]) {
                // Verify password
                $found = password_verify($Password, trim($info[1]));
            }
            if ($found) {
                break;
            }
        }

        if ($found) {
            // Success, creates a session
            $_SESSION['Username']=$Username;
            echo $found;
            exit;
        } 
        else {
            // Sends error message
            echo $found;
        }

 
?>
