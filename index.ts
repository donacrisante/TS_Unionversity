import courses from './courses';
import studyGroups from './studyGroups';

type Course = {
  id: number,
  studyGroupId: number,
  title: string,
  keywords: string[],
  eventType: string,
}

type StudyGroup = {
  id: number
  courseId: number,
  title: string,
  keywords: string[],
  eventType: string,
}

type SearchEventsOptions = {
  query: number | string,
  eventType: 'courses' | 'groups',
}


function searchEvents(options: SearchEventsOptions) {
  const events: (Course | StudyGroup)[] = options.eventType === 'courses' ? courses : studyGroups;
  //Alternative:
  /* let events = studyGroups;
  if (args.eventType === 'courses') {
  events = courses;
} */
return events.filter((event: Course | StudyGroup) => {
    if (typeof options.query === 'number') {
      return options.query === event.id;
    }
    if (typeof options.query === 'string') {
      return event.keywords.includes(options.query);
    }
  })

  const filteredEvents = events.filter((event: Course | StudyGroup) => {
    if (typeof options.query === 'number') {
      return options.query === event.id;
    }
    if (typeof options.query === 'string') {
      return event.keywords.includes(options.query);
    }
  })
}

const searchOptions1: SearchEventsOptions = {
  query: 'art',
  eventType: 'courses',
};

const searchOptions2: SearchEventsOptions = {
  query: 2,
  eventType: 'groups',
};

const searchResults1 = searchEvents(searchOptions1);
const searchResults2 = searchEvents(searchOptions2);

console.log('Search Results for "art" (Courses):', searchResults1);
console.log('Search Results for ID 2 (Groups):', searchResults2); 

let enrolledEvents: (Course | StudyGroup)[] = [];

function enroll(event: Course | StudyGroup) {
  enrolledEvents = [...enrolledEvents, event];
}

const eventToEnroll: Course | StudyGroup = searchResults1.length > 0 ? searchResults1[0] : searchResults2[0];

// Enroll in the event
enroll(eventToEnroll);

console.log('Enrolled Events:', enrolledEvents);

// Allow enroll() to take in a list of courses and add them all to enrolledEvents
function enrollMultiple(events: (Course | StudyGroup)[]) {
  enrolledEvents = [...enrolledEvents, ...events];
}

const multipleEventsToEnroll: (Course | StudyGroup)[] = searchResults1.slice(1, 3); // Assuming there are at least two more events in searchResults1
enrollMultiple(multipleEventsToEnroll);

// Add a function to drop a course
function dropCourse(event: Course | StudyGroup) {
  enrolledEvents = enrolledEvents.filter(enrolledEvent => enrolledEvent.id !== event.id);
}
// Drop a course (for example, dropping the first enrolled event)
dropCourse(enrolledEvents[0]);

// Add a function to print only the titles of enrolled events
function printEnrolledEventTitles() {
  const titles = enrolledEvents.map(event => event.title);
  console.log('Enrolled Event Titles:', titles);
}
// Print the enrolled event titles
printEnrolledEventTitles();
