<?php 
// ---set up connection. 'ip','username','password','databasename'
$conn = mysqli_connect("localhost", "wpuser", "yoyoUCLA18","danmu");
//on this server, all commands contain mysqli, not mysql. bc this server installed mysqli
// if connect successfully, !$conn == 0
// if (!$conn) {
//     die('<p>Connection failed: <p>');
// }
// echo '<p>Connected successfully</p>';

mysqli_query("SET NAMES 'utf8'"); //

$sql="SELECT danmu FROM dmtable";
$query=mysqli_query($conn,$sql); //mysqli_query($sql) is wrong, we need to specify $conn.
//echo $danmu;
echo "[";
$first=0;
while($row=mysqli_fetch_array($query)){
	if ($first) {
		echo ",";
		
	}
$first=1;
echo "'".$row['danmu']."'";
}
	echo "]";


mysqli_close($conn);

?>
