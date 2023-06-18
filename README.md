### Live Link: [digital-cow-hut](https://digital-cow-hut-backend-six.vercel.app/)

### Application Routes:

#### User

- api/v1/users/signup (POST)
- api/v1/users (GET)
- api/v1/users/648f1f162394a71f82b7fb59 (Single GET) Include an id that is saved in your database
- api/v1/users/648f1f162394a71f82b7fb59(PATCH)
- api/v1/users/648f1f162394a71f82b7fb59(DELETE) Include an id that is saved in your database

#### Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH)
- api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

### Pagination and Filtering routes of Cows (query params are case insensitive)

- api/v1/cows?page=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?SortBy=price&SortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

#### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
- api/v1/orders/648f20d2cf3746f1ec2a9437 (GET) Include an id that is saved in your database
