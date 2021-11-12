function Question(text, choice, answer) {
   this.text = text; // 질문 텍스트
   this.choice = choice; // 선택할 답들(배열)
   this.answer = answer; // 정답 정보
}

function make(){
   if(quiz.questionIndex==3)
   {
     //   var img = document.createElement('img'); // 이미지 객체 생성
     //   img.setAttribute("src","image/tree.png"); // 이미지 경로 설정 (랜덤)
     //   img.setAttribute("style", "max-width: 30%; height: auto");
     //   document.getElementById('quiz').appendChild(img); // board DIV 에 이미지 동적 추가
   }
}

// 퀴즈 정보 객체
function Quiz(questions) {
   this.score = 0; // 점수
   this.questions = questions; // 문제
   this.questionIndex = 0; // 문제 번호
}

// 정답 확인 메서드
Quiz.prototype.correctAnswer = function (answer) {
   return answer == this.questions[this.questionIndex].answer;
}

var questions = [
   new Question('1. 리스트에 대한 설명으로 틀린 것은?', ['메모리 공간에서의 물리적인 위치가 논리적인 위치와 동일하다.', '어떤 정의에 의해서 결정된 논리적인 순서의 나열', '일정한 순서의 나열', '리스트를 포인터로 구현할 경우에는 배열에 비해서 추가적인 메모리 공간이 필요하다.'], '메모리 공간에서의 물리적인 위치가 논리적인 위치와 동일하다.')
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



function del() {
   document.getElementById('board').innerHTML = '';
}

function progress() {
   var progress = document.getElementById('progress');
   progress.innerHTML = '문제 ' + (quiz.questionIndex + 1) + '/ ' + quiz.questions.length;
}

var btn = document.querySelectorAll('.btn');

// 입력 및 정답 확인 함수
function checkAnswer(i) {
   btn[i].addEventListener('click', function () {
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