# DESCRIPTION

A simple card game made using React.js, Go Lang and Redis database.

## Running locally    

# Run the following commands in terminal on client directory
Install run:
```bash
npm i
```
To start run:
```bash
npm run dev
```
Your frontend should now be running on [localhost:5173](http://localhost:5173).

# Run the following commands in terminal on server directory
Install run:
```bash
go mod download
```
To start run
```bash
go run main.go
```
Your backend should now be running on [localhost:8000](http://localhost:8000).

# To start a redis server

Start your docker desktop
run the following command in terminal

```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```
Your backend should now be running on [localhost:6379](http://localhost:6379).

## Screenshots

### Page Signup

![App Screenshot](https://res.cloudinary.com/dopqu0rzp/image/upload/v1708427839/assign/Screenshot_2024-02-20_at_4.37.16_PM.png)

### Page Login

![App Screenshot](https://res.cloudinary.com/dopqu0rzp/image/upload/v1708428390/assign/Screenshot_2024-02-20_at_4.56.14_PM.png)

### Play

![App Screenshot](https://res.cloudinary.com/dopqu0rzp/image/upload/v1708427840/assign/Screenshot_2024-02-20_at_4.35.30_PM.png)

### Play win

![App Screenshot](https://res.cloudinary.com/dopqu0rzp/image/upload/v1708427839/assign/Screenshot_2024-02-20_at_4.36.15_PM.png)

### Play lose

![App Screenshot](https://res.cloudinary.com/dopqu0rzp/image/upload/v1708427839/assign/Screenshot_2024-02-20_at_4.35.40_PM.png)

### Leaderboard

![App Screenshot](https://res.cloudinary.com/dopqu0rzp/image/upload/v1708427839/assign/Screenshot_2024-02-20_at_4.36.25_PM.png)
