## How to run:
1. run `yarn` in the *fullStackRecipeManager* directory
2. run `npx prisma generate` in the *backend* directory
3. run `yarn dev` in the *fullStackRecipeManager* directory

## DESCRIPTION
Create an interactive Recipe Manager application using React for the frontend and Node.JS for
the backend. This exercise will test your skills in building a full stack web application which
closely resembles the work at \[redacted\].
## ACCEPTANCE CRITERIA
1. Implement an intuitive user interface for managing recipes.
2. Users (no authentication required) should be able to:
a. Add new recipes with titles, instructions and ingredients.
b. Edit existing recipes.
c. Delete recipes.
d. View a list of created recipes.
3. Provide a search function to look up recipes by their title.
4. Provide a filter function to view recipes by ingredients.
## TECHNICAL REQUIREMENTS
1. Use Material UI (latest) to build the user interface.
2. Use a database (e.g. SQLite, PostgreSQL) for recipe storage.
3. Use Git for version control.
4. The backend should expose the following REST endpoints:
a. POST /api/recipes/ to create a new recipe.
b. GET /api/recipes/ to view a brief list of recipes (without complex structures).
c. GET /api/recipes/:id to view a single recipe, including all ingredients.
d. PUT /api/recipes/:id to update an existing recipe.
e. DELETE /api/recipe/:id to delete an existing recipe.
5. Create at least one backend and one frontend unit test file.
## TECHNICAL NOTES
- Any backend framework (e.g. Express) is allowed.
- Any frontend setup tool (create-react-app, Vite) is allowed.
- Theming material-ui is not required, but encouraged.
## SUBMISSION
- Please submit your code as a GitHub repository containing the codebase.
- Include clear instructions on how to run both the frontend and backend parts of the
application.
- Ensure that the code is well structured, commented and follows best practices.
