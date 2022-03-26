import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public readonly id: string;

  @ApiProperty()
  @Column({ name: 'email', type: 'varchar', unique: true })
  public email: string;

  @Exclude()
  @ApiHideProperty()
  @Column({ name: 'password', type: 'varchar' })
  public password: string;

  @ApiProperty({
    minimum: 0,
    maximum: 1,
  })
  @Column({ type: 'int', default: 0 })
  public permissionFlags: number;
}
