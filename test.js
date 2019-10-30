require('dotenv').config();
const getContainerInstanceUtil = require('./index');

const containerGroupName = process.env.CONTAINTER_GROUP_NAME;
const utility = getContainerInstanceUtil();

const testCase1 = async () => {
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

const testCase2 = async () => {
    try {
        const results = await utility.stopAndStart(containerGroupName, 100);
        const { originalProperties, postRestartProperties } = results;
        logInstanceDetails(originalProperties);
        console.log("=========================================================================")
        logInstanceDetails(postRestartProperties);
    }
    catch (error) {
        console.log(error);
    }
}

const logInstanceDetails = (containerDetails) => {
    console.log(JSON.stringify(containerDetails, null, 3));
}

testCase2();