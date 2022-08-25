import requests


def get_bank_detail(ifsc):
    url = "https://ifsc.razorpay.com/" + str(ifsc)
    data = requests.get(url).json()

    return data
