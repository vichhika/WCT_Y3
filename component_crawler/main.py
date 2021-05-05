from pcpartpicker import API
import json

from PCDatabase import PCDatabase

api = API('us')
data = {}
dataEntity = {
    'cpu':['brand','model','cores','tdp','integrated_graphics'],
    'motherboard':['brand','model','socket','form_factor','ram_slots','max_ram'],
    'internal-hard-drive':['brand','model','capacity','storage_type','form_factor'],
    'video-card':['brand','model','chipset','vram'],
    'power-supply':['brand','model','form_factor','wattage'],
    'monitor':['brand','model','size','resolution','refresh_rate','panel_type'],
    'case':['brand','model','form_factor','external_bays','internal_bays'],
    'memory':['brand','model','module_type','speed']
}
tableName = {
    'cpu':'cpus',
    'motherboard':'motherboards',
    'internal-hard-drive':'internalharddrives',
    'video-card':'videocards',
    'power-supply':'powersupplies',
    'monitor':'monitors',
    'case':'casepcs',
    'memory':'memories'
}

database = PCDatabase(
    hostname="127.0.0.1",
    username="root",
    password="",
    database_name="reabpc"
)

#fetch data from api to dictionary
for component in dataEntity.keys():
    data.update(json.loads(api.retrieve(component).to_json()))

#clean data
for component in data.keys():
    data[component] = [dict(filter(lambda y: y[0] in dataEntity[component],x.items())) for x in data[component]]


# overwrite max_ram key
for i in range(len(data['motherboard'])): ((data['motherboard'])[i])['max_ram'] = ((data['motherboard'])[i])['max_ram']['total']

# overwrite capacity key
for i in range(len(data['internal-hard-drive'])): ((data['internal-hard-drive'])[i])['capacity'] = ((data['internal-hard-drive'])[i])['capacity']['total']

# overwrite video-card key
for i in range(len(data['video-card'])): ((data['video-card'])[i])['vram'] = ((data['video-card'])[i])['vram']['total']

# overwrite monitor key
for i in range(len(data['monitor'])):
    ((data['monitor'])[i])['resolution_width'] = ((data['monitor'])[i])['resolution']['width']
    ((data['monitor'])[i])['resolution_height'] = ((data['monitor'])[i])['resolution']['height']
    del ((data['monitor'])[i])['resolution']

# overwrite speed key
for i in range(len(data['memory'])): ((data['memory'])[i])['speed'] = ((data['memory'])[i])['speed']['cycles']

for k,v in data.items():
    table = tableName[k]
    entity_keys = list((v[0]).keys())
    values = [tuple([y for y in x.values()]) for x in v]
    database.insertOrIgnore(table,entity_keys,values)


