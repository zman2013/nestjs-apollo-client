const client = jest.genMockFromModule('@zman2013/ts-apollo-client')

let i = 0
async function getConfig(meta){

    console.log('meta', meta.serverUrl)

    if(meta.serverUrl === 'http://refresh'){
        if(i>5){
            throw new Error('error...')
        }
        return {
            "i": i++,
            "key1": "value1"
        }
    }

    return {"key1": "value1"}
}

client.getConfig = getConfig
client.Meta = function(serverUrl, appId, namespaceNames, clusterName, releaseKey, clientIp) {
        if (namespaceNames === void 0) { namespaceNames = ['application']; }
        if (clusterName === void 0) { clusterName = 'default'; }
        this.serverUrl = serverUrl;
        this.appId = appId;
        this.namespaceNames = namespaceNames;
        this.clusterName = clusterName;
        this.releaseKey = releaseKey;
        this.clientIp = clientIp;
    }

module.exports = client