"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const courses_1 = require("./courses");
const studyGroups_1 = require("./studyGroups");
function searchEvents(options) {
    const events = options.eventType === 'courses' ? courses_1.default : studyGroups_1.default;
    //Alternative:
    /* let events = studyGroups;
    if (args.eventType === 'courses') {
    events = courses;
  } */
    return events.filter((event) => {
        if (typeof options.query === 'number') {
            return options.query === event.id;
        }
        if (typeof options.query === 'string') {
            return event.keywords.includes(options.query);
        }
    });
    const filteredEvents = events.filter((event) => {
        if (typeof options.query === 'number') {
            return options.query === event.id;
        }
        if (typeof options.query === 'string') {
            return event.keywords.includes(options.query);
        }
    });
}
const searchOptions1 = {
    query: 'art',
    eventType: 'courses',
};
const searchOptions2 = {
    query: 2,
    eventType: 'groups',
};
const searchResults1 = searchEvents(searchOptions1);
const searchResults2 = searchEvents(searchOptions2);
console.log('Search Results for "art" (Courses):', searchResults1);
console.log('Search Results for ID 2 (Groups):', searchResults2);
let enrolledEvents = [];
function enroll(event) {
    enrolledEvents = [...enrolledEvents, event];
}
const eventToEnroll = searchResults1.length > 0 ? searchResults1[0] : searchResults2[0];
// Enroll in the event
enroll(eventToEnroll);
console.log('Enrolled Events:', enrolledEvents);
// Allow enroll() to take in a list of courses and add them all to enrolledEvents
function enrollMultiple(events) {
    enrolledEvents = [...enrolledEvents, ...events];
}
const multipleEventsToEnroll = searchResults1.slice(1, 3); // Assuming there are at least two more events in searchResults1
enrollMultiple(multipleEventsToEnroll);
// Add a function to drop a course
function dropCourse(event) {
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