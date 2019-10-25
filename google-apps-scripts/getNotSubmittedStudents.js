/**
 * @OnlyCurrentDoc Limits the script to only accessing the current sheet.
 */

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
    var spreadsheet = SpreadsheetApp.getActive();
    var menuItems = [
        { name: 'Import Not Submitted Students', functionName: 'importUsers' }
    ];
    spreadsheet.addMenu('ProjectMarket', menuItems);
}

function getUsersFromFirestore() {
    var email = "";
    var key = "";
    var projectId = "";
    var firestore = FirestoreApp.getFirestore(email, key, projectId);
    const allUsers = firestore.query("users").where("role", "==", "student").where("isFormSubmitted", "==", false).execute();
    return allUsers;
}

function importUsers() {
    var sheet = SpreadsheetApp.getActiveSheet().setName('Students');
    sheet.clear();
    var headers = [
        'id',
        'created',
        'authEmail',
        'authName',
        'email',
        'name',
        'template',
        'isStudying',
        'studyArea',
        'university',
        'year',
        'course',
        'interests',
        'why',
        'resumeUrl',
        'transcriptUrl'
    ];

    sheet.getRange('A1:P1').setValues([headers]).setFontWeight('bold');

    var users = getUsersFromFirestore();
    for each(var user in users)
    {
        if (user.fields.student) {
            sheet.appendRow([
                user.name.split("/")[6],
                user.createTime,
                user.fields.authEmail,
                user.fields.authName,
                user.fields.email,
                user.fields.name,
                user.fields.student.template,
                user.fields.student.isStudying,
                user.fields.student.studyArea,
                user.fields.student.university,
                user.fields.student.year,
                user.fields.student.course,
                user.fields.student.interests,
                user.fields.student.why,
                user.fields.student.resumeUrl,
                user.fields.student.transcriptUrl])
        } else {
            sheet.appendRow([
                user.name.split("/")[6],
                user.createTime,
                user.fields.authEmail,
                user.fields.authName,
                user.fields.email,
                user.fields.name])
        };
    };
}
