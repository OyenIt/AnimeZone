FROM python:3.11.1
ENV PYTHONUNBUFERRED 1
WORKDIR ../AnimeZone
COPY requirements.txt requirements.txt
RUN pip3 install requirements.txt
COPY  . .