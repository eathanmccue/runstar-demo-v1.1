/*
	File: 		jobs.js
	Date: 		2024/08/29
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		JavaScript file that defines the api routes
                for accessing /jobs
*/

const router = require('express').Router();
let Job = require('../models/job.model');

// get request for listing all jobs from /jobs
router.route('/').get((req, res) => {
    Job.find().sort({jobDate: -1})
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err));
});

// post request for posting new job to /jobs/add
router.route('/add').post((req, res) => {
    const clientName = req.body.clientName;
    const email = req.body.email;
    const phone1 = req.body.phone1;
    const phone2 = req.body.phone2;
    const jobDate = req.body.jobDate;
    const jobTime = req.body.jobTime;
    const jobTime24 = req.body.jobTime24;
    const address1 = req.body.address1;
    const city1 = req.body.city1;
    const type1 = req.body.type1;
    const address2 = req.body.address2;
    const city2 = req.body.city2;
    const type2 = req.body.type2;
    const drive = req.body.drive;
    const hall = req.body.hall;
    const stair = req.body.stair;
    const ferry = req.body.ferry;
    const lunch = req.body.lunch;
    const estimateDate = req.body.estimateDate;
    const estimateTime = req.body.estimateTime;
    const estimateTime24 = req.body.estimateTime24;
    const rate = req.body.rate;
    const crew = req.body.crew;
    const unit1 = req.body.unit1;
    const unit2 = req.body.unit2;
    const buzz1 = req.body.buzz1;
    const buzz2 = req.body.buzz2;
    const floor1 = req.body.floor1;
    const floor2 = req.body.floor2;
    const armchair = req.body.armchair;
    const art = req.body.art;
    const bench = req.body.bench;
    const bookshelf = req.body.bookshelf;
    const chairs = req.body.chairs;
    const credenza = req.body.credenza;
    const chinaCab = req.body.chinaCab;
    const coffeeTable = req.body.coffeeTable;
    const coffeeTableL = req.body.coffeeTableL;
    const glassTop = req.body.glassTop;
    const diningTable = req.body.diningTable;
    const diningTableAss = req.body.diningTableAss;
    const entertainment = req.body.entertainment;
    const tv = req.body.tv;
    const loveseat = req.body.loveseat;
    const ottoman = req.body.ottoman;
    const rugs = req.body.rugs;
    const beanBag = req.body.beanBag;
    const sofa = req.body.sofa;
    const sectional = req.body.sectional;
    const lampTable = req.body.lampTable;
    const lampFloor = req.body.lampFloor;
    const bedAss = req.body.bedAss;
    const king = req.body.king;
    const queen = req.body.queen;
    const twin = req.body.twin;
    const futon = req.body.futon;
    const crib = req.body.crib;
    const boxSpring = req.body.boxSpring;
    const armoire = req.body.armoire;
    const dresser = req.body.dresser;
    const nightstand = req.body.nightstand;
    const trunk = req.body.trunk;
    const mirrors = req.body.mirrors;
    const stool = req.body.stool;
    const cabinetWood = req.body.cabinetWood;
    const barCart = req.body.barCart;
    const iron = req.body.iron;
    const miniFridge = req.body.miniFridge;
    const appCounter = req.body.appCounter;
    const kitchenTable = req.body.kitchenTable;
    const vaccuum = req.body.vaccuum;
    const sideTable = req.body.sideTable;
    const desk = req.body.desk;
    const deskAss = req.body.deskAss;
    const fileCabinet = req.body.fileCabinet;
    const pc = req.body.pc;
    const printer = req.body.printer;
    const officeChair = req.body.officeChair;
    const bbq = req.body.bbq;
    const bike = req.body.bike;
    const deckBox = req.body.deckBox;
    const equipment = req.body.equipment;
    const firepit = req.body.firepit;
    const toy = req.body.toy;
    const pot = req.body.pot;
    const umbrella = req.body.umbrella;
    const outTable = req.body.outTable;
    const outChair = req.body.outChair;
    const outLove = req.body.outLove;
    const adr = req.body.adr;
    const exbike = req.body.exbike;
    const exStation = req.body.exStation;
    const treadmill = req.body.treadmill;
    const fridge = req.body.fridge;
    const deepFreeze = req.body.deepFreeze;
    const ladder = req.body.ladder;
    const storage = req.body.storage;
    const toolChest = req.body.toolChest;
    const tools = req.body.tools;
    const tires = req.body.tires;
    const weight = req.body.weight;
    const box = req.body.box;
    const boxL = req.body.boxL;
    const ac = req.body.ac;
    const coatRack = req.body.coatRack;
    const deco = req.body.deco;
    const fan = req.body.fan;
    const suitcase = req.body.suitcase;
    const piano = req.body.piano;
    const upPiano = req.body.upPiano;
    const pianoBaby = req.body.pianoBaby;
    const keyboard = req.body.keyboard;
    const drum = req.body.drum;
    const guitar = req.body.guitar;
    const speaker = req.body.speaker;
    const cat = req.body.cat;
    const misc = req.body.misc;
    const obese = req.body.obese;
    const assS = req.body.assS;
    const assM = req.body.assM;
    const assL = req.body.assL;
    const junkMatt = req.body.junkMatt;
    const otherJunk = req.body.otherJunk;
    const junkType = req.body.junkType;
    const paper = req.body.paper;
    const bubble = req.body.bubble;
    const cardB = req.body.cardB;
    const wardB = req.body.wardB;
    const travelTime = req.body.travelTime;
    const totalTime = req.body.totalTime;
    const totalCost = req.body.totalCost;
    const notes = req.body.notes;
    const createdBy = req.body.createdBy;
    const updatedBy = req.body.updatedBy;
    const plaintext = req.body.plaintext;

    const newJob = new Job({clientName,email,phone1,phone2,jobDate,jobTime,jobTime24,address1,city1,type1,address2,city2,type2,drive,hall,stair,ferry,lunch,estimateDate,estimateTime,estimateTime24,rate,crew,unit1,unit2,buzz1,buzz2,floor1,floor2,armchair,art,bench,bookshelf,chairs,credenza,chinaCab,coffeeTable,coffeeTableL,glassTop,diningTable,diningTableAss,entertainment,tv,loveseat,ottoman,rugs,beanBag,sofa,sectional,lampTable,lampFloor,bedAss,king,queen,twin,futon,crib,boxSpring,armoire,dresser,nightstand,trunk,mirrors,stool,cabinetWood,barCart,iron,miniFridge,appCounter,kitchenTable,vaccuum,sideTable,desk,deskAss,fileCabinet,pc,printer,officeChair,bbq,bike,deckBox,equipment,firepit,toy,pot,umbrella,outTable,outChair,adr,outLove,exbike,exStation,treadmill,fridge,deepFreeze,ladder,storage,toolChest,tools,tires,weight,box,boxL,ac,coatRack,deco,fan,suitcase,piano,upPiano,pianoBaby,keyboard,drum,guitar,speaker,cat,misc,obese,assS,assM,assL,junkMatt,otherJunk,junkType,paper,bubble,cardB,wardB,travelTime,totalTime,totalCost,notes,createdBy,updatedBy,plaintext});

    newJob.save()
        .then(() => res.json('Job added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// routes for crud actions
router.route('/:id').get((req, res) => {
    Job.findById(req.params.id)
        .then(job => res.json(job))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Job.findByIdAndDelete(req.params.id)
        .then(job => res.json('Job deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Job.findById(req.params.id)
        .then(job => {
            job.clientName = req.body.clientName;
            job.email = req.body.email;
            job.phone1 = req.body.phone1;
            job.phone2 = req.body.phone2;
            job.jobDate = req.body.jobDate;
            job.jobTime = req.body.jobTime;
            job.jobTime24 = req.body.jobTime24;
            job.address1 = req.body.address1;
            job.city1 = req.body.city1;
            job.type1 = req.body.type1;
            job.address2 = req.body.address2;
            job.city2 = req.body.city2;
            job.type2 = req.body.type2;
            job.drive = req.body.drive;
            job.hall = req.body.hall;
            job.stair = req.body.stair;
            job.ferry = req.body.ferry;
            job.lunch = req.body.lunch;
            job.estimateDate = req.body.estimateDate;
            job.estimateTime = req.body.estimateTime;
            job.estimateTime24 = req.body.estimateTime24;
            job.rate = req.body.rate;
            job.crew = req.body.crew;
            job.unit1 = req.body.unit1;
            job.unit2 = req.body.unit2;
            job.buzz1 = req.body.buzz1;
            job.buzz2 = req.body.buzz2;
            job.floor1 = req.body.floor1;
            job.floor2 = req.body.floor2;
            job.armchair = req.body.armchair;
            job.art = req.body.art;
            job.bench = req.body.bench;
            job.bookshelf = req.body.bookshelf;
            job.chairs = req.body.chairs;
            job.credenza = req.body.credenza;
            job.chinaCab = req.body.chinaCab;
            job.coffeeTable = req.body.coffeeTable;
            job.coffeeTableL = req.body.coffeeTableL;
            job.glassTop = req.body.glassTop;
            job.diningTable = req.body.diningTable;
            job.diningTableAss = req.body.diningTableAss;
            job.entertainment = req.body.entertainment;
            job.tv = req.body.tv;
            job.loveseat = req.body.loveseat;
            job.ottoman = req.body.ottoman;
            job.rugs = req.body.rugs;
            job.beanBag = req.body.beanBag;
            job.sofa = req.body.sofa;
            job.sectional = req.body.sectional;
            job.lampTable = req.body.lampTable;
            job.lampFloor = req.body.lampFloor;
            job.bedAss = req.body.bedAss;
            job.king = req.body.king;
            job.queen = req.body.queen;
            job.twin = req.body.twin;
            job.futon = req.body.futon;
            job.crib = req.body.crib;
            job.boxSpring = req.body.boxSpring;
            job.armoire = req.body.armoire;
            job.dresser = req.body.dresser;
            job.nightstand = req.body.nightstand;
            job.trunk = req.body.trunk;
            job.mirrors = req.body.mirrors;
            job.stool = req.body.stool;
            job.cabinetWood = req.body.cabinetWood;
            job.barCart = req.body.barCart;
            job.iron = req.body.iron;
            job.miniFridge = req.body.miniFridge;
            job.appCounter = req.body.appCounter;
            job.kitchenTable = req.body.kitchenTable;
            job.vaccuum = req.body.vaccuum;
            job.sideTable = req.body.sideTable;
            job.desk = req.body.desk;
            job.deskAss = req.body.deskAss;
            job.fileCabinet = req.body.fileCabinet;
            job.pc = req.body.pc;
            job.printer = req.body.printer;
            job.officeChair = req.body.officeChair;
            job.bbq = req.body.bbq;
            job.bike = req.body.bike;
            job.deckBox = req.body.deckBox;
            job.equipment = req.body.equipment;
            job.firepit = req.body.firepit;
            job.toy = req.body.toy;
            job.pot = req.body.pot;
            job.umbrella = req.body.umbrella;
            job.outTable = req.body.outTable;
            job.outChair = req.body.outChair;
            job.adr = req.body.adr;
            job.outLove = req.body.outLove;
            job.exbike = req.body.exbike;
            job.exStation = req.body.exStation;
            job.treadmill = req.body.treadmill;
            job.fridge = req.body.fridge;
            job.deepFreeze = req.body.deepFreeze;
            job.ladder = req.body.ladder;
            job.storage = req.body.storage;
            job.toolChest = req.body.toolChest;
            job.tools = req.body.tools;
            job.tires = req.body.tires;
            job.weight = req.body.weight;
            job.box = req.body.box;
            job.boxL = req.body.boxL;
            job.ac = req.body.ac;
            job.coatRack = req.body.coatRack;
            job.deco = req.body.deco;
            job.fan = req.body.fan;
            job.suitcase = req.body.suitcase;
            job.piano = req.body.piano;
            job.upPiano = req.body.upPiano;
            job.pianoBaby = req.body.pianoBaby;
            job.keyboard = req.body.keyboard;
            job.drum = req.body.drum;
            job.guitar = req.body.guitar;
            job.speaker = req.body.speaker;
            job.cat = req.body.cat;
            job.misc = req.body.misc;
            job.obese = req.body.obese;
            job.assS = req.body.assS;
            job.assM = req.body.assM;
            job.assL = req.body.assL;
            job.junkMatt = req.body.junkMatt;
            job.otherJunk = req.body.otherJunk;
            job.junkType = req.body.junkType;
            job.paper = req.body.paper;
            job.bubble = req.body.bubble;
            job.cardB = req.body.cardB;
            job.wardB = req.body.wardB;
            job.travelTime = req.body.travelTime;
            job.totalTime = req.body.totalTime;
            job.totalCost = req.body.totalCost;
            job.notes = req.body.notes;
            job.createdBy = req.body.createdBy;
            job.updatedBy = req.body.updatedBy;
            job.plaintext = req.body.plaintext;

            job.save()
                .then(() => res.json('Job updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;