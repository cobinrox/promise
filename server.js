/**
 * Created by name on 11/7/2018.
 */
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

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

const testSimpleSimple = function (call, callback) {
    console.log('Server: Simple Message Received = ', call.request); // Server: Simple Message Received = {id: 1}
    callback(null, call.request);
};

main = function () {
    server = new grpc.Server();
    server.addService(test_proto.Test.service, {
        testSimpleSimple: testSimpleSimple
    });

    server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("SERVER NOW RUNNING MAYBE");
}

main();