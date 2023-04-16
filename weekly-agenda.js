function emailWeeklyCalendarSummary() {
  var today = new Date();
  var nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  var calendar = CalendarApp.getDefaultCalendar();
  var events = calendar.getEvents(today, nextWeek);
  
  var summary = 'Upcoming events for the week:\n\n';
  
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var startTime = Utilities.formatDate(event.getStartTime(), Session.getScriptTimeZone(), "EEE, MMM d, yyyy 'at' HH:mm");
    var endTime = Utilities.formatDate(event.getEndTime(), Session.getScriptTimeZone(), "EEE, MMM d, yyyy 'at' HH:mm");
    var attendees = event.getGuestList();
    var attendeeNames = [];
    for (var j = 0; j < attendees.length; j++) {
      attendeeNames.push(attendees[j].getName());
    }
    summary += startTime + ' - ' + endTime + ' - ' + event.getTitle() + ' - Attendees: ' + attendeeNames.join(', ') + '\n';
  }
  
  var emailAddress = Session.getActiveUser().getEmail();
  var subject = 'Your Google Calendar Weekly Summary';
  
  MailApp.sendEmail(emailAddress, subject, summary);
}
