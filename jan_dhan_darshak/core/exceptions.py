from rest_framework.exceptions import APIException, ValidationError, NotAuthenticated


class APIExceptionBadRequest(APIException):
    status_code = 400
    default_detail = "Bad Request"
    default_code = "bad_request"
