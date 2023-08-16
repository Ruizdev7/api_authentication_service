import os
from flask import Flask
from flask_cors import CORS
from flask_wtf import CSRFProtect
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_swagger_ui import get_swaggerui_blueprint


db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()

# SWAGGER_URL = "/api/docs"  # URL for exposing Swagger UI (without trailing '/')
# API_URL = "http://petstore.swagger.io/v2/swagger.json"  # Our API url (can of course be a local resource)


SWAGGER_URL = "/swagger"
API_URL = "http://petstore.swagger.io/v2/swagger.json"
SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config={"app_name": "iap_app"}
)

# SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
#    SWAGGER_URL, API_URL, config={"app_name": "iap_app"}
# )


def create_app(test_config=None):
    app = Flask(
        __name__,
        instance_relative_config=True,
        static_folder="../dist",
        static_url_path="",
    )
    app.config.from_object("config.DevelopmentConfig")
    app.config["JWT_SECRET_KEY"] = "super-secret"
    db.init_app(app)
    jwt = JWTManager(app)
    migrate = Migrate(app, db)
    migrate.init_app(app, db)
    csfr = CSRFProtect(app)
    cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

    from iap_app.models import (
        tbl_current_user,
    )

    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping("test_config")
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # AQUI SE REGISTRAN LOS BLUEPRINTS RELACIONADOS A LOS RECURSOS DE LA API
    from iap_app.resources_api.resource_authorization import (
        blueprint_api_authorization_employee,
    )

    app.register_blueprint(blueprint_api_authorization_employee, url_prefix="")
    csfr.exempt(blueprint_api_authorization_employee)

    app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix=SWAGGER_URL)

    return app
