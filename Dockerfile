# Build Image for D19SP1 demo app
FROM dyalog/dyalog

# Startup Parameters
ENV MAXWS=256M
ENV Port=8080
ENV RIDE_INIT="SERVE:*:4502"

# run as root while installing git
USER root
RUN apt-get update
RUN apt-get install -y git man
RUN apt-get clean 

# run application as dyalog
USER dyalog

RUN git clone https://github.com/the-carlisle-group/Rumba /app/Rumba
RUN git clone https://github.com/the-carlisle-group/DyalogDCL /app/DyalogDCL
RUN git clone https://github.com/the-carlisle-group/AWSTools /app/AWSTools
RUN git clone https://github.com/the-carlisle-group/D19SP1 /app/D19SP1

# Add config file and bootstrap ws (not part of the repo - see .gitignore)
ADD Assets/Runtime/acre14.0/acre.dws /home/dyalog/MyUCMDs/
ADD Assets/Runtime/acre14.0/acre.dyalog /home/dyalog/MyUCMDs/
ADD start.dyapp /app/