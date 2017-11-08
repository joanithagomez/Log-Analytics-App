<?php session_start(); /* Starts the session */
    
    // Check if "Login" was pressed  
    if(isset($_POST['Login'])){
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
            // Success, moves to index.php and creates a session
            $_SESSION['Username']=$Username;
            header("location:index.php");
            exit;
        } 
        else {
            // Sends error message
            echo "Invalid Login Details";
        }
    }

    // Checks if "Register" was pressed
    if(isset($_POST['Register'])){ 
        // Checks if fields are empty
        if ($_POST['Username'] == "" or $_POST['Password'] == "") {
            echo "Missing Login Details";
        }
        else {
            // Assigns User/pass to a variable
            $Username = isset($_POST['Username']) ? $_POST['Username'] : '';
            $Password = isset($_POST['Password']) ? $_POST['Password'] : '';

            // Checks if user is already registered
            $userinfo = fopen("./users.txt", "r");
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
                    $data = file_get_contents("./users.txt");
                    $data .= $Username . ":" . $Password . "\n";
                    file_put_contents("./users.txt", $data);
                    echo "User added!";
                    // Create directory for uploads for user
                    mkdir($_SERVER['DOCUMENT_ROOT'] . "/uploads/" . $Username, 0700);

                }

            }
            else {
                // Error message
                echo "Unknown error!";
            }
        }
    }
?>

