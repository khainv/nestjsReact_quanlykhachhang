import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AdminToken } from '../../entities/admin.token.entity.js';
import { Admin } from '../../entities/admin.entity.js';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminkService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(AdminToken)
    private adminTokenRepository: Repository<AdminToken>,
  ) {}
  async findOne(fields: FindOptionsWhere<Admin>): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: fields,
    });
    //console.log('admink.service.findOne ', admin);
    // Nếu không tìm thấy, chủ động ném ra lỗi 404 của NestJS
    if (!admin) {
      throw new NotFoundException(`Không tìm thấy tài khoản Admin này`);
    }
    return admin;
  }
  async validateAdmin(adm_account: string, adm_password: string) {
    const adm = await this.findOne({ adm_account });
    if (!adm) {
      return null;
    }
    const status = await bcrypt.compareSync(adm_password, adm.adm_password);
    //console.log('admink.service.validateAdmin', status);
    if (status) {
      return adm;
    }
    return null;
  }
  async findOneAdminToken(
    fields: FindOptionsWhere<AdminToken>,
  ): Promise<AdminToken | null> {
    const admToken = await this.adminTokenRepository.findOne({
      where: fields,
    });
    if (!admToken) {
      return null;
    }
    return admToken;
  }
  async saveRefeshToken(access_token:string,refresh_token: string, adm_id: number) {
    const adm = await this.findOneAdminToken({ adm_id });
    let admToken: any = {};
    if (!adm) {
      admToken = this.adminTokenRepository.create({
        adm_id: adm_id,
        refresh_token: refresh_token,
        access_token:access_token
      });
    } else {
      admToken.adm_id = adm_id;
      admToken.refresh_token = refresh_token;
      admToken.access_token=access_token;
    }
    return this.adminTokenRepository.save(admToken);
  }
  async delAdminToken(id: number): Promise<any> {
    const del = await this.adminTokenRepository.delete(id);
    return del.affected;
  }
}
