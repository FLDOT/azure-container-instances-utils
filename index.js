const axios = require('axios');

const azureContainerInstanceUtils = (optionsConfiguration) => {
    let options = {
        tenantName: process.env.TENANT_NAME,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        subscriptionId: process.env.SUBSCRIPTION_ID,
        resourceGroupName: process.env.RESOURCE_GROUP_NAME,
    }

    if (optionsConfiguration) {
        options = {
            ...options,
            ...optionsConfiguration
        };
    }
    const authUrl = `https://login.microsoftonline.com/${options.tenantName}/oauth2/token`;
    const authBody = `grant_type=client_credentials&client_id=${options.clientId}&client_secret=${options.clientSecret}&resource=https%3A%2F%2Fmanagement.azure.com%2F`;
    const getStartUrl = (containerGroupName) => `https://management.azure.com/subscriptions/${options.subscriptionId}/resourceGroups/${options.resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/${containerGroupName}/stop?api-version=2018-10-01`;
    const getStopUrl = (containerGroupName) => `https://management.azure.com/subscriptions/${options.subscriptionId}/resourceGroups/${options.resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/${containerGroupName}/start?api-version=2018-10-01`;

    const getAccessToken = () => {
        return new Promise((resolve, reject) => {
            axios.post(authUrl, authBody)
                .then((authResponse) => {
                    resolve(authResponse.data.access_token);
                })
                .catch((error) => {
                    console.log('Error', error.message);
                    reject(error);
                })
        });
    }

    const getAxiosConfig = (accessToken) => {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + accessToken
            }
        };
    }

    const startOrStop = (url) => {
        return new Promise((resolve, reject) => {
            getAccessToken()
                .then((accessToken) => {
                    const config = getAxiosConfig(accessToken);
                    axios.post(url, null, config)
                        .then((response) => {
                            if (response.status === 204) {
                                resolve();
                            }
                            else {
                                reject(`Received Status Code: ${response.status} while trying to start or stop container`);
                            }
                        })
                        .catch((error) => {
                            console.log('Error', error.message);
                            reject(error);
                        })
                })
                .catch((error) => {
                    console.log('Error', error.message);
                    reject(error);
                });
        });
    }

    const stop = (containerGroupName) => {
        const url = getStopUrl(containerGroupName);
        return startOrStop(url);
    }

    const start = (containerGroupName) => {
        const url = getStartUrl(containerGroupName);
        return startOrStop(url);
    }

    const getProperties = (containerGroupName) => {
        const url = `https://management.azure.com/subscriptions/${options.subscriptionId}/resourceGroups/${options.resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/${containerGroupName}?api-version=2018-10-01`;

        return new Promise((resolve, reject) => {
            getAccessToken()
                .then((accessToken) => {
                    const config = getAxiosConfig(accessToken);
                    axios.get(url, config)
                        .then((response) => {
                            if (response.status === 200) {
                                resolve(response.data);
                            }
                            else {
                                reject(`Received Status Code: ${response.status} while trying to get container group information for: ${containerGroupName}`);
                            }
                        })
                        .catch((error) => {
                            console.log('Error', error.message);
                            reject(error);
                        })
                })
                .catch((error) => {
                    console.log('Error', error.message);
                    reject(error);
                });
        });
    }

    return {
        stop,
        start,
        getProperties
    }
}

module.exports = azureContainerInstanceUtils;