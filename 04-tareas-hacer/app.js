const { inquirerMenu } = require('./helpers/inquirer');

require('colors');
console.clear();

const main = async () => {
    let opt = '';
    do {
        opt = await inquirerMenu();
        console.log({ opt });
        await pausa();
    } while (opt !== '0');

    // pausa();
};

main()

