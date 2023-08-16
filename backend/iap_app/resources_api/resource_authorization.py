from flask import jsonify
from flask import request
from flask import Blueprint
from flask import make_response
import requests
import json
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

from iap_app import db
from iap_app.models.tbl_current_user import CurrentUser


blueprint_api_authorization_employee = Blueprint(
    "api_authorization_employee", __name__, url_prefix=""
)


@blueprint_api_authorization_employee.route(
    "/api/v1/login_employee/token", methods=["POST"]
)
def create_token():
    id_received = request.json.get("number_id_employee", None)
    password_received = request.json.get("employee_password", None)

    query_logged_employee = CurrentUser.query.filter(
        CurrentUser.number_id_employee == id_received
    ).first()
    
    if (
        query_logged_employee == None
        or query_logged_employee.is_active_employee == False
    ):
        if query_logged_employee == None:
            return make_response(jsonify({"msg": "Usuario no encontrado!!!"}), 401)
        else:
            return make_response(
                jsonify({"msg": "Usuario no esta activo, por favor valide con RRHH"}),
                400,
            )

    if check_password_hash(query_logged_employee.employee_password, password_received):
        access_token = create_access_token(identity=id_received)
        return make_response(
            jsonify(
                {
                    "current_user": {
                        "ccn_employee": query_logged_employee.ccn_employee,
                        "token": access_token,
                        "full_name_employee": query_logged_employee.full_name_employee,
                        "informed_consent_law_1581": query_logged_employee.informed_consent_law_1581,
                        "area": query_logged_employee.area,
                        "role": query_logged_employee.role,
                        "ccn_role": query_logged_employee.ccn_role,
                        "process": query_logged_employee.process,
                        "is_active_employee": query_logged_employee.is_active_employee,
                    },
                }
            )
        )
    else:
        return make_response(jsonify({"msg": "Contraseña Invalida"}), 400)


@blueprint_api_authorization_employee.route("/api/v1/create_new_user", methods=["POST"])
def post_new_current_user():
    data = request.get_json()

    new_current_user = CurrentUser(
        ccn_employee=data["ccn_employee"],
        number_id_employee=data["number_id_employee"],
        full_name_employee=data["full_name_employee"],
        informed_consent_law_1581=data["informed_consent_law_1581"],
        employee_password=generate_password_hash(data["employee_password"]),
    )
    full_name_employee = data["full_name_employee"]
    db.session.add(new_current_user)
    db.session.commit()

    return make_response(
        jsonify(
            {
                "Employees": f"The credentials saved succsesfully for {full_name_employee}",
                "msg": "The employee has been add succesfully",
                "Success": "true",
            }
        ),
        201,
    )


@jwt_required
@blueprint_api_authorization_employee.route(
    "/api/v1/employee/update_credentials/<int:ccn_employee>", methods=["PUT"]
)
def put_employee_credentials(ccn_employee):
    data = request.get_json()
    query_employee = CurrentUser.query.filter(CurrentUser.ccn_employee==ccn_employee).first()
    print(query_employee)
    query_employee = CurrentUser.query.filter_by(ccn_employee=ccn_employee).first()
    print(query_employee)
    query_employee.number_id_employee = data["number_id_employee"]
    query_employee.full_name_employee = data["full_name_employee"]
    if data["employee_password"] == "not_change":
        print("No la cambio")
    else:
        query_employee.employee_password = generate_password_hash(
            data["employee_password"]
        )
    db.session.commit()

    return make_response(
        jsonify(
            {
                "Employee Updated": {
                    "full_name_employee": query_employee.full_name_employee,
                }
            }
        ),
        200,
    )


@blueprint_api_authorization_employee.route(
    "/api/v1/role_assignment/<int:ccn_employee>", methods=["PUT"]
)
def put_role_assignment(ccn_employee):
    data = request.get_json()
    ccn_role = data["ccn_role"]

    url_role = f"https://hhrr.plena-global.com/api/v1/role/{ccn_role}"
    response = requests.get(url_role)
    if response.status_code == 200:
        response = response.json()

        query_role_assignment = CurrentUser.query.filter_by(
            ccn_employee=ccn_employee
        ).first()

        ccn_role = response["Role"]["ccn_role"]
        role = response["Role"]["role"]
        area = response["Role"]["area"]
        process = response["Role"]["process"]

        query_role_assignment.ccn_role = ccn_role
        query_role_assignment.role = role
        query_role_assignment.area = area
        query_role_assignment.process = process
        # query_role_assignment.Type_Relationship = data["Type_Relationship"]

        db.session.commit()
        return make_response(
            jsonify(
                {
                    "NewUser": f"The role {ccn_role} was assignment succesfully",
                    "msg": "The employee has been add succesfully",
                    "Success": "true",
                }
            ),
            201,
        )
    else:
        return make_response(
            jsonify(
                {
                    "NewUser": f"The role {ccn_role} wasn't assignment succesfully, please contact with IT Support  ",
                    "msg": "The employee has been add succesfully",
                    "Success": "true",
                }
            ),
            201,
        )


@jwt_required
@blueprint_api_authorization_employee.route(
    "/api/v1/employee/informed_consent_law_1581/<int:ccn_employee>", methods=["PUT"]
)
def put_informed_consent_law_1581(ccn_employee):
    data = request.get_json()
    query_employee = CurrentUser.query.filter_by(ccn_employee=ccn_employee).first()
    query_employee.informed_consent_law_1581 = data["informed_consent_law_1581"]
    db.session.commit()

    return make_response(
        jsonify(
            {
                "Employee Updated": {
                    "full_name_employee": query_employee.full_name_employee,
                    "informed_consent_law_1581": query_employee.informed_consent_law_1581,
                }
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_authorization_employee.route(
    "/api/v1/employee/is_active_employee/<int:ccn_employee>", methods=["PUT"]
)
def put_is_active_employee(ccn_employee):
    data = request.get_json()
    query_employee = CurrentUser.query.filter_by(ccn_employee=ccn_employee).first()
    query_employee.is_active_employee = data["is_active_employee"]
    db.session.commit()

    return make_response(
        jsonify(
            {
                "Employee Updated": {
                    "full_name_employee": query_employee.full_name_employee,
                    "is_active_employee": query_employee.is_active_employee,
                }
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_authorization_employee.route(
    "/api/v1/employee/password/<int:ccn_employee>", methods=["PUT"]
)
def put_password(ccn_employee):
    data = request.get_json()
    query_employee = CurrentUser.query.filter_by(ccn_employee=ccn_employee).first()

    if check_password_hash(query_employee.employee_password, data["last_password"]):
        query_employee.employee_password = generate_password_hash(data["new_password"])

        db.session.commit()

        return make_response(
            jsonify(
                {
                    "EmployeeUpdated": {
                        "full_name_employee": query_employee.full_name_employee,
                    }
                }
            ),
            200,
        )
    else:
        return make_response(
            jsonify(
                {
                    "EmployeeUpdatedError": {
                        "full_name_employee": query_employee.full_name_employee,
                    }
                }
            ),
            400,
        )


# this fuction retur each employee of maintenance area
@blueprint_api_authorization_employee.route(
    "/api/v1/maintenance_employee", methods=["GET"]
)
def get_maintenance_employee():
    current_user = CurrentUser.query.filter_by(area="MAINTENANCE").all()

    maintenance_employees = []
    for employee in current_user:
        maintenance_employees.append(
            {
                "ccn_employee": employee.ccn_employee,
                "full_name_employee": employee.full_name_employee,
                "area": employee.area,
            }
        )
    return make_response(
        jsonify(
            {
                "MaintenanceEmployees": maintenance_employees,
            }
        ),
        200,
    )
