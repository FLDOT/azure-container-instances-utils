# @fdot/azure-container-instances-utils
Utilities for Azure Container Instances

## Example
``` javascript
const getContainerInstanceUtil = require('@fdot/azure-container-instances-utils');
const utility = getContainerInstanceUtil();
const containerGroupName = 'cont-tptmdb-preprod'

const properties = await utility.getProperties(containerGroupName);
console.log(properties);

await utility.stop(containerGroupName);
await utility.start(containerGroupName);
```

OR 

``` javascript
const getContainerInstanceUtil = require('@fdot/azure-container-instances-utils');
const utility = getContainerInstanceUtil();
const containerGroupName = 'cont-tptmdb-preprod'

const results = await utility.stopAndStart(containerGroupName, 100);
const { originalProperties, postRestartProperties } = results;

console.log(JSON.stringify(originalProperties, null, 3));
console.log(JSON.stringify(postRestartProperties, null, 3));
```

## Configuration
Default Options
``` javascript
let options = {
        tenantName: process.env.TENANT_NAME,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        subscriptionId: process.env.SUBSCRIPTION_ID,
        resourceGroupName: process.env.RESOURCE_GROUP_NAME,
    }
```

## Test
Create .env file in the root directory with the following settings:
```
TENANT_NAME=<Enter Tenant Name Here>
CLIENT_ID=<Add Client ID Here>
CLIENT_SECRET=<Add Client Secret Here>
SUBSCRIPTION_ID=<Add Subscription ID Here>
RESOURCE_GROUP_NAME=<Add Resource Group Name Here>
CONTAINER_GROUP_NAME=<Add Container Group Name Here>
```

see test.js and execute via:

> node test.js