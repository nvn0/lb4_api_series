import {Entity, model, property} from '@loopback/repository';

@model()
export class Sc extends Entity {
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
  cid: number;

  @property({
    type: 'number',
    required: true,
  })
  sid: number;


  constructor(data?: Partial<Sc>) {
    super(data);
  }
}

export interface ScRelations {
  // describe navigational properties here
}

export type ScWithRelations = Sc & ScRelations;
