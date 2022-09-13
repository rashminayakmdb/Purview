# Purview

# Requisites
 - MongoDB Atlas 6.0 cluster
 - Azure subscription
 - Visual Studio app installed, Go to [Download](https://code.visualstudio.com/download) to download the app.
 
# Setup

## 1: MongoDB cluster Setup

### A: Configure Atlas Environment

  - Log-on to Atlas account. [Login](https://account.mongodb.com/account/login)

  - Create a M10 Cluster in a cloud provider region of your choice with default settings. Make sure to choose Mongodb version 6.0. Capturing Change events on create and update of collection is introduced as part of 6.0 version
  - In the Security tab:
    - Select Network Access and add a new IP Whitelist for your laptop's current IP address.
    - Select Database Access, choose to add a new user, e.g. main_user,give a password of your choice. For Database User Privileges, from the built-in role dropdown choose "Read and write to any database" (make a note of the password you specify).
  - In the Atlas console, for the database cluster you deployed, click the Connect button, select Connect Your Application, and for the latest Node.js version copy the Connection String Only - make a note of this MongoDB URL address to be used in the next step

### B: Create a Azure Purview Account

  - You can follow the steps provided in Microsoft Link -  [Create Purview Account](https://docs.microsoft.com/en-us/azure/purview/create-catalog-portal)

### C: Create a Purview collection in Azure Portal

  - You can follow the steps provided in Microsoft Link - [Create Purview Collection](https://docs.microsoft.com/en-us/azure/purview/quickstart-create-collection)

### D: Add MongoDB as a source in Purview

- You can follow the steps provided in Microsoft Link - [Add MongoDB](https://docs.microsoft.com/en-us/azure/purview/register-scan-mongodb)

### E: Create a app service in Azure

  - You can follow the steps under the section "Create Azure resources" provided in Microsoft Link - [Create App Service](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-azure-portal#create-azure-resources)

### F: Create a service principal to get access to API

   - [Create Service Principal](https://docs.microsoft.com/en-us/azure/purview/create-service-principal-azure)

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

### G: Deploy your app to Azure
  - You should see your new app services created in the Azure portal in Visual Studio under your subscription-> app services
  - Right click on the app service, Click Deploy to Web App. Deployments should be done in few minutes.

    
# Execution

## Create a MongoDB collection:

  - Start the Azure app service.Click on browse to see that the app service is running. You should see the message 'MongoDB ChangeStream for Purview' with current timestamp.
  - Add a collection in the Atlas portal to the database you are watching. [Portal](https://account.mongodb.com/account/login)
  - Go to 'Microsoft Purview governance portal' in Azure. Click on Browse assets and click on the root collection. The MongoDB collection created should be listed here in Purview.

## Drop a MongoDB collection:

  -  Drop a collection in the Atlas portal to the database you are watching.
  - Go to  'Microsoft Purview governance portal' in Azure. Click on Browse assets and click on the root collection. The MongoDB collection dropped should be removed from the Purview.
 
    
    
    
  


  

  
