import { getWordImage } from './config.js';

const starterWords = [
  { english: 'bench press', french: 'développé couché', definition: 'A weightlifting exercise performed lying on a bench, pushing a barbell upward' },
  { english: 'hamstring', french: 'ischio-jambiers', definition: 'The group of muscles at the back of the thigh' },
  { english: 'to bend', french: 'plier / se pencher', definition: 'To move a body part or object at a joint or angle' },
  { english: 'training', french: 'entraînement', definition: 'Physical exercise and practice to improve fitness and skills' },
  { english: 'warm up', french: 'échauffement', definition: 'Light exercises done before the main workout to prepare the body' },
];

function makeWord(w) {
  return { ...w, imageUrl: getWordImage(w.english) };
}

export function getSeedData() {
  const list1 = {
    id: 'list_equipment',
    name: 'Equipment & Basics',
    theme: 'equipment',
    words: starterWords.map(makeWord),
  };

  const list2 = {
    id: 'list_exercises',
    name: 'Exercises',
    theme: 'exercises',
    words: [
      makeWord({ english: 'dumbbell', french: 'haltère', definition: 'A short bar with weights on each end, held in one hand' }),
      makeWord({ english: 'squat', french: 'squat / flexion des jambes', definition: 'A lower body exercise where you bend your knees and lower your hips' }),
      makeWord({ english: 'deadlift', french: 'soulevé de terre', definition: 'A weightlifting exercise where you lift a barbell from the floor' }),
      makeWord({ english: 'pull-up', french: 'traction', definition: 'An upper body exercise where you pull yourself up on a bar' }),
      makeWord({ english: 'reps', french: 'répétitions', definition: 'The number of times you repeat an exercise movement' }),
    ],
  };

  const list3 = {
    id: 'list_body',
    name: 'Body & Recovery',
    theme: 'body',
    words: [
      makeWord({ english: 'biceps', french: 'biceps', definition: 'The muscle on the front of the upper arm' }),
      makeWord({ english: 'core', french: 'sangle abdominale / centre du corps', definition: 'The muscles of the abdomen and lower back that stabilise the body' }),
      makeWord({ english: 'stretch', french: 'étirement', definition: 'To extend muscles to improve flexibility' }),
      makeWord({ english: 'sore muscles', french: 'courbatures', definition: 'Muscle pain felt after intense exercise' }),
      makeWord({ english: 'recovery', french: 'récupération', definition: 'The rest period after exercise when the body repairs itself' }),
    ],
  };

  const listMix1 = {
    id: 'list_mix_1',
    name: 'Musculation — Mix 1',
    theme: 'musculation',
    words: [
      makeWord({ english: 'barbell', french: 'barre (haltères)', definition: 'A long metal bar used for weightlifting' }),
      makeWord({ english: 'to lift', french: 'soulever', definition: 'To raise something heavy using your muscles' }),
      makeWord({ english: 'strong', french: 'fort(e)', definition: 'Having powerful muscles and physical ability' }),
      makeWord({ english: 'dumbbell', french: 'haltère', definition: 'A short bar with weights on each end' }),
      makeWord({ english: 'to flex', french: 'contracter (un muscle)', definition: 'To tighten a muscle on purpose' }),
      makeWord({ english: 'heavy', french: 'lourd(e)', definition: 'Weighing a lot; difficult to lift' }),
      makeWord({ english: 'rep', french: 'répétition', definition: 'One complete movement of an exercise' }),
      makeWord({ english: 'to breathe', french: 'respirer', definition: 'To take air in and out during exercise' }),
      makeWord({ english: 'muscular', french: 'musclé(e)', definition: 'Having well-developed muscles' }),
      makeWord({ english: 'spotter', french: 'pareur', definition: 'A person who helps and protects someone lifting weights' }),
    ],
  };

  const listMix2 = {
    id: 'list_mix_2',
    name: 'Musculation — Mix 2',
    theme: 'musculation',
    words: [
      makeWord({ english: 'biceps', french: 'biceps', definition: 'The muscle on the front of the upper arm' }),
      makeWord({ english: 'to push', french: 'pousser', definition: 'To move something away from your body with force' }),
      makeWord({ english: 'powerful', french: 'puissant(e)', definition: 'Very strong and able to produce a lot of force' }),
      makeWord({ english: 'shoulder', french: 'épaule', definition: 'The joint connecting the arm to the body' }),
      makeWord({ english: 'to pull', french: 'tirer', definition: 'To move something toward your body with force' }),
      makeWord({ english: 'tired', french: 'fatigué(e)', definition: 'Needing rest after physical effort' }),
      makeWord({ english: 'core', french: 'sangle abdominale / centre du corps', definition: 'The muscles of the abdomen and lower back' }),
      makeWord({ english: 'to stretch', french: "s'étirer / étirer", definition: 'To lengthen muscles to improve flexibility' }),
      makeWord({ english: 'flexible', french: 'souple', definition: 'Able to bend and move easily' }),
      makeWord({ english: 'recovery', french: 'récupération', definition: 'The rest period when muscles repair after training' }),
    ],
  };

  const listMix3 = {
    id: 'list_mix_3',
    name: 'Musculation — Mix 3',
    theme: 'musculation',
    words: [
      makeWord({ english: 'squat', french: 'squat', definition: 'A leg exercise where you bend your knees and lower your hips' }),
      makeWord({ english: 'to strengthen', french: 'renforcer', definition: 'To make muscles stronger through training' }),
      makeWord({ english: 'exhausted', french: 'épuisé(e)', definition: 'Completely tired after intense effort' }),
      makeWord({ english: 'deadlift', french: 'soulevé de terre', definition: 'Lifting a barbell from the floor to hip level' }),
      makeWord({ english: 'to sweat', french: 'transpirer', definition: 'To produce moisture on the skin during exercise' }),
      makeWord({ english: 'fit', french: 'en forme', definition: 'In good physical condition' }),
      makeWord({ english: 'set', french: 'série', definition: 'A group of repetitions done one after another' }),
      makeWord({ english: 'to rest', french: 'se reposer', definition: 'To stop exercising to recover energy' }),
      makeWord({ english: 'sore', french: 'courbaturé(e)', definition: 'Feeling muscle pain after hard training' }),
      makeWord({ english: 'endurance', french: 'endurance', definition: 'The ability to keep exercising for a long time' }),
    ],
  };

  const listMix4 = {
    id: 'list_mix_4',
    name: 'Musculation — Mix 4',
    theme: 'musculation',
    words: [
      makeWord({ english: 'workout', french: "séance d'entraînement", definition: 'A period of physical exercise at the gym' }),
      makeWord({ english: 'to warm up', french: "s'échauffer", definition: 'To prepare the body with light exercise before training' }),
      makeWord({ english: 'lean', french: 'sec / tonique', definition: 'Thin with little fat and visible muscle tone' }),
      makeWord({ english: 'protein', french: 'protéine', definition: 'A nutrient that helps muscles grow and repair' }),
      makeWord({ english: 'to curl', french: 'faire un curl', definition: 'To bend the arm to lift a weight toward the shoulder' }),
      makeWord({ english: 'balanced', french: 'équilibré(e)', definition: 'Well-developed on all sides; stable' }),
      makeWord({ english: 'strength', french: 'force', definition: 'The power your muscles can produce' }),
      makeWord({ english: 'to increase', french: 'augmenter', definition: 'To make weights or reps greater over time' }),
      makeWord({ english: 'challenging', french: 'exigeant(e)', definition: 'Difficult but good for progress' }),
      makeWord({ english: 'progress', french: 'progrès', definition: 'Improvement in strength or fitness over time' }),
    ],
  };

  const listImageMatch = {
    id: 'list_image_match',
    name: 'Match Images — Machines',
    theme: 'image_match',
    words: [
      makeWord({ english: 'bench press', french: 'développé couché', definition: 'Lying on a bench, pushing a barbell upward' }),
      makeWord({ english: 'lat pull down', french: 'tirage vertical', definition: 'Pulling a bar down toward your chest on a cable machine' }),
      makeWord({ english: 'machine fly', french: 'écarté à la machine', definition: 'Bringing your arms together in front of your chest on a pec deck machine' }),
      makeWord({ english: 'machine squat', french: 'squat à la machine', definition: 'Squatting with a barbell on your shoulders' }),
      makeWord({ english: 'barbell preacher curl', french: 'curl pupitre', definition: 'Curling a barbell on a preacher bench to work the biceps' }),
      makeWord({ english: 'leg extension', french: 'extension des jambes', definition: 'Straightening your legs against resistance on a leg extension machine' }),
      makeWord({ english: 'leg curl', french: 'curl ischio-jambiers', definition: 'Curling your legs backward to work the hamstrings on a leg curl machine' }),
      makeWord({ english: 'incline leg press', french: 'presse à cuisses inclinée', definition: 'Pushing a weighted platform away with your legs on an incline leg press machine' }),
    ],
  };

  const classes = [
    { id: 'class_seconde', name: 'Seconde — Group A', level: 'Seconde', roster: [], assignedListIds: ['list_image_match', 'list_equipment', 'list_mix_1'], assignedStoryIds: ['story_1', 'story_2', 'story_3'], assignedActivities: ['image_match', 'translation', 'definition', 'qcm', 'spelling'] },
    { id: 'class_premiere', name: 'Première — Group B', level: 'Première', roster: [], assignedListIds: ['list_image_match', 'list_equipment', 'list_exercises', 'list_mix_1', 'list_mix_2'], assignedStoryIds: ['story_1', 'story_2', 'story_3', 'story_4', 'story_5', 'story_11', 'story_12'], assignedActivities: ['image_match', 'translation', 'definition', 'qcm', 'spelling'] },
    { id: 'class_terminale', name: 'Terminale — Group C', level: 'Terminale', roster: [], assignedListIds: ['list_image_match', 'list_equipment', 'list_exercises', 'list_body', 'list_mix_1', 'list_mix_2', 'list_mix_3', 'list_mix_4'], assignedStoryIds: ['story_1', 'story_2', 'story_3', 'story_4', 'story_5', 'story_6', 'story_7', 'story_8', 'story_9', 'story_10', 'story_11', 'story_12', 'story_13', 'story_14', 'story_15', 'story_16', 'story_17'], assignedActivities: ['image_match', 'translation', 'definition', 'qcm', 'spelling'] },
  ];

  const stories = buildStories();

  return { classes, wordLists: [list1, list2, list3, listMix1, listMix2, listMix3, listMix4, listImageMatch], stories, students: [], activityResults: [] };
}

/** Lists + classes only (for migrations — avoids rebuilding stories each time). */
let seedCatalogCache = null;
export function getSeedCatalog() {
  if (!seedCatalogCache) {
    const { classes, wordLists } = getSeedData();
    seedCatalogCache = { classes, wordLists };
  }
  return seedCatalogCache;
}

let seedStoriesCache = null;
export function getSeedStories() {
  if (!seedStoriesCache) seedStoriesCache = buildStories();
  return seedStoriesCache;
}

function buildStories() {
  return [
    {
      id: 'story_1', title: 'First Day at the Gym',
      text: 'Tom was nervous on his first day at the gym. He watched other people doing their warm up exercises — stretching arms and legs before the real training began. A friendly coach showed him the bench press station. "Start light," the coach said. Tom learned he must bend his knees slightly when picking up weights. After thirty minutes, Tom felt his hamstring muscles stretching during the cool-down. He was tired but proud. "See you tomorrow for more training!" the coach shouted. Tom smiled. The gym was not so scary after all.',
      questions: [
        { question: 'How did Tom feel at the beginning?', options: ['Excited and confident', 'Nervous', 'Angry', 'Bored'], correctIndex: 1 },
        { question: 'What did the coach tell Tom about the bench press?', options: ['Go heavy immediately', 'Start light', 'Skip it', 'Do 100 reps'], correctIndex: 1 },
        { question: 'What did Tom feel during the cool-down?', options: ['His biceps only', 'His hamstring muscles stretching', 'Nothing', 'Pain in his shoulder'], correctIndex: 1 },
        { question: 'What is the main idea of the story?', options: ['Gyms are dangerous', 'A positive first gym experience', 'Tom quit the gym', 'The coach was mean'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_2', title: 'The Perfect Warm Up',
      text: 'Every good workout starts with a warm up. Coach Maria always told her students this rule. Before any training session, she made them jog lightly for five minutes. Then they would bend forward to touch their toes, stretching the hamstring muscles carefully. Maria explained that a proper warm up prevents injuries during exercises like the bench press or squats. One student, Lisa, used to skip her warm up and ended up with sore muscles for three days. After that, she never missed it again. Now Lisa helps new students understand why warming up matters. Maria is proud of her class.',
      questions: [
        { question: 'What does Coach Maria require before training?', options: ['Heavy lifting first', 'A warm up', 'Skipping stretches', 'Running a marathon'], correctIndex: 1 },
        { question: 'Why did Lisa have sore muscles?', options: ['She ate too much', 'She skipped her warm up', 'She slept too much', 'She drank water'], correctIndex: 1 },
        { question: 'Which muscles are mentioned during toe-touching?', options: ['Biceps', 'Hamstrings', 'Shoulders', 'Neck'], correctIndex: 1 },
        { question: 'What changed for Lisa after her injury?', options: ['She quit the gym', 'She never skipped warm up again', 'She became a coach', 'She stopped exercising'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_3', title: 'Training Together',
      text: 'Jake and Emma decided to start training together every Tuesday after school. Their first session focused on basic exercises. They shared a bench press station, taking turns with light weights. During their warm up, they jogged around the sports hall and practiced bending and stretching movements. Emma struggled with the word "hamstring" in English class, but now she could point to the muscle and name it correctly. Their PE teacher recorded their progress on a chart. After four weeks, both students felt stronger and more confident. Teamwork made their training sessions fun and effective.',
      questions: [
        { question: 'When do Jake and Emma train?', options: ['Every morning', 'Every Tuesday after school', 'Only on weekends', 'Never'], correctIndex: 1 },
        { question: 'What exercise did they share?', options: ['Swimming', 'Bench press', 'Cycling', 'Yoga'], correctIndex: 1 },
        { question: 'What English word did Emma learn to use?', options: ['Warm up', 'Hamstring', 'Training', 'All of the above'], correctIndex: 3 },
        { question: 'What was the result after four weeks?', options: ['They gave up', 'They felt stronger and more confident', 'They got injured', 'They changed schools'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_4', title: 'The Squat Challenge',
      text: 'The PE class organised a squat challenge for all levels. Students had to complete three sets of ten squats with correct form. Before starting, everyone did a thorough warm up including leg stretches and light jogging. The teacher reminded students to bend their knees properly and keep their backs straight. During the challenge, some students felt their hamstring muscles working hard. Those who skipped the warm up struggled more than others. At the end, the class discussed how proper training technique prevents injuries. The winners received a "Strong Legs" badge. Everyone agreed it was a great learning experience.',
      questions: [
        { question: 'What was the main exercise in the challenge?', options: ['Bench press', 'Squats', 'Pull-ups', 'Running'], correctIndex: 1 },
        { question: 'What happened to students who skipped the warm up?', options: ['They won easily', 'They struggled more', 'They left early', 'Nothing'], correctIndex: 1 },
        { question: 'What did the teacher emphasise about form?', options: ['Speed over technique', 'Bend knees and keep back straight', 'Close your eyes', 'Use heavy weights'], correctIndex: 1 },
        { question: 'What did winners receive?', options: ['Money', 'A "Strong Legs" badge', 'A holiday', 'Nothing'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_5', title: 'Rest and Recovery',
      text: 'After an intense week of training, the Terminale class learned about recovery. Their teacher explained that muscles need rest to grow stronger. Students who trained every day without rest often developed sore muscles and felt exhausted. The class practiced gentle stretching and discussed the importance of sleep and hydration. One student asked about the difference between a warm up and a cool-down. The teacher explained that both are essential parts of a complete training programme. By the end of the lesson, everyone understood that recovery is not laziness — it is smart training.',
      questions: [
        { question: 'What was the lesson mainly about?', options: ['Bench press technique', 'Recovery and rest', 'Competition rules', 'Nutrition only'], correctIndex: 1 },
        { question: 'What happened to students who trained every day without rest?', options: ['They became champions', 'They got sore muscles and felt exhausted', 'Nothing changed', 'They grew taller'], correctIndex: 1 },
        { question: 'What did one student ask about?', options: ['Warm up vs cool-down', 'The price of dumbbells', 'School holidays', 'Exam dates'], correctIndex: 0 },
        { question: "What is the teacher's message about recovery?", options: ['It is laziness', 'It is smart training', 'It is unnecessary', 'It is only for beginners'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_6', title: 'The New Dumbbells',
      text: 'The school gym received new dumbbells over the summer. On the first day back, the Première class was excited to try them. Their teacher started with a warm up routine before introducing the new equipment. Students practiced basic movements, learning to bend their elbows correctly while lifting. The teacher paired students for the bench press and dumbbell exercises. Everyone recorded their reps in a training journal. By the end of the session, students felt confident using the new equipment safely. The teacher reminded them that good training habits start with proper preparation.',
      questions: [
        { question: 'What new equipment did the gym receive?', options: ['Treadmills', 'Dumbbells', 'Bicycles', 'Mats only'], correctIndex: 1 },
        { question: 'What did students record in their journals?', options: ['Their reps', 'Their lunch', 'Their homework', 'Phone numbers'], correctIndex: 0 },
        { question: 'What did the teacher pair students for?', options: ['Lunch breaks', 'Bench press and dumbbell exercises', 'Exams', 'Running races'], correctIndex: 1 },
        { question: 'What message did the teacher give at the end?', options: ['Skip warm ups', 'Good habits start with preparation', 'Lift as heavy as possible', 'Never use dumbbells'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_7', title: 'Core Strength Day',
      text: 'Wednesday was core strength day in the Terminale programme. Students learned that the core includes abdominal and lower back muscles. The session began with a dynamic warm up including planks and stretching. The teacher demonstrated how a strong core helps during exercises like the deadlift and squat. Students practiced bending and twisting movements to engage their core. Some found the exercises challenging but rewarding. The teacher explained that core training supports every other type of exercise. Students left the session understanding why core work is essential for overall fitness.',
      questions: [
        { question: 'What day was core strength day?', options: ['Monday', 'Wednesday', 'Friday', 'Sunday'], correctIndex: 1 },
        { question: 'What muscles does the core include?', options: ['Only arms', 'Abdominal and lower back', 'Only legs', 'Only neck'], correctIndex: 1 },
        { question: 'Which exercises benefit from a strong core?', options: ['Deadlift and squat', 'Only swimming', 'Only cycling', 'None'], correctIndex: 0 },
        { question: 'How did students feel about the exercises?', options: ['Challenging but rewarding', 'Too easy and boring', 'Impossible and unfair', 'They refused to try'], correctIndex: 0 },
      ],
    },
    {
      id: 'story_8', title: 'Pull-Up Progress',
      text: 'Marc could not do a single pull-up at the start of the year. His goal was to complete five by the end of the term. Every training session, he worked on his upper body strength. He always began with a warm up and finished with stretching for his sore muscles. His friends encouraged him during group training sessions. The teacher showed him how to use resistance bands to build strength gradually. After two months of consistent training, Marc completed his first pull-up. The whole class cheered. Marc learned that patience and regular practice lead to real progress.',
      questions: [
        { question: "What was Marc's goal?", options: ['Run a marathon', 'Complete five pull-ups', 'Bench press 200 kg', 'Skip every warm up'], correctIndex: 1 },
        { question: 'What did Marc use to build strength gradually?', options: ['Heavy weights only', 'Resistance bands', 'Nothing', 'A bicycle'], correctIndex: 1 },
        { question: 'How long did it take Marc to do his first pull-up?', options: ['One day', 'Two months', 'One year', 'Never'], correctIndex: 1 },
        { question: 'What lesson did Marc learn?', options: ['Give up quickly', 'Patience and practice lead to progress', 'Pull-ups are impossible', 'Warm ups are useless'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_9', title: 'The PE Exam',
      text: 'Before the PE vocabulary exam, the Seconde class reviewed key words together. They practiced saying "warm up", "training", "bench press", and "hamstring" aloud. The teacher created fun activities to help them remember the definitions in English. Students who had been training regularly felt more confident because they used these words every week in the gym. On exam day, students had to match words with definitions and answer comprehension questions about a short gym story. Most students passed with good scores. The teacher was pleased to see vocabulary learned through real physical activity.',
      questions: [
        { question: 'What did the class review before the exam?', options: ['Math formulas', 'PE vocabulary', 'History dates', 'Music notes'], correctIndex: 1 },
        { question: 'Why did regular gym-goers feel more confident?', options: ['They cheated', 'They used the words every week', 'The exam was cancelled', 'They did not study'], correctIndex: 1 },
        { question: 'What types of tasks were on the exam?', options: ['Match words with definitions and comprehension', 'Only writing essays', 'Only listening', 'Drawing pictures'], correctIndex: 0 },
        { question: 'How did the teacher feel about the results?', options: ['Disappointed', 'Pleased', 'Angry', 'Indifferent'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_10', title: 'Championship Day',
      text: 'The annual school fitness championship brought together all three levels. Students competed in teams, combining strength and vocabulary knowledge. Each team had to name exercises correctly in English before performing them — bench press, squats, pull-ups, and more. Every team started with a group warm up led by the Terminale students. The competition was close, but Team B from Première won by knowing all their vocabulary words and completing exercises with perfect form. The PE teacher gave a speech about how language and sport work together. Everyone celebrated with a cool-down stretch session together.',
      questions: [
        { question: 'What did teams need to do before each exercise?', options: ['Pay money', 'Name exercises correctly in English', 'Write an essay', 'Call their parents'], correctIndex: 1 },
        { question: 'Who led the group warm up?', options: ['Teachers only', 'Terminale students', 'Parents', 'Nobody'], correctIndex: 1 },
        { question: 'Which team won?', options: ['Team A from Seconde', 'Team B from Première', 'Team C from Terminale', 'No team'], correctIndex: 1 },
        { question: "What was the teacher's main message?", options: ['Language and sport work together', 'Only strength matters', 'Vocabulary is useless', 'Competition is bad'], correctIndex: 0 },
      ],
    },
    {
      id: 'story_11', title: 'The Leg Press Station',
      text: 'During their first session on the leg press machine, the Première students listened carefully to the safety instructions. The coach explained that they had to keep their back flat against the seat and push the platform with their heels, not their toes. Before loading any weight plates, everyone completed a warm up with bodyweight squats and light stretching for the quadriceps and hamstrings. Nora was surprised by how much the exercise worked her glutes as well as her legs. When she tried to increase the weight too quickly, the coach reminded her that progress should be gradual. By the end of the lesson, the class understood that good technique matters more than heavy loads.',
      questions: [
        { question: 'What did the coach say about foot position?', options: ['Push with your toes', 'Push with your heels', 'Keep feet off the platform', 'Stand on the machine'], correctIndex: 1 },
        { question: 'Which muscles were stretched during the warm up?', options: ['Biceps and triceps', 'Quadriceps and hamstrings', 'Shoulders and chest', 'Neck and wrists'], correctIndex: 1 },
        { question: 'What happened when Nora increased the weight too fast?', options: ['She won a prize', 'The coach told her to progress gradually', 'She skipped the exercise', 'The machine broke'], correctIndex: 1 },
        { question: 'What is the main lesson of the story?', options: ['Heavy weights are always best', 'Good technique matters more than heavy loads', 'Warm ups are optional', 'The leg press is dangerous'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_12', title: 'Cardio and Core',
      text: 'Coach Dupont designed a circuit that combined cardio equipment with core exercises. Students spent three minutes on the exercise bike, then moved to the rowing machine, and finally walked at a steady pace on the treadmill. Between each station, they held a plank for thirty seconds to strengthen their core muscles. Although the session was demanding, most students agreed that variety made the training more engaging than repeating the same movement for an hour. The coach pointed out that cardiovascular endurance supports every other type of physical activity, from running to weightlifting. At the cool-down, students stretched their calves and discussed how they could improve their breathing rhythm during the next session.',
      questions: [
        { question: 'Which three cardio machines appear in the circuit?', options: ['Leg press, bench press, cable machine', 'Exercise bike, rowing machine, treadmill', 'Dumbbells, barbell, kettlebell', 'Foam roller, resistance band, bench'], correctIndex: 1 },
        { question: 'What core exercise did students perform between stations?', options: ['Bicep curl', 'Plank', 'Leg extension', 'Pull-up'], correctIndex: 1 },
        { question: 'According to the coach, why is cardiovascular endurance important?', options: ['It replaces strength training', 'It supports other physical activities', 'It is only useful for exams', 'It prevents students from sweating'], correctIndex: 1 },
        { question: 'What did students discuss during the cool-down?', options: ['Their holiday plans', 'How to improve their breathing rhythm', 'The price of gym membership', 'Which teacher they prefer'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_13', title: 'A Personal Training Log',
      text: 'Every Terminale student received a training log at the start of the semester. The idea was simple: record each session, note the exercises performed, and track whether performance was improving over time. Antoine wrote down his sets and reps after every bench press and squat session. After six weeks, he noticed a clear pattern — his strength was increasing, but only on the days when he had slept well and completed his warm up properly. His teacher explained that this kind of self-analysis helps athletes make smarter decisions about rest, nutrition, and workload. Antoine realised that training is not just about working hard; it is about working intelligently and learning from your own data.',
      questions: [
        { question: 'What were students asked to record in their training log?', options: ['Their favourite music', 'Exercises, sets, reps, and progress', 'Only their exam grades', 'Phone numbers of classmates'], correctIndex: 1 },
        { question: 'What pattern did Antoine discover after six weeks?', options: ['He never improved', 'Progress linked to sleep and proper warm up', 'He trained better without sleep', 'He stopped doing squats'], correctIndex: 1 },
        { question: 'What does self-analysis help athletes decide?', options: ['Which TV series to watch', 'Rest, nutrition, and workload', 'How to skip PE class', 'Which shoes to buy online'], correctIndex: 1 },
        { question: 'What is the central message of the story?', options: ['Training means lifting as heavy as possible', 'Smart training means learning from your own data', 'Logs are useless for beginners', 'Only coaches can analyse progress'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_14', title: 'The Cable Machine Workout',
      text: 'The cable machine area was always busy on Thursday afternoons. Under the coach\'s supervision, students practised the lat pull down to strengthen their back muscles and the machine fly to work their chest. Because the resistance could be adjusted precisely, each student could choose a load that matched their current level. The coach insisted that controlled movements were more effective than fast, uncontrolled repetitions. When Lucas rushed through his sets, his partner reminded him to focus on form rather than speed. By slowing down, Lucas felt his lats and shoulders working more deeply. The session ended with a discussion about how machines can help beginners learn movement patterns before progressing to free weights such as the barbell.',
      questions: [
        { question: 'Which two exercises are mentioned on the cable machine?', options: ['Deadlift and squat', 'Lat pull down and machine fly', 'Leg curl and leg extension', 'Bench press and pull-up'], correctIndex: 1 },
        { question: 'Why could each student choose a different load?', options: ['The machines were broken', 'Resistance could be adjusted precisely', 'There were no weight plates', 'The coach assigned random numbers'], correctIndex: 1 },
        { question: 'What advice did Lucas\'s partner give him?', options: ['Lift faster to finish early', 'Focus on form rather than speed', 'Skip the warm up', 'Use the heaviest weight immediately'], correctIndex: 1 },
        { question: 'What advantage of machines did the class discuss?', options: ['They are always easier than free weights', 'They help beginners learn movement patterns', 'They replace the need for coaching', 'They work only the legs'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_15', title: 'When Training Gets Tough',
      text: 'After eight weeks of steady progress, Inès hit a plateau. Her bench press weight had not increased, and she felt frustrated during every session. Instead of training harder every day, she spoke with her PE teacher, who suggested a different approach: reduce the training volume for one week, focus on mobility exercises with a foam roller, and pay more attention to nutrition and sleep. Inès was sceptical at first, but she followed the advice. When she returned to the weight room, her movements felt smoother and her confidence returned. She learned that setbacks are a normal part of long-term development, and that sometimes the best way forward is to step back, recover, and adjust your programme rather than push through exhaustion.',
      questions: [
        { question: 'What problem did Inès experience?', options: ['She forgot her gym clothes', 'She hit a plateau in her bench press', 'She won every competition', 'She never attended class'], correctIndex: 1 },
        { question: 'What did the teacher recommend instead of training harder every day?', options: ['Quit the gym permanently', 'Reduce volume, focus on mobility, rest, and nutrition', 'Double the number of sessions immediately', 'Stop doing bench press forever'], correctIndex: 1 },
        { question: 'Which recovery tool is mentioned in the story?', options: ['Resistance band', 'Foam roller', 'Weight plate', 'Exercise bike'], correctIndex: 1 },
        { question: 'What lesson did Inès learn about setbacks?', options: ['They mean you should give up', 'They are normal and require smart adjustment', 'They only happen to beginners', 'They can be ignored safely'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_16', title: 'The Fitness Assessment',
      text: 'At the beginning of the year, every Terminale student completed a fitness assessment designed to measure strength, endurance, and flexibility. The results were not used to rank students against each other, but to help each person set realistic personal goals. Some students excelled at the rowing machine test, while others performed better on core stability exercises or the leg press. The PE department then created individual programmes that combined areas of strength with areas needing improvement. Students also had to write a short report in English explaining their results and describing how they planned to progress during the term. The teacher emphasised that assessment is a starting point for growth, not a final judgement of ability.',
      questions: [
        { question: 'What three qualities did the fitness assessment measure?', options: ['Height, age, and shoe size', 'Strength, endurance, and flexibility', 'Memory, spelling, and grammar', 'Speed, luck, and confidence only'], correctIndex: 1 },
        { question: 'How were the results used?', options: ['To publicly rank every student', 'To help each student set personal goals', 'To exclude students from the gym', 'To replace all training sessions'], correctIndex: 1 },
        { question: 'What written task did students complete in English?', options: ['A poem about holidays', 'A report explaining results and future plans', 'A letter to a famous athlete', 'A list of French translations only'], correctIndex: 1 },
        { question: 'What did the teacher say assessment represents?', options: ['A final judgement of ability', 'A starting point for growth', 'An unnecessary formality', 'A punishment for weak students'], correctIndex: 1 },
      ],
    },
    {
      id: 'story_17', title: 'Road to the Regional Championship',
      text: 'For months, the school\'s fitness team prepared methodically for the regional championship. Their programme alternated between strength sessions — including squats, deadlifts, and pull-ups — and recovery days devoted to stretching, hydration, and sleep. The coach explained that peak performance depends on consistency, not last-minute cramming. Before each training block, students reviewed key vocabulary in English so they could communicate clearly about technique during team workouts. On competition day, they arrived early, completed a structured warm up, and supported one another through every event. Although they did not win first place, the team achieved several personal bests and left with a shared understanding: sustainable progress is built week by week, and language skills help athletes train and compete more effectively together.',
      questions: [
        { question: 'How was the team\'s programme structured over several months?', options: ['Only rest days, no training', 'Strength sessions alternated with recovery days', 'One intense session the night before the event', 'Random exercises with no planning'], correctIndex: 1 },
        { question: 'According to the coach, what does peak performance depend on?', options: ['Last-minute cramming', 'Consistency over time', 'Skipping warm ups', 'Training alone without communication'], correctIndex: 1 },
        { question: 'Why did students review English vocabulary before training blocks?', options: ['To pass a maths exam', 'To communicate clearly about technique during team workouts', 'To impress the judges with poetry', 'Because English replaces physical training'], correctIndex: 1 },
        { question: 'What overall conclusion did the team reach?', options: ['Progress is impossible without winning first place', 'Sustainable progress and language skills support effective training', 'Recovery days are a sign of weakness', 'Teamwork is less important than individual records'], correctIndex: 1 },
      ],
    },
  ];
}
