# PPNK Rebuild README (project bible stage)

- [Decide on Database Structure](#decide-on-database-structure)
- [Gather Functionality Requirements](#gather-functionality-requirements)
  - [Database Functionality](#database-functionality)
  - [Build Functionality](#build-functionality)
- [Gather Stakeholder Input (fosters/other organizations)](#gather-stakeholder-input-fostersother-organizations)
- [Design User Experience](#design-user-experience)
- [Decide on Development Modules/Technology](#decide-on-development-modulestechnology)
- [Begin Development](#begin-development)

**Note - this is a living document meant to be updated as we go through the process of developing a new page/app for PPNK. It should be frequently updated as the processes are developed and turned into a proper README file.**

## Decide on Database Structure

Structure can be designated early on to help clarify requirements. Decide on what tables are required, what information we are gathering, and how each is documented.

Currently, I have the following tables in mind:

- Rescues
- Fosters
- Available Cats
- Available Dogs
- Applications

*Rescues* will contain data about which rescues PPNK receives animals from, including name, addresses, phone numbers, primary and secondary contacts. It may also include primary/secondary animal priority if their facility caters more to dogs or cats.

*Fosters* will contain data about the fosters who volunteer for PPNK. This would include name, foster address, phone number, email, rescue, PetSmart/adoption location, and what type of animals they foster.

*Available Cats* will contain data about cats up for adoption. This includes the foster name, cat name, availability, time on site, breed, gender, age, size, good with kids, house trained, adoption fee, description, and adoption location.

*Available Dogs* will contain data about dogs up for adoption. This includes the foster name, dog name, availability, time on site, breed, gender, age, size, good with kids, house trained, adoption fee, description, and adoption location.

*Applications* will contain information about users who are looking to adopt a pet. This information includes name, email, animal, street address, city, state, phone, rent/own, pet restrictions, landlord name, landlord contact, current pets, vaccination status, spay/neuter status, previous pets, if previous pets what became of those pets, children, children's age range, vet name, vet phone number, would give up pet for, inside/outside percentage, have you ever surrendered an animal, why, consider companion, authorization.

## Gather Functionality Requirements

What minimum functionality needs to be built to make this page work? What pages are needed, and what do they need to do? What API calls need to be built, and where do they need to point to?

How is information brought in? i.e. how does a foster add and manage the pets on the site, and what functionality needs to be built to enable that?

### Database Functionality

Information would travel from Rescues > Fosters > Available Animal (cats or dogs) to assist with populating the applications fields and therefore the table.

If built correctly, the contact information for the fosters/applicants could stay secret within the database and not have to be publicly exposed. Still, this information would need to be present so the information could be actively accessed when necessary.

### Build Functionality

## Gather Stakeholder Input (fosters/other organizations)

Work with Tanya and other fosters that work with PPNK to get their input and wishes for the site. Gather ideas.

## Foster Feed Back

**Jessica**: 
- The current process works, nothing is outright broken
  - Allow at least 4 photos
  - Drop downs are fine
  - Inputting should remain the same
  - Should add an adoption fee either field or default amount
- Site does need an update
  - Back up information on animals on things such as sexually mature (over 4 months of age), pregnant, not enough homes, irrisponsible owners, AG report that totals the number of animals euthanized for space alone.
  - A bio for the founder/owner and for the business as well as a brief history.
- Don't completely change if not for the better.

**Andrea**:
- Asking for more updated profiles/pictures for the people at Paradox
- Also for the paradox site, posting blackout dates for when they are unable to take ferals
- Provided examples of other successful rescues in Georgia:
  - [Angels Rescue](https://angelsrescue.org/)
  - [Fur Kids](https://furkids.org)
  - [Paws Atlanta](https://www.pawsatlanta.org)
- Add something that can show the number of animals helped
- Set up recurring donations
- Add features to promote fundraising and help special cases/expenses
- Link all social media to the webpage to get more traffic to those sites
- Every post on social media should include a website link
- Make sure application process works on mobile devices
- Application process should me more prominent on the main page
  - Links directly from an animal's posting to apply and a drop down
  - Have the option for applicants to detail what they want if they don't see a specific animal they want to choose
- Make sure the notification to the foster caring for the animal when an application comes in for that animal
- If user is renting, have fields that are required to post land lords information
- If user has pets, they must include vet info
- A question, specifically for cats, could be `Have you ever had a cat declawed? If so, why?`
- Track information on why someone has been denied and flag that information if the user tries to choose different fosters


**Nancy**:
- Overall, the current site is easy to use and follow.
- Could remove the area to list a second breed for animals
- Would like multiple ways of sorting
  - Alphabetically
  - By litter

## Design User Experience

Before beginning on full development, decisions should be made regarding the design of the site. What fonts will be included, what default font size will be used, what colors (hex codes preferred) will be included in the site, how will the layout be configured, etc.

Past the visual distinctions, decisions need to be made for how a user will navigate through the site and how that information is displayed. How will fosters use the site vs. applicants and so on.

## Decide on Development Modules/Technology

The following modules are currently planned for development:

- REACT for handling front-end application rendering/interactivity
- REACT-DOM to assist with rendering React components into the DOM.
- Redux to help ensure the application state is easy to test
- Express for handling API requests
- dotenv to pull global variables from the .env file during testing
- MySQL for database interactions
- Sequelize and MySQL2 for interactions with the MySQL database
- Multer for handling file uploads (images)
- Sharp for handling with image compression for easier storage
- bcrypt for hashing passwords for security purposes
- jsonwebtoken (JWT) for generating json web tokens to authenticate user logins
- express-validator for validating fields such a email and imposing requirements on fields like password or username
- crypto for generating tokens for when a user needs to reset their password
- nodemailer for emailing user tokens generated by crypto so they may unlock their account.

## Begin Development

**As the page is developed, a 'proof of concept' site will be uploaded to Netlify for preview. When that is established, a link will be included below.**

Once requirements are gathered, this section will include a development 'schedule' to include which steps are required and what limitations exist within the development cycle before moving on to the full build.

### Schedule

There is much to learnin the development of this project. The schedule will be difficult to set concretely but a general idea for the steps are below:

- Back-end work
  - Learn steps for setting up a MySQL database including how to write scripts to build the relational tables in a database and the controller routing requirements.
  - Learn api requests from sites like petfinder to enable posting to multiple locations
  - During the learning process, actively implement what is learned such that progress can be made.
  - Test the back end using Postman to make sure routing calls are all operating as expected
- Front-end work
  - Wireframe UX/UI for the front end
  - Build unit tests to define the functionality the front-end should include
  - Using containers, block out where elements should land
  - Develop functionality to meet testing requirements
  


This app will follow an MVC (Model-View-Controller) setup. Briefly, this means the app will be divided into three directories. The **Model** directory will contain the scripts to build the database tables with MySQL. The **View** directory will contain the files that dictate what is displayed within the app, including basic functionality. And the **Controller** directory houses the files that act as an intermediary between the model and the view, enabling communication between the layers and increasing functionality in the application.
