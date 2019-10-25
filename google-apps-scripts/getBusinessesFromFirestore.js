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
        { name: 'Import All Businesses', functionName: 'importBusinesses' }
    ];
    spreadsheet.addMenu('ProjectMarket', menuItems);
}

function getBusinessesFromFirestore() {
    var email = "";
    var key = "";
    var projectId = "";
    var firestore = FirestoreApp.getFirestore(email, key, projectId);
    const allBusinesses = firestore.getDocuments("businesses");
    return allBusinesses;
}

function importBusinesses() {
    var sheet = SpreadsheetApp.getActiveSheet().setName('Businesses');
    sheet.clear();
    var headers = [
        'id',
        'createdBy',
        'abn',
        'name',
        'template',
        'supervisor',
        'address',
        'fteNumber',
        'additionalEmployees',
        'isMentorAvailable',
        'mentor',
        'website',
        'industry',
        'description',
        'startDate',
        'endDate',
        'supervisorRole',
        'supervisorExperience',
        'why - completeProject',
        'why - testStudent',
        'why - gainIdeas',
        'why - developMentors',
        'why - other',
        'referrer',
        'isSubmitted',
        'submittedOn'
    ];

    sheet.getRange('A1:Z1').setValues([headers]).setFontWeight('bold');

    var businesses = getBusinessesFromFirestore();
    for each(var business in businesses)
    {
        sheet.appendRow([
            business.name.split("/")[6],
            business.fields.createdBy.name,
            business.fields.abn,
            business.fields.name,
            business.fields.template,
            business.fields.supervisor,
            business.fields.address,
            business.fields.fteNumber,
            business.fields.additionalEmployees,
            business.fields.isMentorAvailable,
            business.fields.mentor,
            business.fields.website,
            business.fields.industry,
            business.fields.description,
            business.fields.startDate,
            business.fields.endDate,
            business.fields.supervisorRole,
            business.fields.supervisorExperience,
            business.fields.why.completeProject,
            business.fields.why.testStudent,
            business.fields.why.gainIdeas,
            business.fields.why.developMentors,
            business.fields.why.other,
            business.fields.referrer,
            business.fields.isSubmitted,
            business.fields.submittedOn
        ]);
    };
}
