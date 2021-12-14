					How to run Capstone-project
1. Go to https://www.mongodb.com/ and sign-in to create a database (Sign-up if you don't have an account)
2. Choose create a free Database and create a cluster.
3. Choose a username and password
4. Next, choose **"My Local Environment"** and **"Add My Current IP Address"**
5. Then there will be a cluster created (usually "Cluster0", and if you didn't rename the database, the database will be named "Project 0")
6. Click on **"Connect"** tab in Cluster0 and choose **"Connect your application"**
7. Copy the url in "Add your connection string into your application code" tab
8. Open `index.js` file in `Capstone-project` folder
9. Paste the url in `7` and change <password> with your password that you chose in `3` and 'myFirstDatabase' with the name of your project (Project 0)
10. Open terminal in your editor
11. Run `npm i`
12. Run `npm run dev`
13. Go to `http://localhost:4000` in any browser
