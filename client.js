/**
 * Created by name on 11/7/2018.
 */
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const grpc_promise = require('grpc-promise');;

const packageDefinition = protoLoader.loadSync(
    __dirname + '/protobuf/test.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const test_proto = protoDescriptor.test;

function main() {
    const client = new test_proto.Test('localhost:50052', grpc.credentials.createInsecure());

    grpc_promise.promisifyAll(client);

    client.testSimpleSimple()
        .sendMessage({id: 1})
        .then(res => {
            console.log('Client: Simple Message Received = ', res) // Client: Simple Message Received = {id: 1}
        })
        .catch(err => console.error(err))
    ;
}

main();