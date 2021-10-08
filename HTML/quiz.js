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
    new Question('1. 트리에 대한 설명으로 옳지 않은 것은?', ['트리는 하나의 루트 노드를 갖는다.', '트리는 계층 모델이다.', '노드가 N개인 트리는 항상 N-1개의 간선(edge)을 가진다.', '트리에는 싸이클이 존재한다.'], '트리에는 싸이클이 존재한다.'),
    new Question('2. 이진트리에 대한 설명으로 옳지 않은 것은?', ['각 노드가 최대 두 개의 자식을 갖는 트리이다.', '모든 트리는 이진트리다.', '이진 트리는 다양한 종류가 존재한다.', '단말 노드가 존재할 수 있다.'], '모든 트리는 이진트리다.'),
    new Question('3. 이진트리의 종류로 옳지 않은 것은?', ['포화 이진트리', '완전 이진트리', '불완전 이진트리', '편향 이진트리'], '불완전 이진트리'),
    new Question('4. 아래의 포화 이진 트리에 대한 전위 순회 순서는?', ['1-2-4-8-9-5-10-11-3-6-12-13-7-14-15', '8-9-4-10-11-5-2-12-13-6-14-15-7-3', '8-4-9-2-10-5-11-1-12-6-13-3-14-7-15', '1-2-3-4-5-6-7-8-9-10-11-12-13-14-15'], '1-2-4-8-9-5-10-11-3-6-12-13-7-14-15')
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