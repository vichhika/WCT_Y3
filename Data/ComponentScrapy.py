import re
import json
from typing import Pattern, Text
import requests
from bs4 import BeautifulSoup

if __name__ == "__main__":
    #resource
    url = "https://www.chantracomputer.com/pcpart.html"
    soup = BeautifulSoup(requests.get(url).content,"html.parser")
    #data
    Chantra = {
        "cpu":[],
        "ram":[],
        "harddisk":[]
    }
    allPrice = []
    CPUs = []
    RAMs = []
    #scrapy
    div  = soup.find('div',attrs={'id':'body'})

    #cpu and price scraping
    for d in div.findAll('div',attrs={'class':'leftbox'}):
        PriceList = d.find_all(string=re.compile("= \$"))
        cpuList = d.find_all(string=re.compile("threads|Threads|Thread|Intel® Core™"))
        ramList = d.find_all(string=re.compile("(CPU|Gaming|LED|RGB|DDR|Trident).*[(4)(8)(16)(32)]GB"))
        for cpu in cpuList:
            if(cpu):
                cpu = cpu.replace("  ","")
                cpu = cpu.replace("- ","")
                CPUs.append(cpu)
        for CPUprice in PriceList:
            if CPUprice:
                allPrice.append(re.sub("^.+\$","$",CPUprice).replace(" ",""))
    #add CPU and Price to json
    for i in range(len(CPUs)):
        Chantra["cpu"].append({
            "id":i,
            "product":CPUs[i],
            "price":allPrice[i]
        })
    
    #ram scraping
    i = 0
    for ram in div.findAll(string=re.compile("(CPU|Gaming|LED|RGB|DDR|Trident).*[(4)(8)(16)(32)]GB")):
        #print(re.sub("^-* *","",ram) + " = " + re.sub(" *=* *","",ram.findNext('span').text))
        Chantra["ram"].append({
            "id":i,
            "product":re.sub("^-* *","",ram),
            "price":re.sub(" *=* *","",ram.findNext('span').text)
        })
        i += 1
    #harddisk and price scraping
    i = 0
    for harddisk in div.findAll(string=re.compile("((120)|(128)|(250)|(500)|(256)|(512))GB|((1)|(2)|(4)|(6)|(8)|(10)|(12))TB")):
        x = re.split(" *= *",re.sub("^ *-* *","",harddisk.parent.parent.text.replace("  ","")))
        Chantra["harddisk"].append({
            "id":i,
            "product":x[0],
            "price":x[1]
        })
        i += 1

    #write to json file
    with open('Chantra.json','w') as db:
        json.dump(Chantra,db)