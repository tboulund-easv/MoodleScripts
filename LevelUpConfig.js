import { Selector } from 'testcafe';

fixture `LevelUp Point Config`
    .page `https://moodle.easv.dk/login/index.php`;

test('LevelUp Point Config', async t => {

    var courses = [ 4304 ];
    var points = [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 200 ];

    await t
        .typeText(Selector('#username'), 'tbmh')
        .typeText(Selector('#password'), '')
        .setNativeDialogHandler(() => true)
        .click(Selector('#loginbtn'));

    for(var i = 0; i < courses.length; i++) {
        var course = courses[i];
        await t
            .navigateTo("https://moodle.easv.dk/blocks/xp/index.php/completionrules/" + course);

        for(var j = 0; j < points.length; j++) {
            var point = points[j];
            await t
                .click(Selector("button").withText("Add"))
                .click(Selector("div").withExactText("Activity name"))
                .typeText(Selector("#xp-rule-cmname-name"), point + " points: ")
                .typeText(Selector("#xp-rule-pointstoaward"), point.toString(), { replace: true })
                .click(Selector("button[data-action='save']"));
        }
    }
});