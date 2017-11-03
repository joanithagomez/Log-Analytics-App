<?php session_start(); /* Starts the session */
    
    /* Check Login form submitted */    
    if(isset($_POST['Login'])){
        /* Check and assign submitted Username and Password to new variable */
        $Username = isset($_POST['Username']) ? $_POST['Username'] : '';
        $Password = isset($_POST['Password']) ? $_POST['Password'] : '';

        /* Check Username and Password */
        $userinfo = fopen("./users.txt", "r");
        $found = false;

        while (($line = fgets($userinfo)) != false) {
            // [username, salt, hashed password]
            $info = explode(":", $line);
            if($Username == $info[0]) {
                $found = password_verify($Password, trim($info[1]));
            }
            if ($found) {
                break;
            }
        }


        if ($found) {
            /* Success: Set session variables and redirect to Protected page  */
            $_SESSION['Username']=$Username;
            header("location:index.php");
            exit;
        } 
        else {
            /*Unsuccessful attempt: Set error message */
            $msg="<span style='color:red'>Invalid Login Details</span>";
        }
    }

    if(isset($_POST['Register'])){ 
        // Checks if fields are empty
        if ($_POST['Username'] == "" or $_POST['Password'] == "") {
            $msg="<span style='color:red'>Missing Login Details</span>";
        }
        else {
            /* Check and assign submitted Username and Password to new variable */
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
                        $msg="<span style='color:red'>User already exists.</span>";
                        $found = True;
                        break;
                    }
                }
                if (!$found) {
                fclose($userinfo);
                    $Password = password_hash($Password, PASSWORD_DEFAULT);
                    $data = file_get_contents("./users.txt");
                    $data .= $Username . ":" . $Password . "\n";
                    file_put_contents("./users.txt", $data);
                    $msg="<span style='color:red'>User added!</span>";
                }
            }
            else {
                echo "Error opening file";
                // Error opening file
            }
        }
    }
?>

<form action="" method="post" name="Login_Form">
    <table width="400" border="0" align="center" cellpadding="5" cellspacing="1" class="Table">
        <?php if(isset($msg)){?>
        <tr>
            <td colspan="2" align="center" valign="top"><?php echo $msg;?></td>
        </tr>
        <?php } ?>

        <tr>
            <td colspan="2" align="left" valign="top"><h3>Login</h3></td>
        </tr>
        <tr>
            <td align="right" valign="top">Username</td>
            <td><input name="Username" type="text" class="Input"></td>
        </tr>
        <tr>
            <td align="right">Password</td>
            <td><input name="Password" type="password" class="Input"></td>
        </tr>
        <tr>
            <td><input name="Login" type="submit" value="Login" class="Button3"></td>
            <td><input name="Register" type="submit" value="Register" class="Button3"></td>
        </tr>
    </table>
</form>
