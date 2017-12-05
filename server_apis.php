<?php

$OK=true;
$ERROR=false;

/* The APIs are using the text file in json format for data.
 * The text file name is users.json under userdata folder
 * Replace this with database calls.
 */
 
/** Convenience functions start '_'. These are not intended to be called
 * from outside but within the functions in this file.
*/

/**
* Provides information about user - provide user details.
* @param userId - identifies the user.
* @param $rMsg - Reference to return message. Return message may be empty.
* @returns user value as element, null if not found
*/
function _get_user_info($userId, &$rMsg)
{
  $users = get_list_of_users($rMsg);
  foreach ( $users as $user ) {
    if ( strcmp($user->userid, $userId ) == 0 ) {
      return $user;
    }
  }
  return null;
}

/**
* Update the users data file with new information.
* @param $allUsers - users array to write.
* @param $rMsg - Reference to return message. Return message may be empty.
*/
function _write_user_info($allUsers, &$rMsg)
{
  global $OK, $ERROR;
  $fileName = _get_user_info_filename();
  //file_put_contents($fileName, json_encode($allUsers));
  $fp = fopen($fileName, 'w');
  if ( $fp ) {
    fwrite($fp, json_encode($allUsers));
    fclose($fp);
    return $OK;
  }
  $rMsg="Unable to update users data.";
  return $ERROR;
}

/** Provides information about user.
* Provides user details - profile.
* Error is reported for invalid user id.
*
* @param userId - identifies the user.
* @param $rMsg - Reference to return message. Return message may be empty.
* @returns value on JSON format.
*/
function get_user_info($userId, &$rMsg) {
  $user = _get_user_info($userId, $rMsg);
  return json_encode($user);
}

/**
* Does user exist?
* @param userId - identifies the user.
* Returns: boolean as part of data
*/
function user_exists($userId, $rMsg)
{
  global $OK, $ERROR;
  $users=get_list_of_users($rMsg);
  foreach ( $users as $user ) {
    if ( strcmp($user->userid, $userId ) == 0 ) {
      return $OK;
    }
  }
  return $ERROR;
}

/**
* Gets list of users
* Read users information from the file
* @param $rMsg - Reference to return message. Return message may be empty.
* @returns - array of users.
*/
function get_list_of_users(&$rMsg) {
  $fileName = _get_user_info_filename();
  $users = array();
  if ( file_exists($fileName) ) {
    $users = json_decode(file_get_contents($fileName));
  }
  else {
    $rMsg="Unable to get list of users";
  }
  if ( $users == null ) {
    $users = array(); 
  }
  return $users;
}

/** Creates a user.
* Creates a new user. If it is unable to create a new user error is
* reported e.g. name already exists.
*
* @param userId - identifies the user.
* @param password - password for a user.
* @param firstName - user's first name.
* @param lastName - user's last name.
* @param $rMsg - Reference to return message. Return message may be empty.
* @returns value on $OK if success.
*/
function create_user($userId, $password, $firstName, $lastName, &$rMsg) {
  global $OK, $ERROR;
  $rStatus=$OK;
  if ( !user_exists($userId, $rMsg) ) {
    $userData = array (
                      "userid"    => $userId,
	              "password"  => $password,
		      "firstname" => $firstName,
		      "lastname"  => $lastName
	              );
    // Get existing users, add new user and save it
    $users = get_list_of_users($rMsg);
    array_push($users, $userData);
    print_r($users);
    $rStatus = _write_user_info($users, $rMsg);
  }
  else {
    $rStatus=$ERROR;
  }
  return $rStatus;
}

/** 
* Removes a user.
* If it is unable to remove it an error is reported e.g. invalid user id.
*
* @param userId - identifies the user.
* @param $rMsg - Reference to return message. Return message may be empty.
* @returns value on JSON format.
*/
function remove_user($userId, &$rMsg) {
  global $OK, $ERROR;
  if ( user_exists($userId, $rMsg ) ) {
    $newUsers = array();
    $users = get_list_of_users($rMsg);
    foreach ( $users as $user ) {
      if ( strcmp($user->userid, $userId ) != 0 ) {
        array_push($newUsers, $user);
      }
    }
    return _write_user_info($newUsers, $rMsg);
  }
  return $ERROR;
}

/*
* Return value in JSON
* message field - may be empty if status is ok.
* field examples - filename, list_of_files
{
	"status" : ["ok"|"error"]
	"message" : "error message"
	"data" : "<value>"
}
*/

/*******************************************************/
/* WORKING ON FILE RELATED FUNCTIONS, NOT COMPLETE YET */
/*******************************************************/

/** Get the folder name where userdata is stored
* Internal use
*/
function _get_user_data_folder_path()
{
	$dataFolderName="userdata";
	$currentDir = getcwd();
	$dataFolder = $currentDir . "/" . $dataFolderName;
	/* Create directory */
	if ( !file_exists($dataFolder) )
	{
		$status = mkdir($dataFolder);
		if ( ! $status ) {
	   	// Handle the case if failed tocreate directory
		}
	}
	return $dataFolder;
}

/** Function to get the users file name
* Internal use
* returns the file name that stores users infromation.
*/
function _get_user_info_filename()
{
	$usersFileName = "users.json";
	$dataFolder = _get_user_data_folder_path();
	$fileName = $dataFolder . "/" . $usersFileName;
	return $fileName;
}

$default_file = "";
$DATA_ELEMENT_NAME="data";
$logfiles_folder="logfiles";


/*
* Convenience function to get list of log files in a folder for given user.
* It removes "." and ".." from the list.
*/
function _create_return_value($status, $msg, $dataInJson=array()) {
	 global $DATA_ELEMENT_NAME;
	 $jsonValue = "{\n\t\"status\":\"$status\", \n\t\"message\":\"$msg\",\n\t\"$DATA_ELEMENT_NAME\": "
	 	         . json_encode($dataInJson) . "\n}";
	 return $jsonValue;
}

/** Extract data from return value
* return: data array
*/
function get_data_from_value($rValue)
{
	global $DATA_ELEMENT_NAME;
	$json = json_decode($rValue, true);
	return $json[$DATA_ELEMENT_NAME];
}


/**
* Add log file.
*
* Add a log file for user.
* @param userId - identifies the user
* @param filePath - the file on user disk to upload
* @returns value is JSON
*/
function add_log_file($userId, $filePath) {
	 global $logfiles_folder, $OK, $ERROR;
	 if ( !file_exists($logfiles_folder) ) {
	    mkdir($logfiles_folder);
	 }
	 copy("$filePath", "$logfiles_folder/$filePath");
	 return _create_return_value($OK, "Uploaded file $filePath user $userId.");
}

/**
* Get the list of log files in the folder.
*
* Provides the list of log files that are available for a user.
* Log files are stored in a folder which is unique to each user.
*
* @param userId - identifies the user
* @returns list of log files (array) in JSON format.
*/
function get_log_file_list($userId) {
	 $log_files = _get_log_file_list($userId);
	 return json_encode($log_files, JSON_UNESCAPED_SLASHES);
}

/**
* Sets the default file for given user.
*
* Make a log file a default one for a user. If the file does not
* exist, error is reported.
*
* @param userId - identifies the user
* @param fileName - name of file to make default
* @returns value in json format
*/
function set_default_log_file($userId, $fileName) {
	 global $OK,$ERROR;
	 $rMsg="";
	 global $default_file;
	 $log_files = _get_log_file_list($userId);
	 if ( in_array($fileName, $log_files )) {
	      $rMsg=_create_return_value($OK, "Making default file $fileName for user $userId.");
	      $default_file=$fileName;
	 }
	 else {
	      $rMsg=_create_return_value($ERROR, "Unable to set default file, $fileName not found for $userId");
	 }
	 return $rMsg;
}

/**
* Gets the default file for given user.
*
* @param userId - identifies the user.
* @return value and filename in json format. 
*/
function get_default_log_file($userId) {
	 global $OK;
	 global $default_file;
	 $rMsg=_create_return_value($OK, "", $default_file);
	 return $rMsg;
}

/** 
* Removes log file for user.
* Deletes the log files from user folder.
*
* @param userId - identifies the user.
* @param fileName - name of file to remove.
* @return value in json format.
*/
function remove_log_file($userId, $fileName) {
	 $log_files = _get_log_file_list($userId);
	 if ( in_array($fileName, $log_files )) {
	    echo "Removing file $fileName for user $userId\n";
	 }
	 else {
	      echo "ERROR:: Unable to remove file, $fileName not found for $userId\n";
	 }
}

function _get_log_file_list($userId) {
	 $log_files = scandir("logfiles");
	 $unwanted_list = array(".", "..");
	 $log_files = array_values(array_diff($log_files, $unwanted_list));
	 return $log_files;
}


/**********************************************************************/
/* CODE TO TEST THE FUNCTIONS                                         */
/**********************************************************************/

/*
$returnMessage = "";
$users=get_list_of_users($returnMessage);
print("List of users:\n");
print_r($users);

create_user("jdoe", "jdpassword", "John", "Doe", $returnMessage);
create_user("jdoe", "jdpassword", "John", "Doe", $returnMessage);

create_user("lsmith", "lspassword", "Larry", "Smith", $returnMessage);

create_user("lisa", "lisapassword", "Lisa", "Fox", $returnMessage);

print("List of users after adding all users:\n");
$users=get_list_of_users($returnMessage);
print_r($users);

$user = get_user_info("jdoe", $returnMessage);
print("User information for 'jdoe'\n");
print_r($user);
print("\n");

remove_user("jdoe", $returnMessage);
print("List of users after removing 'jdoe':\n");
$users=get_list_of_users($returnMessage);
print_r($users);
*/

/*
$v=add_log_file("testuser", "1.log");
echo "$v\n";
$v=get_log_file_list("testuser");
echo "$v\n";
$v=set_default_log_file("testuser", "2.log");
echo "$v\n";
$v=get_default_log_file("testuser", "2.log");
echo "$v\n";
*/
?>


