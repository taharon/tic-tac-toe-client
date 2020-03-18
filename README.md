# Tal's Tic-Tac-Toe

## Tech
JavaScript
jQuery
AJAX
Git
Github
Grunt
Bootstrap
Sass
HTML
CSS
Visual Studio Code (to develop)

## Wireframes
I began with mockups of both the regular tic-tac-toe client as well as the super tic-tac-toe client. I knew that I would need login and signup buttons, a landing page for the user where they can start a new game, and the ability to log out and change password.

![Wireframe for regular tic-tac-toe.][reg_wireframe]

 I later added the ability to switch to a variant of tic-tac-toe known as super tic-tac-toe, which is played with a 3x3 grid of tic-tac-toe games. I knew I would need some initial instructions as well as the game boards and the ability to switch back to regular tic-tac-toe. I also wanted to be able to zoom in on either the current game board or the super game board, and then return to the game.

 ![Wireframe for super tic-tac-toe.][super_wireframe]

## User Stories
I created a basic set of user stories for the bare minimum a user should be able to do in order to play tic-tac-toe with my app:
As an unregistered user, I want to sign up
As a registered user, I want to log in
As a registered user, I want to change my PW
As a registered user, I want to log out
As a logged in user, I want to start a new game
As a playing in user, I want to make a play by clicking a box and seeing an X/O show up
As a playing user, I want to know when someone won or drew

## Development
In order to begin the project, I broke down the files I would need to create, and their respective goals.
First, I would need the HTML with the nav bar and buttons, and a series of boxes a user could click on. The boxes needed to be initially hidden but show up later.
For user authentication, I needed a file to handle UI changes, a file to handle the API, and a file with responses to the event handlers tied to the login, logout, change password, and sign up buttons.
For the game board, I needed the similar files: UI changes, API requests, event handlers, and an additional file to contain game logic. These files would collectively handle starting a new game, clicking on any squares, and determining if a player won or drew.
The organization of the super tic-tac-toe files were nearly identical to the regular tic-tac-toe files, and included many similar functions.

I ran into numerous problems during this development, not the least of which was unfamiliarity with bootstrap and CSS/HTML in general. The creation of my super tic-tac-toe grid hit many speed bumps as I continued to create a large mess instead of the organized set of boxes as I was hoping for.
Because I was opening so many nested divs to create the boxes, I quickly ran into an error cause by a combination of too many open divs and an extra row div. While re-organizing my indentation in an effort to clean up my code and find the root cause of the problem, I noticed the existence of the extra row and divs, and upon deleting them found that my first major visual bug was fixed. My creation of the super tic-tac-toe grid itself followed a similar pattern with the original code rendering nothing like what I wanted. When I realized my error was likely due to misuse of nested rows in bootstrap, I checked the documentation on how to properly nest rows and was able to fix this as well.

I also repeatedly disabled functionality on button press due to extra or leftover event handler calls. In general, I tracked these down by commenting out the intervening functions line by line until the offending bits of code were rooted out and fixed.

## Up Next
~~Change CSS to make it look nicer~~
~~Create super tic-tac-toe board~~
~~Add how to play for super tic-tac-toe~~  
Add multiplayer capabilities
Allow users to load unfinished games
Add game logic for super tic-tac-toe
Add better instructions for how to play super tic-tac-toe

[reg-wireframe]: https://i.imgur.com/1aLlS1L.jpg
[super-wireframe]: https://i.imgur.com/JtbGGin.jpg