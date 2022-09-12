# Purview

# Setup

## 1: MongoDB cluster Setup

### A: Configure Atlas Environment

  - Log-on to Atlas account. https://account.mongodb.com/account/login
  
  - In the project's Security tab, choose to add a new user called main_user, for this user select Add Default Privileges and in the Default Privileges section add the roles readWriteAnyDatabase.
  - Create a M10 Cluster in a cloud provider region of your choice with default settings. Make sure to choose Mongodb version 6.0. Capturing Change events on create and update of collection is introduced as part of 6.0 version
  - In the Security tab, add a new IP Whitelist for your laptop's current IP address

### B: Create a Azure Purview Account

  - You can follow the steps provided in Microsoft Link -  https://docs.microsoft.com/en-us/azure/purview/create-catalog-portal
  
### C: Create a app service in Azure

  - You can follow the steps under the section "Create Azure resources" provided in Microsoft Link - https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-azure-portal#create-azure-resources

### D: Create a Purview collection in Azure Portal

  - You can follow the steps provided in Microsoft Link - https://docs.microsoft.com/en-us/azure/purview/quickstart-create-collection

### E: Add MongoDB as a source in Purview

- You can follow the steps provided in Microsoft Link - https://docs.microsoft.com/en-us/azure/purview/register-scan-mongodb

### F: Connect your local app to Azure

  - Download the code and open the code in Visual Studio.
  - In mongo.connect() add the connection string of the your Atlas cluster 6.0+.
  - Replace the database you want to watch in client.db("Company"); 
  -  Go to Extensions on the left menu and type "MongoDB" and install the extension for MongoDB.
  - Go to Extensions on the left menu and type "Azure"
  - Install these extensions for 
    - Azure Account
    - Azure Tools
    - Azure App Service
  - Once the extensions are intsalled you should see a Azure icon on the left menu.Click on that and sign in to Azure account. After Signing in, it should look like this.
   <img width="373" alt="Screenshot 2022-09-12 at 3 04 15 PM" src="https://user-images.githubusercontent.com/101181433/189621346-c3d9fef8-7fb4-4235-a5da-6e39bf2624a6.png">


    
# Execution

  - Add a collection to the database you are watching. Hit the localhost url : http://localhost:8080/ and you should see the message 'MongoDB ChangeStream for Purview' with current timestamp. This collection should be created in the Purview root collection in the 'Microsoft Purview governance portal'.
  - Delete a collection to the database you are watching. Hit the localhost url : http://localhost:8080/ and you should see the message 'MongoDB ChangeStream for Purview' with current timestamp. This collection should be dropped in the Purview root collection in the 'Microsoft Purview governance portal'.

    
    
    
  


  

  
