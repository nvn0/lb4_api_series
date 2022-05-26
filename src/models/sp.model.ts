import {Entity, model, property} from '@loopback/repository';

@model()
export class Sp extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  pid: number;

  @property({
    type: 'number',
    required: true,
  })
  sid: number;


  constructor(data?: Partial<Sp>) {
    super(data);
  }
}

export interface SpRelations {
  // describe navigational properties here
}

export type SpWithRelations = Sp & SpRelations;
