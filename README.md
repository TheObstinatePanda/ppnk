# PPNK Rebuild README (project bible stage)

- [Decide on Database Structure](#decide-on-database-structure)
- [Gather Functionality Requirements](#gather-functionality-requirements)
  - [Database Functionality](#database-functionality)
  - [Build Functionality](#build-functionality)
- [Gather Stakeholder Input (fosters/other organizations)](#gather-stakeholder-input-fostersother-organizations)
- [Design User Experience](#design-user-experience)
- [Decide on Development Modules/Technology](#decide-on-development-modulestechnology)
- [Begin Development](#begin-development)

**Note - this is a living document meant to be updated as we go through the process of developing a new page/app for PPNK. It should be frequently updated as the processes are developed and turned into a proper README file**

## Decide on Database Structure

Structure can be designated early on to help clarify requirements. Decide on what tables are required, what information we are gathering and how each is documented.

Currently, I have the following tables in mind:

- Rescues
- Fosters
- Available Cats
- Available Dogs
- Applications

*Rescues* will contain data about which rescues PPNK recieves animals from including name, addresses, phone numbers, primary and secondary contacts. May also include primary/secondary animal priority if their facility caters more to dogs or cats.

*Fosters* will contain data about the fosters who volunteer for PPNK. This would include name, foster address, phone number, email, rescue, petsmart/adoption location, and what type of animals they foster.

*Available Cats* will contain data about cats up for adoption. This includes the foster name, cat name, availability, time on site, breed, gender, age, size, good with kids, house trained, adoption fee, description, and adoption location.

*Available Dogs* will contain data about dogs up for adoption. This includes the foster name, dog name, availability, time on site, breed, gender, age, size, good with kids, house trained, adoption fee, description, and adoption location.

*Applications* will contain information about users who are looking to adopt a pet. This information includes name, email, animal, street address, city, state, phone, rent/own, pets restrictions, landlord name, landlord contact, current pets, vaccination status, spay/neuter status, previous pets, if previous pets what became of those pets, children, childrens age range, vet name, vet phone number, would give up pet for, inside/outside percentage, have you ever surrendered an animal, why, consider companion, authorization

## Gather Functionlity Requirements

What minimum functionality needs to be built to make this page work? What pages are needed and what is it they need to do? What API calls need to be built and where do they need to point to?

How is information brought in? i.e. how does a foster add and manage the pets on the site and what functionality needs to be built to enable that?

### Database functionality

Information would travel from Rescues > Fosters > Available Animal (cats or dogs) to assist with populating the applications fields and therefore the table.

If built correctly, the contact information for the fosters/applicants could stay secret within the database and not have to be publicly exposed. Still, this information would need to be present so the information could be actiuvely accessed when necessary.

## Gather Stakeholder Input (fosters/other organizations)

Work with Tanya and other fosters that work with PPNK to get their input and wishes for the site. Gather ideas

## Design User Experience

Before begining on full development, decisions should be made regarding the design of the site. What fonts will be included, what default font size will be used, what colors (hex codes preferred) will be included in the site, how will the layout be configured, etc.

Past the visual destinctions, decisions need to be made for how a user will nagivgate through the site and how that information is displayed. How will fosters use the site vs applicants and so on.

## Decide on Development Modules/Technology

The following modules are currently planned for development:

- REACT for handling front end application rendering/interactivity
- Express for handling API requests
- MySQL for database interactions
- Multer for handling file uploads (images)

## Begin development

**As the page is developed, a 'proof of concept' site will be uploaded to netlify for preview. When that is established, a link will be included below.**

Once requirements are gathered, this section will include a development 'schedule' to include which steps are required and what limitations exist within the development cycle before moving on to the full build.

This app will follow a MVC(Model-View-Controller) set up. Breifly, this means the app will be divided into 3 directories. The **Model** directory will contain the scripts to build the database tables with MySQL. The **View** directory will contain the files that dictate what is displayed within the app including basic functionality. And the **Controller** directory houses the files that act as an intemediary between the model and the view enabling communication between the layers and increasing functionality to the application.