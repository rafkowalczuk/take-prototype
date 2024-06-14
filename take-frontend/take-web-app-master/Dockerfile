# Use an official Node.js image as the base
FROM node:22.2.0-alpine3.20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the React app
#RUN npm run build

# Specify the command to run when the container starts
CMD ["npm", "run", "start:watch"]
