function Question(text, choice, answer) {
    this.text = text; // 질문 텍스트
    this.choice = choice; // 선택할 답들(배열)
    this.answer = answer; // 정답 정보
 }

 //  function make(){
//     if(quiz.questionIndex==3)
//     {
//         var img = document.createElement('img'); // 이미지 객체 생성
//         img.setAttribute("src","image/tree.png"); // 이미지 경로 설정 (랜덤)
//         img.setAttribute("style", "max-width: 30%; height: auto");
//         document.getElementById('quiz').appendChild(img); // board DIV 에 이미지 동적 추가
//     }
// }

 // 퀴즈 정보 객체
 function Quiz(questions) {
    this.score = 0; // 점수
    this.questions = questions; // 문제
    this.questionIndex = 0; // 문제 번호
 }
 
 // 정답 확인 메서드
 Quiz.prototype.correctAnswer = function(answer) {
    return answer == this.questions[this.questionIndex].answer;
 }
 
 var questions = [
    new Question('1. 자료구조의 유형 중 선형 구조에 해당하는 것은 무엇인가?', ['그래프', '트리', '힙', '큐'], '큐'),
    new Question('2. 다음 큐에 대한 설명으로 틀린 것을 고르시오.', ['원형 큐는 입구(rear 변수)와 출구(front 변수)를 연결하여 데이터 공간을 연속적으로 사용하기 위해 제안되었다.', '큐가 가득 찬 상태는 삽입되는 부분의 rear 변수와 삭제되는 부분의 front 변수를 이용할 수 없다.', ' 큐는 서로 다른 부분에서 삽입과 삭제가 발생하는 FIFO 특성을 갖는 순서 리스트이다.', '삽입되는 부분의 rear 변수가 마지막을 가리키면 큐에 포함된 원소의 갯수는 큐의 크기와 같고 큐가 가득 찬 상태이다.'], '삽입되는 부분의 rear 변수가 마지막을 가리키면 큐에 포함된 원소의 갯수는 큐의 크기와 같고 큐가 가득 찬 상태이다.'),
    new Question('3. 큐에서 element를 삽입할 경우의 설명으로 맞는 것은?', ['front의 위치를 감소시킨 후 element를 삽입', 'rear의 위치를 감소시킨 후 element를 삽입', 'front의 위치를 증가시킨 후 element를 삽입', 'rear의 위치를 증가시킨 후 element를 삽입'], 'rear의 위치를 증가시킨 후 element를 삽입'),
    new Question('4. 큐의 운용과 유사하게 운영되는 것이 아닌 것은 무엇인가?', ['은행에서 번호표를 뽑고 창구에 가기를 기다린다.', '웹브라우저에서 방금 전 방문했던 사이트 기록 저장 후 "이전 페이지로 돌아가기" 를 클릭한다.', '문서 출력을 위해 프린터기를 이용할 때 여러 개의 문서를 출력해도 먼저 인쇄버튼을 누른 문서부터 차례로 출력된다.', '택시 승강장에 줄을 서서 택시를 기다린다.'], '웹브라우저에서 방금 전 방문했던 사이트 기록 저장 후 "이전 페이지로 돌아가기" 를 클릭한다.')
 ];
 
 // 퀴즈 객체 생성
 var quiz = new Quiz(questions);
 
 // 문제 출력 함수
 function updateQuiz() {
    var question = document.getElementById('question');
    var idx = quiz.questionIndex + 1;
    var choice = document.querySelectorAll('.btn');
 
    // 문제 출력
    question.innerHTML = quiz.questions[quiz.questionIndex].text;
 
    // 선택 출력
    for (var i = 0; i < 4; i++) {
       choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
    }
    make();
    progress();
 }
 


function del(){
    document.getElementById('board').innerHTML = '';
}

 function progress() {
    var progress = document.getElementById('progress');
    progress.innerHTML = '문제 ' + (quiz.questionIndex + 1) + '/ ' + quiz.questions.length;
 }
 
 var btn = document.querySelectorAll('.btn');
 
 // 입력 및 정답 확인 함수
 function checkAnswer(i) {
    btn[i].addEventListener('click', function() {
       var answer = btn[i].innerText;
 
       if (quiz.correctAnswer(answer)) {
          alert('정답입니다!');
          quiz.score++;
       } else {
          alert('틀렸습니다!');
       }
 
       if (quiz.questionIndex < quiz.questions.length - 1) {
          quiz.questionIndex++;
          updateQuiz();
       } else {
          result();
       }
    });
 }
 
 function result() {
    var quizDiv = document.getElementById('quiz');
    var per = parseInt((quiz.score * 100) / quiz.questions.length);
    var txt = '<h1>결과</h1>' + '<h2 id="score">점수: ' + quiz.score + '/' + quiz.questions.length + '<br><br>' + per + '점' + '</h2>';
 
    quizDiv.innerHTML = txt;
 
    /*// 점수별 결과 텍스트
    if (per < 60) {
       txt += '<h2></h2>';
       quizDiv.innerHTML = txt;
    } else if (per >= 60 && per < 80) {
       txt += '<h2></h2>'
       quizDiv.innerHTML = txt;
    } else if (per >= 80) {
       txt += '<h2></h2>'
       quizDiv.innerHTML = txt;
    }*/
 }
 
 for (var i = 0; i < btn.length; i++) {
    checkAnswer(i);
 }
 
 updateQuiz();