import {Entity, hasMany, model, property} from '@loopback/repository';
import {Serie} from './serie.model';
import {Sp} from './sp.model';

@model()
export class Plataforma extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nome: string;

  @hasMany(() => Serie, {through: {model: () => Sp, keyFrom: 'pid', keyTo: 'sid'}})
  series: Serie[];

  constructor(data?: Partial<Plataforma>) {
    super(data);
  }
}

export interface PlataformaRelations {
  // describe navigational properties here
}

export type PlataformaWithRelations = Plataforma & PlataformaRelations;
