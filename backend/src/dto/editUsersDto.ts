import { PartialType } from '@nestjs/mapped-types';
import { AddUsersDto } from './addUsersDto.js';

export class EditUsersDto extends PartialType(AddUsersDto) {}
