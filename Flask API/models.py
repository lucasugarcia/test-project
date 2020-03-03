class Employee:
    def __init__(self, name, address, phone_number, date, status, id=None):
        self.id = id
        self.name = name
        self.address = address
        self.phone_number = phone_number
        self.date = date
        self.status = status