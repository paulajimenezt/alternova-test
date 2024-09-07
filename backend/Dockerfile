# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json from the parent folder
COPY ../../package*.json ./

# Install dependencies from the parent folder
RUN npm install --legacy-peer-deps

# Copy the rest of the backend code to the container
COPY ./backend ./

# Build the TypeScript files
RUN npm run build

# Expose the port your server is running on (default: 3000)
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]