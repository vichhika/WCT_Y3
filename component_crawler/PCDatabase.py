import mysql.connector

class PCDatabase:

    def __init__(self,hostname,username,password,database_name):
        self.mydb = mysql.connector.connect(
            host=hostname,
            user=username,
            password=password,
            database=database_name
        )
        self.mycursor = self.mydb.cursor()