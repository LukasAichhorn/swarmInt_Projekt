class Swarm {
    constructor(numBots, bots) {
        this.numBots = numBots;
        this.bots = bots;
        this.taskCompleted = false;

    }
    addBot(bot) {
        this.bots.push(bot);
        this.numBots += 1;
    }

    

}