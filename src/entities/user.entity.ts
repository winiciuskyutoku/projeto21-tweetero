export class User {
    private name: string;
    private avatar: string;

    constructor(name: string, avatar: string){
        this.name = name;
        this.avatar = avatar;
    }

    public getName(){
        return this.name
    }

    public getAvatar(){
        return this.avatar
    }
}

export class Tweet {
    private user: string;
    private tweet: string;

    constructor(user: string, tweet: string){
        this.user = user;
        this.tweet = tweet;
    }

    public getUser() {
        return this.user
    }

    public getTweet() {
        return this.tweet
    }

    public set (){

    }
}