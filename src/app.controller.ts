import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetDto } from './dtos/tweet.dtos';
import { Page } from './dtos/page.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/users")
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('/')
  health() {
    return "I'm okay!";
  }

  @Post("sign-up")
  postUser(@Body() body: CreateUserDto, @Res() res: Response) {
    this.appService.postUser(body);
    return res.sendStatus(200);
  }

  @Post("tweets")
  postTweets(@Body() body: CreateTweetDto){
    try{
      this.appService.postTweet(body)
      return {status: HttpStatus.CREATED, message: body}
    } catch(err){
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
    }
  }

  @Get("tweets")
  getTweets(@Query() query: Page){
    try {
      return this.appService.getTweets(query.page)
    } catch (err){
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST)
    }
  }

  @Get("tweets/:username")
  getTweetsByUsername(@Param("username") username: string){
    return this.appService.getTweetsByUsername(username)
  }
}
