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
        { name: 'Import All Users', functionName: 'importUsers' }
    ];
    spreadsheet.addMenu('ProjectMarket', menuItems);
}

function getUsersFromFirestore() {
    var email = "";
    var key = "";
    var projectId = "";
    var firestore = FirestoreApp.getFirestore(email, key, projectId);
    const allUsers = firestore.getDocuments("users");
    return allUsers;
}

function importUsers() {
    var sheet = SpreadsheetApp.getActiveSheet().setName('Users');
    sheet.clear();
    var headers = [
        'id',
        'created',
        'authEmail',
        'authName',
        'email',
        'name',
        'role'
    ];

    sheet.getRange('A1:G1').setValues([headers]).setFontWeight('bold');

    var users = getUsersFromFirestore();
    for each(var user in users)
    {
        sheet.appendRow([
            user.name.split("/")[6],
            user.createTime,
            user.fields.authEmail,
            user.fields.authName,
            user.fields.email,
            user.fields.name,
            user.fields.role
        ]);
    };
}
