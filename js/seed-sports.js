/** Word lists and stories for sports chapters (badminton → laser run). */

export function buildSportContent(makeWord) {
  const wordLists = [
    {
      id: 'badminton_basics', chapterId: 'badminton', name: 'Badminton — Basics', theme: 'basics',
      words: [
        makeWord({ english: 'shuttlecock', french: 'volant', definition: 'The feathered object hit back and forth over the net' }),
        makeWord({ english: 'racket', french: 'raquette', definition: 'The equipment used to hit the shuttlecock' }),
        makeWord({ english: 'net', french: 'filet', definition: 'The barrier dividing the two sides of the court' }),
        makeWord({ english: 'court', french: 'terrain / court', definition: 'The rectangular playing area for badminton' }),
        makeWord({ english: 'serve', french: 'service', definition: 'The shot that starts each point' }),
        makeWord({ english: 'smash', french: 'smash', definition: 'A powerful downward shot' }),
        makeWord({ english: 'drop shot', french: 'amorti', definition: 'A soft shot that lands just over the net' }),
        makeWord({ english: 'doubles', french: 'double', definition: 'A match with two players on each side' }),
        makeWord({ english: 'singles', french: 'simple', definition: 'A match with one player on each side' }),
        makeWord({ english: 'footwork', french: 'déplacement', definition: 'Quick, efficient movement around the court' }),
      ],
    },
    {
      id: 'badminton_image_match', chapterId: 'badminton', name: 'Badminton — Match Images', theme: 'image_match',
      words: [
        makeWord({ english: 'shuttlecock', french: 'volant', definition: 'The object hit over the net' }),
        makeWord({ english: 'badminton racket', french: 'raquette de badminton', definition: 'Equipment used to hit the shuttlecock' }),
        makeWord({ english: 'badminton net', french: 'filet de badminton', definition: 'The net on the court' }),
        makeWord({ english: 'badminton court', french: 'terrain de badminton', definition: 'The playing area' }),
        makeWord({ english: 'serve', french: 'service', definition: 'Starting shot of a rally' }),
        makeWord({ english: 'smash', french: 'smash', definition: 'Powerful attacking shot' }),
        makeWord({ english: 'drop shot', french: 'amorti', definition: 'Soft shot near the net' }),
      ],
    },
    {
      id: 'basket_basics', chapterId: 'basket', name: 'Basketball — Basics', theme: 'basics',
      words: [
        makeWord({ english: 'basketball', french: 'basket-ball', definition: 'The orange ball used in the sport' }),
        makeWord({ english: 'hoop', french: 'panier', definition: 'The ring and net where players score' }),
        makeWord({ english: 'dribble', french: 'dribbler', definition: 'To bounce the ball while moving' }),
        makeWord({ english: 'shoot', french: 'tirer', definition: 'To throw the ball toward the hoop' }),
        makeWord({ english: 'pass', french: 'passer', definition: 'To throw the ball to a teammate' }),
        makeWord({ english: 'rebound', french: 'rebond', definition: 'To catch the ball after a missed shot' }),
        makeWord({ english: 'defender', french: 'défenseur', definition: 'A player who tries to stop the other team scoring' }),
        makeWord({ english: 'offence', french: 'attaque', definition: 'The team trying to score points' }),
        makeWord({ english: 'lay-up', french: 'lay-up / tir près du panier', definition: 'A close-range shot near the hoop' }),
        makeWord({ english: 'foul', french: 'faute', definition: 'An illegal contact punished by free throws' }),
      ],
    },
    {
      id: 'basket_image_match', chapterId: 'basket', name: 'Basketball — Match Images', theme: 'image_match',
      words: [
        makeWord({ english: 'basketball', french: 'basket-ball', definition: 'The ball used in the game' }),
        makeWord({ english: 'hoop', french: 'panier', definition: 'Ring and net for scoring' }),
        makeWord({ english: 'dribble', french: 'dribble', definition: 'Bouncing the ball while moving' }),
        makeWord({ english: 'basketball court', french: 'terrain de basket', definition: 'The playing surface' }),
        makeWord({ english: 'rebound', french: 'rebond', definition: 'Catching the ball after a miss' }),
        makeWord({ english: 'lay-up', french: 'lay-up', definition: 'Close-range scoring shot' }),
      ],
    },
    {
      id: 'touch_rugby_basics', chapterId: 'touch_rugby', name: 'Touch Rugby — Basics', theme: 'basics',
      words: [
        makeWord({ english: 'try', french: 'essai', definition: 'Scoring by grounding the ball in the in-goal area' }),
        makeWord({ english: 'pass', french: 'passer', definition: 'To throw the ball to a teammate' }),
        makeWord({ english: 'touch', french: 'touché', definition: 'Contact with an opponent that stops play' }),
        makeWord({ english: 'attack', french: 'attaque', definition: 'The team in possession trying to score' }),
        makeWord({ english: 'defence', french: 'défense', definition: 'The team trying to stop the attack' }),
        makeWord({ english: 'offload', french: 'passer en contact', definition: 'To pass the ball while being touched' }),
        makeWord({ english: 'support', french: 'soutien', definition: 'Running to help the ball carrier' }),
        makeWord({ english: 'pitch', french: 'terrain', definition: 'The field where rugby is played' }),
        makeWord({ english: 'sidestep', french: 'feinte de corps', definition: 'A quick move to avoid a defender' }),
        makeWord({ english: 'dummy pass', french: 'feinte de passe', definition: 'A fake pass to trick the defence' }),
      ],
    },
    {
      id: 'touch_rugby_image_match', chapterId: 'touch_rugby', name: 'Touch Rugby — Match Images', theme: 'image_match',
      words: [
        makeWord({ english: 'rugby ball', french: 'ballon de rugby', definition: 'The oval ball used in rugby' }),
        makeWord({ english: 'try line', french: "ligne d'essai", definition: 'The line that must be crossed to score' }),
        makeWord({ english: 'touch', french: 'touché', definition: 'Two-hand contact to stop the attacker' }),
        makeWord({ english: 'rugby pitch', french: 'terrain de rugby', definition: 'The playing field' }),
        makeWord({ english: 'offload', french: 'passer en contact', definition: 'Passing while being touched' }),
        makeWord({ english: 'sidestep', french: 'feinte de corps', definition: 'Evading a defender' }),
      ],
    },
    {
      id: 'flag_football_basics', chapterId: 'flag_football', name: 'Flag Football — Basics', theme: 'basics',
      words: [
        makeWord({ english: 'flag', french: 'drapeau', definition: 'A cloth attached to the belt; pulling it stops the play' }),
        makeWord({ english: 'quarterback', french: 'quarterback', definition: 'The player who throws passes and leads the attack' }),
        makeWord({ english: 'touchdown', french: 'touchdown', definition: 'Scoring by reaching the end zone' }),
        makeWord({ english: 'catch', french: 'attraper', definition: 'To receive the ball in the air' }),
        makeWord({ english: 'run', french: 'courir', definition: 'To advance with the ball on foot' }),
        makeWord({ english: 'end zone', french: "zone d'en-but", definition: 'The scoring area at each end of the field' }),
        makeWord({ english: 'defence', french: 'défense', definition: 'The team trying to pull flags and stop scoring' }),
        makeWord({ english: 'snap', french: 'snap', definition: 'The backward pass that starts each play' }),
        makeWord({ english: 'blitz', french: 'blitz', definition: 'When defenders rush the quarterback quickly' }),
        makeWord({ english: 'handoff', french: 'handoff / remise', definition: 'Giving the ball directly to a running teammate' }),
      ],
    },
    {
      id: 'flag_football_image_match', chapterId: 'flag_football', name: 'Flag Football — Match Images', theme: 'image_match',
      words: [
        makeWord({ english: 'flag belt', french: 'ceinture à drapeaux', definition: 'Belt with flags defenders must pull' }),
        makeWord({ english: 'quarterback', french: 'quarterback', definition: 'Player who throws the ball' }),
        makeWord({ english: 'touchdown', french: 'touchdown', definition: 'Scoring in the end zone' }),
        makeWord({ english: 'end zone', french: "zone d'en-but", definition: 'Scoring area at the end of the field' }),
        makeWord({ english: 'football field', french: 'terrain de football américain', definition: 'The playing field' }),
        makeWord({ english: 'helmet', french: 'casque', definition: 'Protective headgear (optional in flag football)' }),
      ],
    },
    {
      id: 'baseball_basics', chapterId: 'baseball', name: 'Baseball — Basics', theme: 'basics',
      words: [
        makeWord({ english: 'bat', french: 'batte', definition: 'The wooden or metal stick used to hit the ball' }),
        makeWord({ english: 'pitch', french: 'lancer', definition: 'The throw from the pitcher to the batter' }),
        makeWord({ english: 'catcher', french: 'receveur', definition: 'The player behind home plate who catches pitches' }),
        makeWord({ english: 'home run', french: 'coup de circuit', definition: 'Hitting the ball out of the field for maximum points' }),
        makeWord({ english: 'base', french: 'base', definition: 'One of four positions runners must reach' }),
        makeWord({ english: 'glove', french: 'gant', definition: 'The padded mitt used to catch the ball' }),
        makeWord({ english: 'strike', french: 'strike', definition: 'A missed swing or a pitch in the strike zone' }),
        makeWord({ english: 'batter', french: 'frappeur', definition: 'The player who tries to hit the pitched ball' }),
        makeWord({ english: 'inning', french: 'manche', definition: 'A division of the game when both teams bat and field' }),
        makeWord({ english: 'outfield', french: 'champ extérieur', definition: 'The area far from home plate' }),
      ],
    },
    {
      id: 'baseball_image_match', chapterId: 'baseball', name: 'Baseball — Match Images', theme: 'image_match',
      words: [
        makeWord({ english: 'baseball bat', french: 'batte de baseball', definition: 'Equipment for hitting the ball' }),
        makeWord({ english: 'baseball glove', french: 'gant de baseball', definition: 'Mitt for catching the ball' }),
        makeWord({ english: 'home plate', french: 'marbre / home plate', definition: 'The base where the batter stands' }),
        makeWord({ english: 'pitcher', french: 'lanceur', definition: 'Player who throws the ball to the batter' }),
        makeWord({ english: 'catcher', french: 'receveur', definition: 'Player behind home plate' }),
        makeWord({ english: 'baseball field', french: 'terrain de baseball', definition: 'The diamond-shaped playing area' }),
      ],
    },
    {
      id: 'laser_run_basics', chapterId: 'laser_run', name: 'Laser Run — Basics', theme: 'basics',
      words: [
        makeWord({ english: 'laser pistol', french: 'pistolet laser', definition: 'The device used to shoot at targets' }),
        makeWord({ english: 'target', french: 'cible', definition: 'The object athletes must hit with the laser' }),
        makeWord({ english: 'shoot', french: 'tirer', definition: 'To aim and fire at the target' }),
        makeWord({ english: 'obstacle', french: 'obstacle', definition: 'A barrier on the course that runners must cross' }),
        makeWord({ english: 'course', french: 'parcours', definition: 'The full route combining running and shooting' }),
        makeWord({ english: 'transition', french: 'transition', definition: 'Moving from running to shooting and back' }),
        makeWord({ english: 'penalty', french: 'pénalité', definition: 'Extra time added for missed shots' }),
        makeWord({ english: 'fencing', french: 'escrime', definition: 'The sport of sword fighting, part of modern pentathlon' }),
        makeWord({ english: 'combine', french: 'combiner', definition: 'To mix running and shooting in one event' }),
        makeWord({ english: 'endurance', french: 'endurance', definition: 'The ability to keep running between shooting stages' }),
      ],
    },
    {
      id: 'laser_run_image_match', chapterId: 'laser_run', name: 'Laser Run — Match Images', theme: 'image_match',
      words: [
        makeWord({ english: 'laser pistol', french: 'pistolet laser', definition: 'Device for shooting at targets' }),
        makeWord({ english: 'shooting target', french: 'cible de tir', definition: 'Target to hit with the laser' }),
        makeWord({ english: 'obstacle course', french: "parcours d'obstacles", definition: 'Running route with barriers' }),
        makeWord({ english: 'fencing piste', french: "piste d'escrime", definition: 'The strip where fencers compete' }),
        makeWord({ english: 'laser run course', french: 'parcours laser run', definition: 'Combined run and shoot route' }),
        makeWord({ english: 'transition zone', french: 'zone de transition', definition: 'Area between running and shooting' }),
      ],
    },
  ];

  const stories = [
    {
      id: 'badminton_story_1', chapterId: 'badminton', title: 'First Badminton Match', englishLevel: 'B1',
      text: 'Sophie joined the school badminton club on Monday. Her coach taught her how to hold the racket correctly and how to serve from the right side of the court. During the warm up, students practiced footwork drills along the sideline. In her first singles match, Sophie tried a drop shot that surprised her opponent. Later, she attempted a smash but the shuttlecock landed out. Her partner in doubles encouraged her to stay calm and communicate. By the end of the session, Sophie understood that badminton requires speed, precision, and good teamwork.',
      questions: [
        { question: 'What did Sophie learn at the start?', options: ['How to swim', 'How to hold the racket and serve', 'How to ride a bike', 'How to score a try'], correctIndex: 1 },
        { question: 'What type of match did Sophie play first?', options: ['Doubles only', 'Singles', 'Mixed relay', 'No match'], correctIndex: 1 },
        { question: 'Which shot surprised her opponent?', options: ['Smash', 'Drop shot', 'Serve into the net', 'A pass'], correctIndex: 1 },
        { question: 'What skills does badminton require according to the story?', options: ['Only strength', 'Speed, precision, and teamwork', 'Only luck', 'No communication'], correctIndex: 1 },
      ],
    },
    {
      id: 'badminton_story_2', chapterId: 'badminton', title: 'Doubles Communication', englishLevel: 'B1',
      text: 'During doubles practice, Coach Martin insisted that partners must talk constantly on court. Before each rally, the server called the type of serve while the partner covered the back of the court. When the shuttlecock flew high, one player shouted "Yours!" so there was no confusion. Students learned that footwork drills are useless if teammates do not communicate. After several sessions, the pairs who spoke clearly made fewer mistakes and won more points. Martin reminded the class that badminton is not only about individual skill — coordination between partners is essential at every level.',
      questions: [
        { question: 'What did the coach insist partners must do?', options: ['Stay silent', 'Talk constantly on court', 'Change rackets every point', 'Serve only to the left'], correctIndex: 1 },
        { question: 'Why did one player shout "Yours!"?', options: ['To distract opponents', 'To avoid confusion about who hits the shuttlecock', 'To stop the match', 'To request a new shuttlecock'], correctIndex: 1 },
        { question: 'Which pairs performed better over time?', options: ['Those who never practiced footwork', 'Those who communicated clearly', 'Those who avoided the net', 'Those who refused to serve'], correctIndex: 1 },
        { question: 'What is essential in doubles according to the coach?', options: ['Individual skill only', 'Coordination between partners', 'Running off the court', 'Using the heaviest racket'], correctIndex: 1 },
      ],
    },
    {
      id: 'badminton_story_3', chapterId: 'badminton', title: 'Preparing for the Tournament', englishLevel: 'B2',
      text: 'Two weeks before the inter-school badminton tournament, the Première team followed a structured training plan. Mornings focused on explosive footwork along the sideline and reaction drills at the net. Afternoons were reserved for match simulations in singles and doubles. The coach analysed video recordings to show students when a drop shot was more effective than a smash. Nutrition and sleep were discussed as seriously as technique because fatigue leads to unforced errors. Although the pressure increased, students felt prepared rather than overwhelmed. They understood that tournament success depends on consistent preparation, not on luck during a single rally.',
      questions: [
        { question: 'What did morning sessions emphasise?', options: ['Only serving practice', 'Explosive footwork and net reaction drills', 'Swimming and cycling', 'Writing essays about badminton'], correctIndex: 1 },
        { question: 'How did the coach use video recordings?', options: ['To punish students', 'To compare drop shots and smashes strategically', 'To replace all training sessions', 'To select the school team by appearance'], correctIndex: 1 },
        { question: 'Why were nutrition and sleep discussed?', options: ['Fatigue leads to unforced errors', 'Students asked about holidays', 'The tournament was cancelled', 'Rules forbid eating before sport'], correctIndex: 0 },
        { question: 'What does tournament success depend on according to the story?', options: ['Luck during one rally', 'Consistent preparation', 'Avoiding all smashes', 'Playing without a warm up'], correctIndex: 1 },
      ],
    },
    {
      id: 'badminton_story_4', chapterId: 'badminton', title: 'Reading the Opponent', englishLevel: 'B2',
      text: 'In an advanced tactics session, the Terminale students learned to observe opponents carefully before choosing a shot. If a player stood too close to the net, a high clear to the back of the court could create space. If the opponent\'s footwork looked slow after a long rally, a fast smash down the line became a realistic option. The coach explained that elite players do not simply react — they anticipate patterns and adapt their strategy point by point. Students practiced disguising their shots so the shuttlecock\'s direction was harder to predict. By the end of the lesson, several athletes remarked that badminton felt less like a reflex sport and more like a mental chess game played at high speed.',
      questions: [
        { question: 'What should players observe before choosing a shot?', options: ['The colour of the court', 'Opponents\' position and movement patterns', 'The referee\'s shoes', 'The scoreboard only'], correctIndex: 1 },
        { question: 'When is a high clear to the back useful?', options: ['When the opponent stands too close to the net', 'When the shuttlecock is broken', 'When the net is lowered', 'Never during a match'], correctIndex: 0 },
        { question: 'How do elite players differ from beginners?', options: ['They never sweat', 'They anticipate patterns and adapt strategy', 'They refuse to play doubles', 'They ignore footwork completely'], correctIndex: 1 },
        { question: 'What comparison did students make at the end of the lesson?', options: ['Badminton is like chess at high speed', 'Badminton is identical to rugby', 'Badminton requires no thinking', 'Badminton is only about luck'], correctIndex: 0 },
      ],
    },
    {
      id: 'badminton_story_5', chapterId: 'badminton', title: 'After the Final Point', englishLevel: 'C1',
      text: 'When the regional badminton final ended, the scoreboard showed a narrow defeat for the school team. In the changing room, disappointment was visible, yet the coach reframed the result as evidence of substantial progress. Over the season, average rally length had increased, unforced errors had decreased, and doubles pairs communicated with far greater precision. Several athletes noted that managing emotions under pressure was the skill they had improved most. The captain suggested keeping a reflective journal in English to analyse matches objectively rather than emotionally. The PE department agreed: competitive experience, combined with structured self-review, develops not only sporting competence but also the resilience required for high-level performance in any discipline.',
      questions: [
        { question: 'How did the coach interpret the defeat?', options: ['As proof the team should quit', 'As evidence of substantial progress', 'As a reason to cancel training', 'As an unfair referee decision only'], correctIndex: 1 },
        { question: 'Which skill did several athletes say they improved most?', options: ['Managing emotions under pressure', 'Memorising French vocabulary', 'Avoiding all smashes', 'Changing sports entirely'], correctIndex: 0 },
        { question: 'What did the captain recommend keeping?', options: ['A reflective journal in English', 'A collection of broken rackets', 'Only video games', 'No written records'], correctIndex: 0 },
        { question: 'What broader outcome does the department associate with competitive experience?', options: ['Resilience and structured self-review', 'Immediate victory every time', 'Less need for communication', 'Avoidance of all pressure'], correctIndex: 0 },
      ],
    },
    {
      id: 'basket_story_1', chapterId: 'basket', title: 'Basketball Practice', englishLevel: 'B1',
      text: 'The Seconde class arrived at the basketball court for their first English PE session. The coach divided students into two teams and explained the rules of offence and defence. Players practiced dribbling without looking at the ball, then passed to teammates moving toward the hoop. When a shot missed, the tallest student grabbed the rebound and passed quickly to a teammate for a lay-up. One player committed a foul by pushing an opponent, so the other team received free throws. Everyone agreed that communication and quick decisions are essential in basketball.',
      questions: [
        { question: 'What did players practice first?', options: ['Dribbling and passing', 'Swimming strokes', 'Serving', 'Pitching'], correctIndex: 0 },
        { question: 'What happened after a missed shot?', options: ['The game stopped forever', 'A player grabbed the rebound', 'They switched to rugby', 'Nobody moved'], correctIndex: 1 },
        { question: 'Why did the other team get free throws?', options: ['A player committed a foul', 'They scored a touchdown', 'The ball was lost', 'It was raining'], correctIndex: 0 },
        { question: 'What is essential in basketball according to the story?', options: ['Silence', 'Communication and quick decisions', 'Running slowly', 'Ignoring teammates'], correctIndex: 1 },
      ],
    },
    {
      id: 'basket_story_2', chapterId: 'basket', title: 'Learning the Pick and Roll', englishLevel: 'B1',
      text: 'Coach Rivera introduced the pick and roll, one of basketball\'s most common offensive plays. One player set a screen near the defender while the ball handler dribbled toward the hoop. After the screen, the screener rolled toward the basket, ready to receive a pass for a lay-up. Students struggled at first because timing was difficult — arrive too early or too late and the defence recovers easily. With repetition, the Première class understood that basketball offence depends on movement without the ball as much as on individual shooting skill. Rivera reminded them that every successful play begins with clear verbal signals on court.',
      questions: [
        { question: 'What is a pick and roll?', options: ['A defensive foul only', 'A screen followed by a cut toward the basket', 'A type of free throw', 'A way to stop the game'], correctIndex: 1 },
        { question: 'Why did students struggle initially?', options: ['The hoop was too high', 'Timing the screen and roll was difficult', 'They were not allowed to dribble', 'The ball was too heavy'], correctIndex: 1 },
        { question: 'What does offence depend on according to the coach?', options: ['Movement without the ball and shooting skill', 'Only shouting at referees', 'Standing still with the ball', 'Avoiding all passes'], correctIndex: 0 },
        { question: 'What begins every successful play?', options: ['Clear verbal signals', 'Closing your eyes', 'Running off the court', 'Ignoring teammates'], correctIndex: 0 },
      ],
    },
    {
      id: 'basket_story_3', chapterId: 'basket', title: 'Defensive Pressure', englishLevel: 'B2',
      text: 'During a unit on defence, the Terminale team studied how to apply pressure without committing unnecessary fouls. Players learned to slide their feet laterally, keep their hands active, and force opponents toward the sideline where passing options are limited. The coach explained that good defence is collective: when one player helps after a dribble penetration, others must rotate to cover open shooters. In scrimmages, teams that communicated defensive switches conceded far fewer lay-ups. Students realised that defence requires concentration for the entire possession, not only when the ball is near the hoop. By the end of the week, even the strongest offensive players respected how much strategy defence demands.',
      questions: [
        { question: 'What should defenders do with their feet?', options: ['Slide laterally and stay balanced', 'Jump constantly without moving', 'Turn their back to the ball', 'Leave the court'], correctIndex: 0 },
        { question: 'Why force opponents toward the sideline?', options: ['Passing options become limited', 'It guarantees a foul', 'It stops the clock permanently', 'It ends the game immediately'], correctIndex: 0 },
        { question: 'What happens when one player helps after penetration?', options: ['Others must rotate to cover shooters', 'Everyone stops playing', 'The offence always scores', 'The referee ends the match'], correctIndex: 0 },
        { question: 'What did students realise about defence?', options: ['It requires concentration for the entire possession', 'It matters only near the hoop', 'It is easier than offence always', 'It needs no communication'], correctIndex: 0 },
      ],
    },
    {
      id: 'basket_story_4', chapterId: 'basket', title: 'The Fourth Quarter Comeback', englishLevel: 'B2',
      text: 'Trailing by twelve points entering the fourth quarter, the school team appeared defeated. However, the coach called a timeout and reorganised the rotation, prioritising fresh legs and full-court pressure on the ball handler. Defensive intensity increased, forcing turnovers that led to fast-break lay-ups. On offence, players passed up contested long shots in favour of higher-percentage attempts near the hoop. The crowd\'s energy grew as the gap narrowed to two points with thirty seconds remaining. Although the final buzzer-beater missed, the team left the court proud of their tactical adjustment. The lesson was clear: momentum can shift when athletes combine physical effort with disciplined decision-making under pressure.',
      questions: [
        { question: 'What changed after the timeout?', options: ['Players stopped defending', 'Fresh legs and full-court pressure were prioritised', 'The team forfeited the game', 'Only three players remained on court'], correctIndex: 1 },
        { question: 'How did turnovers help the team?', options: ['They led to fast-break lay-ups', 'They ended the game early', 'They caused more fouls only', 'They reduced playing time'], correctIndex: 0 },
        { question: 'What shooting approach did players favour?', options: ['Higher-percentage attempts near the hoop', 'Only long contested shots', 'No shots at all', 'Shooting without looking'], correctIndex: 0 },
        { question: 'What was the main lesson of the match?', options: ['Momentum can shift with effort and disciplined decisions', 'Comebacks are impossible in basketball', 'Timeouts are useless', 'Only the first quarter matters'], correctIndex: 0 },
      ],
    },
    {
      id: 'basket_story_5', chapterId: 'basket', title: 'Captain\'s Speech', englishLevel: 'C1',
      text: 'Before the departmental championship, the basketball captain addressed the team in English, as required by the section euro programme. She argued that their greatest strength was not height or individual scoring records but the trust they had built through months of shared training. She described how accepting constructive criticism after losses had transformed defensive communication and reduced selfish play. The coach supplemented her speech with data: assist-to-turnover ratio, rebounding differential, and free-throw percentage under pressure. Together, they presented a compelling case that sustainable team performance emerges from culture rather than from momentary talent. The athletes entered the arena understanding that leadership, analytics, and emotional maturity are inseparable components of elite sport.',
      questions: [
        { question: 'What did the captain identify as the team\'s greatest strength?', options: ['Trust built through shared training', 'Only individual scoring records', 'Avoiding all criticism', 'Tallest players on court'], correctIndex: 0 },
        { question: 'What had accepting criticism improved?', options: ['Defensive communication and reduced selfish play', 'Only the music played during warm up', 'The price of tickets', 'Homework grades in maths'], correctIndex: 0 },
        { question: 'Which data did the coach mention?', options: ['Assist-to-turnover ratio and rebounding differential', 'Students\' shoe sizes', 'Weather forecasts', 'Exam timetables'], correctIndex: 0 },
        { question: 'What components of elite sport are described as inseparable?', options: ['Leadership, analytics, and emotional maturity', 'Luck, silence, and isolation', 'Only physical height', 'Avoiding all team culture'], correctIndex: 0 },
      ],
    },
    {
      id: 'touch_rugby_story_1', chapterId: 'touch_rugby', title: 'Touch Rugby Tournament', englishLevel: 'B1',
      text: 'On Friday, three classes met on the rugby pitch for a touch rugby tournament. Each team had six players and had to pass the ball backward before scoring a try. Defenders could stop attackers only with a two-hand touch — no tackling allowed. One team used a clever offload to keep the attack alive after a touch. Another player beat a defender with a sharp sidestep and nearly reached the try line. The winning team celebrated but reminded everyone that respect and fair play matter more than the final score.',
      questions: [
        { question: 'How could defenders stop attackers?', options: ['Full tackle', 'Two-hand touch only', 'By shouting', 'They could not stop them'], correctIndex: 1 },
        { question: 'In which direction must the ball be passed?', options: ['Forward only', 'Backward', 'Upward', 'Any direction'], correctIndex: 1 },
        { question: 'What skill helped one player beat a defender?', options: ['A sidestep', 'A smash', 'A home run', 'A drop shot'], correctIndex: 0 },
        { question: 'What mattered more than the final score?', options: ['Money', 'Respect and fair play', 'Homework', 'The weather'], correctIndex: 1 },
      ],
    },
    {
      id: 'touch_rugby_story_2', chapterId: 'touch_rugby', title: 'Support Lines', englishLevel: 'B1',
      text: 'Coach Laurent taught the Seconde class that support lines win touch rugby matches. After each touch, attackers must reset quickly and offer passing options on both sides of the ball carrier. Students who stood flat and waited were easily marked, while those who ran diagonally into space created opportunities for offloads. The coach used cones to show ideal spacing between teammates. During small-sided games, teams that maintained width scored more tries because defenders could not cover every angle. Laurent concluded that touch rugby rewards intelligent movement as much as speed.',
      questions: [
        { question: 'What must attackers do after each touch?', options: ['Reset and offer passing options', 'Stop completely and argue', 'Pass forward immediately', 'Leave the pitch'], correctIndex: 0 },
        { question: 'What helped create offload opportunities?', options: ['Running diagonally into space', 'Standing flat and waiting', 'Hiding behind the referee', 'Ignoring the ball carrier'], correctIndex: 0 },
        { question: 'Why did teams maintaining width score more tries?', options: ['Defenders could not cover every angle', 'The ball became heavier', 'Rules changed every minute', 'The pitch became shorter'], correctIndex: 0 },
        { question: 'What does touch rugby reward according to the coach?', options: ['Intelligent movement and speed', 'Only individual strength', 'Silence on the pitch', 'Avoiding all passes'], correctIndex: 0 },
      ],
    },
    {
      id: 'touch_rugby_story_3', chapterId: 'touch_rugby', title: 'The Dummy Pass Drill', englishLevel: 'B2',
      text: 'In a technical session dedicated to deception, players practiced the dummy pass to commit defenders before accelerating through the gap. The coach insisted that body language must convince opponents — shoulders, eyes, and hips should all suggest a pass that never happens. Première students paired up and filmed short sequences to review their timing. Those who telegraphed the dummy too early were easily touched; those who sold the fake convincingly created space for teammates behind them. The session concluded with a discussion about decision-making: when is deception worth the risk, and when is a simple pass safer? Students agreed that reading the defence is a skill developed through deliberate practice, not instinct alone.',
      questions: [
        { question: 'What is the purpose of a dummy pass?', options: ['To commit defenders and create space', 'To stop the game permanently', 'To score without running', 'To replace the try line'], correctIndex: 0 },
        { question: 'What must body language achieve?', options: ['Convince opponents a pass is coming', 'Hide the ball from teammates', 'Signal the referee only', 'Slow the attack deliberately'], correctIndex: 0 },
        { question: 'Why did some students fail the drill?', options: ['They telegraphed the dummy too early', 'They never touched the ball', 'They refused to run', 'The pitch was indoors'], correctIndex: 0 },
        { question: 'How is reading the defence developed?', options: ['Through deliberate practice', 'Only by watching television', 'Without any training', 'By avoiding all deception'], correctIndex: 0 },
      ],
    },
    {
      id: 'touch_rugby_story_4', chapterId: 'touch_rugby', title: 'Managing the Six-Touch Rule', englishLevel: 'B2',
      text: 'Touch rugby limits each possession to six touches before the ball is turned over, which forces teams to plan attacks carefully. The Terminale squad analysed how they wasted touches by running sideways without gaining ground. Their coach introduced a simple rule: every touch should either advance the ball toward the try line or fix defenders to create an overlap. In tournament preparation, they tracked average touches per try and noticed significant improvement when players communicated the touch count aloud. Under fatigue, discipline often collapsed — players took unnecessary risks instead of resetting shape. The team learned that tactical patience under pressure separates organised sides from chaotic ones.',
      questions: [
        { question: 'What happens after six touches?', options: ['The ball is turned over', 'The team automatically scores', 'The game ends', 'Defenders leave the pitch'], correctIndex: 0 },
        { question: 'What should every touch achieve?', options: ['Advance the ball or fix defenders', 'Move sideways without purpose', 'Delay the game indefinitely', 'Ignore the try line'], correctIndex: 0 },
        { question: 'What helped teams improve their attack?', options: ['Communicating the touch count aloud', 'Avoiding all passing', 'Running without a plan', 'Removing the touch limit'], correctIndex: 0 },
        { question: 'What separates organised sides from chaotic ones?', options: ['Tactical patience under pressure', 'Only physical size', 'Ignoring fatigue completely', 'Never resetting shape'], correctIndex: 0 },
      ],
    },
    {
      id: 'touch_rugby_story_5', chapterId: 'touch_rugby', title: 'Fair Play Under Pressure', englishLevel: 'C1',
      text: 'During a closely contested semi-final, a touch rugby player admitted voluntarily that he had been touched before scoring what would have been the winning try. The referee had not seen the contact, yet the athlete raised his hand immediately, costing his team the advantage. Afterwards, the PE teacher used the incident as a case study in sports ethics, asking students to write in English whether competitive ambition should ever override honesty. Opinions differed, but most concluded that long-term integrity preserves trust within a squad and respect from opponents. The coach noted that elite environments increasingly emphasise values-based education alongside performance metrics. The episode reinforced that touch rugby, though non-contact, demands the same moral courage expected in any high-level sporting context.',
      questions: [
        { question: 'What did the player admit voluntarily?', options: ['He had been touched before scoring', 'He wanted to change teams', 'He did not understand the rules', 'He had never trained'], correctIndex: 0 },
        { question: 'What did the PE teacher ask students to write about?', options: ['Whether ambition should override honesty', 'Their favourite rugby player only', 'French grammar rules', 'The history of the school'], correctIndex: 0 },
        { question: 'What did most students conclude about integrity?', options: ['It preserves trust and respect long term', 'It is irrelevant in sport', 'It only matters in exams', 'It reduces all performance'], correctIndex: 0 },
        { question: 'What does the coach say elite environments emphasise?', options: ['Values-based education alongside performance', 'Only winning at any cost', 'Avoiding all ethics discussions', 'Replacing sport with theory'], correctIndex: 0 },
      ],
    },
    {
      id: 'flag_football_story_1', chapterId: 'flag_football', title: 'Flag Football Friday', englishLevel: 'B1',
      text: 'The Première class tried flag football for the first time on the school field. Each player wore a flag belt around the waist. The quarterback called the plays and handed the ball to a runner or threw a pass downfield. To score a touchdown, a player had to enter the end zone with the ball. Defenders focused on pulling flags instead of tackling. One team used a blitz to pressure the quarterback, forcing a quick decision. After the game, the coach explained that flag football teaches strategy, speed, and teamwork without the risks of full contact.',
      questions: [
        { question: 'What did players wear around the waist?', options: ['A scarf', 'A flag belt', 'A backpack', 'A helmet only'], correctIndex: 1 },
        { question: 'Who calls the plays and throws passes?', options: ['The catcher', 'The quarterback', 'The referee', 'The pitcher'], correctIndex: 1 },
        { question: 'How do you score in flag football?', options: ['By pulling your own flag', 'By reaching the end zone with the ball', 'By hitting a target', 'By scoring a try'], correctIndex: 1 },
        { question: 'What does flag football teach according to the coach?', options: ['Only individual skill', 'Strategy, speed, and teamwork', 'How to tackle hard', 'Nothing useful'], correctIndex: 1 },
      ],
    },
    {
      id: 'flag_football_story_2', chapterId: 'flag_football', title: 'Running Routes', englishLevel: 'B1',
      text: 'Before students could catch passes consistently, they had to learn running routes — predetermined paths across the field. The coach drew patterns on a whiteboard: slant, out, and go routes each created different spacing against defenders. Receivers practiced sharp cuts and timed their sprints so the quarterback could release the ball at the right moment. When routes were sloppy, passes fell incomplete even though the throw was accurate. By the third session, the Première class understood that flag football offence is choreographed movement rather than random running. Communication before the snap helped everyone know who would cut where.',
      questions: [
        { question: 'What are running routes?', options: ['Predetermined paths across the field', 'Random sprints without plan', 'Only defensive movements', 'Ways to pull flags on teammates'], correctIndex: 0 },
        { question: 'Why did passes fall incomplete when routes were sloppy?', options: ['Timing and spacing were wrong even if the throw was accurate', 'The ball was deflated', 'Wind always stopped play', 'Receivers were not allowed to catch'], correctIndex: 0 },
        { question: 'What is flag football offence compared to?', options: ['Choreographed movement', 'Pure luck', 'Swimming laps', 'Only kicking the ball'], correctIndex: 0 },
        { question: 'When did communication help the team?', options: ['Before the snap to clarify cuts', 'Only after the game ended', 'Never during practice', 'Only when eating lunch'], correctIndex: 0 },
      ],
    },
    {
      id: 'flag_football_story_3', chapterId: 'flag_football', title: 'Reading the Blitz', englishLevel: 'B2',
      text: 'When defenders blitz, the quarterback has only seconds to decide whether to release the ball quickly, hand off to a runner, or scramble. The Terminale class studied film of previous games and identified patterns — which defender rushed most aggressively and from which side. They adjusted protection schemes so one player blocked the blitz path while receivers ran shorter, faster routes. The coach emphasised that panic throws often lead to interceptions or lost yardage. In practice, quarterbacks counted aloud in English to simulate pressure: "One Mississippi, two Mississippi — throw!" Students learned that composure and preparation reduce mistakes when the defence attacks suddenly.',
      questions: [
        { question: 'What must a quarterback decide during a blitz?', options: ['Throw quickly, hand off, or scramble', 'Leave the field immediately', 'Always run backward only', 'Stop the play without reason'], correctIndex: 0 },
        { question: 'How did the team use film study?', options: ['To identify blitz patterns and adjust protection', 'To avoid all training sessions', 'To choose team uniforms', 'To cancel the next game'], correctIndex: 0 },
        { question: 'What often results from panic throws?', options: ['Interceptions or lost yardage', 'Automatic touchdowns', 'Extra players on the field', 'No change in possession'], correctIndex: 0 },
        { question: 'What reduces mistakes under pressure?', options: ['Composure and preparation', 'Closing your eyes before throwing', 'Ignoring the defence', 'Never practicing blitz situations'], correctIndex: 0 },
      ],
    },
    {
      id: 'flag_football_story_4', chapterId: 'flag_football', title: 'Red Zone Tactics', englishLevel: 'B2',
      text: 'Scoring inside the red zone — the area near the end zone — requires tighter decisions because the field is compressed. The coach taught students that long passes become riskier and quick handoffs or short catches often produce better results. One team practiced a series of plays designed to spread defenders horizontally before attacking vertically on third down. Defenders responded by pulling flags earlier, so attackers had to protect the ball with two hands and lower their centre of gravity. Students analysed which plays succeeded most often and recorded the results in English. The data showed that patience and precision outweighed heroic deep throws when space was limited.',
      questions: [
        { question: 'Why is the red zone challenging?', options: ['The field is compressed and decisions must be tighter', 'Players cannot run at all', 'Flags are removed from the game', 'The end zone disappears'], correctIndex: 0 },
        { question: 'Which options often work better near the end zone?', options: ['Quick handoffs or short catches', 'Only the longest possible passes', 'Stopping play entirely', 'Running off the field'], correctIndex: 0 },
        { question: 'What did attackers do when defenders pulled flags earlier?', options: ['Protected the ball with two hands', 'Threw the ball away always', 'Removed their own flags', 'Ignored all coaching advice'], correctIndex: 0 },
        { question: 'What did the data show about successful plays?', options: ['Patience and precision outweighed deep throws', 'Only luck mattered', 'No play worked in the red zone', 'Defenders never adapted'], correctIndex: 0 },
      ],
    },
    {
      id: 'flag_football_story_5', chapterId: 'flag_football', title: 'Building a Playbook', englishLevel: 'C1',
      text: 'For the section euro project, each flag football group compiled a mini-playbook written entirely in English. Every page described a formation, the responsibilities of each position, and the conditions under which the play should be used — for example, on fourth down or after a turnover. Presentations included diagrams, vocabulary definitions, and reflections on why certain strategies failed in earlier matches. The teacher evaluated not only sporting knowledge but also clarity of expression and ability to justify tactical choices with evidence. Students discovered that documenting strategy forces deeper understanding than simply repeating drills. The best playbooks combined analytical language with practical insight, demonstrating that communication skills and athletic intelligence reinforce each other in modern team sports.',
      questions: [
        { question: 'What did each group compile for the project?', options: ['A mini-playbook written in English', 'Only a list of player names', 'A collection of music playlists', 'French translations without diagrams'], correctIndex: 0 },
        { question: 'What information did each page include?', options: ['Formation, responsibilities, and when to use the play', 'Only the final score of one game', 'Homework from other subjects', 'Weather reports only'], correctIndex: 0 },
        { question: 'What did the teacher evaluate besides sporting knowledge?', options: ['Clarity of expression and justification with evidence', 'Only running speed', 'Shoe brand preferences', 'Attendance in maths class'], correctIndex: 0 },
        { question: 'What did documenting strategy force students to develop?', options: ['Deeper understanding than repeating drills alone', 'Less interest in the sport', 'Avoidance of all teamwork', 'No need for vocabulary'], correctIndex: 0 },
      ],
    },
    {
      id: 'baseball_story_1', chapterId: 'baseball', title: 'Baseball Basics', englishLevel: 'B1',
      text: 'The Terminale students visited a local baseball field for an introduction to the sport. The coach showed them home plate, the three bases, and the outfield. The pitcher demonstrated how to throw different types of pitches while the catcher signaled behind the plate. Students took turns as batters, trying to hit the ball and run to first base. One student hit a powerful shot into the outfield and reached second base before the fielders returned the ball. The coach explained that baseball requires patience, hand-eye coordination, and clear communication between pitcher and catcher.',
      questions: [
        { question: 'What did the coach show the students first?', options: ['A basketball hoop', 'Home plate, bases, and outfield', 'A badminton net', 'A laser target'], correctIndex: 1 },
        { question: 'Who signals to the pitcher behind the plate?', options: ['The batter', 'The catcher', 'The quarterback', 'The referee only'], correctIndex: 1 },
        { question: 'How far did one student run after a powerful hit?', options: ['To second base', 'Out of the stadium', 'Back to home without running', 'To the end zone'], correctIndex: 0 },
        { question: 'What skills does baseball require?', options: ['Only running fast', 'Patience, hand-eye coordination, and communication', 'Only shouting', 'No teamwork'], correctIndex: 1 },
      ],
    },
    {
      id: 'baseball_story_2', chapterId: 'baseball', title: 'Fielding Fundamentals', englishLevel: 'B1',
      text: 'After learning to bat, the Seconde class moved to fielding drills in the outfield and infield. The coach demonstrated how to position the glove, keep eyes on the ball, and throw to the correct base with momentum from the legs. Students practiced fielding ground balls without letting the ball bounce off their gloves. In relay exercises, they learned to call "Mine!" or "Yours!" to avoid collisions. Mistakes were common at first — overthrows and dropped catches — but improvement was visible within two lessons. The coach reminded everyone that baseball defence requires concentration on every pitch, even when the ball seems far from your position.',
      questions: [
        { question: 'What did fielding drills emphasise?', options: ['Glove position, eye tracking, and throwing with leg momentum', 'Only hitting home runs', 'Running without a ball', 'Ignoring teammates completely'], correctIndex: 0 },
        { question: 'Why did players call "Mine!" or "Yours!"?', options: ['To avoid collisions during relays', 'To distract the batter', 'To stop the inning early', 'To change the rules'], correctIndex: 0 },
        { question: 'What mistakes were common at first?', options: ['Overthrows and dropped catches', 'Perfect fielding every time', 'No errors at all', 'Players forgot how to run'], correctIndex: 0 },
        { question: 'When does baseball defence require concentration?', options: ['On every pitch', 'Only when batting', 'Never in the outfield', 'Only during rain'], correctIndex: 0 },
      ],
    },
    {
      id: 'baseball_story_3', chapterId: 'baseball', title: 'Pitcher and Catcher Signals', englishLevel: 'B2',
      text: 'The relationship between pitcher and catcher is central to baseball strategy. Using finger signals behind the plate, the catcher suggested pitch type and location while the pitcher decided whether to accept or shake off the call. Students learned vocabulary for fastball, change-up, and outside corner. When signals were unclear, batters gained an advantage; when they were precise, the defence controlled the rhythm of the inning. The Première class role-played scenarios in English, explaining why a change-up might fool a batter expecting speed. The session demonstrated that baseball is a dialogue between two players who must trust each other completely under public scrutiny.',
      questions: [
        { question: 'How does the catcher suggest pitch type?', options: ['Finger signals behind the plate', 'Shouting loudly at the batter', 'Writing notes on the field', 'Sending text messages'], correctIndex: 0 },
        { question: 'What can happen when signals are unclear?', options: ['Batters gain an advantage', 'The game stops forever', 'Automatic home runs occur', 'Fielders leave the diamond'], correctIndex: 0 },
        { question: 'Why might a change-up be effective?', options: ['It fools batters expecting speed', 'It is always the fastest pitch', 'It replaces the need for a catcher', 'It ends the inning immediately'], correctIndex: 0 },
        { question: 'What does the pitcher-catcher relationship require?', options: ['Complete trust under scrutiny', 'No communication at all', 'Only individual performance', 'Avoiding all strategy'], correctIndex: 0 },
      ],
    },
    {
      id: 'baseball_story_4', chapterId: 'baseball', title: 'Base Running Decisions', englishLevel: 'B2',
      text: 'Smart base running can win games without a single home run. The Terminale students studied when to advance from first to third on a single hit and when to hold position to avoid an out. Coaches taught them to watch the outfielder\'s body position and the strength of the throw rather than running automatically. On a shallow fly ball, leaving the base too early leads to a double play; on a deep hit, hesitation costs a scoring opportunity. Students timed their sprints and practiced sliding safely into bases. They concluded that base running combines observation, risk assessment, and explosive acceleration — skills transferable to many invasion sports.',
      questions: [
        { question: 'What can smart base running achieve?', options: ['Win games without home runs', 'Stop the game permanently', 'Replace all fielding practice', 'Eliminate the need for pitching'], correctIndex: 0 },
        { question: 'What should runners observe before advancing?', options: ['Outfielder position and throw strength', 'Only the colour of their uniform', 'The crowd\'s favourite song', 'Homework deadlines'], correctIndex: 0 },
        { question: 'What happens if a runner leaves too early on a shallow fly ball?', options: ['A double play becomes likely', 'They automatically score', 'The inning never ends', 'The pitcher is replaced'], correctIndex: 0 },
        { question: 'Which skills does base running combine?', options: ['Observation, risk assessment, and acceleration', 'Only luck and silence', 'Avoiding all sprints', 'Ignoring outfielders completely'], correctIndex: 0 },
      ],
    },
    {
      id: 'baseball_story_5', chapterId: 'baseball', title: 'The Statistics Project', englishLevel: 'C1',
      text: 'As part of an interdisciplinary assignment, Terminale students analysed baseball statistics to evaluate player contribution beyond batting average alone. They examined on-base percentage, slugging percentage, and defensive assists, presenting findings in English to the class. One group argued that a player with modest hitting but exceptional base running provided greater overall value than raw numbers suggested. Another debated whether small-sample data from school matches could support confident conclusions. The PE teacher welcomed the discussion, noting that modern sport increasingly relies on evidence-based reasoning rather than intuition alone. Students left the project appreciating that statistical literacy enhances both athletic performance and academic credibility in the section euro programme.',
      questions: [
        { question: 'What did students analyse beyond batting average?', options: ['On-base percentage, slugging, and defensive assists', 'Only shoe sizes', 'Exam grades in history', 'Cafeteria menus'], correctIndex: 0 },
        { question: 'What did one group argue about a modest hitter?', options: ['Exceptional base running could provide greater overall value', 'They should never play again', 'Statistics are useless in baseball', 'Only home runs matter always'], correctIndex: 0 },
        { question: 'What limitation did students debate?', options: ['Whether small-sample school data supports confident conclusions', 'Whether baseball exists in France', 'Whether English is necessary', 'Whether gloves are required'], correctIndex: 0 },
        { question: 'What does modern sport increasingly rely on?', options: ['Evidence-based reasoning', 'Intuition alone without data', 'Avoiding all analysis', 'Replacing sport with theory only'], correctIndex: 0 },
      ],
    },
    {
      id: 'laser_run_story_1', chapterId: 'laser_run', title: 'Laser Run Challenge', englishLevel: 'B1',
      text: 'The school organised a laser run challenge as part of the modern pentathlon unit. Athletes had to complete an obstacle course, then enter the transition zone to pick up the laser pistol and shoot at five targets. Every missed shot added a penalty loop to their run. Students learned to control their breathing before shooting — running fast makes aiming much harder. The fastest athlete was not always the winner because accuracy mattered as much as speed. The PE teacher explained that laser run combines endurance, focus, and the ability to perform under pressure.',
      questions: [
        { question: 'What do athletes do in the transition zone?', options: ['Eat lunch', 'Pick up the laser pistol and shoot', 'Sleep', 'Change sports entirely'], correctIndex: 1 },
        { question: 'What happens when a shot misses the target?', options: ['The athlete is disqualified', 'A penalty loop is added', 'The race stops', 'Nothing'], correctIndex: 1 },
        { question: 'Why is running fast before shooting difficult?', options: ['The pistol is too heavy', 'It makes aiming harder', 'Targets disappear', 'Rules forbid running'], correctIndex: 1 },
        { question: 'What does laser run combine?', options: ['Only swimming', 'Endurance, focus, and performing under pressure', 'Only fencing', 'Luck and chance'], correctIndex: 1 },
      ],
    },
    {
      id: 'laser_run_story_2', chapterId: 'laser_run', title: 'Breathing Between Stages', englishLevel: 'B1',
      text: 'Coach Dupont noticed that many students arrived at the shooting stage breathing too heavily to aim steadily. She introduced a simple routine: two slow exhalations before picking up the laser pistol, then shoulders relaxed and eyes fixed on the centre target. Runners practised shorter sprints followed immediately by five shots to simulate competition fatigue. Those who controlled their breathing hit more targets and avoided penalty loops. The class recorded results in a table and compared improvement over three weeks. Dupont explained that laser run rewards athletes who can switch rapidly from high-intensity running to calm precision.',
      questions: [
        { question: 'What problem did the coach notice at the shooting stage?', options: ['Students breathed too heavily to aim steadily', 'Students refused to run', 'Targets were missing', 'Pistols were too light'], correctIndex: 0 },
        { question: 'What routine did she introduce?', options: ['Two slow exhalations before shooting', 'Running without stopping for an hour', 'Shooting while sprinting always', 'Closing eyes before every shot'], correctIndex: 0 },
        { question: 'What happened when breathing was controlled?', options: ['More targets hit and fewer penalty loops', 'Automatic disqualification', 'Slower running only', 'No improvement at all'], correctIndex: 0 },
        { question: 'What does laser run reward?', options: ['Switching from intense running to calm precision', 'Only the fastest runners regardless of shooting', 'Avoiding all obstacles', 'Never entering the transition zone'], correctIndex: 0 },
      ],
    },
    {
      id: 'laser_run_story_3', chapterId: 'laser_run', title: 'Obstacle Strategy', englishLevel: 'B2',
      text: 'The obstacle section of the laser run course demanded more than raw speed. Students learned to attack each barrier with a plan: stable foot placement on the balance beam, controlled momentum over the hurdles, and efficient paths through the slalom cones. The coach filmed runs and highlighted where seconds were lost through awkward turns rather than lack of fitness. Première athletes paired up to give feedback in English using phrases such as "You leaned too far left" or "Shorten your stride before the beam." Gradually, the group understood that modern pentathlon-style events punish wasted movement as severely as missed shots.',
      questions: [
        { question: 'What did the obstacle section demand besides speed?', options: ['Planned technique at each barrier', 'Only jumping as high as possible', 'Stopping after every obstacle', 'Removing all cones'], correctIndex: 0 },
        { question: 'Where were seconds often lost?', options: ['Awkward turns rather than lack of fitness', 'Talking to spectators only', 'Using the wrong school uniform', 'Writing notes during the run'], correctIndex: 0 },
        { question: 'How did athletes give feedback?', options: ['In English with specific movement phrases', 'Only by shouting numbers', 'Without watching the run', 'By ignoring all mistakes'], correctIndex: 0 },
        { question: 'What do pentathlon-style events punish severely?', options: ['Wasted movement and missed shots', 'Only slow speaking', 'Team uniforms', 'Using laser pistols correctly'], correctIndex: 0 },
      ],
    },
    {
      id: 'laser_run_story_4', chapterId: 'laser_run', title: 'Penalty Loop Discipline', englishLevel: 'B2',
      text: 'After a school time trial, the Terminale squad reviewed why penalty loops had decided the final ranking. Two athletes missed three targets each and added thirty seconds to their overall time despite leading after the run. The coach introduced a training rule: if more than one shot is missed in practice, the athlete repeats the shooting stage until five consecutive hits are achieved. Some complained that the drill was repetitive, yet results at the next competition improved noticeably. Discussion turned to mental routines — visualising the target, consistent trigger pressure, and accepting that perfection under fatigue is a trained skill, not a coincidence.',
      questions: [
        { question: 'Why did penalty loops decide the ranking?', options: ['Missed shots added significant time despite fast running', 'Runners were disqualified for talking', 'Obstacles were removed', 'Targets moved during shooting'], correctIndex: 0 },
        { question: 'What training rule did the coach introduce?', options: ['Repeat shooting until five consecutive hits after multiple misses', 'Never practice shooting again', 'Run without any targets', 'Skip all penalty loops in competition'], correctIndex: 0 },
        { question: 'How did athletes respond to the drill at first?', options: ['Some complained it was repetitive', 'Everyone refused to participate', 'The coach cancelled laser run', 'Students never missed shots again immediately'], correctIndex: 0 },
        { question: 'What is perfection under fatigue described as?', options: ['A trained skill, not a coincidence', 'Pure luck only', 'Impossible for all athletes', 'Unrelated to mental routines'], correctIndex: 0 },
      ],
    },
    {
      id: 'laser_run_story_5', chapterId: 'laser_run', title: 'The Combined Event Mindset', englishLevel: 'C1',
      text: 'To conclude the modern pentathlon unit, students wrote reflective essays in English on the mindset required for combined events such as laser run. They compared the cognitive shift from explosive running to precise shooting with transitions between academic tasks that demand different types of focus. Several athletes cited research on arousal regulation — how heart rate influences fine motor control — and proposed personalised pre-shooting routines backed by their training data. The PE department displayed the best essays alongside performance charts, illustrating that section euro students can integrate scientific vocabulary, self-analysis, and sporting experience into coherent argumentation. The teacher concluded that laser run is an ideal metaphor for balancing speed, accuracy, and adaptability in both sport and study.',
      questions: [
        { question: 'What did students write reflective essays about?', options: ['The mindset required for combined events', 'Only their favourite meals', 'French literature exclusively', 'The history of the school building'], correctIndex: 0 },
        { question: 'What cognitive shift did they compare to academic work?', options: ['From explosive running to precise shooting', 'From sleeping to eating', 'From maths to art only', 'From silence to shouting'], correctIndex: 0 },
        { question: 'What concept did several athletes cite from research?', options: ['Arousal regulation and heart rate influence on motor control', 'Only muscle fibre types without application', 'Weather patterns in winter', 'Exam regulations in maths'], correctIndex: 0 },
        { question: 'What metaphor did the teacher offer for laser run?', options: ['Balancing speed, accuracy, and adaptability in sport and study', 'Avoiding all physical effort', 'Replacing PE with essays only', 'Luck as the only factor in success'], correctIndex: 0 },
      ],
    },
  ];

  return { wordLists, stories };
}

export function getSportListIds() {
  return [
    'badminton_basics', 'badminton_image_match',
    'basket_basics', 'basket_image_match',
    'touch_rugby_basics', 'touch_rugby_image_match',
    'flag_football_basics', 'flag_football_image_match',
    'baseball_basics', 'baseball_image_match',
    'laser_run_basics', 'laser_run_image_match',
  ];
}

export function getSportStoryIds() {
  return getSportStoryIdsUpTo(5);
}

const SPORT_CHAPTER_PREFIXES = [
  'badminton', 'basket', 'touch_rugby', 'flag_football', 'baseball', 'laser_run',
];

export function getSportStoryIdsUpTo(maxPerSport = 5) {
  const ids = [];
  for (const sport of SPORT_CHAPTER_PREFIXES) {
    for (let i = 1; i <= maxPerSport; i++) {
      ids.push(`${sport}_story_${i}`);
    }
  }
  return ids;
}
