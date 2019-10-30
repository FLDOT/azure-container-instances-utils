require('dotenv').config();
const azureContainerInstanceUtils = require('./index');

const test = async () => {
    const containerGroupName = process.env.CONTAINTER_GROUP_NAME;
    const utilities = azureContainerInstanceUtils();
    try {
        let containerDetails = await utilities.getProperties(containerGroupName);
        console.log(containerDetails);

        await utilities.stop(containerGroupName);
        containerDetails = await utilities.getProperties(containerGroupName);
        console.log(containerDetails);

        await utilities.start(containerGroupName);
        containerDetails = await utilities.getProperties(containerGroupName);
        console.log(containerDetails);
    }
    catch (error) {
        console.log(error);
    }
}

test();