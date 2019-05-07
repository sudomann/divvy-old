FROM ubuntu:bionic-20190424

RUN apt-get update && apt-get install -y build-essential \
                                        curl \
                                        gdal-bin \
                                        binutils \
                                        libproj-dev \
                                        libpq-dev \
                                        python3.6-distutils \
                                        python3.6-dev

RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && python3.6 get-pip.py

COPY requirements.txt /

RUN python3.6 -m pip install -r requirements.txt

ADD django/ /divvy/

WORKDIR /divvy

EXPOSE 8080

CMD gunicorn -b :8080 divvy.wsgi