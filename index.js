const WebUntis = require('webuntis');
const items = JSON.parse(require('fs').readFileSync(__dirname + '\\items.json'))
const login = JSON.parse(require('fs').readFileSync(__dirname + '\\login.json'))
const untis = new WebUntis.WebUntisSecretAuth('gym-petershagen', login.username, login.secret, login.baseUrl);

function removeArrayDuplicates(arr) {
	return arr.filter((elem, pos) => arr.indexOf(elem) == pos)
}

untis
    .login()
    .then(() => {
        // return untis.getOwnTimetableForToday();
		const tomorrow = new Date()
		tomorrow.setDate(tomorrow.getDate() + 1)
		
		return untis.getOwnTimetableFor(tomorrow)
    })
    .then((timetable) => {

		timetable.sort((a, b) => a.startTime - b.startTime)
		totalItems = []
		timetable.forEach(lesson => {
			fach = items[lesson.sg.split("-")[0]];
			totalItems.push(fach.items)
		})
		totalItems = [].concat(...totalItems);
		totalItems = { items: removeArrayDuplicates(totalItems), default: items.default}
		console.log(totalItems)
    });