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
      id: 'badminton_story_1', chapterId: 'badminton', title: 'First Badminton Match',
      text: 'Sophie joined the school badminton club on Monday. Her coach taught her how to hold the racket correctly and how to serve from the right side of the court. During the warm up, students practiced footwork drills along the sideline. In her first singles match, Sophie tried a drop shot that surprised her opponent. Later, she attempted a smash but the shuttlecock landed out. Her partner in doubles encouraged her to stay calm and communicate. By the end of the session, Sophie understood that badminton requires speed, precision, and good teamwork.',
      questions: [
        { question: 'What did Sophie learn at the start?', options: ['How to swim', 'How to hold the racket and serve', 'How to ride a bike', 'How to score a try'], correctIndex: 1 },
        { question: 'What type of match did Sophie play first?', options: ['Doubles only', 'Singles', 'Mixed relay', 'No match'], correctIndex: 1 },
        { question: 'Which shot surprised her opponent?', options: ['Smash', 'Drop shot', 'Serve into the net', 'A pass'], correctIndex: 1 },
        { question: 'What skills does badminton require according to the story?', options: ['Only strength', 'Speed, precision, and teamwork', 'Only luck', 'No communication'], correctIndex: 1 },
      ],
    },
    {
      id: 'basket_story_1', chapterId: 'basket', title: 'Basketball Practice',
      text: 'The Seconde class arrived at the basketball court for their first English PE session. The coach divided students into two teams and explained the rules of offence and defence. Players practiced dribbling without looking at the ball, then passed to teammates moving toward the hoop. When a shot missed, the tallest student grabbed the rebound and passed quickly to a teammate for a lay-up. One player committed a foul by pushing an opponent, so the other team received free throws. Everyone agreed that communication and quick decisions are essential in basketball.',
      questions: [
        { question: 'What did players practice first?', options: ['Dribbling and passing', 'Swimming strokes', 'Serving', 'Pitching'], correctIndex: 0 },
        { question: 'What happened after a missed shot?', options: ['The game stopped forever', 'A player grabbed the rebound', 'They switched to rugby', 'Nobody moved'], correctIndex: 1 },
        { question: 'Why did the other team get free throws?', options: ['A player committed a foul', 'They scored a touchdown', 'The ball was lost', 'It was raining'], correctIndex: 0 },
        { question: 'What is essential in basketball according to the story?', options: ['Silence', 'Communication and quick decisions', 'Running slowly', 'Ignoring teammates'], correctIndex: 1 },
      ],
    },
    {
      id: 'touch_rugby_story_1', chapterId: 'touch_rugby', title: 'Touch Rugby Tournament',
      text: 'On Friday, three classes met on the rugby pitch for a touch rugby tournament. Each team had six players and had to pass the ball backward before scoring a try. Defenders could stop attackers only with a two-hand touch — no tackling allowed. One team used a clever offload to keep the attack alive after a touch. Another player beat a defender with a sharp sidestep and nearly reached the try line. The winning team celebrated but reminded everyone that respect and fair play matter more than the final score.',
      questions: [
        { question: 'How could defenders stop attackers?', options: ['Full tackle', 'Two-hand touch only', 'By shouting', 'They could not stop them'], correctIndex: 1 },
        { question: 'In which direction must the ball be passed?', options: ['Forward only', 'Backward', 'Upward', 'Any direction'], correctIndex: 1 },
        { question: 'What skill helped one player beat a defender?', options: ['A sidestep', 'A smash', 'A home run', 'A drop shot'], correctIndex: 0 },
        { question: 'What mattered more than the final score?', options: ['Money', 'Respect and fair play', 'Homework', 'The weather'], correctIndex: 1 },
      ],
    },
    {
      id: 'flag_football_story_1', chapterId: 'flag_football', title: 'Flag Football Friday',
      text: 'The Première class tried flag football for the first time on the school field. Each player wore a flag belt around the waist. The quarterback called the plays and handed the ball to a runner or threw a pass downfield. To score a touchdown, a player had to enter the end zone with the ball. Defenders focused on pulling flags instead of tackling. One team used a blitz to pressure the quarterback, forcing a quick decision. After the game, the coach explained that flag football teaches strategy, speed, and teamwork without the risks of full contact.',
      questions: [
        { question: 'What did players wear around the waist?', options: ['A scarf', 'A flag belt', 'A backpack', 'A helmet only'], correctIndex: 1 },
        { question: 'Who calls the plays and throws passes?', options: ['The catcher', 'The quarterback', 'The referee', 'The pitcher'], correctIndex: 1 },
        { question: 'How do you score in flag football?', options: ['By pulling your own flag', 'By reaching the end zone with the ball', 'By hitting a target', 'By scoring a try'], correctIndex: 1 },
        { question: 'What does flag football teach according to the coach?', options: ['Only individual skill', 'Strategy, speed, and teamwork', 'How to tackle hard', 'Nothing useful'], correctIndex: 1 },
      ],
    },
    {
      id: 'baseball_story_1', chapterId: 'baseball', title: 'Baseball Basics',
      text: 'The Terminale students visited a local baseball field for an introduction to the sport. The coach showed them home plate, the three bases, and the outfield. The pitcher demonstrated how to throw different types of pitches while the catcher signaled behind the plate. Students took turns as batters, trying to hit the ball and run to first base. One student hit a powerful shot into the outfield and reached second base before the fielders returned the ball. The coach explained that baseball requires patience, hand-eye coordination, and clear communication between pitcher and catcher.',
      questions: [
        { question: 'What did the coach show the students first?', options: ['A basketball hoop', 'Home plate, bases, and outfield', 'A badminton net', 'A laser target'], correctIndex: 1 },
        { question: 'Who signals to the pitcher behind the plate?', options: ['The batter', 'The catcher', 'The quarterback', 'The referee only'], correctIndex: 1 },
        { question: 'How far did one student run after a powerful hit?', options: ['To second base', 'Out of the stadium', 'Back to home without running', 'To the end zone'], correctIndex: 0 },
        { question: 'What skills does baseball require?', options: ['Only running fast', 'Patience, hand-eye coordination, and communication', 'Only shouting', 'No teamwork'], correctIndex: 1 },
      ],
    },
    {
      id: 'laser_run_story_1', chapterId: 'laser_run', title: 'Laser Run Challenge',
      text: 'The school organised a laser run challenge as part of the modern pentathlon unit. Athletes had to complete an obstacle course, then enter the transition zone to pick up the laser pistol and shoot at five targets. Every missed shot added a penalty loop to their run. Students learned to control their breathing before shooting — running fast makes aiming much harder. The fastest athlete was not always the winner because accuracy mattered as much as speed. The PE teacher explained that laser run combines endurance, focus, and the ability to perform under pressure.',
      questions: [
        { question: 'What do athletes do in the transition zone?', options: ['Eat lunch', 'Pick up the laser pistol and shoot', 'Sleep', 'Change sports entirely'], correctIndex: 1 },
        { question: 'What happens when a shot misses the target?', options: ['The athlete is disqualified', 'A penalty loop is added', 'The race stops', 'Nothing'], correctIndex: 1 },
        { question: 'Why is running fast before shooting difficult?', options: ['The pistol is too heavy', 'It makes aiming harder', 'Targets disappear', 'Rules forbid running'], correctIndex: 1 },
        { question: 'What does laser run combine?', options: ['Only swimming', 'Endurance, focus, and performing under pressure', 'Only fencing', 'Luck and chance'], correctIndex: 1 },
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
  return [
    'badminton_story_1', 'basket_story_1', 'touch_rugby_story_1',
    'flag_football_story_1', 'baseball_story_1', 'laser_run_story_1',
  ];
}
