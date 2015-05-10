# Set the base image to Ubuntu
FROM        ubuntu

# File Author / Maintainer
MAINTAINER Prashun Javeri


# Update the repository and install Redis Server
RUN apt-get update
RUN apt-get -y install wget build-essential

#Install some packages we need
RUN apt-get install -y curl python-software-properties python g++ make software-properties-common build-essential libssl-dev wget

# Install Node.js
RUN \
  cd /tmp && \
  wget http://nodejs.org/dist/node-latest.tar.gz && \
  tar xvzf node-latest.tar.gz && \
  rm -f node-latest.tar.gz && \
  cd node-v* && \
  ./configure && \
  CXX="g++ -Wno-unused-local-typedefs" make && \
  CXX="g++ -Wno-unused-local-typedefs" make install && \
  cd /tmp && \
  rm -rf /tmp/node-v* && \
  npm install -g npm && \
  printf '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["bash"]
