function Question(text, choice, answer) {
    this.text = text; // 질문 텍스트
    this.choice = choice; // 선택할 답들(배열)
    this.answer = answer; // 정답 정보
 }
 function make(){
    if(quiz.questionIndex==3)
    {
        var img = document.createElement('img'); // 이미지 객체 생성
        img.setAttribute("src","image/tree.png"); // 이미지 경로 설정 (랜덤)
        img.setAttribute("style", "max-width: 30%; height: auto");
        document.getElementById('quiz').appendChild(img); // board DIV 에 이미지 동적 추가
    }
}
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
    new Question('1. 스택에 대해 설명 중 가장 틀린 것은 무엇인가?', ['후위 표기식은 연산자를 피연산자의 뒤에 표기하는 방법이다.', '스택은 객체와 객체가 저장되는 순서를 기억하는 방법에 관한 추상자료형이다.', '스택은 자료의 삽입과 삭제가 같은 변수를 통해 제어된다.', '스택의 크기는 가변적이다.'], '스택의 크기는 가변적이다.'),
    new Question('2. 다음 중 스택의 응용에 대한 설명이 아닌것은?', ['프로그램에서 사용되는 변수들의 생명주기 관리', ' 중앙처리 장치 할당을 위한 RR 기법', '연산자들 간의 우선순위에 의해 계산 순서가 결정되는 수식 계산', '서브루틴의 수행이 끝난 후에 되돌아갈 함수 주소 저장'], ' 중앙처리 장치 할당을 위한 RR 기법'),
    new Question('3. 스택의 응용분야가 아닌것은?', ['작업 스케줄링', '수식의 계산', '시스템 스택', '서브루틴 호출'], '작업 스케줄링')
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