import json
import random
import re
def editPrice(shop,component):
    for item in (data[shop])[component]:
        discount = random.randint(-3,3)
        item["price"] = "$" + str(int(item["price"].replace("$","")) - discount)
#fetch data
json_file = open("data.json")
data = json.load(json_file)
json_file.close()

shopList = ["vtech","goldone","tk"]
componentList = ["cpu","ram","harddisk","motherboard","power","case","vga"]
#copy data and edit price
for shop in shopList: 
    data[shop] = data["chantra"]
    for component in componentList:
        editPrice(shop,component)

with open('data.json','w') as db:
        json.dump(data,db)

