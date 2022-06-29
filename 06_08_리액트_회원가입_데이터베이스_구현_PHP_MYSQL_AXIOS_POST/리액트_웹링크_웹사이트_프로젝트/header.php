<?
  $servername = 'localhost';
  $username = 'moonjong22';
  $password = 'anstjswhd0105#';
  $databasename = 'moonjong22';

  $conn = mysqli_connect($servername, $username, $password, $databasename); 
  mysqli_set_charset($conn, 'utf8');

  if( !$conn ){
    die('데이터베이스 서버 접속 실패!');
  }
  else {
    echo "데이터베이스 서버 접속 성공!";
  }
?>