<?
include_once('./header.php');

$sql = "SELECT * FROM market_kerly_gaib_table";
$result = mysqli_query($conn, $sql);

$arr = array(); //배열 생성
if( mysqli_num_rows($result) > 0 ){

  while($row = mysqli_fetch_array($result) ){
      array_push($arr, array(
          '번호' => $row['idx'],
          '아이디' => $row['id'],
          '이름' => $row['name'],
          '이메일' => $row['email'],
          '휴대폰' => $row['hp'],
          '주소' => $row['addr'],
          '성별' => $row['gender'],
          '생년월일' => $row['birth'],
          '추가입력사항' => $row['addinput'],
          '이용약관동의' => $row['agrement'],
          '가입일자' => $row['joindate']
      ));
  }
}

//JSON 형식 변환
$json_result = json_encode($arr, JSON_UNESCAPED_UNICODE);
$json_file = file_put_contents('./data/kerly_member.json',   $json_result); //외부파일 저장 json 파일
echo $json_result; //반환된다.

include_once('./footer.php');
?>