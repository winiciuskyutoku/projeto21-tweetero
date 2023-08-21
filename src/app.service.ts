import { Injectable } from '@nestjs/common';
import { Tweet, User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetDto } from './dtos/tweet.dtos';

@Injectable()
export class AppService {

  private users: User[];
  private tweets: Tweet[];

  constructor(){
    this.users = []
    this.tweets = []
  }

  getUsers(): User[]{
    return this.users
  }

  postUser(body: CreateUserDto){
    const user = new User(body.username, body.avatar)
    return this.users.push(user)
  }

  postTweet(body: CreateTweetDto){
    if(!(this.users.some(e => e.getName() === body.username))){
      throw new Error()
    }

    const tweet = new Tweet(body.username, body.tweet)
    return this.tweets.push(tweet)
  }

  getTweets(page: number){
    const data = []
    
    if(page <= 0) {
      throw new Error()
    } 

    if(!page) page = 1
    const start = 15 * (page - 1);
    const end = 15 * page;

    let length = end
    if(end > this.tweets.length) length = this.tweets.length
  
    for (let i = start; i < length; i++) {
      data.push(
        {
          username: this.tweets[i].getUser(),
          avatar: this.users.find(e => e.getName() === this.tweets[i].getUser()).getAvatar(),
          tweet: this.tweets[i].getTweet()
        });
    }

    return data
  }

  getTweetsByUsername(name: string){
    const data = []

    for(let i = 0; i < this.tweets.length; i++){
      if(this.tweets[i].getUser() === name){
        data.push({
          username: name,
          avatar: this.users.find(e => e.getName() === name ? e.getAvatar() : undefined).getAvatar(),
          tweet: this.tweets[i].getTweet()
        })
      }
    }
    return data
  }
  
}
