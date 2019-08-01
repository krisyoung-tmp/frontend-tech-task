import uuidv4 from 'uuid/v4'

const titles = [
    "No man, I don't eat pork",
    'Are you ready for the truth?',
    'Is she dead, yes or no?',
    "I'm serious as a heart attack",
    'I can do that',
    'No, motherf*@ker',
]

const descriptions = [
    "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.",
    "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.",
    "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherf*@kin' house, f*@kin' up the way the nigger talks. Motherf*@ker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherf*@ker, know what I'm sayin'?",
    "Normally, both your asses would be dead as f*@king fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.",
    "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man.",
]

const statuses = ['NOT_STARTED', 'IN_PROGRESS', 'PAUSED', 'COMPLETED']

export default Array.from({ length: 2000 })
    .map((_, idx) => ({
        id: uuidv4(),
        title: titles[idx % titles.length],
        description: descriptions[idx % descriptions.length],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        author: `${Math.ceil(idx % 3)}`,
        assignee: `${Math.ceil(Math.random() * 3)}`,
        created_date: `2019-07-${15 - Math.floor(idx % 5)}T12:00:00.000Z`,
        updated_date: `2019-07-${24 - Math.floor(idx % 5)}T12:00:00.000Z`,
        completed_date: null,
        due_date: `2019-07-${17 + Math.floor(idx % 12)}T12:00:00.000Z`,
    }))
    .reduce((acc, task) => {
        acc[task.id] = task
        return acc
    }, {})
