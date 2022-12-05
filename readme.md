# Daft Task

A testcafe automation setup to automate keyword searching in daft.ie

Although only one test has been developed for now, the page objects model allows for multiple tests with just a few modifications

## Requirements
- Node
- npm or yarn
- Chrome

## Run
Use `npm install --force` or `yarn install` to install all the packages and then `node runner` to run the automation test.

Another command that can be used to run the test is `npx testcafe chrome ./tests/*.ts`, but this will not produce the reports nor take any screenshots.

The results for the test run would be in the repots directory. Screenshots are captured on test run failuer.

## Page objects
For this task, daft.ie has been divided into 4 page objects, namely HomePage, PropertyPage, ResultsPage and FilterModal.

All of these classes have the relevent elements and funtions which can be performed on the respective pages.

## Assertions
Assertions are performed on the results by first checking the existence of search heading, then extracting the number from it and confirming it being greater than zero. This check is done both for the location search and when the keyword filter is applied. Relevent files : `FilterModal.ts` and `HomePage.ts`.

Assertion for the keyword is done on the URL by matching `terms=keyword` and by looking for the keyword in a property's description and list of features. Relevent files : `FilterModal.ts` and `keyword-search.ts`.

Try failing the test by changing the value of searchTerm or keyword variable in the `keyword-search.ts`





