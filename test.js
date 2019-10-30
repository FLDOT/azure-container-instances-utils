require('dotenv').config();
const azureContainerInstanceUtils = require('./index');

const test = async () => {
    const containerGroupName = process.env.CONTAINTER_GROUP_NAME;
    const utilities = azureContainerInstanceUtils();
    try {
        let containerDetails = await utilities.getProperties(containerGroupName);
        logInstanceDetails(containerDetails);

        await utilities.stop(containerGroupName);
        containerDetails = await utilities.getProperties(containerGroupName);
        logInstanceDetails(containerDetails);

        await utilities.start(containerGroupName);
        containerDetails = await utilities.getProperties(containerGroupName);
        logInstanceDetails(containerDetails);
    }
    catch (error) {
        console.log(error);
    }
}

const logInstanceDetails = (containerDetails) => {
    console.log(containerDetails);
    const containers = containerDetails.properties.containers;
    console.log(containers);
    containers.forEach(i => console.log(i.properties.instanceView));
}

test();