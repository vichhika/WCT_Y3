import json
import random
import re
import copy
def editPrice(shop,component):
    for i in range(0,len((kdata[shop])[component])):
        discount = random.randint(-3,3)
        (((kdata[shop])[component])[i])["price"] = "$" + str(int((((kdata[shop])[component])[i])["price"].replace("$","")) - discount)
    return list
#fetch data
json_file = open("data.json")
jdata = json.load(json_file)
json_file.close()

shopList = ["vtech","goldone","tk"]
componentList = ["cpu","ram","harddisk","motherboard","power","case","vga"]

for shop in shopList:
    jdata[shop] = jdata["chantra"]
#copy data and edit price

with open('data.json','w') as db:
        json.dump(jdata,db)

json_file = open("data.json")
kdata = json.load(json_file)
json_file.close()        

for shop in shopList:
    for component in componentList:
        editPrice(shop,component)

with open('data.json','w') as db:
        json.dump(kdata,db)