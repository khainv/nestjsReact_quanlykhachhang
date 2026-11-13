import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class AddUsersActivitiesDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty({ message: 'khách hàng không tồn tại' })
  use_id: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty({ message: 'admin không tồn tại' })
  adm_id: number;

  @IsString()
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  act_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  act_des: string;
}
