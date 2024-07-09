const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const todosProto = grpc.loadPackageDefinition(packageDef);
const todo = todosProto.TodoService;

const client = new todo("0.0.0.0:50051", grpc.credentials.createInsecure());

client.listTodos({}, (err, response) => {
  if (!err) {
    console.log("Received from server: ", response.todos);
    client.createTodo(
      {
        id: 4,
        title: "Learn Typescript",
        content: "Learn Typescript and create a sample project",
      },
      (err, response) => {
        if (!err) {
          console.log("Received from server: ", response);
        } else {
          console.error(err);
        }
      }
    );
  } else {
    console.error(err);
  }
});
