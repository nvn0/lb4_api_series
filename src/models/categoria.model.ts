import {Entity, model, property, hasMany} from '@loopback/repository';
import {Serie} from './serie.model';
import {Sc} from './sc.model';

@model()
export class Categoria extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nome: string;

  @hasMany(() => Serie, {through: {model: () => Sc, keyFrom: 'cid', keyTo: 'sid'}})
  series: Serie[];

  constructor(data?: Partial<Categoria>) {
    super(data);
  }
}

export interface CategoriaRelations {
  // describe navigational properties here
}

export type CategoriaWithRelations = Categoria & CategoriaRelations;
