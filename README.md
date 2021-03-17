# LQS Chatroom Sample

This sample demonstrate how we can create a relatively complete chatroom solution using reactive scopes and functions. LQS let you develop your project locally and run a development cluster to simplify your work. Once you're happy with your components, you ask LQS to deploy these components to your staging or production cluster.

## Running the sample

You need to install `@liquidscale/tools` using the following command:

`npm i @liquidscale/tools`

You need Node.JS 14+ installed in your development environment.

Just clone this repo using `git clone --depth=1 https://github.com/liquidscale/sample-chatroom.git`. This will create the `sample-chatroom` folder containing all our components. Once in this folder, you start your development virtual cluster using `lqs dev`.

For this sample, the virtual cluster will open an HTTP gateway listening on port 9000. You can change the port by defining the PORT environment variable in your shell or just for this process like this : `PORT=8080 lqs dev` (on mac and linux)

LQS comes with a complete development app that will let you view the state of your cluster and perform many tasks like running test suites and perform manual tests.

## Deploying the sample

If you run a LQS operator in your Kubernetes cluster, you can just execute `lqs deploy`, which will use the current KUBE_CONFIG to locate your cluster and securely communicate with the operator (through port-forwarding).
