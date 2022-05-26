import {Entity, model, property, hasMany} from '@loopback/repository';
import {Plataforma} from './plataforma.model';
import {Sp} from './sp.model';
import {Categoria} from './categoria.model';
import {Sc} from './sc.model';

@model()
export class Serie extends Entity {
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
  @property({
    type: 'number',
  })
  Temporadas?: number;

  @property({
    type: 'number',
  })
  Episodios?: number;
  @hasMany(() => Plataforma, {through: {model: () => Sp, keyFrom: 'sid', keyTo: 'pid'}})
  Plataforma: Plataforma[];

  @hasMany(() => Categoria, {through: {model: () => Sc, keyFrom: 'sid', keyTo: 'cid'}})
  Categoria: Categoria[];

  constructor(data?: Partial<Serie>) {
    super(data);
  }
}

export interface SerieRelations {
  // describe navigational properties here
}

export type SerieWithRelations = Serie & SerieRelations;
