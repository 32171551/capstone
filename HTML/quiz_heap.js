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
   new Question('1. 힙에 대한 설명으로 옳은 것은?', ['배열로 가장 효과적인 구현이 가능하도록 설계.','느슨한 정렬(반정렬) 상태를 유지한다.','완전 이진 트리를 기반으로 구현된다.','중복된 값을 허용할 수 없다.'], '중복된 값을 허용할 수 없다.'),
   new Question('2. 다음 힙의 구현방법에 대한 옳지 않은 것은?', ['힙의 데이터를 저장하는 자료구조는 배열을 이용한다.', '  왼쪽 자식 노드의 인덱스는 (부모 노드의 인덱스) X 2로 계산한다','오른쪽 자식 노드의 인덱스는 (부모 노드의 인덱스) X 4 + 2', '  부모 노드의 인덱스는 (자식 노드의 인덱스) / 2로 계산한다. '], '오른쪽 자식 노드의 인덱스는 (부모 노드의 인덱스) X 4 + 2'),
   new Question('3. 다음 힙의 삭제방법에 대한 옳지 않은 것은?', ['루트 노트를 삭제한다.', '힙의 마지막 노드를 루트 노드로 가져간다.','새로운 노드를 부모 노드들과 교환하여 힙의 성질(최대 힙, 최소 힙)을 만족시키도록 반복한다.', '루트 노드와 자식 노드들을 비교하며 힙의 성질을 만족시키도록 반복한다. '], '새로운 노드를 부모 노드들과 교환하여 힙의 성질(최대 힙, 최소 힙)을 만족시키도록 반복한다.'),
   new Question('4. 다음 힙의 시간 복잡도는?', [' O(n^2) ', 'O(2n)','O(nlog2n)', ' O(n!)'], 'O(nlog2n)')
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