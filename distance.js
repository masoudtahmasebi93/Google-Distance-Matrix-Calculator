var distance = require('google-distance');
var asyncLoop = require('node-async-loop');
var jsonfile = require('jsonfile');

var file = 'data.json';

var darr = ['32.752408, 51.746622',
    '32.656417, 51.730556',
    '32.681389, 51.580306',
    '32.695444, 51.705722',
    '32.701472, 51.680250',
    '32.661889, 51.692278',
    '32.631194, 51.693806',
    '32.649094, 51.661576',
    '32.657833, 51.661111',
    '32.551861, 51.688917',
    '32.804333, 51.695556',
    '32.812861, 51.615028',
    '32.882278, 51.549944',
    '32.630750, 51.369222',
    '32.708194, 51.606722',
    '32.673417, 51.661111',
    '32.632917, 51.666028',
    '32.630861, 51.671472',
    '32.631944, 51.653250',
    '32.659722, 51.680806',
    '32.651944, 51.668333',
    '32.651444, 51.665722',
    '32.654278, 51.660722',
    '32.652333, 51.698444',
    '32.662944, 51.719472',
    '32.613250, 51.670917',
    '32.673083, 51.697806',
    '32.554000, 51.672056',
    '32.638306, 51.674889',
    '32.694667, 51.536056',
    '32.621278, 51.767333',
    '32.735035, 51.740205',
    '32.745611, 51.745333',
    '32.755861, 51.777083',
    '32.728972, 51.736250',
    '32.711500, 51.762583',
    '32.703139, 51.761278',
    '32.652500, 51.797028'
]


function getDistance(dArr) {


    asyncLoop(dArr, function (item1, next) {
        asyncLoop(dArr, function (item2, next) {
            setTimeout(function () {
                console.log('START for: origin: ' + item1 + ',destination: ' + item2)
                distance.get(
                    {
                        origin: item1,
                        destination: item2
                    },

                    function (err, data) {
                        if (err) console.log(err);
                        if (data != undefined && data != null) {
                            data.string = 'Calculated for: origin: ' + item1 + ',destination: ' + item2;
                            jsonfile.writeFile(file, data, { flag: 'a' }, function (err) {
                                console.error(err)
                            })
                        } else {
                            var matn = { "index": null, "distance": "0 m", "distanceValue": 0, "duration": "0 min", "durationValue": 0, "origin": "0", "destination": "0", "mode": "driving", "units": "metric", "language": "0", "avoid": null, "sensor": false, "string": 'Calculated for: origin: ' + item1 + ',destination: ' + item2 }
                            jsonfile.writeFile(file, matn, { flag: 'a' }, function (err) {
                                console.error(err)
                            })
                        }
                        console.log('Calculated for: origin: ' + item1 + ',destination: ' + item2);
                        next();
                    });
            }, 3000 + (Math.floor((Math.random() * 5) + 1)));


        }, function () {
            console.log('Finished Second Point!');
            next();
        });
    }, function () {
        console.log('Finished First Point!');
    });

}


getDistance(darr);