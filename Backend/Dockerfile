# Set base image (host OS)
FROM python:3.10-alpine

# By default, listen on port 5000
EXPOSE 5000/tcp

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any dependencies
RUN pip3 install -r requirements.txt

# Copy the content of the local src directory to the working directory
COPY app.py .
COPY JM_stor_taxonomic.py .
COPY JM_Store.py .
COPY Store_data_v2.xlsx .
COPY total_data_file.csv .


# Specify the command to run on container start
CMD [ "python", "./app.py" ]