import re
import json
from typing import Pattern, Text
import bs4
import requests
from bs4 import BeautifulSoup

if __name__ == "__main__":
    #resource
    domain = "https://www.chantracomputer.com/"
    url = "https://www.chantracomputer.com/pcpart.html"
    soup = BeautifulSoup(requests.get(url).content,"html.parser")
    #data
    jsonData = {
        "chantra":{
            "cpu":[],
            "ram":[],
            "harddisk":[],
            "motherboard":[],
            "power":[],
            "case":[],
            "vga":[]
        }
    }
    # #scrapy
    div  = soup.find('div',attrs={'id':'body'})

    #cpu scrapping
    i = 0
    for cpu in div.findAll(string=re.compile("threads|Threads|Thread|Intel® Core™")):
        src = domain
        if i <= 8 : src += cpu.parent.parent.parent.img['src']
        else : src += cpu.parent.parent.img['src']
        x = re.split(" *= *",re.sub("^ *-* *","",cpu.parent.text))
        cpuPrice = re.split(" ",re.sub("([a-zA-Z,& ])","",x[1]))
        group = re.match("(\$[0-9]+)(\$[0-9]+)",re.sub("([a-zA-Z,& ])","",x[1]))
        if group: 
            x[1] = group.group(2)
        else : 
            x[1] = cpuPrice[0]
        x[1] = re.sub("(\t|[a-zA-Z,]|\$| )+","",x[1])
        (jsonData["chantra"])["cpu"].append({
            "id":i,
            "product":x[0],
            "price":"$"+x[1],
            "src": src
        })
        i +=1
    #ram scraping
    i = 0
    for ram in div.findAll(string=re.compile("(CPU|Gaming|LED|RGB|DDR|Trident).*[(4)(8)(16)(32)]GB")):
        src = domain
        price = re.sub(" *=* *","",ram.findNext('span').text)
        price = re.sub("(\t|[a-zA-Z,]|\$| )+","",price)
        if len(price) > 2:
            if i <= 43 :
                src += ram.parent.parent.parent.img['src']
            elif i in [78,79,80,81,82,83,95,96,100,101,102,103,104,105,106,107,108,109,110,111] :
                src += ram.parent.parent.img['src']
            else :
                src += ram.parent.parent.span.img['src']
            (jsonData["chantra"])["ram"].append({
                "id":i,
                "product":re.sub("^-* *","",ram),
                "price":"$"+price,
                "src": src
            })
            i += 1
    #harddisk 
    i = 0
    for harddisk in div.findAll(string=re.compile("((120)|(128)|(250)|(500)|(256)|(512))GB|((1)|(2)|(4)|(6)|(8)|(10)|(12))TB")):
        src = domain
        if i < 116 or i >= 119 : src += harddisk.parent.parent.parent.img['src'] 
        elif i in [117,118] : src = (((jsonData["chantra"])["harddisk"])[115])["src"]
        x = re.split(" *= *",re.sub("^ *-* *","",harddisk.parent.parent.text.replace("  ","")))
        x[1] = re.sub("(\t|[a-zA-Z,]|\$| )+","",x[1])
        if len(x[1]):
            (jsonData["chantra"])["harddisk"].append({
                "id":i,
                "product":x[0],
                "price":"$"+x[1],
                "src": src
            })
            i += 1
    #motherboard
    i = 0
    for board in div.findAll(string=re.compile("ASROCK |NZXT N7|B550M|MAXIMUS|(Asus|ASUS|ROG ).+([A-Z][0-9]{3}[ -]|TRX)|GA-Z[0-9]{3}|MSI.+[XZ][0-9]{3} ")):
        parent = board.parent.parent
        price = re.findall("(\$[1-9][0-9,]+)",parent.find(attrs={"class":"sp"}).text.replace(" ",""))
        if price:
            price[0] = re.sub("[, ]+","",price[0])
            (jsonData["chantra"])["motherboard"].append({
                "id":i,
                "product":re.sub("^ +","",board),
                "price":price[0],
                "src": domain + parent.img["src"]
            })
            i+= 1
    #VGA    
    i = 0
    for vga in div.findAll(string=re.compile("QUADRO |[GR]TX")):
        src = domain
        parent = vga.parent.parent
        price = re.findall("(\$[1-9][0-9,]+)",parent.find(attrs={"class":"sp"}).text.replace(" ",""))
        if price:
            if i >= 27 and i <= 39 : 
                parent = parent.parent.parent
                if i in [29,32,35,39]: src += parent.parent.parent.img['src']
                elif i in [33,36]: src += parent.img['src']
                else : src += parent.parent.img['src']
            else : src += parent.img['src']
            price[0] = re.sub("[, ]+","",price[0])
            (jsonData["chantra"])["vga"].append({
                "id":i,
                "product":re.sub("^ +","",vga),
                "price":price[0],
                "src": src
            })
            i+= 1
    #PowerSupply
    i = 0
    for powerSupply in div.findAll(string=re.compile("[1 ][0-9]{3}W")):
        parent = powerSupply.parent
        if "$" in parent.text:
            x = re.split(" *= *",re.sub("^ *-* *","",parent.text))
            x[1] = re.sub("[\$\n\t, ]","",x[1])
            if len(x[1]):
                (jsonData["chantra"])["power"].append({
                    "id":i,
                    "product":x[0],
                    "price":"$"+x[1],
                    "src": domain+parent.parent.img['src']
                })
                i+= 1
    #case
    i = 0
    for caseBox in div.findAll(string=re.compile("COSMOS|MASTER(CASE|BOX|SILENCIO)|STORM|MES[HT]|LANCOOL|NZXT H|/ XIGMATEK |Aigo ")):
        #print(re.sub("^ +","",re.sub(".*/ *[0-9]*","",caseBox)).replace("\n",""))
        #print(caseBox.parent.parent.find(string=re.compile("\$")))
        #print(caseBox.parent.parent.img['src'])
        (jsonData["chantra"])["case"].append({
            "id":i,
            "product":re.sub("^ +","",re.sub(".*/ *[0-9]*","",caseBox)).replace("\n",""),
            "price":caseBox.parent.parent.find(string=re.compile("\$")).replace(",",""),
            "src": domain+caseBox.parent.parent.img['src']
        })
        i+= 1
    #write to json file
    with open('data.json','w') as db:
        json.dump(jsonData,db)