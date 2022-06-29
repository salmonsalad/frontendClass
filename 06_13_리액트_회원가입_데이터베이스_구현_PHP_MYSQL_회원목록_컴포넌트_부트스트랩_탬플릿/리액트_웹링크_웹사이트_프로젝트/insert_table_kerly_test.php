<?
include_once('./header.php');



//데이터 입력(저장) insert into
//더미테이터 : 테이블에 데이터 입력문 sql 테스트
$id       = 'moonjong';
$pw       = 'moonjong123';
$name     = '이순신';
$email    = 'moonjong@naver.com';
$hp       = '010-7942-5305';
$addr     = '서울시 서초구 서초동 25번지';
$gender   = '여자';
$birth    = '1979-09-29';
$addinput = '추가입력 추천인 세종대왕';
$agrement = '약관동의 내용 필수 ....';
$joindate = '2022-06-08';

//데이터 저장
$sql = "INSERT INTO market_kerly_gaib_table (id,pw,name,email,hp,addr,gender,birth,addinput,agrement,joindate) VALUES 
('$id','$pw','$name','$email','$hp','$addr','$gender','$birth','$addinput','$agrement','$joindate')";
$result = mysqli_query($conn, $sql);

//저장 확인
if($result===true){
  echo "데이터가 테이블에 저장 되었습니다.";
}
else{
  echo "테이블 저장 실패!";
}




include_once('./footer.php');
?>