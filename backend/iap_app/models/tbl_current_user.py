from datetime import datetime

from iap_app import db


class CurrentUser(db.Model):
    __tablename__ = "tbl_employee"
    ccn_employee = db.Column(db.Integer, primary_key=True)
    number_id_employee = db.Column(db.BigInteger, nullable=False)
    full_name_employee = db.Column(db.String(200), nullable=False)
    ccn_role = db.Column(db.BigInteger, nullable=True)
    role = db.Column(db.String(10), nullable=True)
    informed_consent_law_1581 = db.Column(db.String(10), nullable=False)
    area = db.Column(db.String(10), nullable=True)
    process = db.Column(db.String(10), nullable=True)
    Type_Relationship = db.Column(db.String(10), nullable=True)
    employee_password = db.Column(db.String(500), nullable=False)
    is_active_employee = db.Column(db.Boolean, nullable=True)

    def __init__(
        self,
        ccn_employee,
        number_id_employee,
        full_name_employee,
        informed_consent_law_1581,
        employee_password,
    ):
        self.ccn_employee = ccn_employee
        self.number_id_employee = number_id_employee
        self.full_name_employee = full_name_employee
        self.informed_consent_law_1581 = informed_consent_law_1581
        self.employee_password = employee_password
        self.is_active_employee = 1

    def choice_query():
        return CurrentUser.query

    def __repr__(self):
        return f"current_user: {self.full_name_employee}"
