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
        { name: 'Import All Students', functionName: 'importStudents' }
    ];
    spreadsheet.addMenu('ProjectMarket', menuItems);
}

function getStudentsFromFirestore() {
    var email = "";
    var key = "";
    var projectId = "";
    var firestore = FirestoreApp.getFirestore(email, key, projectId);
    const allStudents = firestore.getDocuments("students");
    return allStudents;
}

function importStudents() {
    var sheet = SpreadsheetApp.getActiveSheet().setName('Students');
    sheet.clear();
    var headers = [
        'id',
        'authEmail',
        'authName',
        'email',
        'name',
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

    sheet.getRange('A1:N1').setValues([headers]).setFontWeight('bold');

    var students = getStudentsFromFirestore();
    for each(var student in students)
    {
        sheet.appendRow([
            student.fields.id,
            student.fields.authEmail,
            student.fields.authName,
            student.fields.email,
            student.fields.name,
            student.fields.student.isStudying,
            student.fields.student.studyArea,
            student.fields.student.university,
            student.fields.student.year,
            student.fields.student.course,
            student.fields.student.why,
            student.fields.student.resumeUrl,
            student.fields.student.transcriptUrl
        ]);
    };
}
