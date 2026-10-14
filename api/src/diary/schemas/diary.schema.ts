import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DiaryDocument = HydratedDocument<Diary>;

@Schema()
export class Diary {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  mood: string;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);
