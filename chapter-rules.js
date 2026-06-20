/** Quick Quiz — rules questions in English, one set per sport chapter. */

const RULES_BANK = {
  musculation: [
    {
      question: 'Why should you warm up before lifting weights?',
      options: ['To skip the workout', 'To prepare muscles and reduce injury risk', 'To lift heavier immediately', 'To avoid drinking water'],
      correctIndex: 1,
    },
    {
      question: 'What should a spotter do during a bench press?',
      options: ['Look at their phone', 'Help and protect the lifter if needed', 'Add weight without asking', 'Leave the gym'],
      correctIndex: 1,
    },
    {
      question: 'When learning a new exercise, what matters most?',
      options: ['Speed and heavy weight', 'Correct technique and control', 'Maximum reps as fast as possible', 'Closing your eyes'],
      correctIndex: 1,
    },
    {
      question: 'What is the purpose of a cool-down after training?',
      options: ['To eat immediately', 'To stretch and help muscles recover', 'To start another heavy session', 'To replace sleep'],
      correctIndex: 1,
    },
    {
      question: 'How should you increase weight over time?',
      options: ['Double the weight every session', 'Progress gradually when technique is good', 'Never change the weight', 'Let someone else choose randomly'],
      correctIndex: 1,
    },
    {
      question: 'What should you do if you feel sharp pain during an exercise?',
      options: ['Continue with heavier weight', 'Stop and tell the coach', 'Hold your breath and push harder', 'Ignore it completely'],
      correctIndex: 1,
    },
  ],
  badminton: [
    {
      question: 'How do you win a point in badminton?',
      options: ['When the shuttlecock lands in the opponent\'s court or they make a fault', 'When you shout louder', 'When you drop your racket', 'When the net falls down'],
      correctIndex: 0,
    },
    {
      question: 'In singles, how many players are on each side?',
      options: ['Two', 'One', 'Four', 'Six'],
      correctIndex: 1,
    },
    {
      question: 'What happens if the shuttlecock hits the net and goes over during a serve?',
      options: ['Always a fault', 'It can be a valid serve if it lands in the correct service box', 'The server loses the match', 'Both players change sides'],
      correctIndex: 1,
    },
    {
      question: 'Can you hit the shuttlecock before it crosses the net to your side?',
      options: ['Yes, always', 'No — you must let it cross to your side first', 'Only in doubles', 'Only if the coach agrees'],
      correctIndex: 1,
    },
    {
      question: 'What is a fault in badminton?',
      options: ['A perfect smash', 'An illegal shot or rule violation', 'Winning a rally', 'Changing rackets'],
      correctIndex: 1,
    },
    {
      question: 'When the score reaches 20–20, what is usually needed to win a game?',
      options: ['First to 21 only', 'Two clear points (e.g. 22–20)', 'A coin toss', 'The game ends in a draw'],
      correctIndex: 1,
    },
  ],
  basket: [
    {
      question: 'How many points is a shot scored inside the three-point arc worth?',
      options: ['One point', 'Two points', 'Three points', 'Four points'],
      correctIndex: 1,
    },
    {
      question: 'What is travelling in basketball?',
      options: ['Running without dribbling illegally', 'Passing to a teammate', 'Shooting from the free-throw line', 'Jumping for a rebound'],
      correctIndex: 0,
    },
    {
      question: 'What happens when a player commits too many personal fouls?',
      options: ['They score extra points', 'They may foul out and leave the game', 'The game stops forever', 'They become captain'],
      correctIndex: 1,
    },
    {
      question: 'How long can a player hold the ball without dribbling or passing (held ball / closely guarded)?',
      options: ['Unlimited time', 'Only a few seconds — they must pass or shoot', 'Ten minutes', 'Until the bell rings'],
      correctIndex: 1,
    },
    {
      question: 'What is a free throw?',
      options: ['An unguarded shot from the free-throw line after a foul', 'A shot from half court', 'A pass to the coach', 'A type of dribble'],
      correctIndex: 0,
    },
    {
      question: 'Can you kick the basketball on purpose during play?',
      options: ['Yes, anytime', 'No — it is a violation', 'Only in the last minute', 'Only the captain can'],
      correctIndex: 1,
    },
  ],
  touch_rugby: [
    {
      question: 'How do you stop an attacker in touch rugby?',
      options: ['Full tackle to the ground', 'A two-hand touch on the ball carrier', 'Pulling their shirt only', 'Shouting "stop"'],
      correctIndex: 1,
    },
    {
      question: 'In which direction must the ball be passed?',
      options: ['Forward', 'Backward or sideways — not forward', 'Straight up', 'Any direction'],
      correctIndex: 1,
    },
    {
      question: 'What happens after a touch is made?',
      options: ['The game stops permanently', 'The attacker performs a rollball or pass within a few metres', 'The defender scores a try', 'Everyone changes teams'],
      correctIndex: 1,
    },
    {
      question: 'How do you score in touch rugby?',
      options: ['By kicking through the posts', 'By grounding the ball over the try line', 'By pulling a flag', 'By hitting a target'],
      correctIndex: 1,
    },
    {
      question: 'Is tackling allowed in touch rugby?',
      options: ['Yes, full contact', 'No — only touches', 'Only for the captain', 'Only in the second half'],
      correctIndex: 1,
    },
    {
      question: 'What is the "dummy half" in touch rugby?',
      options: ['The player who receives the ball immediately after the rollball', 'The slowest player', 'The referee', 'The coach on the sideline'],
      correctIndex: 0,
    },
  ],
  flag_football: [
    {
      question: 'How do you stop the ball carrier in flag football?',
      options: ['Tackle them to the ground', 'Pull one of their flags', 'Push them hard', 'Grab the ball only'],
      correctIndex: 1,
    },
    {
      question: 'How many points is a touchdown worth?',
      options: ['Three', 'Six', 'One', 'Ten'],
      correctIndex: 1,
    },
    {
      question: 'What is the role of the quarterback?',
      options: ['Only to defend', 'To receive the snap and pass or hand off the ball', 'To pull flags only', 'To referee the game'],
      correctIndex: 1,
    },
    {
      question: 'What happens when a flag falls off without being pulled?',
      options: ['The play continues — the player is still active', 'Automatic touchdown', 'The team is disqualified', 'The game ends'],
      correctIndex: 0,
    },
    {
      question: 'Can the quarterback run with the ball in most school flag football rules?',
      options: ['Never', 'Often yes, depending on the rules used in class', 'Only backwards', 'Only if they shout first'],
      correctIndex: 1,
    },
    {
      question: 'What is a "blitz" in flag football?',
      options: ['Defenders rush the quarterback quickly after the snap', 'A long rest break', 'A type of touchdown dance', 'Changing sides'],
      correctIndex: 0,
    },
  ],
  baseball: [
    {
      question: 'How many strikes make a batter out (when the third strike is caught or missed)?',
      options: ['Two', 'Three', 'Four', 'Five'],
      correctIndex: 1,
    },
    {
      question: 'What must a runner do to score a run?',
      options: ['Hit the ball out of the stadium only', 'Touch all bases and reach home plate', 'Stay on first base', 'Catch the ball in the outfield'],
      correctIndex: 1,
    },
    {
      question: 'What is a "ball" in baseball?',
      options: ['A pitch outside the strike zone', 'Any hit into the crowd', 'When the batter runs', 'When the catcher drops the bat'],
      correctIndex: 0,
    },
    {
      question: 'How many players from the batting team are on the field at once (as batters/runners)?',
      options: ['One batter and possible runners on bases', 'Nine batters at the same time', 'The whole class', 'None'],
      correctIndex: 0,
    },
    {
      question: 'Can a fielder catch a fly ball for an out?',
      options: ['Yes — a caught fly ball is an out', 'No — only ground balls count', 'Only on home plate', 'Only in the last inning'],
      correctIndex: 0,
    },
    {
      question: 'What happens on three balls (in many simplified school rules)?',
      options: ['The batter walks to first base', 'The batter is out', 'The game stops', 'The teams swap sports'],
      correctIndex: 0,
    },
  ],
  laser_run: [
    {
      question: 'What is laser run?',
      options: ['Only fencing', 'A combined running and laser shooting event', 'A swimming race', 'A basketball drill'],
      correctIndex: 1,
    },
    {
      question: 'What usually happens if you miss a target in laser run?',
      options: ['You win automatically', 'You may have to run a penalty loop or extra distance', 'The race stops', 'Nothing ever happens'],
      correctIndex: 1,
    },
    {
      question: 'Why is breathing control important before shooting?',
      options: ['Running fast makes aiming harder', 'It slows the clock only', 'Rules forbid breathing', 'It replaces the warm up'],
      correctIndex: 0,
    },
    {
      question: 'What is the "transition zone"?',
      options: ['Where athletes switch from running to shooting', 'The cafeteria', 'The changing room only', 'The finish line banner'],
      correctIndex: 0,
    },
    {
      question: 'In modern pentathlon, which sports are combined (including laser run)?',
      options: ['Only football and tennis', 'Fencing, swimming, riding, running and shooting', 'Only badminton', 'Only weightlifting'],
      correctIndex: 1,
    },
    {
      question: 'What skill does laser run mainly test besides speed?',
      options: ['Accuracy and focus under pressure', 'Only singing', 'Only team shouting', 'Memory of French words'],
      correctIndex: 0,
    },
  ],
};

export function getRulesQuestions(chapterId, count = 5) {
  const bank = RULES_BANK[chapterId] || RULES_BANK.musculation;
  return shuffleRules([...bank]).slice(0, Math.min(count, bank.length));
}

function shuffleRules(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
