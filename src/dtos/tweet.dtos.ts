import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/entities/user.entity";

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty(
        {
            message: "All field are required!"
        }
    )
    username: string;

    @IsString()
    @IsNotEmpty(
        {
            message: "All field are required!"
        }
    )
    tweet: string;
}