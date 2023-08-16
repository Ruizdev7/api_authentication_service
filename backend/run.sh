#bin/bash

source ../.venv/bin/activate
export FLASK_APP=iap_app
export FLASK_DEBUG=true
flask run
