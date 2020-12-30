<?php 
// ---set up connection. 'ip','username','password','databasename'
$conn = mysqli_connect("localhost", "wpuser", "yoyoUCLA18","danmu");
//on this server, all commands contain mysqli, not mysql. bc this server installed mysqli
// if connect successfully, !$conn == 0
if (!$conn) {
    die('<p>Connection failed: <p>');
}
echo '<p>Connected successfully</p>';

// ---create a database called danmu. A database contains tables
// if (mysqli_query($conn, "CREATE DATABASE danmu")) { 
//  //---if you use mysql> in terminal, you should type in 'CREATE DATABASE danmu;' All mysql commands end with ';' in terminal
// echo "Database created successfully";
// } else {
// echo "Error creating database: " . mysqli_error($conn);
// }
//mysqli_query($conn, "DROP TABLE dmtable");//delete the table
// ---create the table 'dmtable' in database 'danmu' //TEXT: a string datatype in MySQL
// $sql = "CREATE TABLE IF NOT EXISTS dmtable (
//     id TEXT,
//     danmu TEXT
//     )";

// --- if table is created, mysqli_query() will return TRUE
// if (mysqli_query($conn, $sql)) {
//     echo "Table dmtable created successfully";
//   } else {
//     echo "Error creating table: " . mysqli_error($conn);
//   }

mysqli_query("SET NAMES 'utf8'"); //command tricks to keep encoding/decoding consistent

$danmu=$_POST['danmu'];//$_POST in php will collect data passed by $.post(url,data) in jQuery
echo $danmu;
$sql="INSERT INTO dmtable(id,danmu) VALUES ('','".$danmu."')";//in terminal, you should type 'INSERT INTO dmtable(id,danmu) VALUES ('','".$danmu."');'
//echo $sql;
$query=mysqli_query($conn,$sql); //when it works, $query = 1
echo $query;

// To check the database in terminal, I use these commands:
// mysql -u wpuser -p (and enter password)
// mysql>SHOW DATABASES;
// mysql>use danmu;
// mysql>SHOW TABLES;
// mysql>SELECT * FROM dmtable;
// Then you will be able to see all the table contents (stored danmu)

mysqli_close($conn);
?>


