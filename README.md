# Kasa Case Study with Cypress - Typescript - and Cucumber

This project has been created in order to assess the author's ability to work with live code.

 
<br/>

## Installation

 

Install the latest [Node](https://nodejs.org/en/).

 

Install [VSCode](https://code.visualstudio.com/Download) - or any IDE of your choice, and setup your environment.

Use the following commands in the repository folder to finish up your installation.
 
```
npm install
```

<br/>
 

## Usefull scripts

 

It should open up Cypress GUI (Should not be used that much)

```
npm run cypress
```

Script for running every test

```
npm run test:all
```
Script for running only E2E test cases

```
npm run test:e2e
```
Script for running only API test cases

```
npm run test:api
```

After you have run your test cases `./cypress/results` folder will be populated with the appropriate json reports.
With this script you can generate human readable HTML report in the `./mochawesome-report` folder
```
npm run report
```
<br/>
 

## Usage - Organizing tests

 

Put your feature files in `cypress/integration/`
Put your API tests in `cypress/integration/api-tests`

 

The .feature file will use steps definitions from a directory with the same name as your .feature file. The javascript files containing the step definitions can have other names if you want to break them into different concerns.

 

Assuming the feature file is in `cypress/integration/example.feature`, as proposed above, the preprocessor will read all the files inside `cypress/support/step_definitions/example.ts`, so:

<br/>

## Reusable step definitions

 

We also have a way to create reusable step definitions.

 

Example: `cypress/support/step_definitions/commonSteps.ts`