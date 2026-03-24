import * as UTILS from "./utils.js";

export let TREE_CONFIG = {
    initThickness: 1,
    growRate: 0.05,
    maxThickness: 5,
    maxAge: 150,

    sproutingRate: 0.002,
    sproutingLength: 5,
    sproutingGrowProb: 0.2,

    influenceVectorInfluence: 0,
    maxRandomRotationTip: 0.1 * Math.PI,
    standardSproutAngle: 0.5 * Math.PI,

    breakingOffProb: 0.0010,

    awayFromCOMInfluence: 0.5,

    crowdingMinDist: 30,
    crowdingFactor: 0.90,

    minSproutingAge: 25,

    
}

export class Node {
    constructor(position, ancestor, descendants, centerOfMass = 0){
        console.assert((ancestor == null || ancestor instanceof Node), "Ancestor must be of type Node or null");

        this.position = position;
        this.ancestor = ancestor;
        this.descendants = descendants;
        this.age = 0;

        this.thickness = TREE_CONFIG.initThickness;
        this.maxAge = TREE_CONFIG.maxAge;
        this.growRate = TREE_CONFIG.growRate;
        this.maxThickness = TREE_CONFIG.maxThickness;

        this.sproutingRate = TREE_CONFIG.sproutingRate;
        this.sproutingLength = TREE_CONFIG.sproutingLength;

        this.hasSprouted = false;

        this.centerOfMass = centerOfMass;
        this.minSproutingAge = TREE_CONFIG.minSproutingAge;
    }

    grow(forceFields, crowdingForce = 1){

        if(this.age < this.maxAge){
            if(this.thickness < this.maxThickness){
                let growRateMultiplier = 1 ;
                this.thickness += this.growRate * growRateMultiplier;
            }
            if(!this.hasSprouted){
                if(this.age >= this.minSproutingAge && Math.random() <= this.sproutingRate * crowdingForce){
                    this.hasSprouted = true;
                    
                    let newDescendant = this.createSprout(crowdingForce);
                    if(newDescendant) this.descendants.push(newDescendant);
                }
            }
            if(this.age > 0){
                for(let descendant of this.descendants){
                    descendant.grow(forceFields, crowdingForce);
                }
            }
            this.age++;
            return true;
        }
        else{
            return false;
        }
    }

    createSprout(){
        //Normalized Vector orthogonal from ancestor to this node either negative or positive
        let orthVec = this.getOrthogonalGrowVector();
        let dirVec = this.getNormalizedGrowVector();

        if(dirVec){
            let desc_position = [this.position[0] + orthVec[0]*this.sproutingLength, this.position[1] + orthVec[1]*this.sproutingLength];
            let newDescendant = new MutatingNode(desc_position, this, [], orthVec, orthVec, this.centerOfMass);
            return newDescendant;
        }
        else{
            return false;
        }
    }

    draw(context){
        if(this.ancestor != null && this.age > 0){
            context.lineWidth = (this.thickness);// + this.ancestor.thickness)/2;
            context.strokeStyle = "#000000"; //Maybe later gradient depending on age or thickness
            context.beginPath();
            context.moveTo(this.position[0], this.position[1]);
            context.lineTo(this.ancestor.position[0], this.ancestor.position[1]);
            context.stroke();
        }
        for(let descendant of this.descendants){
            descendant.draw(context);
        }
    }

    getNormalizedGrowVector(){
        if(this.ancestor != null){
            return UTILS.normalizedDirectionVector(this.ancestor.position, this.position);
        }
        else{
            false;
        }
    }

    getOrthogonalGrowVector(){
        let vec = this.getNormalizedGrowVector();
        if(vec){
            if(Math.random() < 0.5) return [vec[1], -vec[0]];
            else return [-vec[1], vec[0]];
        }
        else{
            return false;
        }
    }

    calculateForcePoints(){
        if (this.descendants.length === 0) {
            return [this.position];
        } else {
            let points = [];
            for (let descendant of this.descendants) {
                //Through >= 0 also the not yet growing nodes of the strokes are included
                if (descendant.age >= 0){
                    points = points.concat(descendant.calculateForcePoints());
                }
            }
            points = points.concat([this.position]);
            return points;
        }
    }   

    calculateCOM(){
        let totalNodes = 1;
        let comX = this.position[0];
        let comY = this.position[1];

        for(let descendant of this.descendants){
            let com = descendant.calculateCOM();
            totalNodes += com[0];
            comX += com[1];
            comY += com[2];
        }

        return [totalNodes, comX, comY];
    }

    distributeVariable(variableName, variableValue){
        this[variableName] = variableValue;
        for(let descendant of this.descendants){
            descendant.distributeVariable(variableName, variableValue);
        }
    }
}

export class MutatingNode extends Node {
    constructor(position, ancestor, descendants, growVector, influenceVector, centerOfMass){
        super(position, ancestor, descendants, centerOfMass);

        this.growVector = growVector;
        this.influenceVector = influenceVector;

        this.iVI = TREE_CONFIG.influenceVectorInfluence;

        this.sproutingGrowProb = TREE_CONFIG.sproutingGrowProb;
        this.hasGrown = false;

        this.breakingOffProb = TREE_CONFIG.breakingOffProb;

        this.awayFromCOMI = TREE_CONFIG.awayFromCOMInfluence;
        
        this.crowdingMinDist = TREE_CONFIG.crowdingMinDist;
        this.crowdingFactor = TREE_CONFIG.crowdingFactor;

        //this.crowdingFactor = this.calcCrowdingForce(TREE_CONFIG.crowdingMinDist, TREE_CONFIG.crowdingFactor);

        this.sproutingRate = this.sproutingRate;
    }  

    grow(forceFields){
        let nowBreakingOffProb = this.breakingOffProb;
        let nowCrowdingFactor = 1;
        if(!this.hasGrown || !this.hasSprouted) nowCrowdingFactor = this.calcCrowdingForce(this.crowdingMinDist, this.crowdingFactor, forceFields);
        if(Math.random() <= nowBreakingOffProb && this.ancestor != null){
            this.ancestor.descendants = this.ancestor.descendants.filter(desc => desc !== this);
            return false;
        }
        else{
            if(Math.random() <= this.sproutingGrowProb * nowCrowdingFactor && !this.hasGrown){
                this.createTipSprout(nowCrowdingFactor);
            }
            super.grow(forceFields, nowCrowdingFactor);
        }
    }

    createTipSprout(crowdingForce = 1){
        this.hasGrown = true;
        let awayFromCOMVec =  UTILS.normalizeVector([this.position[0] - this.centerOfMass[0], this.position[1] - this.centerOfMass[1]]);

        let growingVec = UTILS.normalizeVector([this.growVector[0] + this.influenceVector[0]*this.iVI + awayFromCOMVec[0]*this.awayFromCOMI, this.growVector[1] + this.influenceVector[1]*this.iVI + awayFromCOMVec[1]*this.awayFromCOMI]);
        growingVec = UTILS.rotateVectorZ(growingVec, UTILS.randomNumberInRange(-TREE_CONFIG.maxRandomRotationTip, TREE_CONFIG.maxRandomRotationTip));
        growingVec = UTILS.vectorMulti(growingVec, crowdingForce);
        let nextPosition = [this.position[0] + growingVec[0] * this.sproutingLength, this.position[1] + growingVec[1] * this.sproutingLength];
        let newDescendant = new MutatingNode(nextPosition, this, [], growingVec, this.influenceVector, this.centerOfMass);
        this.descendants.push(newDescendant);
    }

    createSprout(crowdingForce = 1){
        //Normalized Vector orthogonal from ancestor to this node either - or positive
        
        let vec = UTILS.rotateVectorZ(this.growVector, (Math.random() > 0.5 ? -1 : 1) * TREE_CONFIG.standardSproutAngle);
        let awayFromCOMVec =  UTILS.normalizeVector([this.position[0] - this.centerOfMass[0], this.position[1] - this.centerOfMass[1]]);

        //let newInfluenceVector = UTILS.normalizeVector([(this.growVector[0]+this.influenceVector[0])*this.iVI + this.awayFromCOMVec[0]*this.awayFromCOMI, (this.growVector[1]+this.influenceVector[1])*this.iVI + this.awayFromCOMVec[1]*this.awayFromCOMI]);
        //let newInfluenceVector = UTILS.normalizeVector([this.growVector[0]*this.iVI + awayFromCOMVec[0]*this.awayFromCOMI, this.growVector[1]*this.iVI + awayFromCOMVec[1]*this.awayFromCOMI]);
        //let growingVec = UTILS.normalizeVector([vec[0]+ newInfluenceVector[0], vec[1]+ newInfluenceVector[1]]);
        let growingVec = UTILS.normalizeVector([vec[0] + awayFromCOMVec[0]*this.awayFromCOMI, vec[1] + awayFromCOMVec[1]*this.awayFromCOMI]);
        
        growingVec = UTILS.rotateVectorZ(growingVec, UTILS.randomNumberInRange(-TREE_CONFIG.maxRandomRotationTip, TREE_CONFIG.maxRandomRotationTip));
        growingVec = UTILS.vectorMulti(growingVec, crowdingForce);

        let descPosition = [this.position[0] + growingVec[0]*this.sproutingLength, this.position[1] + growingVec[1]*this.sproutingLength];
        let newDescendant = new MutatingNode(descPosition, this, [], growingVec, this.growVector, this.centerOfMass);
        return newDescendant;
    }

    calculateForcePoints(){
        if (this.descendants.length === 0) {
            return [this.position];
        } else {
            let oldestDescendant = this.descendants.reduce((oldest, descendant) => descendant.age > oldest.age ? descendant : oldest, this.descendants[0]);
            if (oldestDescendant.age == 0){
                return [this.position];
            }
            else{
                return oldestDescendant.calculateForcePoints();
            }
        }
    }

    calcCrowdingForce(crowdingMinDist, crowdingFactor, forceFields){
        if(forceFields.length === 0 || crowdingMinDist <= 0) return 1;

        let minDist = Infinity;
        for(let forceField of forceFields){
            for (let point of forceField){
                let dist = UTILS.calcDistance(this.position, point);
                minDist = Math.min(minDist, dist);
            }
        }
        if(minDist < crowdingMinDist){
            let normalizedDist = Math.max(0, Math.min(1, minDist / crowdingMinDist));
            let factor = 1 - crowdingFactor * (1 - normalizedDist);
            return factor;
        } else {
            return 1;
        }
    }

}