# Inventory-Management-System
Inventory Management System

- Application has database in postgres to store information about items and orders.
- Back-end server in Node.js that connects to database.
- Front-end client can be used to visualize inventory and orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.  

### Prerequisites

- Node.js - https://nodejs.org/en/download/
- PostgreSQL - https://www.postgresql.org/download/
- Dojo - https://dojotoolkit.org/download/

### Installing

Setup a postgreSQL database and add sample data to tables.  
A sample database snapshot is added in postgres directory of this repository which can be loaded into the database (name:ims) with:

```
psql -U postgres -h localhost ims < ims_snapshot.sql
```

Install node dependencies by running:  

```
npm install -d
```

Run server by command:

```
npm start
```

After successful startup, console will display:

```
API running on localhost:3000
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
