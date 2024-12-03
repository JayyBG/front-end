// Quiz vragen en data
const questions = [
    {
      image: " /public/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png", // Vervang met het juiste pad naar je afbeelding
      correctAnswer: "Kendrick Lamar",
      options: ["Kendrick Lamar", "J. Cole", "Drake", "Kanye West"]
    },
    {
      image: "/public/Kanyewest_collegedropout.jpg",
      correctAnswer: "Kanye West",
      options: ["Jay-Z", "Kanye West", "50 Cent", "Dr. Dre"]
    },
    {
      image: "/public/2014ForestHillsDrive.jpg",
      correctAnswer: "J. Cole",
      options: ["J. Cole", "Kendrick Lamar", "Eminem", "Lil Wayne"]
    },
    {
      image: "/public/Nothing was the same.jpeg",
      correctAnswer: "Drake",
      options: ["Drake", "Travis Scott", "Lil Baby", "Tyler, The Creator"]
    },
    {
      image: "/public/Good kid maad city.jpeg",
      correctAnswer: "Kendrick Lamar",
      options: ["Kendrick Lamar", "Schoolboy Q", "Dr. Dre", "Snoop Dogg"]
    }
  ];
  
  // Variabelen voor teams en scores
  let currentTeam = 1; // Start met Team 1
  let team1Score = 0;
  let team2Score = 0;
  let currentQuestionIndex = 0;
  let timeLeft = 15;
  
  // HTML-elementen ophalen
  const timerElement = document.getElementById('time');
  const answerOptionsElement = document.getElementById('answer-options');
  const albumImageElement = document.getElementById('album-image');
  const teamNameElement = document.getElementById('team-name');
  const scoreTeam1Element = document.getElementById('score-team1');
  const scoreTeam2Element = document.getElementById('score-team2');
  
  // Functie om opties te schudden
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // Functie om de volgende vraag te laden
  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      endQuiz();
      return;
    }
  
    const question = questions[currentQuestionIndex];
    albumImageElement.src = question.image;
    albumImageElement.alt = "Album cover";
  
    // Opties tonen
    answerOptionsElement.innerHTML = '';
    const shuffledOptions = shuffleArray(question.options);
    shuffledOptions.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.className = 'option-btn';
      button.onclick = () => checkAnswer(option);
      answerOptionsElement.appendChild(button);
    });
  
    // Timer starten
    startTimer();
  }
  
  // Timerfunctie
  function startTimer() {
    timeLeft = 15;
    timerElement.textContent = timeLeft;
  
    const timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Tijd is om! Het juiste antwoord was: " + questions[currentQuestionIndex].correctAnswer);
        nextTurn();
      } else if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = timeLeft;
      }
    }, 1000);
  
    // Stop de timer als een vraag wordt beantwoord
    timerElement.dataset.timerId = timer;
  }
  
  // Antwoord controleren
  function checkAnswer(selectedOption) {
    clearInterval(parseInt(timerElement.dataset.timerId)); // Timer stoppen
  
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.correctAnswer) {
      alert("Correct!");
      if (currentTeam === 1) {
        team1Score++;
        scoreTeam1Element.textContent = team1Score;
      } else {
        team2Score++;
        scoreTeam2Element.textContent = team2Score;
      }
    } else {
      alert("Fout! Het juiste antwoord was: " + question.correctAnswer);
    }
  
    nextTurn();
  }
  
  // Naar de volgende vraag of wissel van team
  function nextTurn() {
    currentTeam = currentTeam === 1 ? 2 : 1;
    teamNameElement.textContent = `Beurt: Team ${currentTeam}`;
    currentQuestionIndex++;
  
    // Laad volgende vraag
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }
  
  // Quiz beëindigen
  function endQuiz() {
    alert(`De quiz is voorbij! Team 1: ${team1Score}, Team 2: ${team2Score}`);
    const winner =
      team1Score > team2Score
        ? "Team 1 wint!"
        : team1Score < team2Score
        ? "Team 2 wint!"
        : "Het is gelijkspel!";
    alert(winner);
    resetGame();
  }
  
  // Game resetten
  function resetGame() {
    currentTeam = 1;
    team1Score = 0;
    team2Score = 0;
    currentQuestionIndex = 0;
  
    teamNameElement.textContent = `Beurt: Team ${currentTeam}`;
    scoreTeam1Element.textContent = team1Score;
    scoreTeam2Element.textContent = team2Score;
  
    loadQuestion();
  }
  
  // Start de quiz
  loadQuestion();
  