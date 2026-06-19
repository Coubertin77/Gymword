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

  const classes = [
    { id: 'class_seconde', name: 'Seconde — Group A', level: 'Seconde', roster: [], assignedListIds: ['list_equipment'], assignedStoryIds: ['story_1', 'story_2', 'story_3'], assignedActivities: ['image_match', 'translation', 'definition', 'qcm', 'spelling'] },
    { id: 'class_premiere', name: 'Première — Group B', level: 'Première', roster: [], assignedListIds: ['list_equipment', 'list_exercises'], assignedStoryIds: ['story_1', 'story_2', 'story_3', 'story_4', 'story_5'], assignedActivities: ['image_match', 'translation', 'definition', 'qcm', 'spelling'] },
    { id: 'class_terminale', name: 'Terminale — Group C', level: 'Terminale', roster: [], assignedListIds: ['list_equipment', 'list_exercises', 'list_body'], assignedStoryIds: ['story_1', 'story_2', 'story_3', 'story_4', 'story_5', 'story_6', 'story_7', 'story_8', 'story_9', 'story_10'], assignedActivities: ['image_match', 'translation', 'definition', 'qcm', 'spelling'] },
  ];

  const stories = buildStories();

  return { classes, wordLists: [list1, list2, list3], stories, students: [], activityResults: [] };
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
  ];
}
