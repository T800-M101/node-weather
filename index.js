const { readInput, pause, mainMenu, listPlaces } = require("./helpers/inquirer");
const Lookups = require("./models/lookups");

const main = async() => {
    let  opt = '';

    do {
        opt = await mainMenu();
        const lookups = new Lookups();
 
        switch ( opt ) {
            case 1:
            const place = await readInput('place to look for? ');
            const places = await lookups.city(place);
            const id = await listPlaces(places);

            if ( id === '0') continue;

            const placeFound = places.find( place => place.id === id);

            lookups.history(placeFound.name);

            const weather = await lookups.weatherByPlace(placeFound.lat, placeFound.lng);
            
            console.log('\n ***** City Info: ***** \n'.green);
            console.log('City: '.green + `${placeFound.name}`);
            console.log('Lat: '.green + `${placeFound.lat}`);
            console.log('Lng: '.green + `${placeFound.lng}`);
            console.log('Temperature: '.green +  `${weather.temp}`);
            console.log('Min: '.green +  `${weather.min}`);
            console.log('Max: '.green +  `${weather.max}`);
            console.log('Description: '.green + `${weather.desc}`);
            
    
            break;

            case 2:
                lookups.capitalizeHistory.forEach((place, i) => {
                    const index = `${ i+1}`.green;
                    console.log(`${index} ${place} `)
                });

                break;
        }

        if ( opt !== 0) await pause();

    } while ( opt !== 0 )
}


main();

