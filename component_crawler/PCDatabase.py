import sys
from time import sleep

import mysql.connector

class PCDatabase:

    def __init__(self,hostname,username,password,database_name):
        try:
            self.mydb = mysql.connector.connect(
                host=hostname,
                user=username,
                password=password,
                database=database_name
            )
            self.mycursor = self.mydb.cursor()
        except:
            print("Unexpected error: {0}".format(sys.exc_info()[0]))
            sys.exit(0)

    def insertOrIgnore(self,table,entities,values):
        num_cols = ['%s'] * len(entities)
        sql = "INSERT INTO {0} ({1}) VALUES ({2})".format(table,','.join(entities),','.join(num_cols))
        try:
            self.mycursor.executemany(sql,values)
            self.mydb.commit()
            sleep(1)
            print("The table {0} insert successfully".format(table))
        except:
            print("data ignore")