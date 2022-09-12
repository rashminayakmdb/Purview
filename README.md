# Purview

# Setup

## 1: MongoDB cluster Setup

### A: Configure Atlas Environment

  - Log-on to Atlas account. https://account.mongodb.com/account/login
  
  - In the project's Security tab, choose to add a new user called main_user, for this user select Add Default Privileges and in the Default Privileges section add the roles readWriteAnyDatabase.
  - Create a M10 Cluster in a cloud provider region of your choice with default settings. Make sure to choose Mongodb version 6.0. Capturing Change events on create and update of collection is introduced as part of 6.0 version
  - In the Security tab, add a new IP Whitelist for your laptop's current IP address

### B: Create a Azure Purview Account

  - You can follow the steps provided in Microsoft Link. https://docs.microsoft.com/en-us/azure/purview/create-catalog-portal
  
### C: Create a app service in Azure

  - Download the code and open the code in Visual Studio.
  - mongo.connect() add the connection string of the your Atlas cluster 6.0+.
  - Replace the database you want to watch in client.db("Company"); 
  - Go to Extensions on the left menu and type "Azure"
  - Install these extensions for 
    - Azure Account
    - Azure Tools
    - Azure App Service
    
 ### D: Create a app service in Azure
    
    
    
  


  

  
