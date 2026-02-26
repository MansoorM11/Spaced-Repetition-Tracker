Requirement
Dropdown Contains Exactly 5 Users

Answer:
used a unit test to check the getUserId length returns 5/

Also opened the browser to check if the dropdown menu contains the 5 selectable users.

Requirement
No User Selected on Page Load

Answer:
Made sure the default drop down list contains an empty option when the page loads. i refreshed the page to check this. Also confirmed the message that it loads "No user is selected when the page loads"

Requirement
All Users Start With No Agenda

Answer:
I opened the browser and cleared local storage and then went one by one through the users to make sure a message loads with "no agenda for the selected user". Therefore all users initally have no stored agenda.

Requirement
Selecting a user loads their agenda.

Answer:
I added a topic for user1 and then switched to different user and then back to user1 to make sure the agenda still shows for user 1. I can confirm the agenda still showed for user 1 and i did it for user 2 as well.

Requirement

Revision Dates are calculated correctly.

Answer:

I exported my caclulate revision date function and then created a unit test to check if the dates were correctly calculated. For example 2026-03-01 did return correct array of dates based on the requirements.

Requirement

Dates are sorted chronologically

Answer:

I added two topics with different start dates for user 1 and then checked to make sure the dates which was the earliest displayed first and then followed by later dates. The date sorting was done using ISO date string

Requirement
Past dates are not displayed.

Answer
I added dates which were in the past for example "2026-02-15" to make sure no past topic dates were displayed on the agenda. I can confirm only the dates which were in the future were displayed in the agenda. Thus past revision dates were filtered correctly.

Requirement

Date Picker Defaults to Today.

Answer
I opened the webpage and checked that the date picker input automatically shows todays date and also after refreshing the page.

Requirement

Form Validation

Answer
I attempted to submit the form without selecting a user , or adding a topic or missing a date and i can confrim that correct error message were to shown on the webpage.

After creating a new topic, updated agenda must be displayed.

I added a topic and confrimed the agenda for the user displayed immediately on the webpage with the topic name and also the correct revision dates in chronological order.

Requirement
Accessibility (lighthouse 100%)

Answer:
I opened chrome devtools and ran lighthouse in snapshot mode and verified accessibility score is 100%.
