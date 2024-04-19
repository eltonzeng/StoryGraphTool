class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        console.log(this.engine.storyData);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}


class Location extends Scene {
    static myKeys = false;
    
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices != null) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                // TODO: use the Text of the choice
                this.engine.addChoice(choice.Text, choice); // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        
        if(choice) {
            if (choice.Key) {                                       // if choice.key is not null (i.e., I have a Key property) then
                //Location.myKeys.push(choice.Key);                       //    set a global variable that I have this key myKeys[keyname] = true

                Location.myKeys = true;
                this.engine.show(choice.KeyText);                   //    display the key text from choice.KeyText
            }                                                       
            if (choice.NeedsKey) {                                  // if choice.NeedsKey then
                //let key_text = choice.NeedsKey;                     //     get the name of the required key from needsKey

                if (Location.myKeys === true) {                        //     if myKeys[required keyname] is true then
                    this.engine.gotoScene(Location, choice.Target)  //        go to new location
                } else {                                            //    else
                    this.engine.show(choice.LockedMessage);         //  display locked message from choice.lockedmessage
                    console.log("locked message");
                    this.engine.gotoScene(Location, choice.Target2)
                }
            }

            if (choice.Action === "eatTomatoEgg") { 
                this.eatTomatoEgg();
                this.engine.gotoScene(Location, choice.Target);
            } else if (!choice.NeedsKey) {
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }

    eatTomatoEgg() {
        this.engine.show("Rest your labours, Reflect on your heritage, and Remind yourself what really matters.");
    }

    talkToShawn(choice) {
        this.engine.show("You talk to Shawn and he gives you a key.");
        flag = 1;
        this.engine.gotoScene(Location, this.engine.currentSceneKey);
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');