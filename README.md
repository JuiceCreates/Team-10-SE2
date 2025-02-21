# Project 4 #

## Objectives ##
- Build a compete, database-driven Express app from scratch
- Add security to an application
- Persist, manipulate, and retrieve unique data tied to a user
- Make use of REST APIs from another website

## Scenario ##
Build an app that allows a user to search for their favorite TV shows and add them to a favorites list. The user will have to log into the app or create an account if they don't already have one. Once they log in, the user can search for a TV show and see results listed on a results page. Each show should have an "Add to favorites" button. Clicking this button should add the show to the user's show favorites list. The next time the user logs into your site, they should be able to view their favorites list and see their custom show list.

## Setup and Dependencies ##
- You should use [Prisma](https://www.npmjs.com/package/prisma) with sqlite to store the users and their associated favorites for this app.
- You should implement user login security on this app.
  - This should be tied to user records that you set up in the database.
    - Here is some [example code from our SE1 project](https://github.com/uwf-cop3813-fa2024/uwf-eats-server-example/tree/main) that you might find helpful.
  - You should use [bcrypt](https://www.npmjs.com/package/bcrypt) to encrypt user passwords.
  - You can implement this manually, or you may decide to use [passport-local](https://www.passportjs.org/packages/passport-local/).
- You should use [express-session](https://www.npmjs.com/package/express-session) and [express-flash](https://www.npmjs.com/package/express-flash) to handle sessions and flash messaging, respectively.
- You should use the [show search endpoint](https://www.tvmaze.com/api#show-search) of the TV Maze API to search for a show.
    - Make HTTPS requests using the [axios](https://www.npmjs.com/package/axios) plugin.

## Requirements ##
- There should be a login page: **"/login"**
  - The app should take their username and password, validate it, and then redirect the user to the "/" page.
  - The app should reject their login attempt if their credentials are not correct.
  - The login form should also have a "create an account" link that links to "/register".
  - You should use flash messaging to display error messages at the top of this screen.
- There should be an account creation page: **"/register"**
  - The "create an account" form should accept the user's email address and desired password (entered twice).
  - You should compare the two passwords and display an error message if they do not match.
  - If all data is present and correct, it should then create a new "User" in the database and save their info (remember to encrypt the password).
  - After creating the account, take the user back to a login page and prompt them to log in again.
  - You should use flash messaging to display messages at the top of this screen.
- There should be a home page: **"/"**
  - The home page should have a search bar and a search button at the top
  - The user's favorites should be listed below the search bar. If there are no favorites, display a nice message like "You don't have any favorites. Maybe you should add some!"
  - When a user searches in the search bar, they should be taken to a results page
  - If a user is not logged in, show them a login form (redirect them to "/login").
- There should be a results page: **"/results"**
  - The results page should display the results of a search for a particular show
  - This data should be obtained by calling the TV Maze API (see link above)
  - For each show, you should show the title, a summary, a photo, and provide a link to the show on the TV Maze website.
  - Each show should also have an "add to favorites" button next to it
      - Clicking on this button will trigger a favorite addition, then redirect them to the home page
  - If the show is already favorited, the button should say "remove from favorites"
    - Clicking on this button will trigger a favorite removal, then redirect them to the home page
  - You should use flash messaging to indicate that a favorite has been added or removed.
- There should be a favorites action: **your choice on how to implement this**
  - The add to favorites action should add a favorite entry into your database
  - You will have to create a Favorite model, etc. for this to be saved. Be sure to save the user's ID as well.
- There should be a remove action: **your choice on how to implement this**
  - The remove from favorites action should delete a favorite from your DB (or mark it inactive)
- There should be a logout page: **"/logout"**
  - This should log the user out of the app and display a flash message that they have been logged out.
  - They should not able to visit protected routes any longer.