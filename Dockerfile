FROM ubuntu:bionic-20190424

RUN apt-get update && apt-get install -y curl=7.58.0-2ubuntu3.6 \
                                        gdal-bin \
                                        install binutils \
                                        libproj-dev \
                                        python3.6 \
                                        python3-distutils

RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && python3 get-pip.py

COPY requirements.txt /

RUN python3 -m pip install -r requirements.txt

ADD django/ /divvy/

WORKDIR /divvy

EXPOSE 8080

CMD gunicorn -b :8080 divvy.wsgi