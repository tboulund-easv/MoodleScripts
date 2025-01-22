// TestCafe script to import cohorts to specific courses in Moodle
import { Selector } from 'testcafe';

fixture `Moodle Self Enrolment`
    .page `https://moodle.easv.dk/login/index.php`;

var courses = [
    5014,
    5015,
    5016,
    5017,
    5018,
    5019,
    5020,
    5021,
    5022,
    5023,
    5024,
    5025,
    5026,
    5027,
    5028,
    5029,
    5030,
    5031,
    5032,
    5033,
    5082,
    5083,
    5084
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
                .navigateTo('https://moodle.easv.dk/enrol/editinstance.php?type=self&courseid=' + course)
                .typeText(Selector("#id_roleid"), "Teacher", { replace: true })
                .click(Selector("[data-passwordunmask='edit']"))
                .typeText(Selector("#id_password"), "SudoMakeTeacher", { replace: true })
                .click(Selector("#id_customint5"))
                .click(Selector("#id_customint5 option").withText("Alle_Ansatte [Alle_Ansatte]"))
                .click(Selector("#id_submitbutton"))
                .takeScreenshot()
                
                .navigateTo('https://moodle.easv.dk/course/edit.php?id=' + course)
                .click(Selector("#id_courseformathdr a[data-toggle='collapse']"))
                .click(Selector("#id_use_general_section_as_front_page"))
                .click(Selector("#id_use_general_section_as_front_page option").withText("Yes"))
                .click(Selector("#id_saveanddisplay"))
                .takeScreenshot();
    }
});
