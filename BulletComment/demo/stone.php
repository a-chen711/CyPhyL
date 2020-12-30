<?php 
//insert/send comments to the server/database
// header('Content-type:text/html;charset=utf8');
// $conn = @ mysql_connect("localhost", "root", "") or die("datebase can`t been connected");
// mysql_select_db("danmu", $conn);
// mysql_query("set names 'utf8'"); //

// // function htmtocode($content) {
// // 	$content = str_replace("\n", "<br>", str_replace(" ", "&nbsp;", $content));
// // 	return $content;
// // }

// // // $c=$_GET['c'];
// // if($c =="insert"){




// // }
// // elseif($c=="query") {

// // $P="SELECT * FROM `danmu` ";
// // $queryp=mysql_query($P);
// // }
// // else {


// // }

// $danmu=$_POST['danmu'];
// //$sql="INSERT INTO `danmu` VALUES ('".$danmu."')";
// $sql="INSERT INTO `danmu`(`id`,`danmu`) VALUES ('','".$danmu."')";
// echo $sql;
// $query=mysql_query($sql); 
// //echo $danmu;
// echo $danmu;

//NEW CODE BELOW
$function = $_POST['function'];
    
$log = array();

//handles the different functions that we will implement at a future time
switch($function) {

   case('getState'):
       if (file_exists('chat.txt')) {
           $lines = file('chat.txt');
       }
       $log['state'] = count($lines); 
       break;  
  
   case('update'):
      $state = $_POST['state'];
      if (file_exists('chat.txt')) {
         $lines = file('chat.txt');
      }
      $count =  count($lines);
      if ($state == $count){
         $log['state'] = $state;
         $log['text'] = false;
      } else {
         $text= array();
         $log['state'] = $state + count($lines) - $state;
         foreach ($lines as $line_num => $line) {
             if ($line_num >= $state){
                   $text[] =  $line = str_replace("\n", "", $line);
             }
         }
         $log['text'] = $text; 
      }
        
      break;
   
   case('send'):
        $nickname = htmlentities(strip_tags($_POST['nickname']));
     $reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
     $message = htmlentities(strip_tags($_POST['text']));
     if (($message) != "\n") {
       if (preg_match($reg_exUrl, $message, $url)) {
          $message = preg_replace($reg_exUrl, '<a href="'.$url[0].'" target="_blank">'.$url[0].'</a>', $message);
       } 
          fwrite(fopen('chat.txt', 'a'), "<span>". $nickname . "</span>" . $message = str_replace("\n", " ", $message) . "\n"); 
     }
     break;
}
echo json_encode($log);
?>
