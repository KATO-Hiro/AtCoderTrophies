# See:
# https://vercel.com/docs/runtimes#official-runtimes/python
FROM python:3.6

RUN mkdir /app
WORKDIR /app

RUN apt update && \
    apt install -y fish git

COPY requirements.txt ./
COPY devel-requirements.txt ./
RUN python -m pip install --upgrade pip
RUN pip3 install --no-cache-dir -r requirements.txt -r devel-requirements.txt

COPY . .
