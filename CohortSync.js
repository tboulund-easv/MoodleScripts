// TestCafe script to import cohorts to specific courses in Moodle
import { Selector } from 'testcafe';

fixture `Moodle Cohort Sync`
    .page `https://moodle.easv.dk/login/index.php`;

var courses = [
    { id: 5014, cohorts: ['DevOps udviklingsmetode (DMU-E-ESB23)', 'DevOps Udviklingsmetode (DMU-E-ESB23-I)', 'DevOps udviklingsmetode (DMU-E-TØN23)'] }, 
    { id: 5015, cohorts: ['PBS-E-ESB24', 'PBS-E-ESB24-I', 'PBS-F-ESB25', 'PBS-F-ESB25-I'] }, 
    { id: 5016, cohorts: ['DMU-E-ESB24'] }, 
    { id: 5017, cohorts: ['DMU-E-ESB24-I'] }, 
    { id: 5018, cohorts: ['DMU-E-ESB24'] }, 
    { id: 5019, cohorts: ['DMU-E-ESB24-I'] }, 
    { id: 5020, cohorts: ['Applications of artificial intelligence (DMU-E-ESB23)', 'Applications of artificial intelligence (DMU-E-ESB23-I)'] }, 
    { id: 5021, cohorts: ['DMU-E-ESB24'] }, 
    { id: 5022, cohorts: ['DMU-E-ESB24-I'] }, 
    { id: 5023, cohorts: ['DMU-E-TØN24'] }, 
    { id: 5024, cohorts: ['DMU-E-TØN23'] }, 
    { id: 5026, cohorts: ['PBS-F-ONL25', 'PBS-E-ONL24'] }, 
    { id: 5027, cohorts: ['Mobilprogrammering (DMU-E-ESB23)', 'Mobilprogrammering (DMU-E-ESB23-I)'] }, 
    { id: 5028, cohorts: ['PBS-F-ONL25', 'PBS-E-ONL24'] }, 
    { id: 5029, cohorts: ['PBS-F-ONL25', 'PBS-E-ONL24'] }, 
    { id: 5030, cohorts: ['Full stack udvikling (DMU-E-ESB23)', 'Full Stack udvikling (DMU-E-ESB23-I)'] }, 
    { id: 5031, cohorts: ['Tingenes internet (DMU-E-ESB23)', 'Tingenes internet (DMU-E-ESB23-I)'] }, 
    { id: 5032, cohorts: ['PBS-E-ESB24', 'PBS-E-ESB24-I', 'PBS-F-ESB25', 'PBS-F-ESB25-I'] }, 
    { id: 5033, cohorts: ['PBS-E-ESB24', 'PBS-E-ESB24-I', 'PBS-F-ESB25', 'PBS-F-ESB25-I'] }, 
    { id: 5082, cohorts: ['Cybersikkerhed (DMU-E-ESB23)', 'Cybersikkerhed (DMU-E-ESB23-I)', 'Cybersikkerhed (DMU-E-TØN23)'] }, 
    { id: 5083, cohorts: ['DMU-E-TØN24'] }, 
    { id: 5084, cohorts: ['DMU-E-TØN24'] }
];

test('Moodle Cohort Sync', async t => {
    await t
        .typeText(Selector('#username'), 'tbmh')
        .typeText(Selector('#password'), '')
        .setNativeDialogHandler(() => true)
        .click(Selector('#loginbtn'));

    for(var i = 0; i < courses.length; i++) {
        var course = courses[i];
            await t
                .navigateTo('https://moodle.easv.dk/enrol/editinstance.php?type=cohort&courseid=' + course.id);

        for(var j = 0; j < course.cohorts.length; j++) {
            var cohort = course.cohorts[j];

            await t
                .typeText(Selector("[id^='form_autocomplete_input-']"), cohort, { replace: true })
                .click(Selector("ul.form-autocomplete-suggestions li").withExactText(cohort))
        }

        await t
            .click(Selector("#id_submitbutton"))
            .navigateTo('https://moodle.easv.dk/enrol/instances.php?id=' + course.id)
            .takeScreenshot();
    }
});
