// TestCafe script to import cohorts to specific courses in Moodle
import { Selector } from 'testcafe';

fixture `Moodle Cohort Sync`
    .page `https://moodle.easv.dk/login/index.php`;

var courses = [
    // { id: 3983, cohorts: [ "DMU-E-ESB24" ] },
    // { id: 3995, cohorts: [ "DMU-E-ESB24" ] },
    // { id: 4306, cohorts: [ "DMU-E-ESB24-I" ] },
    // { id: 3994, cohorts: [ "DMU-E-ESB24-I" ] },
    // { id: 3982, cohorts: [ "DMU-E-ESB23", "DMU-E-ESB23-I" ] },
    // { id: 4307, cohorts: [ "DMU-E-ESB23", "DMU-E-ESB23-I" ] },
    // { id: 4237, cohorts: [ "PBS-F-ESB24", "PBS-F-ESB24-I", "PBS-E-ESB24", "PBS-E-ESB24-I" ] },
    // { id: 4238, cohorts: [ "PBS-F-ESB24", "PBS-F-ESB24-I", "PBS-E-ESB24", "PBS-E-ESB24-I" ] },
    // { id: 4239, cohorts: [ "PBS-F-ESB24", "PBS-F-ESB24-I", "PBS-E-ESB24", "PBS-E-ESB24-I" ] },
    // { id: 3981, cohorts: [ "PBS-F-ONL24", "PBS-E-ONL24" ] },
    // { id: 4241, cohorts: [ "PBS-F-ONL24", "PBS-E-ONL24" ] },
    // { id: 4242, cohorts: [ "PBS-F-ONL24", "PBS-E-ONL24" ] },
    // { id: 3988, cohorts: [ "DMU-E-TØN24" ] },
    // { id: 3989, cohorts: [ "DMU-E-TØN24" ] },
    // { id: 3993, cohorts: [ "DMU-E-TØN24" ] },
    // { id: 3990, cohorts: [ "DMU-E-TØN23" ] },
    // { id: 3991, cohorts: [ "DMU-E-TØN23" ] },
    // { id: 3992, cohorts: [ "DMU-E-TØN23" ] },

    // { id: 4240, cohorts: [ "PBS-E-ESB23", "PBS-E-ONL23" ] },
    // { id: 4084, cohorts: [ "DMU-E-ESB24" ] },
    // { id: 4085, cohorts: [ "DMU-E-ESB24-I" ] },
    // { id: 4087, cohorts: [ "DMU-E-TØN24" ] },
    // { id: 4106, cohorts: [ "PBS-E-ESB23", "PBS-E-ESB23-I" ] },
    // { id: 4107, cohorts: [ "PBS-E-ONL24" ] },
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
                .wait(1000)
                .pressKey('enter');
        }

        await t
            .click(Selector("#id_submitbutton"))
            .navigateTo('https://moodle.easv.dk/enrol/instances.php?id=' + course.id)
            .takeScreenshot();
    }
});
