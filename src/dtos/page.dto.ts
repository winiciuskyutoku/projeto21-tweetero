import { IsNumberString, IsOptional } from "class-validator";

export class Page {
    @IsNumberString()
    @IsOptional()
    page?: number;
}