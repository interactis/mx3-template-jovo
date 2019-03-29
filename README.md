# mx3-template-jovo

## NOTE

This template has been made for Google Actions. Alexa support is also prepared but not tested. Feel free to elaborate.

## SETUP

### AWS

Some data will be stored in a AWS Dynamo DB. Please follow these steps to set it up:

1. Create an Amazon AWS account: [https://aws.amazon.com/]
2. Login to your AWS console: [https://console.aws.amazon.com/]
3. Create a new Dynamo DB: `Services` => `DynamoDB` => `Create Table`, name the table `mx3-data-dev`.
4. Get the AWS access keys like so: https://datapath.io/resources/blog/how-to-get-your-aws-access-key-and-secret-access-key/

### Jovo framework

Setup Jovo: [https://www.jovo.tech/docs/installation]
 
### Google Action

1. Clone this repository to your local machine
2. Go to the app directory and run `npm install`
3. Go to the directory `/app`. Copy `config-example.js` and rename it to `config.js`
4. Set the params in `config.js`. Use the AWS access keys you got above (see above: `AWS`, point #4)
5. Go back to the root directory of the app and use the command `jovo build`
6. Zip the directory `platforms/googleAction`
7. Go to [https://console.dialogflow.com/] and login or create an account
8. Create a new agent, name it `mx3`, select `English` as default language and `Create a new Google project`
9. Go to `Settings` (gear wheel icon), select the tab `Export and Import`
10. Use `RESTORE FROM ZIP` to upload the ZIP file that was generated in step 5.
11. You might need to enable the Fulfillmet. Click `Fulfillment` in the left side menu und enable `Webhook`. Add the webhook URL you will find in `platforms/googleAction/dialogflow/agent.json`
12. Select `Integrations` in the side menu and click on `Google Assistant`, click on `Test` on the bottom of the overlay. This will create a new Actions on Google Project.
13. Start the webhook on your local computer with the command `jovo run --watch`
14. Start testing on `https://console.actions.google.com/project/mx3/simulator/`
