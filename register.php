<?php session_start(); /* Starts the session */
      
        // Checks if fields are empty
        if (($_POST['Username'] == "" or $_POST['Password'] == "") or ($_POST['Username'] == 'undefined' or $_POST['Password'] == 'undefined')){
            echo "Fields empty.";
        }
        else {
            // Assigns User/pass to a variable
            $Username = isset($_POST['Username']) ? $_POST['Username'] : '';
            $Password = isset($_POST['Password']) ? $_POST['Password'] : '';

            // Checks if user is already registered
            $userinfo = fopen($_SERVER['DOCUMENT_ROOT'] . "/users.txt", "r");
            $found = False;

            if ($userinfo) {
                while (($line = fgets($userinfo)) != false) {
                    // [username, salt, hashed password]
                    $info = explode(":", $line);
                    if($Username == $info[0]) {
                        // Set error message. User already exists
                        echo 'User already exists.';
                        $found = True;
                        break;
                    }

                }
                fclose($userinfo);
                // If user is not found, writes info to the file.
                if (!$found) {
                    $Password = password_hash($Password, PASSWORD_DEFAULT);
                    $data = file_get_contents($_SERVER['DOCUMENT_ROOT'] ."/users.txt");
                    $data .= $Username . ":" . $Password . "\n";
                    file_put_contents($_SERVER['DOCUMENT_ROOT'] ."/users.txt", $data);
                    // Create directory for uploads for user
                    mkdir($_SERVER['DOCUMENT_ROOT'] . "/uploads/" . $Username, 0700);
                    echo "Registration Successfull!";
                }

            }
            else {
                // Error message
                echo "Unknown error!";
            }
        }
    ?>
