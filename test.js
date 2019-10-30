require('dotenv').config();
const getContainerInstanceUtil = require('./index');

const test = async () => {
    const containerGroupName = process.env.CONTAINTER_GROUP_NAME;
    const utility = getContainerInstanceUtil();
    try {
        let containerDetails = await utility.getProperties(containerGroupName);
        logInstanceDetails(containerDetails);

        await utility.stop(containerGroupName);
        containerDetails = await utilities.getProperties(containerGroupName);
        logInstanceDetails(containerDetails);

        await utility.start(containerGroupName);
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