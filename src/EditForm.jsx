/*
	File: 		EditForm.jsx
	Date: 		2024/08/28
	Authors: 	Tolga Olcay, Eathan McCue
	Desc: 		React component for the edit job form.
                Functionally identical to EstimateForm.jsx
                save for the defaultValue attributes are
                populated with the users' data.
*/

// imports
import './App.css';
import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import IncrementDecrementBtn from "./components/IncrementDecrementBtn";
import Travel from './components/Travel';

// component function
function EditForm(){
    // state variables, setter functions
    const [countValues, setCountValues] = useState({});
    const [job, setJob] = useState({});         // holds all job details
    let [searchParams] = useSearchParams();     // for getting params from url
    const id = searchParams.get('jobId');       // get id from url

    // runs on render / when id changes
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' }); // go to top of page

        fetch('http://localhost:5000/jobs/' + id, { // get job with id from url
            method: 'GET'
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setJob(data);   // save job details to state variable
        })
    }, [id]);

    // for updating increment decrement values
    const updateCountValue = (id,value) => {
        setCountValues(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    function calcSubmit(event){
        let createdBy = job.createdBy;
        let today = new Date(); // current date
        let updatedDate = "" + today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
        let updatedTime =  "" + (today.getHours() + 1) + ":" + today.getMinutes();
        let updatedBy = window.sessionStorage.getItem('ug&G&ub7df65dYFV&FD^d4rjYF2dadcTHNWAt3') + " on " + updatedDate + " at " + updatedTime;

        let bonus = 1;

        let drive = false;
        let hall = false;
        let stair = false
        let ferry = false;
        let lunch = false;
        let type1 = 1;
        let type2 = 1;

        

        if (document.getElementById('type1').value == 1){ //house
            type1 = 1;
            bonus = bonus + 0; 
        }

        if (document.getElementById('type1').value == 2){ //townhouse
            type1 = 2;
            bonus = bonus + 0.25;
        }

        if (document.getElementById('type1').value == 3){ //mansion
            type1 = 3;
            bonus = bonus + 0.15;
        }

        if (document.getElementById('type1').value == 4){ //apartment
            type1 = 4;
            bonus = bonus + 0.25;
        }

        if (document.getElementById('type2').value == 1){ //house2
            type2 = 1;
            bonus = bonus + 0; 
        }

        if (document.getElementById('type2').value == 2){ //townhouse2
            type2 = 2;
            bonus = bonus + 0.25;
        }

        if (document.getElementById('type2').value == 3){ //mansion2
            type2 = 3;
            bonus = bonus + 0.15;
        }

        if (document.getElementById('type2').value == 4){ //apartment2
            type2 = 4;
            bonus = bonus + 0.25;
        }

        if (document.getElementById('longDriveway').checked){ //modifier driveway
            drive = true;
            bonus = bonus + 0.1;
        }

        if (document.getElementById('hallway').checked){ //modifier hallway
            hall = true;
            bonus = bonus + 0.05;
        }

        if (document.getElementById('stairs').checked){ //modifier stairs
            stair = true;
            bonus = bonus + 0.33;
        }

        let crew = parseInt(job.crew);
        if(countValues['crew'] !== undefined && isNaN(countValues['crew']) == false){
            crew = countValues['crew'];
        }

        if (crew < 4){ //modifier crew

            bonus = bonus + 0;
        }else if(crew == 4){
            bonus = bonus -0.4;
        }
        else if(crew == 5){
        bonus = bonus -0.45;
        }
        else if(crew == 6){
            bonus = bonus -0.55;
        }
        else if(crew == 7){
            bonus = bonus -0.7;
        }
        else if(crew == 8){
            bonus = bonus -0.8;
        }
        else if(crew == 9){
            bonus = bonus -0.9;
        }
        else if(crew == 10){
            bonus = bonus -1;
        }

        if (bonus <= 0){
            bonus = 0.1;
        }
        
        let rate = 160;

        
        if (document.getElementById('rate').value == 1){ //rate standard
            if (crew == 2){
                rate = 160;
            }

            else if (crew == 3){
                rate = 200;
            }

            else if (crew == 4){
                rate = 250;
            }

            else if  (crew == 5){
                rate = 300;
            }

            else if  (crew == 6){
                rate = 350;
            }

            else if  (crew == 7){
                rate = 400;
            } 

            
            else if  (crew == 8){
                rate = 450;
            }

            else if  (crew == 9){
                rate = 500;
            }

            else if  (crew == 10){
                rate = 550;
            } 
        }
        
        
        else if (document.getElementById('rate').value == 2){ //fam and friends
            if (crew == 2){
                rate = 150;
            }

            else if  (crew == 3){
                rate = 190;
            }

            else if  (crew == 4){
                rate = 220;
            }

            else if  (crew == 5){
                rate = 290;
            }

            else if  (crew == 6){
                rate = 340;
            }

            else if  (crew == 7){
                rate = 380;
            }  

            else if  (crew == 8){
                rate = 430;
            }

            else if  (crew == 9){
                rate = 480;
            }

            else if  (crew == 10){
                rate = 530;
            } 
            
        }
            
        else if  (document.getElementById('rate').value == 3){ //rate premium


            if (crew == 2){
                rate = 170;
            }

            else if  (crew == 3){
                rate = 225;
        
            }

            else if  (crew == 4){
                rate = 270;
        
            }

            else if  (crew == 5){
                rate = 325;
        
            }

            else if  (crew == 6){
                rate = 375;
            }

            else if  (crew == 7){
                rate = 425;
            }  

            else if  (crew == 8){
                rate = 475;
        
            }

            else if  (crew == 9){
                rate = 525;
            }

            else if  (crew == 10){
                rate = 575;
            } 


         }

        

        let notes = null;
        if(document.getElementById('notepad').value != null){
            notes = document.getElementById('notepad').value;
        }


        let clientName = null;
        if(document.getElementById('name').value != undefined && document.getElementById('name').value != null){
            clientName = document.getElementById('name').value;
        }

        let phone1 = null;
        if(document.getElementById('phone1').value != undefined && document.getElementById('phone1').value != null){
            phone1 = document.getElementById('phone1').value;
        }

        let phone2 = null;
        if(document.getElementById('phone2').value != undefined && document.getElementById('phone2').value != null){
            phone2 = document.getElementById('phone2').value;
        }

        let email = null;
        if(document.getElementById('email').value != undefined && document.getElementById('email').value != null){
            email = document.getElementById('email').value;
        }
        let jobDate = null;
        if(document.getElementById('jobDate').value != undefined &&document.getElementById('jobDate').value != null){
            jobDate = document.getElementById('jobDate').value;

        }
        let jobTime = null;
        let jobTime24 = null;
        if(document.getElementById('jobTime').value != undefined && document.getElementById('jobTime').value != null){
            jobTime = document.getElementById('jobTime').value;
            jobTime24 = document.getElementById('jobTime').value;
            let jobsplit = jobTime.split(':');
            let jHour = jobsplit[0];
            let jmin = jobsplit[1];
            let jclock = "";
            if(jmin != undefined){
            if(jHour>12){
                jclock=jclock+"PM";
                jHour = parseInt(jHour - 12);
            }else if (jHour < 12) {
                jclock = jclock +  'AM';
                if (jHour == 0) {
                  jHour = 12;
                }
              } else {
                jclock = jclock + 'PM';
              }
              jobTime = jHour + ":" + jmin + " " + jclock;

            }

        }

        let estimateDate = null;
        if(document.getElementById('estDate').value != undefined &&document.getElementById('estDate').value != null){
            estimateDate = document.getElementById('estDate').value;
        }

        let estimateTime = null;
        let estimateTime24 = null;
        if(document.getElementById('estTime').value != undefined && document.getElementById('estTime').value != null){
            estimateTime = document.getElementById('estTime').value;
            estimateTime24 = document.getElementById('estTime').value;
            let estsplit = estimateTime.split(':');
            let eHour = estsplit[0];
            let emin = estsplit[1];
            let eclock = "";
            if(emin != undefined){
            if(eHour>12){
                eclock=eclock+"PM";
                eHour = parseInt(eHour - 12);
            }else if (eHour < 12) {
                eclock = eclock + 'AM';
                if (eHour == 0) {
                  eHour = 12;
                }
              } else {
                eclock = eclock + 'PM';
              }
              estimateTime = eHour + ":" + emin + " " + eclock;
            }
            
        }
        

        let street1 = null;
        if(document.getElementById('addy1').value != undefined && document.getElementById('addy1').value != null){
            street1 = document.getElementById('addy1').value;
        }
        let city1 = null;
        if(document.getElementById('city1').value != undefined && document.getElementById('city1').value != null){
            city1 = document.getElementById('city1').value;
        }
        let buzz1 = null;
        if(document.getElementById('buzz1').value != undefined && document.getElementById('buzz1').value != null){
            buzz1 = document.getElementById('buzz1').value;
        }
        let unit1 = null;
        if(document.getElementById('unit1').value != undefined && document.getElementById('unit1').value != null){
            unit1 = document.getElementById('unit1').value;
        }
        
        let floor1 = null;
        if(document.getElementById('floor1').value != undefined && document.getElementById('floor1').value != null){
            floor1 = document.getElementById('floor1').value;
        }
       
        let street2 = null;
        if(document.getElementById('addy2').value != undefined && document.getElementById('addy2').value !== null){
            street2 = document.getElementById('addy2').value;
        }
        let city2 = null;
        if(document.getElementById('city2').value != undefined && document.getElementById('city2').value != null){
            city2 = document.getElementById('city2').value;
        }
        let buzz2 = null;
        if(document.getElementById('buzz2').value != undefined && document.getElementById('buzz2').value != null){
            buzz2 = document.getElementById('buzz2').value;
        }
        let unit2 = null;
        if(document.getElementById('unit2').value != undefined && document.getElementById('unit2').value != null){
            unit2 = document.getElementById('unit2').value;
        }
        
        let floor2 = null;
        if(document.getElementById('floor2').value != undefined && document.getElementById('floor2').value != null){
            floor2 = document.getElementById('floor2').value;
        }

        //START OF PLAINTEXT
       
        let plaintext = "\nStart Date: " + jobDate + "\t\tStart Time: " + jobTime + "\n\nOur team will wrap up all items with our Moving Blankets and/or shrinkwrap. Service includes bed disassembly, reassembly and mattress bag cover.\n";

        plaintext = plaintext + "\nClient Info:\n";


        if(clientName != undefined && clientName != null && clientName != 0 ){
            plaintext = plaintext + "Name: " +clientName + "\n";
        }
        if(phone1 != undefined && phone1 != null && phone1 != 0 ){
            plaintext = plaintext + "Phone: " + phone1 + "\n";
        }
        if(phone2 != undefined && phone2 != null && phone2 != 0 ){
            plaintext = plaintext + "Phone: " + phone2 + "\n";
        }
        if(email != undefined && email != null && email != 0 ){
            plaintext = plaintext + "Email: " + email + "\n";
        }

        

         plaintext = plaintext + "\nItems\n";
                                                                                                        
        let armchair = parseInt(job.armchair);                                                                              // initialize variable
        if(countValues['armchair'] !== undefined && isNaN(countValues['armchair']) == false){           // check if box is undefined
            armchair = countValues['armchair'];                                                         //set value of varibale to match the value of box
        }                                                                           // if variable is undefined, set value to 0
        //console.log("Arm Chair: "+armchair); 
        if(armchair !== 0){
            plaintext = plaintext + armchair + "x\tArm Chair\n";                                      //if value isnt 0, append to plaintext
        }

        let art = parseInt(job.art);
        if(countValues['art'] !== undefined && isNaN(countValues['art']) == false){
            art = countValues['art'];
        }
        //console.log("art: "+art); 
        if(art != 0 ){
            plaintext = plaintext + art + "x\tArtwork\n";   
        }


        let bench = parseInt(job.bench);
        if(countValues['bench'] !== undefined && isNaN(countValues['bench']) == false){
            bench = countValues['bench'];
        }
        //console.log("bench: "+bench); 
        if(bench !== 0 ){
            plaintext = plaintext + bench + "x\tBench\n";   
        }

        let bookshelf = parseInt(job.bookshelf);
        if(countValues['bookshelf'] !== undefined && isNaN(countValues['bookshelf']) == false){
            bookshelf = countValues['bookshelf'];
        }
        //console.log("bookshelf: "+bookshelf); 
        if(bookshelf !== 0 ){
            plaintext = plaintext + bookshelf + "x\tBookshelf\n"; 
        }

        let chairs = parseInt(job.chairs);
        if(countValues['chairs'] !== undefined && isNaN(countValues['chairs']) == false){
            chairs = countValues['chairs'];
        }
        //console.log("chairs: "+chairs); 
        if(chairs != 0 ){
            plaintext = plaintext + chairs + "x\tChair\n"; 
        }

        let credenza = parseInt(job.credenza);
        if(countValues['credenza'] !== undefined && isNaN(countValues['credenza']) == false){
            credenza = countValues['credenza'];
        }

        //console.log("credenza: "+credenza); 
        if(credenza !== undefined && credenza !== null && credenza !==0 ){
            plaintext = plaintext + credenza + "x\tCredenza\n"; 
        }


        let chinaCab = parseInt(job.chinaCab);
        if(countValues['chinaCab'] !== undefined && isNaN(countValues['chinaCab']) == false){
            chinaCab = countValues['chinaCab'];
        }

        //console.log("chinaCab: "+chinaCab); 
        if(chinaCab != 0 ){
            plaintext = plaintext + chinaCab + "x\tChina Cabinet\n"; 
        }

        let coffeeTable = parseInt(job.coffeeTable);
        if(countValues['coffeeTable'] !== undefined && isNaN(countValues['coffeeTable']) == false){
            coffeeTable = countValues['coffeeTable'];
        }

        //console.log("coffeeTable: "+coffeeTable); 
        if(coffeeTable != 0 ){
            plaintext = plaintext + coffeeTable + "x\tCoffee Table\n"; 
        }

        let coffeeTableL = parseInt(job.coffeeTableL);
        if(countValues['coffeeTableL'] !== undefined && isNaN(countValues['coffeeTableL']) == false){
            coffeeTableL = countValues['coffeeTableL'];
        }
        //console.log("coffeeTableL: "+coffeeTableL); 
        if(coffeeTableL != 0 ){
            plaintext = plaintext + coffeeTableL + "x\tCoffee Table (Large)\n"; 
        }


        let glassTop = parseInt(job.glassTop);
        if(countValues['glassTop'] !== undefined && isNaN(countValues['glassTop']) == false){
            glassTop = countValues['glassTop'];
        }
        //console.log("glassTop: "+glassTop); 
        if(glassTop != 0 ){
            plaintext = plaintext + glassTop + "x\tGlass Table Top\n"; 
        }



        let diningTable = parseInt(job.diningTable);
        if(countValues['diningTable'] !== undefined && isNaN(countValues['diningTable']) == false){
            diningTable = countValues['diningTable'];
        }
        //console.log("diningTable: "+diningTable); 
        if(diningTable != 0 ){
            plaintext = plaintext + diningTable + "x\tDining Table\n"; 
        }



        let diningTableAss = parseInt(job.diningTableAss);
        if(countValues['diningTableAss'] !== undefined && isNaN(countValues['diningTableAss']) == false){
            diningTableAss = countValues['diningTableAss'];
        }
        //console.log("diningTableAss: "+diningTableAss); 
        if(diningTableAss != 0 ){
            plaintext = plaintext + diningTableAss + "x\tDining Table & Assembly\n"; 
        }


        let entertainment = parseInt(job.entertainment);
        if(countValues['entertainment'] !== undefined && isNaN(countValues['entertainment']) == false){
            entertainment = countValues['entertainment'];
        }
        //console.log("entertainment: "+entertainment); 
        if(entertainment != 0 ){
            plaintext = plaintext + entertainment + "x\tEntertainment Unit\n"; 
        }

        let tv = parseInt(job.tv);
        if(countValues['tv'] !== undefined && isNaN(countValues['tv']) == false){
            tv = countValues['tv'];
        }
        //console.log("tv: "+tv); 
        if(tv != 0 ){
            plaintext = plaintext + tv + "x\tTV\n"; 
        }


        let loveseat = parseInt(job.loveseat);
        if(countValues['loveseat'] !== undefined && isNaN(countValues['loveseat']) == false){
            loveseat = countValues['loveseat'];
        }
        //console.log("loveseat: "+loveseat); 
        if(loveseat != 0 ){
            plaintext = plaintext + loveseat + "x\tLoveseat\n"; 
        }

        let ottoman = parseInt(job.ottoman);
        if(countValues['ottoman'] !== undefined && isNaN(countValues['ottoman']) == false){
            ottoman = countValues['ottoman'];
        }
        //console.log("ottoman: "+ottoman); 
        if(ottoman != 0 ){
            plaintext = plaintext + ottoman + "x\tOttoman\n"; 
        }

        let rugs = parseInt(job.rugs);
        if(countValues['rugs'] !== undefined && isNaN(countValues['rugs']) == false){
            rugs = countValues['rugs'];
        }
        //console.log("rugs: "+rugs); 
        if(rugs != 0 ){
            plaintext = plaintext + rugs + "x\tRugs\n"; 
        }

        let beanBag = parseInt(job.beanBag);
        if(countValues['beanBag'] !== undefined && isNaN(countValues['beanBag']) == false){
            beanBag = countValues['beanBag'];
        }
        //console.log("beanBag: "+beanBag); 
        if(beanBag != 0 ){
            plaintext = plaintext + beanBag + "x\tBean Bag Chair\n"; 
        }

        let sofa = parseInt(job.sofa);
        if(countValues['sofa'] !== undefined && isNaN(countValues['sofa']) == false){
            sofa = countValues['sofa'];
        }
        //console.log("sofa: "+sofa); 
        if(sofa != 0 ){
            plaintext = plaintext + sofa + "x\tSofa\n"; 
        }


        let sectional = parseInt(job.sectional);
        if(countValues['sectional'] !== undefined && isNaN(countValues['sectional']) == false){
            sectional = countValues['sectional'];
        }
        //console.log("sectional: "+sectional); 

        if(sectional != 0 ){
            plaintext = plaintext + sectional + "x\tSectional\n"; 
        }


        let lampTable = parseInt(job.lampTable);
        if(countValues['lampTable'] !== undefined && isNaN(countValues['lampTable']) == false){
            lampTable = countValues['lampTable'];
        }
        //console.log("lampTable: "+lampTable); 
        if(lampTable != 0 ){
            plaintext = plaintext + lampTable + "x\tTable Lamp\n"; 
        }


        let lampFloor = parseInt(job.lampFloor);
        if(countValues['lampFloor'] !== undefined && isNaN(countValues['lampFloor']) == false){
            lampFloor = countValues['lampFloor'];
        }
        //console.log("lampFloor: "+lampFloor); 
        if(lampFloor != 0 ){
            plaintext = plaintext + lampFloor + "x\tFloor Lamp\n"; 
        }

        let bedAss = parseInt(job.bedAss);
        if(countValues['bedAss'] !== undefined && isNaN(countValues['bedAss']) == false){
            bedAss = countValues['bedAss'];
        }
        //console.log("bedAss: "+bedAss); 
        if(bedAss != 0 ){
            plaintext = plaintext + bedAss + "x\tBedframe & Assembly\n"; 
        }


        let king = parseInt(job.king);
        if(countValues['king'] !== undefined && isNaN(countValues['king']) == false){
            king = countValues['king'];
        }
        //console.log("king: "+king); 
        if(king != 0 ){
            plaintext = plaintext + king + "x\tMattress KING\n"; 
        }


        let queen = parseInt(job.queen);
        if(countValues['queen'] !== undefined && isNaN(countValues['queen']) == false){
            queen = countValues['queen'];
        }
        //console.log("queen: "+queen); 
        if(queen != 0 ){
            plaintext = plaintext + queen + "x\tMattress QUEEN\n"; 
        }



        let twin = parseInt(job.twin);
        if(countValues['twin'] !== undefined && isNaN(countValues['twin']) == false){
            twin = countValues['twin'];
        }
        //console.log("twin: "+twin); 
        if(twin != 0 ){
            plaintext = plaintext + twin + "x\tMattress TWIN\n"; 
        }

        let futon = parseInt(job.futon);
        if(countValues['futon'] !== undefined && isNaN(countValues['futon']) == false){
            futon = countValues['futon'];
        }
        //console.log("futon: "+futon); 
        if(futon != 0 ){
            plaintext = plaintext + futon + "x\tFuton\n"; 
        }


        let crib = parseInt(job.crib);
        if(countValues['crib'] !== undefined && isNaN(countValues['crib']) == false){
            crib = countValues['crib'];
        }
        //console.log("crib: "+crib); 
        if(crib != 0 ){
            plaintext = plaintext + crib + "x\tcrib\n"; 
        }


        let boxSpring = parseInt(job.boxSpring);
        if(countValues['boxSpring'] !== undefined && isNaN(countValues['boxSpring']) == false){
            boxSpring = countValues['boxSpring'];
        }
        //console.log("boxSpring: "+boxSpring); 
        if(boxSpring != 0 ){
            plaintext = plaintext + boxSpring + "x\tBoxspring\n"; 
        }


        let armoire = parseInt(job.armoire);
        if(countValues['armoire'] !== undefined && isNaN(countValues['armoire']) == false){
            armoire = countValues['armoire'];
        }
        //console.log("armoire: "+armoire); 
        if(armoire != 0 ){
            plaintext = plaintext + armoire + "x\tArmoire\n"; 
        }
        

        let dresser = parseInt(job.dresser);
        if(countValues['dresser'] !== undefined && isNaN(countValues['dresser']) == false){
            dresser = countValues['dresser'];
        }
        //console.log("dresser: "+dresser); 
        if(dresser != 0 ){
            plaintext = plaintext + dresser + "x\tDresser\n";
        }


        let nightstand = parseInt(job.nightstand);
        if(countValues['nightstand'] !== undefined && isNaN(countValues['nightstand']) == false){
            nightstand = countValues['nightstand'];
        }
        //console.log("nightstand: "+nightstand); 
        if(nightstand != 0 ){
            plaintext = plaintext + nightstand + "x\tNightstand\n";
        }

        let trunk = parseInt(job.trunk);
        if(countValues['trunk'] !== undefined && isNaN(countValues['trunk']) == false){
            trunk = countValues['trunk'];
        }
        //console.log("trunk: "+trunk); 
        if(trunk != 0 ){
            plaintext = plaintext + trunk + "x\tTrunk\n";
        }


        let mirrors = parseInt(job.mirrors);
        if(countValues['mirrors'] !== undefined && isNaN(countValues['mirrors']) == false){
            mirrors = countValues['mirrors'];
        }
        //console.log("mirrors: "+mirrors); 
        if(mirrors !=  0 ){
            plaintext = plaintext + mirrors + "x\tMirrors\n";
        }


        let stool = parseInt(job.stool);
        if(countValues['stool'] !== undefined && isNaN(countValues['stool']) == false){
            stool = countValues['stool'];
        }
        //console.log("stool: "+stool); 
        if(stool !=  0 ){
            plaintext = plaintext + stool + "x\tBarstools\n";
        }

        let cabinetWood = parseInt(job.cabinetWood);
        if(countValues['cabinetWood'] !== undefined && isNaN(countValues['cabinetWood']) == false){
            cabinetWood = countValues['cabinetWood'];
        }
        //console.log("cabinetWood: "+cabinetWood); 
        if(cabinetWood !=  0 ){
            plaintext = plaintext + cabinetWood + "x\tWood Cabinet\n";
        }

        let barCart = parseInt(job.barCart);
        if(countValues['barCart'] !== undefined && isNaN(countValues['barCart']) == false){
            barCart = countValues['barCart'];
        }
        //console.log("barCart: "+barCart); 
        if(barCart != 0 ){
            plaintext = plaintext + barCart + "x\tBar Cart\n";
        }

        let iron = parseInt(job.iron);
        if(countValues['iron'] !== undefined && isNaN(countValues['iron']) == false){
            iron = countValues['iron'];
        }
        //console.log("iron: "+iron); 
        if(iron != 0 ){
            plaintext = plaintext + iron + "x\tIroning Board\n";
        }
        

        let miniFridge = parseInt(job.miniFridge);
        if(countValues['miniFridge'] !== undefined && isNaN(countValues['miniFridge']) == false){
            miniFridge = countValues['miniFridge'];
        }
        //console.log("miniFridge: "+miniFridge); 
        if(miniFridge != 0 ){
            plaintext = plaintext + miniFridge + "x\tMini Fridge/Wine Cooler\n";
        }

        let appCounter = parseInt(job.appCounter);
        if(countValues['appCounter'] !== undefined && isNaN(countValues['appCounter']) == false){
            appCounter = countValues['appCounter'];
        }
        //console.log("appCounter: "+appCounter); 
        if(appCounter != 0 ){
            plaintext = plaintext + appCounter + "x\tCountertop Appliance\n";
        }

        let kitchenTable = parseInt(job.kitchenTable);
        if(countValues['kitchenTable'] !== undefined && isNaN(countValues['kitchenTable']) == false){
            kitchenTable = countValues['kitchenTable'];
        }
        //console.log("kitchenTable: "+kitchenTable); 
        if(kitchenTable != 0 ){
            plaintext = plaintext + kitchenTable + "x\tKitchen Table\n";
        }

        let vaccuum = parseInt(job.vaccuum);
        if(countValues['vaccuum'] !== undefined && isNaN(countValues['vaccuum']) == false){
            vaccuum = countValues['vaccuum'];
        }
        //console.log("vaccuum: "+vaccuum); 
        if(vaccuum != 0 ){
            plaintext = plaintext + vaccuum + "x\tVaccuum\n";
        }



        let sideTable = parseInt(job.sideTable);
        if(countValues['sideTable'] !== undefined && isNaN(countValues['sideTable']) == false){
            sideTable = countValues['sideTable'];
        }
        //console.log("sideTable: "+sideTable); 
        if(sideTable != 0 ){
            plaintext = plaintext + sideTable + "x\tSide Table\n";
        }

        let desk = parseInt(job.desk);
        if(countValues['desk'] !== undefined && isNaN(countValues['desk']) == false){
            desk = countValues['desk'];
        }
        //console.log("desk: "+desk); 
        if(desk != 0 ){
            plaintext = plaintext + desk + "x\tDesk\n";
        }

        let deskAss = parseInt(job.deskAss);
        if(countValues['deskAss'] !== undefined && isNaN(countValues['deskAss']) == false){
            deskAss = countValues['deskAss'];
        }
        //console.log("deskAss: "+deskAss); 
        if(deskAss != 0 ){
            plaintext = plaintext + deskAss + "x\tDesk & Assembly\n";
        }

        let fileCabinet = parseInt(job.fileCabinet);
        if(countValues['fileCabinet'] !== undefined && isNaN(countValues['fileCabinet']) == false){
            fileCabinet = countValues['fileCabinet'];
        }
        //console.log("fileCabinet: "+fileCabinet); 
        if(fileCabinet != 0 ){
            plaintext = plaintext + fileCabinet + "x\tFile Cabinet\n";
        }


        let pc = parseInt(job.pc);
        if(countValues['pc'] !== undefined && isNaN(countValues['pc']) == false){
            pc = countValues['pc'];
        }
        //console.log("pc: "+pc); 
        if(pc != 0 ){
            plaintext = plaintext + pc + "x\tComputer\n";
        }

        let printer = parseInt(job.printer);
        if(countValues['printer'] !== undefined && isNaN(countValues['printer']) == false){
            printer = countValues['printer'];
        }
        //console.log("printer: "+printer); 
        if(printer != 0 ){
            plaintext = plaintext + printer + "x\tPrinter\n";
        }


        let officeChair = parseInt(job.officeChair);
        if(countValues['officeChair'] !== undefined && isNaN(countValues['officeChair']) == false){
            officeChair = countValues['officeChair'];
        }
        //console.log("officeChair: "+officeChair); 
        if(officeChair != 0 ){
            plaintext = plaintext + officeChair + "x\tOffice Chair\n";
        }

        let bbq = parseInt(job.bbq);
        if(countValues['bbq'] !== undefined && isNaN(countValues['bbq']) == false){
            bbq = countValues['bbq'];
        }
        //console.log("bbq: "+bbq); 
        if(bbq != 0 ){
            plaintext = plaintext + bbq + "x\tBBQ\n";
        }


        let bike = parseInt(job.bike);
        if(countValues['bike'] !== undefined && isNaN(countValues['bike']) == false){
            bike = countValues['bike'];
        }
        //console.log("bike: "+bike); 
        if(bike != 0 ){
            plaintext = plaintext + bike + "x\tBicycles\n";
        }

        let deckBox = parseInt(job.deckBox);
        if(countValues['deckBox'] !== undefined && isNaN(countValues['deckBox']) == false){
            deckBox = countValues['deckBox'];
        }
        //console.log("deckBox: "+deckBox); 
        if(deckBox != 0 ){
            plaintext = plaintext + deckBox + "x\tDeckbox\n";
        }

        let equipment = parseInt(job.equipment);
        if(countValues['equipment'] !== undefined && isNaN(countValues['equipment']) == false){
            equipment = countValues['equipment'];
        }
        //console.log("equipment: "+equipment); 
        if(equipment !=  0 ){
            plaintext = plaintext + equipment + "x\tOutdoor Equipment\n";
        }


        let firepit = parseInt(job.firepit);
        if(countValues['firepit'] !== undefined && isNaN(countValues['firepit']) == false){
            firepit = countValues['firepit'];
        }
        //console.log("firepit: "+firepit); 
        if(firepit !=  0 ){
            plaintext = plaintext + firepit + "x\tFirepit\n";
        }


        let toy = parseInt(job.toy);
        if(countValues['toy'] !== undefined && isNaN(countValues['toy']) == false){
            toy = countValues['toy'];
        }
        //console.log("toy: "+toy); 
        if(toy !=  0 ){
            plaintext = plaintext + toy + "x\tToy\n";
        }

        let pot = parseInt(job.pot);
        if(countValues['pot'] !== undefined && isNaN(countValues['pot']) == false){
            pot = countValues['pot'];
        }
        //console.log("pot: "+pot); 
        if(pot != 0 ){
            plaintext = plaintext + pot + "x\tPotters\n";
        }


        let umbrella = parseInt(job.umbrella);
        if(countValues['umbrella'] !== undefined && isNaN(countValues['umbrella']) == false){
            umbrella = countValues['umbrella'];
        }
        //console.log("umbrella: "+umbrella); 
        if(umbrella != 0 ){
            plaintext = plaintext + umbrella + "x\tUmbrella\n";
        }

        let outTable = parseInt(job.outTable);
        if(countValues['outTable'] !== undefined && isNaN(countValues['outTable']) == false){
            outTable = countValues['outTable'];
        }
        //console.log("outTable: "+outTable); 
        if(outTable != 0 ){
            plaintext = plaintext + outTable + "x\tPatio Table\n";
        }


        let outChair = parseInt(job.outChair);
        if(countValues['outChair'] !== undefined && isNaN(countValues['outChair']) == false){
            outChair = countValues['outChair'];
        }
        //console.log("outChair: "+outChair); 
        if(outChair != 0 ){
            plaintext = plaintext + outChair + "x\tPatio Chair\n";
        }


        let adr = parseInt(job.adr);
        if(countValues['adr'] !== undefined && isNaN(countValues['adr']) == false){
            adr = countValues['adr'];
        }
        //console.log("adr: "+adr); 
        if(adr != 0 ){
            plaintext = plaintext + adr + "x\tAdriondack\n";
        }

        let outLove = parseInt(job.outLove);
        if(countValues['outLove'] !== undefined && isNaN(countValues['outLove']) == false){
            outLove = countValues['outLove'];
        }
        //console.log("outLove: "+outLove); 
        if(outLove != 0 ){
            plaintext = plaintext + outLove + "x\tOutDoor Loveseat\n";
        }


        let exbike = parseInt(job.exbike);
        if(countValues['exbike'] !== undefined && isNaN(countValues['exbike']) == false){
            exbike = countValues['exbike'];
        }
        //console.log("exbike: "+exbike); 
        if(exbike != 0 ){
            plaintext = plaintext + exbike + "x\tExercise Bike\n";
        }

        let exStation = parseInt(job.exStation);
        if(countValues['exStation'] !== undefined && isNaN(countValues['exStation']) == false){
            exStation = countValues['exStation'];
        }
        //console.log("exStation: "+exStation); 
        if(exStation != 0 ){
            plaintext = plaintext + exStation + "x\tExercise Station\n";
        }


        let treadmill = parseInt(job.treadmill);
        if(countValues['treadmill'] !== undefined && isNaN(countValues['treadmill']) == false){
            treadmill = countValues['treadmill'];
        }
        //console.log("treadmill: "+treadmill); 
        if(treadmill != 0 ){
            plaintext = plaintext + treadmill + "x\tTreadmill\n";
        }

        let fridge = parseInt(job.fridge);
        if(countValues['fridge'] !== undefined && isNaN(countValues['fridge']) == false){
            fridge = countValues['fridge'];
        }
        //console.log("fridge: "+fridge); 
        if(fridge != 0 ){
            plaintext = plaintext + fridge + "x\tFridge/Freezer\n";
        }
        

        let deepFreeze = parseInt(job.deepFreeze);
        if(countValues['deepFreeze'] !== undefined && isNaN(countValues['deepFreeze']) == false){
            deepFreeze = countValues['deepFreeze'];
        }
        //console.log("deepFreeze: "+deepFreeze); 
        if(deepFreeze != 0 ){
            plaintext = plaintext + deepFreeze + "x\tDeep Freeze\n";
        }

        let ladder = parseInt(job.ladder);
        if(countValues['ladder'] !== undefined && isNaN(countValues['ladder']) == false){
            ladder = countValues['ladder'];
        }
        //console.log("ladder: "+ladder); 
        if(ladder != 0 ){
            plaintext = plaintext + ladder + "x\tLadder\n";
        }

        let storage = parseInt(job.storage);
        if(countValues['storage'] !== undefined && isNaN(countValues['storage']) == false){
            storage = countValues['storage'];
        }
        //console.log("storage: "+storage); 
        if(storage != 0 ){
            plaintext = plaintext + storage + "x\tStorage Rack\n";
        }


        let toolChest = parseInt(job.toolChest);
        if(countValues['toolChest'] !== undefined && isNaN(countValues['toolChest']) == false){
            toolChest = countValues['toolChest'];
        }
        //console.log("toolChest: "+toolChest); 
        if(toolChest != 0 ){
            plaintext = plaintext + toolChest + "x\tTool Chest\n";
        }

        let tools = parseInt(job.tools);
        if(countValues['tools'] !== undefined && isNaN(countValues['tools']) == false){
            tools = countValues['tools'];
        }
        //console.log("tools: "+tools); 
        if(tools != 0 ){
            plaintext = plaintext + tools + "x\tGarden Tools\n";
        }


        let tires = parseInt(job.tires);
        if(countValues['tires'] !== undefined && isNaN(countValues['tires']) == false){
            tires = countValues['tires'];
        }
        //console.log("tires: "+tires); 
        if(tires != 0 ){
            plaintext = plaintext + tires + "x\tTires\n";
        }

        let weight = parseInt(job.weight);
        if(countValues['weight'] !== undefined && isNaN(countValues['weight']) == false){
            weight = countValues['weight'];
        }
        //console.log("weight: "+weight); 
        if(weight != 0 ){
            plaintext = plaintext + weight + "x\tWeight Set\n";
        }


        let box = parseInt(job.box);
        if(countValues['box'] !== undefined && isNaN(countValues['box']) == false){
            box = countValues['box'];
        }
        //console.log("box: "+box);
        if(box != 0 ){
            plaintext = plaintext + box + "x\tBoxes/Bins\n";
        } 


        let boxL = parseInt(job.boxL);
        if(countValues['boxL'] !== undefined && isNaN(countValues['boxL']) == false){
            boxL = countValues['boxL'];
        }
        //console.log("boxL: "+boxL); 
        if(boxL != 0 ){
            plaintext = plaintext + boxL + "x\tLarge Totes\n";
        }

        let ac = parseInt(job.ac);
        if(countValues['ac'] !== undefined && isNaN(countValues['ac']) == false){
            ac = countValues['ac'];
        }
        //console.log("ac: "+ac); 
        if(ac != 0 ){
            plaintext = plaintext + ac + "x\tAC/Heater\n";
        }


        let coatRack = parseInt(job.coatRack);
        if(countValues['coatRack'] !== undefined && isNaN(countValues['coatRack']) == false){
            coatRack = countValues['coatRack'];
        }
        //console.log("coatRack: "+coatRack); 
        if(coatRack != 0 ){
            plaintext = plaintext + coatRack + "x\tCoat Rack\n";
        }

        let deco = parseInt(job.deco);
        if(countValues['deco'] !== undefined && isNaN(countValues['deco']) == false){
            deco = countValues['deco'];
        }
        //console.log("deco: "+deco); 
        if(deco != 0 ){
            plaintext = plaintext + deco + "x\tDecoration/Statue\n";
        }


        let fan = parseInt(job.fan);
        if(countValues['fan'] !== undefined && isNaN(countValues['fan']) == false){
            fan = countValues['fan'];
        }
        //console.log("fan: "+fan); 
        if(fan != 0 ){
            plaintext = plaintext + fan + "x\tFan\n";
        }

        let suitcase = parseInt(job.suitcase);
        if(countValues['suitcase'] !== undefined && isNaN(countValues['suitcase']) == false){
            suitcase = countValues['suitcase'];
        }
        //console.log("suitcase: "+suitcase); 
        if(suitcase != 0 ){
            plaintext = plaintext + suitcase + "x\tSuitcase\n";
        }

        let piano = parseInt(job.piano);
        if(countValues['piano'] !== undefined && isNaN(countValues['piano']) == false){
            piano = countValues['piano'];
        }
        //console.log("piano: "+piano); 
        if(piano != 0 ){
            plaintext = plaintext + piano + "x\tApartment Piano\n";
        }


        let upPiano = parseInt(job.upPiano);
        if(countValues['upPiano'] !== undefined && isNaN(countValues['upPiano']) == false){
            upPiano = countValues['upPiano'];
        }
        //console.log("upPiano: "+upPiano); 
        if(upPiano != 0 ){
            plaintext = plaintext + upPiano + "x\tUpright Piano\n";
        }


        let pianoBaby = parseInt(job.pianoBaby);
        if(countValues['pianoBaby'] !== undefined && isNaN(countValues['pc']) == false){
            pianoBaby = countValues['pianoBaby'];
        }
        //console.log("pianoBaby: "+pianoBaby); 
        if(pianoBaby != 0 ){
            plaintext = plaintext + pianoBaby + "x\tBaby Grand Piano\n";
        }

        let keyboard = parseInt(job.keyboard);
        if(countValues['keyboard'] !== undefined && isNaN(countValues['keyboard']) == false){
            keyboard = countValues['keyboard'];
        }
        //console.log("keyboard: "+keyboard); 
        if(keyboard != 0 ){
            plaintext = plaintext + keyboard + "x\tKeyboard\n";
        }


        let drum = parseInt(job.drum);
        if(countValues['drum'] !== undefined && isNaN(countValues['drum']) == false){
            drum = countValues['drum'];
        }
        //console.log("drum: "+drum); 
        if(drum != 0 ){
            plaintext = plaintext + drum + "x\tDrumset/Instrument\n";
        }

        let guitar = parseInt(job.guitar);
        if(countValues['guitar'] !== undefined && isNaN(countValues['guitar']) == false){
            guitar = countValues['guitar'];
        }
        //console.log("guitar: "+guitar); 
        if(guitar != 0 ){
            plaintext = plaintext + guitar + "x\tGuitar\n";
        }


        let speaker = parseInt(job.speaker);
        if(countValues['speaker'] !== undefined && isNaN(countValues['speaker']) == false){
            speaker = countValues['speaker'];
        }
        //console.log("speaker: "+speaker); 
        if(speaker != 0 ){
            plaintext = plaintext + speaker + "x\tSpeakers/Amps\n";
        }

        let cat = parseInt(job.cat);
        if(countValues['cat'] !== undefined && isNaN(countValues['cat']) == false){
            cat = countValues['cat'];
        }
        //console.log("cat: "+cat); 
        if(cat != 0 ){
            plaintext = plaintext + cat + "x\tCatscartch\n";
        }

        let obese = parseInt(job.obese);
        if(countValues['obese'] !== undefined && isNaN(countValues['obese']) == false){
            obese = countValues['obese'];
        }
        //console.log("obese: "+obese); 
        if(obese != 0 ){
            plaintext = plaintext + obese + "x\tOversized Item\n";
        }

        let misc = parseInt(job.misc);
        if(countValues['misc'] !== undefined && isNaN(countValues['misc']) == false){
            misc = countValues['misc'];
        }
        //console.log("misc: "+misc); 
        if(misc != 0 ){
            plaintext = plaintext + misc + "x\tMiscellaneous Item\n";
        }

        let assS = parseInt(job.assS);
        if(countValues['assS'] !== undefined && isNaN(countValues['assS']) == false){
            assS = countValues['assS'];
        }
        //console.log("assS: "+assS); 
        if(assS != 0 ){
            plaintext = plaintext + assS + "x\tAssembly SMALL\n";
        }

        
        let assM = parseInt(job.assM);
        if(countValues['assM'] !== undefined && isNaN(countValues['assM']) == false){
            assM = countValues['assM'];
        }
        //console.log("assM: "+assM); 
        if(assM != 0 ){
            plaintext = plaintext + assM + "x\tAssembly MEDIUM\n";
        }

        let assL = parseInt(job.assL);
        if(countValues['assL'] !== undefined && isNaN(countValues['assL']) == false){
            assL = countValues['assL'];
        }
        //console.log("assL: "+assL);
        if(assL != 0 ){
            plaintext = plaintext + assL + "x\tAssembly LARGE\n";
        } 
                                                        //junk                                                        
        let junkTemp = 0;
        let junkType = 1;
        if (document.getElementById('junkType').value == 1){
            junkTemp = 0;
            junkType = 1;
            
        }
        if (document.getElementById('junkType').value == 2){
            junkTemp = 50;
            plaintext = plaintext + "JUNK removal: SMALL\n";
            junkType = 2;
        }
        if (document.getElementById('junkType').value == 3){
            junkTemp = 100;
            plaintext = plaintext + "JUNK removal: MEDIUM\n";
            junkType = 3;
        }
        if (document.getElementById('junkType').value == 4){
            junkTemp = 200;
            plaintext = plaintext + "JUNK removal: LARGE\n";
            junkType = 4;
        }

                                                //junk mattress
        let junkMatt = parseInt(job.junkMatt);
        if(countValues['junkMatt'] !== undefined && isNaN(countValues['junkMatt']) == false){
            junkMatt = countValues['junkMatt'];
        }
        //console.log("junkMatt: "+junkMatt); 
        if(junkMatt != 0 ){
            plaintext = plaintext + junkMatt + "x\tJUNK Mattress\n";
        }

        let otherJunk = parseInt(job.otherJunk);
        if(countValues['otherJunk'] !== undefined && isNaN(countValues['otherJunk']) == false){
            otherJunk = countValues['otherJunk'];
        }
        //console.log("otherJunk: "+otherJunk);
        if(otherJunk != 0 ){
            plaintext = plaintext+ "JUNK Miscellaneous Item: $" + otherJunk + "\n";
        }

                                                 //supplies
        let paper = parseInt(job.paper);
        if(countValues['paper'] !== undefined && isNaN(countValues['paper']) == false){
            paper = countValues['paper'];
        }
        //console.log("paper: "+paper); 
        if(paper != 0 ){
            plaintext = plaintext + paper + "x\tSUPPLIES Paper\n";
        }

        let bubble = parseInt(job.bubble);
        if(countValues['bubble'] !== undefined && isNaN(countValues['bubble']) == false){
            bubble = countValues['bubble'];
        }
        //console.log("bubble: "+bubble); 
        if(bubble != 0 ){
            plaintext = plaintext + bubble + "x\tSUPPLIES Bubblewrap\n";
        }

        let cardB = parseInt(job.cardB);
        if(countValues['cardB'] !== undefined && isNaN(countValues['cardB']) == false){
            cardB = countValues['cardB'];
        }
        //console.log("cardB: "+cardB); 
        if(cardB != 0 ){
            plaintext = plaintext + cardB + "x\tSUPPLIES Cardboard Box\n";
        }

        let wardB = parseInt(job.wardB);
        if(countValues['wardB'] !== undefined && isNaN(countValues['wardB']) == false){
            wardB = countValues['wardB'];
        }
        //console.log("wardB: "+wardB); 
        if(wardB != 0 ){
            plaintext = plaintext + wardB + "x\tSUPPLIES Wardrobe Box\n";
        }

        


        let totalTime = 0;
        let moveTime = 0;
        let totalPrice = 0;
        let junkPrice = 0;
        let suppliesPrice = 0;

        junkPrice = (parseFloat(junkTemp + (junkMatt*30)+(otherJunk)));

        suppliesPrice = (parseFloat((paper*30)+(bubble*30)+(cardB*4)+(wardB*25)));

        moveTime = bonus*(parseFloat((armchair*14)+(art*7)+(bench*8)+(bookshelf*12)+(chairs*5)+(credenza*14)+(coffeeTable*7)+(chinaCab*22)+(coffeeTableL*12)+(glassTop*13)+(crib*30)+(cat*10)+(outLove*12)+(adr*13)+(obese*60)
        +(diningTable*16)+(beanBag*12)+(diningTableAss*32)+(entertainment*10)+(tv*14)+(loveseat*14)+(ottoman*12)+(rugs*6)+(sofa*18)+(lampTable*5)+(sectional*25)+(lampFloor*5)
        +(bedAss*40)+(armoire*16)+(king*16)+(dresser*14)+(queen*14)+(nightstand*8)+(twin*12)+(trunk*8)+(futon*20)+(mirrors*8)+(boxSpring*14)+(stool*5)+(cabinetWood*8)+(barCart*8)
        +(iron*4)+(miniFridge*8)+(appCounter*6)+(kitchenTable*15)+(vaccuum*4)+(desk*12)+(sideTable*6)+(deskAss*35)+(fileCabinet*10)+(pc*6)+(printer*5)+(officeChair*6)+(bbq*10)+(bike*4)
        +(deckBox*6)+(equipment*5)+(firepit*14)+(toy*5)+(pot*8)+(umbrella*4)+(outTable*6)+(outChair*4)+(exbike*8)+(exStation*12)+(treadmill*20)+(fridge*6)+(deepFreeze*6)+(ladder*5)+(storage*10)+(toolChest*10)+(tools*8)+(tires*6)+(weight*12)
        +(box*2)+(boxL*3)+(ac*6)+(coatRack*5)+(deco*10)+(fan*5)+(suitcase*3)+(piano*22)+(upPiano*30)+(pianoBaby*60)+(keyboard*6)+(drum*10)+(guitar*5)+(speaker*6)+(misc*10)+(assS*10)+(assM*20)+(assL*35)+(wardB*6)));
        //dont forgt to add wordrobe boxes - ok done!

        //lunch
        
        if(document.getElementById('lunch').checked){
            lunch = true; 
            moveTime = parseFloat(moveTime+30);
            //console.log("Lunch set to true");
            
             
        }
        //console.log(lunch);

        const travelTime = document.getElementById('ttime').value; //travel time
        
        
        totalTime = (parseFloat(parseInt(travelTime)+parseFloat(moveTime))); //add travel time to total time

        //make sure time is atleast 3hours
        if(totalTime < 180){
            totalTime = 180;
        }
        //convert time from minutes to hours
        totalTime = parseFloat(totalTime/60);

        //add 8 hours for ferry
        if (document.getElementById('ferry').checked){ //modifier ferry
            ferry = true;
            totalTime = parseFloat(totalTime+ 8.00);

            
        }
        rate = parseInt(rate - 1);                  //have rate be a smaller by 1
        totalPrice = parseFloat(totalTime*rate + junkPrice + suppliesPrice); //dont forget to add junk and supplies - done
        
        plaintext = plaintext + "\nDETAILS:\n";
        
        plaintext = plaintext + "Estimated Total Time: " + (totalTime.toFixed(2) * 1) +" hours.\n";
        plaintext = plaintext + "Estimated Total Price: $" + totalPrice.toFixed(2) * 1 +".\n\n";

        if(notes != undefined && notes != null){
            plaintext = plaintext + "NOTES:\n" +notes + "\n";
        }

        let deposit = parseInt(totalPrice/5);
        deposit = Math.round(deposit/100)*100;

        plaintext = plaintext + "\nPick Up Location:\n";

        if(street1 != undefined && street1 != null && street1 != 0 ){
            plaintext = plaintext + street1 + "\n";
        }
        if(city1 != undefined && city1 != null && city1 != 0 ){
            plaintext = plaintext + city1;
        }
        if(unit1 != undefined && unit1 != null && unit1 != 0 ){
            plaintext = plaintext + "\nUnit: "+ unit1 + "\t\t";
        }
        if(buzz1 != undefined &&buzz1 != null &&buzz1 != 0 ){
            plaintext = plaintext + "Buzzer: "+ buzz1 + "\t\t";
        }
        if(floor1 != undefined && floor1 != null && floor1 != 0 ){
            plaintext = plaintext + "Floor: "+ floor1;
        }

        plaintext = plaintext + "\n\nDrop off Location:\n";

        if(street2 != undefined && street2 != null && street2 != 0 ){
            plaintext = plaintext + street2 + "\n";
        }
        if(city2 != undefined && city2 != null && city2 != 0 ){
            plaintext = plaintext + city2 + "\n";
        }
        if(unit2 != undefined && unit2 != null && unit2 !=0 ){
            plaintext = plaintext + "Unit: "+ unit2 + "\t\t";
        }
        if(buzz2 != undefined && buzz2 != null && buzz2 !=0 ){
            plaintext = plaintext + "Buzzer: "+ buzz2 + "\t\t";
        }
        if(floor2 != undefined && floor2 != null && floor2 != 0 ){
            plaintext = plaintext + "Floor: "+ floor2 + "\n";
        }

        let dateSplit = jobDate.split('-');
       
        
        let month = "";
        if (parseInt(dateSplit[1]) == 1){
             month = "January";
        }
        else if(parseInt(dateSplit[1]) == 2){
             month = "February";
        }else if(parseInt(dateSplit[1]) == 3){
             month = "March";
        }else if(parseInt(dateSplit[1]) == 4){
             month = "April";
        }else if(parseInt(dateSplit[1]) == 5){
             month = "May";        
        }else if(parseInt(dateSplit[1]) == 6){
             month = "June";
        }else if(parseInt(dateSplit[1]) == 7){
             month = "July";
        }else if(parseInt(dateSplit[1]) == 8){
             month = "August";
        }else if(parseInt(dateSplit[1]) == 9){
             month = "September";
        }else if(parseInt(dateSplit[1]) == 10){
             month = "October";
        }else if(parseInt(dateSplit[1]) == 11){
             month = "November";
        }else {
             month = "December";
        }
 
        let datePlain = dateSplit[0] + " - " + month + " - " + dateSplit[2];
 
         plaintext = plaintext + "\nServices include: Moving Truck(s), " + crew + " man crew, fuel and supplies.\n";
 
         plaintext = plaintext + "\nUnforeseen factors increasing the time or complexity of the service are subject to an additional $"+ rate +" hourly charge.\n\n";
         plaintext = plaintext + "To confirm moving date " + datePlain + ", please send interact e-transfer deposit of $" + deposit.toFixed(2) * 1 + " to payment@runstarservices.com\n\n";

        plaintext = plaintext + "Estimate Date: " + estimateDate + " " + estimateTime + "\n";

        plaintext = plaintext + "Created by: "+createdBy + "\n";
        if(updatedBy != ""){
            plaintext = plaintext + "Updated by: "+updatedBy + "\n";
        }
        
        //console.log(plaintext);

        

        //post here
        event.preventDefault(); // stop reload (?)

        let thisForm = document.getElementById('editJobForm');
        let jobEdited = document.getElementById('jobEdited');
        
        // update job
        try{
            fetch("http://localhost:5000/jobs/update/" + id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    clientName: clientName,
                    email: email,
                    phone1: phone1,
                    phone2: phone2,
                    jobDate: jobDate,
                    jobTime: jobTime,
                    jobTime24: jobTime24,
                    address1: street1,
                    city1: city1,
                    type1: type1,
                    address2: street2,
                    city2: city2,
                    type2: type2,
                    drive: drive,
                    hall: hall,
                    stair: stair,
                    ferry: ferry,
                    lunch: lunch,
                    estimateDate: estimateDate,
                    estimateTime: estimateTime,
                    estimateTime24: estimateTime24,
                    rate: document.getElementById('rate').value,
                    crew: crew,
                    unit1: unit1,
                    unit2: unit2,
                    buzz1: buzz1,
                    buzz2: buzz2,
                    floor1: floor1,
                    floor2: floor2,
                    armchair: armchair,
                    art: art,
                    bench: bench,
                    bookshelf: bookshelf,
                    chairs: chairs,
                    credenza: credenza,
                    chinaCab: chinaCab,
                    glassTop: glassTop,
                    coffeeTable: coffeeTable,
                    coffeeTableL: coffeeTableL,
                    diningTable: diningTable,
                    diningTableAss: diningTableAss,
                    entertainment: entertainment,
                    tv: tv,
                    loveseat: loveseat,
                    ottoman: ottoman,
                    rugs: rugs,
                    beanBag: beanBag,
                    sofa: sofa,
                    sectional: sectional,
                    lampTable: lampTable,
                    lampFloor: lampFloor,
                    bedAss: bedAss,
                    king: king,
                    queen: queen,
                    twin: twin,
                    futon: futon,
                    crib: crib,
                    boxSpring: boxSpring,
                    armoire: armoire,
                    dresser: dresser,
                    nightstand: nightstand,
                    trunk: trunk,
                    mirrors: mirrors,
                    stool: stool,
                    cabinetWood: cabinetWood,
                    barCart: barCart,
                    iron: iron,
                    miniFridge: miniFridge,
                    appCounter: appCounter,
                    kitchenTable: kitchenTable,
                    vaccuum: vaccuum,
                    sideTable: sideTable,
                    desk: desk,
                    deskAss: deskAss,
                    fileCabinet: fileCabinet,
                    pc: pc,
                    printer: printer,
                    officeChair: officeChair,
                    bbq: bbq,
                    bike: bike,
                    deckBox: deckBox,
                    equipment: equipment,
                    firepit: firepit,
                    toy: toy,
                    pot: pot,
                    umbrella: umbrella,
                    outTable: outTable,
                    outChair: outChair,
                    adr: adr,
                    outLove: outLove,
                    exbike: exbike,
                    exStation: exStation,
                    treadmill: treadmill,
                    fridge: fridge,
                    deepFreeze: deepFreeze,
                    ladder: ladder,
                    storage: storage,
                    toolChest: toolChest,
                    tools: tools,
                    tires: tires,
                    weight: weight,
                    box: box,
                    boxL: boxL,
                    ac: ac,
                    coatRack: coatRack,
                    deco: deco,
                    fan: fan,
                    suitcase: suitcase,
                    piano: piano,
                    upPiano: upPiano,
                    pianoBaby: pianoBaby,
                    keyboard: keyboard,
                    drum: drum,
                    guitar: guitar,
                    speaker: speaker,
                    misc: misc,
                    obese: obese,
                    cat: cat,
                    assS: assS,
                    assM: assM,
                    assL: assL,
                    junkMatt: junkMatt,
                    otherJunk: otherJunk,
                    junkType: junkType,
                    paper: paper,
                    bubble: bubble,
                    cardB: cardB,
                    wardB: wardB,
                    travelTime: travelTime,
                    totalTime: totalTime,
                    totalCost: totalPrice,
                    notes: notes,
                    createdBy: createdBy,
                    updatedBy: updatedBy,
                    plaintext: plaintext
                })
            });

        jobEdited.style.display = 'block';
        setTimeout(() => {
            jobEdited.style.display = 'none';
        }, 5000);

        thisForm.reset();
        
        setTimeout(() => {
            window.location.href = "/jobs/view?jobId=" + id; // view new job details page
        }, 200);
        
        }
        catch(e){
            //console.log(e);
        }
    }

    // component structure
    return(
        <>
        <div className='notification'>
            <div className='success' id='jobEdited'><p>Job edited.</p></div>
        </div>
        {job.clientName ?
        <form className="estimateContainer" id='editJobForm'>
            <h3>Editing Job #{job._id}</h3>
            
            <div className='jobInfo'>

                <h4 className='subtitle'>Job Details</h4>

                <div className='left'>

                    <label>Number of Crew</label>
                    <IncrementDecrementBtn id='crew' defaultValue={job.crew} updateCount={updateCountValue} minValue={2} maxValue={10}/>

                </div>
                <div className='right'>
                    <label>Rate</label>

                    <select name="rate" id="rate" defaultValue={job.rate}>
                        <option value="1">Standard</option>
                        <option value="2">Family and Friends</option>
                        <option value="3">Premium</option>
                    </select>

                </div>
            </div>

            <div className='clientInfo'>
                <h4 className='subtitle'>Client Information</h4>
                <div className='left'>
                    <label>Client Name</label>
                    <input type="text" id="name" defaultValue={job.clientName}></input>
        
                    <label>Phone</label>
                    <input type="text" id="phone1" defaultValue={job.phone1}></input>
        
                    <label>Phone</label>
                    <input type="text" id="phone2" defaultValue={job.phone2}></input>
        
                    <label>Email</label>
                    <input type="text" id="email" defaultValue={job.email}></input>
                </div>
                    
                <div className='right'>

                    <label>Estimate Date</label>
                    <input type="date" id="estDate" name="estDate" defaultValue={job.estimateDate} readOnly/>

                    <label>Estimate Time</label>
                    <input type="time" id="estTime" defaultValue={job.estimateTime24} readOnly></input>

                    <label>Job Date</label>
                    <input type="date" id="jobDate" name="jobDate" defaultValue={job.jobDate} />

                    <label>Job Start Time</label>
                    <input type="time" id="jobTime" defaultValue={job.jobTime24}></input>
                </div>
            </div>
            

                    {/* ADRESSESS */}


            <div className='address'>

                <div className='address1' id='address1'>
                    <h4>Moving from</h4>

                    <div className='left'>
                        <label>Address</label>
                        <input type="text" id="addy1"  defaultValue={job.address1}/> {/* Value for address 1 */}
                        
                        <label>City</label>
                        <input type="text" id="city1" defaultValue={job.city1}/>

                        <label>Type</label>
                        <select name="type1" id="type1" defaultValue={job.type1}>
                            <option value="1">House</option>
                            <option value="2">Town House</option>
                            <option value="3">Mansion</option>
                            <option value="4">Apartment</option>

                        </select>
                    </div>


                    <div className='right'>

                        <label>Buzzer Number</label>
                        <input type="text" id="buzz1" defaultValue={job.buzz1}/>

                        <label>Unit Number</label>
                        <input type="text" id="unit1" defaultValue={job.unit1}/>

                        <label>Floor Number</label>
                        <input type="text" id="floor1" defaultValue={job.floor1}/>

                    </div>
                
                </div>

                <div className='address2' id='address2'>
                    <h4>Moving To</h4>

                    <div className='left'>
                        <label>Address</label>
                        <input type="text" id="addy2" defaultValue={job.address2}/> {/* Value for address 2 */}
                        
                        <label>City</label>
                        <input type="text" id="city2" defaultValue={job.city2}/>

                        <label>Type</label>
                        <select name="type2" id="type2" defaultValue={job.type2}>
                            <option value="1">House</option>
                            <option value="2">Town House</option>
                            <option value="3">Mansion</option>
                            <option value="4">Apartment</option>

                        </select>
                        
                    </div>


                    <div className='right'>
                        

                        <label>Buzzer Number</label>
                        <input type="text" id="buzz2" defaultValue={job.buzz2}/>

                        <label>Unit Number</label>
                        <input type="text" id="unit2" defaultValue={job.unit2}/>

                        <label>Floor Number</label>
                        <input type="text" id="floor2" defaultValue={job.floor2}/>

                    </div>

                
                
                </div>

                <div className='modifiers'>
                    <h4 className='gridTitle'>Modifiers</h4>

                    <input type="checkbox" id="longDriveway"  defaultChecked={Boolean(job.drive == "true")}/>
                    <label htmlFor="longDriveway">Long Driveway</label>
                    
                    <input type="checkbox" id="hallway"  defaultChecked={Boolean(job.hall == "true")}/>
                    <label htmlFor="hallway">Long Hallway</label>

                    <input type="checkbox" id="stairs" defaultChecked={Boolean(job.stair == "true")}/>
                    <label htmlFor="stairs">Extra Stairs</label>

                    <input type="checkbox" id="ferry" defaultChecked={Boolean(job.ferry == "true")}/>
                    <label htmlFor="ferry">Ferry</label>

                    <input type="checkbox" id="lunch" defaultChecked={Boolean(job.lunch == "true")}/>
                    <label htmlFor="lunch">Lunch</label>

                </div>

                <div className='calculateTime'>
                    <Travel id='travel' name = 'travel' defaultValue={job.travelTime}/>
                </div>

            </div>

            <div className='furniture'>
                
                {/* HOME FURNITURE */}

                <div className='rooms-left'>
                    <h4 className='gridTitle'>Home Furniture</h4>
                    
                    <label>Arm chairs</label>
                    <IncrementDecrementBtn defaultValue={job.armchair} id='armchair' updateCount={updateCountValue} minValue={0} maxValue={50}/>

                    <label>Artwork</label>
                    <IncrementDecrementBtn defaultValue={job.art} id='art' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Bench</label>
                    <IncrementDecrementBtn defaultValue={job.bench} id='bench' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Bookshelf</label>
                    <IncrementDecrementBtn defaultValue={job.bookshelf} id='bookshelf' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Chairs</label>
                    <IncrementDecrementBtn defaultValue={job.chairs} id='chairs' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Credenza</label>
                    <IncrementDecrementBtn defaultValue={job.credenza} id='credenza' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Coffee table</label>
                    <IncrementDecrementBtn defaultValue={job.coffeeTable} id='coffeeTable' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>China cab.</label>
                    <IncrementDecrementBtn defaultValue={job.chinaCab} id='chinaCab' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Coffee table Large</label>
                    <IncrementDecrementBtn defaultValue={job.coffeeTableL} id='coffeeTableL' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Dining table</label>
                    <IncrementDecrementBtn defaultValue={job.diningTable} id='diningTable' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Glass TableTop</label>
                    <IncrementDecrementBtn defaultValue={job.glassTop} id = 'glassTop' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Dining table + Assembly</label>
                    <IncrementDecrementBtn defaultValue={job.diningTableAss} id='diningTableAss' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Entertainment Unit</label>
                    <IncrementDecrementBtn defaultValue={job.entertainment} id='entertainment' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Bean Bag</label>
                    <IncrementDecrementBtn defaultValue={job.beanBag} id='beanBag' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>TV</label>
                    <IncrementDecrementBtn defaultValue={job.tv} id='tv' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Loveseat</label>
                    <IncrementDecrementBtn defaultValue={job.loveseat} id='loveseat' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Ottoman</label>
                    <IncrementDecrementBtn defaultValue={job.ottoman} id='ottoman' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Rugs</label>
                    <IncrementDecrementBtn defaultValue={job.rugs} id='rugs' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Sofa</label>
                    <IncrementDecrementBtn defaultValue={job.sofa} id='sofa' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Table Lamp</label>
                    <IncrementDecrementBtn defaultValue={job.lampTable} id='lampTable' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Sectional</label>
                    <IncrementDecrementBtn defaultValue={job.sectional} id='sectional' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Floor Lamp</label>
                    <IncrementDecrementBtn defaultValue={job.lampFloor} id='lampFloor' updateCount={updateCountValue} minValue={0} maxValue={50} />
                </div>

                <div className='rooms-right'>
                    <h4 className='gridTitle'>Bedroom Furniture</h4>

                    <label>Bed + Assembley</label>
                    <IncrementDecrementBtn defaultValue={job.bedAss} id='bedAss' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Armoire</label>
                    <IncrementDecrementBtn defaultValue={job.armoire} id='armoire' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Mattress King</label>
                    <IncrementDecrementBtn defaultValue={job.king} id='king' updateCount={updateCountValue} minValue={0} maxValue={50} />
                    
                    <label>Dressers</label>
                    <IncrementDecrementBtn defaultValue={job.dresser} id='dresser' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Mattress Queen</label>
                    <IncrementDecrementBtn defaultValue={job.queen} id='queen' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Nightstand</label>
                    <IncrementDecrementBtn defaultValue={job.nightstand} id='nightstand' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Mattress Twin</label>
                    <IncrementDecrementBtn defaultValue={job.twin} id='twin' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Trunk</label>
                    <IncrementDecrementBtn defaultValue={job.trunk} id='trunk' updateCount={updateCountValue} minValue={0} maxValue={50} />
                   
                    <label>Futon</label>
                    <IncrementDecrementBtn defaultValue={job.futon} id='futon' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Mirrors</label>
                    <IncrementDecrementBtn defaultValue={job.mirrors} id='mirrors' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Box Spring</label>
                    <IncrementDecrementBtn defaultValue={job.boxSpring} id='boxSpring' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Crib + Assembly</label>
                    <IncrementDecrementBtn defaultValue={job.crib} id = 'crib' updateCount={updateCountValue} minValue={0} maxValue={50} />

                </div>

                {/* KITCHEN FURNITURE */}

                <div className='rooms-left'>
                    <h4 className='gridTitle'>Kitchen Furniture</h4>

                    <label>Barstools</label>
                    <IncrementDecrementBtn defaultValue={job.stool} id='stool' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Wood Cabinets</label>
                    <IncrementDecrementBtn defaultValue={job.cabinetWood} id='cabinetWood' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Bar Cart</label>
                    <IncrementDecrementBtn defaultValue={job.barCart} id='barCart' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Iron board</label>
                    <IncrementDecrementBtn defaultValue={job.iron} id='iron' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Mini fridge/Wine cooler</label>
                    <IncrementDecrementBtn defaultValue={job.miniFridge} id='miniFridge' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Countertop Appliance</label>
                    <IncrementDecrementBtn defaultValue={job.appCounter} id='appCounter' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Kitchen Table</label>
                    <IncrementDecrementBtn defaultValue={job.kitchenTable} id='kitchenTable' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Vacuum</label>
                    <IncrementDecrementBtn defaultValue={job.vaccuum} id='vaccuum' updateCount={updateCountValue} minValue={0} maxValue={50} />

                </div>

                {/* OFFICE FURNITURE */}

                <div className='rooms-right'>
                    <h4 className='gridTitle'>Office Furniture</h4>
                    
                    <label>Desk</label>
                    <IncrementDecrementBtn defaultValue={job.desk} id='desk' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Side table</label>
                    <IncrementDecrementBtn defaultValue={job.sideTable} id='sideTable' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Desk + Assembley</label>
                    <IncrementDecrementBtn defaultValue={job.deskAss} id='deskAss' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>File cabinet</label>
                    <IncrementDecrementBtn defaultValue={job.fileCabinet} id='fileCabinet' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Computer</label>
                    <IncrementDecrementBtn defaultValue={job.pc} id='pc' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Printer</label>
                    <IncrementDecrementBtn defaultValue={job.printer} id='printer' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Office chair</label>
                    <IncrementDecrementBtn defaultValue={job.officeChair} id='officeChair' updateCount={updateCountValue} minValue={0} maxValue={50} />

                </div>

                {/* OUTDOOR FURNITURE */}

                <div className='rooms-left'>
                    <h4 className='gridTitle'>Outdoor & Patio</h4>

                    <label>BBQ</label>
                    <IncrementDecrementBtn defaultValue={job.bbq} id='bbq' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Bicycles</label>
                    <IncrementDecrementBtn defaultValue={job.bike} id='bike' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Deck Box</label>
                    <IncrementDecrementBtn defaultValue={job.deckBox} id='deckBox' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Outdoor Equipment</label>
                    <IncrementDecrementBtn defaultValue={job.equipment} id='equipment' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Fire pit</label>
                    <IncrementDecrementBtn defaultValue={job.firepit} id='firepit' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Kids toys</label>
                    <IncrementDecrementBtn defaultValue={job.toy} id='toy' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Potters</label>
                    <IncrementDecrementBtn defaultValue={job.pot} id='pot' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Umbrella</label>
                    <IncrementDecrementBtn defaultValue={job.umbrella} id='umbrella' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Patio Tables</label>
                    <IncrementDecrementBtn defaultValue={job.outTable} id='outTable' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Patio Chairs</label>
                    <IncrementDecrementBtn defaultValue={job.outChair} id='outChair' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Adriondack</label>
                    <IncrementDecrementBtn defaultValue={job.adr} id='adr' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Outdoor Loveseat</label>
                    <IncrementDecrementBtn defaultValue={job.outLove} id='outLove' updateCount={updateCountValue} minValue={0} maxValue={50} />

                </div>


                {/* GARAGE FURNITURE */}

                <div className='rooms-right'>
                    <h4 className='gridTitle'>Garage</h4>

                    <label>Exercise Bike</label>
                    <IncrementDecrementBtn defaultValue={job.exbike} id='exbike' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Exercise Station</label>
                    <IncrementDecrementBtn defaultValue={job.exStation} id='exStation' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Treadmill</label>
                    <IncrementDecrementBtn defaultValue={job.treadmill} id='treadmill' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Fridge/Freezer</label>
                    <IncrementDecrementBtn defaultValue={job.fridge} id='fridge' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Deep Freeze</label>
                    <IncrementDecrementBtn defaultValue={job.deepFreeze} id='deepFreeze' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Ladder</label>
                    <IncrementDecrementBtn defaultValue={job.ladder} id='ladder' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Storage rack</label>
                    <IncrementDecrementBtn defaultValue={job.storage} id='storage' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Tool Chest</label>
                    <IncrementDecrementBtn defaultValue={job.toolChest} id='toolChest' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Garden Tools</label>
                    <IncrementDecrementBtn defaultValue={job.tools} id='tools' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Tires (4)</label>
                    <IncrementDecrementBtn defaultValue={job.tires} id='tires' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Weight set</label>
                    <IncrementDecrementBtn defaultValue={job.weight} id='weight' updateCount={updateCountValue} minValue={0} maxValue={50} />

                </div>

                {/* BOXES BINS */}

                <div className='rooms-left'>
                    <h4 className='gridTitle'>Boxes & Bins</h4>

                    <label>Boxes/Bins</label>
                    <IncrementDecrementBtn defaultValue={job.box} id='box' updateCount={updateCountValue} minValue={0} maxValue={200} />

                    <label>Large Tote</label>
                    <IncrementDecrementBtn defaultValue={job.boxL} id='boxL' updateCount={updateCountValue} minValue={0} maxValue={100} />

                </div>

                <div className='rooms-right'>
                    <h4 className='gridTitle'>Other</h4>

                    <label>AC/Heater</label>
                    <IncrementDecrementBtn defaultValue={job.ac} id='ac' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Coat rack</label>
                    <IncrementDecrementBtn defaultValue={job.coatRack} id='coatRack' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Home decor/Statue</label>
                    <IncrementDecrementBtn defaultValue={job.deco} id='deco' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Fans</label>
                    <IncrementDecrementBtn defaultValue={job.fan} id='fan' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Suitcases</label>
                    <IncrementDecrementBtn defaultValue={job.suitcase} id='suitcase' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Apartment Piano</label>
                    <IncrementDecrementBtn defaultValue={job.piano} id='piano' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Upright Piano</label>
                    <IncrementDecrementBtn defaultValue={job.upPiano} id='upPiano' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Baby Grand Piano</label>
                    <IncrementDecrementBtn defaultValue={job.pianoBaby} id='pianoBaby' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Keyboard</label>
                    <IncrementDecrementBtn defaultValue={job.keyboard} id='keyboard' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Drumset/instrument</label>
                    <IncrementDecrementBtn defaultValue={job.drum} id='drum' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Guitar</label>
                    <IncrementDecrementBtn defaultValue={job.guitar} id='guitar' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Speakers/Amps</label>
                    <IncrementDecrementBtn defaultValue={job.speaker} id='speaker' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Misc. Item </label>
                    <IncrementDecrementBtn defaultValue={job.misc} id='misc' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Catscratch</label>
                    <IncrementDecrementBtn defaultValue={job.cat} id = 'cat' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Oversized Item </label>
                    <IncrementDecrementBtn defaultValue={job.obese} id='obese' updateCount={updateCountValue} minValue={0} maxValue={50} />


                </div>

                <div className='rooms-left'>
                    <h4 className='gridTitle'>Assembly</h4>

                    <label>Small Assembly</label>
                    <IncrementDecrementBtn defaultValue={job.assS} id='assS' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Medium Assembly</label>
                    <IncrementDecrementBtn defaultValue={job.assM} id='assM' updateCount={updateCountValue} minValue={0} maxValue={50} />

                    <label>Large Assembly</label>
                    <IncrementDecrementBtn defaultValue={job.assL} id='assL' updateCount={updateCountValue} minValue={0} maxValue={50} />

                </div>

            
            </div>

            <div className='junk'>
                <h4 className='gridTitle'>Junk Removal</h4>

                <label>Junk Mattress</label>
                <IncrementDecrementBtn defaultValue={job.junkMatt} id='junkMatt' updateCount={updateCountValue} minValue={0} maxValue={50} />

                <label>Junk Removal</label>
                <select name="junkType" id="junkType" defaultValue={job.junkType}>
                    <option value="1">None</option>
                    <option value="2">Small</option>
                    <option value="3">Medium</option>
                    <option value="4">Large</option>
                </select>

                <label>Other Junk($)</label>
                <IncrementDecrementBtn defaultValue={job.otherJunk} id='otherJunk' updateCount={updateCountValue} minValue={0} maxValue={1000} />
            </div>

            <div className='supplies'>
                <h4 className='gridTitle'>Supplies</h4>
                <label>Paper</label>
                <IncrementDecrementBtn defaultValue={job.paper} id='paper' updateCount={updateCountValue} minValue={0} maxValue={100} />

                <label>Bubblewrap</label>
                <IncrementDecrementBtn defaultValue={job.bubble} id='bubble' updateCount={updateCountValue} minValue={0} maxValue={100} />

                <label>Cardboard Box</label>
                <IncrementDecrementBtn defaultValue={job.cardB} id='cardB' updateCount={updateCountValue} minValue={0} maxValue={100} />

                <label>Wardobe Box</label>
                <IncrementDecrementBtn defaultValue={job.wardB} id='wardB' updateCount={updateCountValue} minValue={0} maxValue={100} />
            </div>

            <div className='notes'>
                <h4 className='gridTitle'>Other Notes</h4>
                <textarea id='notepad' rows="5" defaultValue={job.notes}/>
            </div>

            <div className='submit'>
                <button className="submitButton" onClick={calcSubmit}>Submit Form</button>
            </div>
        </form> : <></> }
        </> 
    );
}

export default EditForm;