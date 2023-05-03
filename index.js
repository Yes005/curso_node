require('dotenv').config()

const { inquirerMenu, pausa, leerInput, ListarLugares } = require('./helpers/inquirer.js');
const Busquedas = require('./models/busqueda.js');

const main = async () => {
    
    const busquedas = new Busquedas();
    let opt;

    do {
        
        opt = await inquirerMenu();

        switch( opt ){
            case 1:
                const lugar = await leerInput('Ciudad: ');

                const lugares = await busquedas.ciudad( lugar );
                
                const id = await ListarLugares(lugares);
                const lugarSel = lugares.find( l => l.id === id)

                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng);
                console.log(clima);

                console.log('\nInformacion de la ciudad\.'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng: ', lugarSel.lng);
                console.log('Temperatura: ');
                console.log('Minima: ');
                console.log('Maxima: ');
                
            break;
        }

        await pausa();
    } while ( opt !== 0);
}

main();