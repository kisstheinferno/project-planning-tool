# Getting Started

Before you can you run this project make sure you have the following.

## NestJS

### Install NestJS

1. Node.js and npm: Ensure you have Node.js (preferably a LTS version) and npm (Node Package Manager) installed on your system. You can download them from the official [Node.js website](https://nodejs.org/en).

2. Install NestJS globally:

```bash
npm install -g @nestjs/cli
```

### Run API

1. Create a .env file in the API directory and create the environment variable and set it to the desired port.
   
```env
LOCALHOST=3005
```

2. To run the API, go to the parent folder of the project, and run the following commands:

```bash
cd api
npm run start:dev
```

## React 

### Running React

Go to the parent folder of the project and run the followingn commands:

```bash
cd frontend
npm run start
```

## Postgres Database

### Environment Variables

Go to the .env file in the api directory and create the following variables and set to desired values to connect to database UI.

- DATABASE_HOST
- DATABASE_PORT
- DATABASE_USERNAME
- DATABASE_NAME
  
### Migrations

To generate a migration go to the API folder of the project and run the following command:

```bash
npm run migration:generate
```

This will create a migration file within the migrations directory inside the src folder. Now to run a migration run the following the command:

```bash
npm run migration:run
```
