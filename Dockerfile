FROM node:18

# ✅ Install required system tools
RUN apt-get update && \
    apt-get install -y qpdf poppler-utils imagemagick && \
    apt-get clean

# ✅ Set working directory
WORKDIR /app

# ✅ Copy all your project files into the container
COPY . .

# ✅ Install Node dependencies
RUN npm install

# ✅ Expose your app’s port
EXPOSE 5000

# ✅ Start the backend server
CMD ["npm", "start"]
