CREATE TABLE User(
    userID int NOT NULL AUTO_INCREMENT,
    username CHAR(50) NOT NULL,
    password VARCHAR(512) NOT NULL,
    Phone CHAR(15) NOT NULL,
    EMail CHAR(50) NOT NULL,
    PRIMARY KEY (userID)
);

CREATE TABLE AdminShop(
    adminshopID int NOT NULL AUTO_INCREMENT,
    username CHAR(50) NOT NULL,
    password VARCHAR(512) NOT NULL,
    shop_name CHAR(50) NOT NULL,
    Phone CHAR(15) NOT NULL,
    Email CHAR(50) NOT NULL,
    Location VARCHAR(512) NOT NULL,
    PRIMARY KEY (adminshopID)
);

CREATE TABLE CPU(
    cpuID int NOT NULL AUTO_INCREMENT,
    brand CHAR(25) NOT NULL,
    model CHAR(25) NOT NULL,
    core int NOT NULL,
    tdp int NOT NULL,
    integrated_graphics CHAR(50) NOT NULL,
    PRIMARY KEY (cpuID)
);

CREATE TABLE PowerSupply(
    powersupplyID int NOT NULL AUTO_INCREMENT,
    brand CHAR(25) NOT NULL,
    model CHAR(25) NOT NULL,
    form_factor CHAR(25) NOT NULL,
    wattage int NOT NULL,
    PRIMARY KEY (powersupplyID)
);

CREATE TABLE InternalHardDrive(
    internalharddriveID int NOT NULL AUTO_INCREMENT,
    brand CHAR(25) NOT NULL,
    model CHAR(25) NOT NULL,
    capacity int NOT NULL,
    form_factor CHAR(25) NOT NULL,
    storage_type CHAR(10) NOT NULL,
    PRIMARY KEY (internalharddriveID)
);

CREATE TABLE Motherboard(
    motherboardID int NOT NULL AUTO_INCREMENT,
    brand CHAR(25) NOT NULL,
    model CHAR(25) NOT NULL,
    socket CHAR(10) NOT NULL,
    form_factor CHAR(25) NOT NULL,
    ram_slots int NOT NULL,
    max_ram int NOT NULL,
    PRIMARY KEY (motherboardID)
);

CREATE TABLE Monitor(
    monitorID int NOT NULL AUTO_INCREMENT,
    brand CHAR(25) NOT NULL,
    model CHAR(25) NOT NULL,
    size int NOT NULL,
    resolution_width int NOT NULL,
    resolution_height int NOT NULL,
    refresh_rate CHAR(10),
    panel_type CHAR(10),
    PRIMARY KEY (monitorID)
);

CREATE TABLE VideoCard(
    videocardID int NOT NULL AUTO_INCREMENT,
    brand CHAR(25) NOT NULL,
    model CHAR(25) NOT NULL,
    chipset CHAR(25) NOT NULL,
    vram int NOT NULL,
    PRIMARY KEY (videocardID)
);

CREATE TABLE `Case`(
    caseID int NOT NULL AUTO_INCREMENT,
    brand CHAR(25) NOT NULL,
    model CHAR(25) NOT NULL,
    form_factor CHAR(25) NOT NULL,
    external_bays int NOT NULL,
    internal_bays int NOT NULL,
    PRIMARY KEY (caseID)
);

CREATE TABLE Memory(
    memoryID int NOT NULL AUTO_INCREMENT,
    brand CHAR(25) NOT NULL,
    model CHAR(25) NOT NULL,
    form_factor CHAR(25) NOT NULL,
    speed int NOT NULL,
    PRIMARY KEY (memoryID)
);

CREATE TABLE CPUPrice(
    cpupriceID int NOT NULL AUTO_INCREMENT,
    cpuID int NOT NULL,
    adminshopID int NOT NULL,
    price int,
    PRIMARY KEY (cpupriceID),
    FOREIGN KEY (cpuID) REFERENCES CPU(cpuID),
    FOREIGN KEY (adminshopID) REFERENCES AdminShop(adminshopID)
);

CREATE TABLE MotherboardPrice(
    motherboardpriceID int NOT NULL AUTO_INCREMENT,
    motherboardID int NOT NULL,
    adminshopID int NOT NULL,
    price int,
    PRIMARY KEY (motherboardpriceID),
    FOREIGN KEY (motherboardID) REFERENCES Motherboard(motherboardID),
    FOREIGN KEY (adminshopID) REFERENCES AdminShop(adminshopID)
);

CREATE TABLE PowerSupplyPrice(
    powersupplypriceID int NOT NULL AUTO_INCREMENT,
    powersupplyID int NOT NULL,
    adminshopID int NOT NULL,
    price int,
    PRIMARY KEY (powersupplypriceID),
    FOREIGN KEY (powersupplyID) REFERENCES PowerSupply(powersupplyID),
    FOREIGN KEY (adminshopID) REFERENCES AdminShop(adminshopID)
);

CREATE TABLE InternalHardDrivePrice(
    internalharddrivepriceID int NOT NULL AUTO_INCREMENT,
    internalharddriveID int NOT NULL,
    adminshopID int NOT NULL,
    price int,
    PRIMARY KEY (internalharddrivepriceID),
    FOREIGN KEY (internalharddriveID) REFERENCES InternalHardDrive(internalharddriveID),
    FOREIGN KEY (adminshopID) REFERENCES AdminShop(adminshopID)
);

CREATE TABLE MonitorPrice(
    monitorpriceID int NOT NULL AUTO_INCREMENT,
    monitorID int NOT NULL,
    adminshopID int NOT NULL,
    price int,
    PRIMARY KEY (monitorpriceID),
    FOREIGN KEY (monitorID) REFERENCES Monitor(monitorID),
    FOREIGN KEY (adminshopID) REFERENCES AdminShop(adminshopID)
);

CREATE TABLE VideoCardPrice(
    videocardpriceID int NOT NULL AUTO_INCREMENT,
    videocardID int NOT NULL,
    adminshopID int NOT NULL,
    price int,
    PRIMARY KEY (videocardpriceID),
    FOREIGN KEY (videocardID) REFERENCES VideoCard(videocardID),
    FOREIGN KEY (adminshopID) REFERENCES AdminShop(adminshopID)
);

CREATE TABLE CasePrice(
    casepriceID int NOT NULL AUTO_INCREMENT,
    caseID int NOT NULL,
    adminshopID int NOT NULL,
    price int,
    PRIMARY KEY (casepriceID),
    FOREIGN KEY (caseID) REFERENCES `Case`(caseID),
    FOREIGN KEY (adminshopID) REFERENCES AdminShop(adminshopID)
);

CREATE TABLE MemoryPrice(
    memorypriceID int NOT NULL AUTO_INCREMENT,
    memoryID int NOT NULL,
    adminshopID int NOT NULL,
    price int,
    PRIMARY KEY (memorypriceID),
    FOREIGN KEY (memoryID) REFERENCES Memory(memoryID),
    FOREIGN KEY (adminshopID) REFERENCES AdminShop(adminshopID)
);

CREATE TABLE ProductBuild(
    productbuildID int NOT NULL AUTO_INCREMENT,
    cpupriceID int,
    motherboardpriceID int,
    powersupplypriceID int,
    internalharddrivepriceID int,
    monitorpriceID int,
    videocardpriceID int,
    casepriceID int,
    memorypriceID int,
    PRIMARY KEY (productbuildID),
    FOREIGN KEY (cpupriceID) REFERENCES CPUPrice(cpupriceID),
    FOREIGN KEY (motherboardpriceID) REFERENCES MotherboardPrice(motherboardpriceID),
    FOREIGN KEY (powersupplypriceID) REFERENCES PowerSupplyPrice(powersupplypriceID),
    FOREIGN KEY (internalharddrivepriceID) REFERENCES InternalHardDrivePrice(internalharddrivepriceID),
    FOREIGN KEY (monitorpriceID) REFERENCES MonitorPrice(monitorpriceID),
    FOREIGN KEY (videocardpriceID) REFERENCES VideoCardPrice(videocardpriceID),
    FOREIGN KEY (casepriceID) REFERENCES CasePrice(casepriceID),
    FOREIGN KEY (memorypriceID) REFERENCES MemoryPrice(memorypriceID)
);

CREATE TABLE UserBuildDetail(
    userID int NOT NULL,
    productbuildID int NOT NULL,
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (productbuildID) REFERENCES ProductBuild(productbuildID)
);