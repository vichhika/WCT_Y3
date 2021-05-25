export const getComponentskey = (componentObj) => {

    const listComponent = ['cpu','motherboard','memory','internalHardDrive','videoCard','powerSupply','monitor','case'];
    let componentKey = Object.keys(componentObj);

    const checkComponentKey = (key) => {

        return listComponent.includes(key);
    
    }

    return componentKey.filter(checkComponentKey); 

}