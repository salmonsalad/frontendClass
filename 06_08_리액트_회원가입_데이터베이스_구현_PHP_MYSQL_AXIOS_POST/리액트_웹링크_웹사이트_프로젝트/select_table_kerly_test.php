<?
include_once('./header.php');


//데이터 가져오기 SQL : SELECT 
$sql = "SELECT * FROM market_kerly_gaib_table";
$result = mysqli_query($conn, $sql);

echo '레코드 갯수 : ' . mysqli_num_rows($result); //레코드(줄) 갯수 카운트


//데이터를 객체화해서 그리고 JSON 데이터
//JSON
//배열 생성
$arr = array(); //배열 생성

//데이터가 1개이상인경우 반복처리 수행
if( mysqli_num_rows($result) > 0 ){

  //데이터를 반복처리해서 배열에 저장한다.
  //데이터를 배열처리해서 뽑아내는 함수 mysqli_fetch_array(데이터)
  while($row = mysqli_fetch_array($result) ){
      //배열안에 밀어넣는 함수 array_push()
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

echo $json_result; //반환된다.



include_once('./footer.php');
?>