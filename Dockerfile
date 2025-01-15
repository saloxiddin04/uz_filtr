FROM node:18.20-bookworm-slim
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Set NODE_OPTIONS environment variable to suppress deprecation warnings
ENV NODE_OPTIONS="--no-deprecation"

# Install application dependencies
RUN npm install -- force

# Copy the rest of your application code to the container
COPY . .

# Expose the port your React application listens on
EXPOSE 3000

# Define the command to start your React application
CMD ["npm", "start"]