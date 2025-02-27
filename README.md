# SE2 Koozlet Project #

## Objectives ##
- Build a compete, database-driven app from scratch
- Add security to an application
- Persist, manipulate, and retrieve unique data tied to a user or quiz

## Description ##
We are building an app that allows users to develop and take quizzes. This project will allow a user to log in and make changes to their own quizzes along with creating study guides to better prepare for a course. There will be ways to search through quizzes based on authors or the various class and or subject. A user will have a log of quizzes they have taken that keep track of the scores that they have taken in the past.

## Installing ##

To install the dependencies needed to run this app, run:

```
npm install -g jest
npm install
npm link jest
```

## Authors ##
Anunn711 as the Project Owner
MichaelR6198 as the Scrum Master
ZacharyWilson7 as a Developer
JuiceCreates as a Developer

## Dependencies ##
Prisma
Express
Node
Bcrypt
Cookie-Parser
Cors
Dotenv
Express-Flash
Express-Handlebars
Express-Session
HBS
Morgan (Maybe)

## Database

Ensure that you have prisma installed globally by running

```
npm install -g prisma
```

To create the database files, you need to run a migration. You can enter this command:
```
npx prisma migrate dev --name init
```

To seed the initial data using the provided seed file, run this command:
```
node prisma/seed.js
```

To reset the database:
```
npx prisma migrate reset
```
This command will reset the database and erase all previous data.