require('dotenv').config();
const azureContainerUtilities = require('./index').default;

const test = async () => {
    const containerGroupName = process.env.CONTAINTER_GROUP_NAME;
    const utilities = azureContainerUtilities();
    try {
        let containerDetails = await utilities.getProperties(containerGroupName);
        console.log(containerDetails);

        await utilities.stop();
        containerDetails = await utilities.getProperties(containerGroupName);
        console.log(containerDetails);

        await utilities.start();
        containerDetails = await utilities.getProperties(containerGroupName);
        console.log(containerDetails);
    }
    catch (error) {
        console.log(error);
    }
}

test();