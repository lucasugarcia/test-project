class Employee:
    def __init__(self, name, adress, phone_number, date, status, id=None):
        self.id = id
        self.name = name
        self.adress = adress
        self.phone_number = phone_number
        self.date = date
        self.status = status