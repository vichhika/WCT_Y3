from pcpartpicker import API
import json

api = API()
data = {}
dataEntity = {
    'cpu':['brand','model','cores','tdp','intergrated_graphics'],
    'motherboard':['brand','model','socket','form_factor','ram_slots','max_ram'],
    'internal-hard-drive':['brand','model','capacity','storage_type','form_factor'],
    'video-card':['brand','model','chipset','vram'],
    'power-supply':['brand','model','form_factor','wattage'],
    'monitor':['brand','model','size','resolution','refresh_rate','panel_type'],
    'case':['brand','model','form_factor','external_bays','internal_bays']
}

#fetch data from api to dictionary
for component in dataEntity.keys():
    data.update(json.loads(api.retrieve((component)).to_json()))

#clean data
for component in data.keys():
    data[component] = [dict(filter(lambda y: y[0] in dataEntity[component],x.items())) for x in data[component]]

for cpu in data['cpu']:
    print(cpu)