# mx3-template-jovo

## SETUP
 
### Google Action

1. Clone this repository to your local machine
2. Run `npm install`
3. Use command `jovo build`
4. Zip the directory `platforms/googleAction`
5. Go to [https://console.dialogflow.com/] and login or create an account
6. Create a new agent, name it `mx3`, select `English` as default language and `Create a new Google project`
7. Go to `Settings` (gear wheel icon), select the tab `Export and Import`
8. Use `RESTORE FROM ZIP` to upload the ZIP file that was generated in step 5.
9. You might need to enable the Fulfillmet. Click `Fulfillment` in the left side menu und enable `Webhook`. Add the webhook URL you will find in `platforms/googleAction/dialogflow/agent.json`
10. Select `Integrations` in the side menu and click on `Google Assistant`, click on `Test` on the bottom of the overlay. This will create a new Actions on Google Project.
11. Start the webhook on your local computer with the command `jovo run --watch`
12. Start testing on `https://console.actions.google.com/project/mx3/simulator/`
