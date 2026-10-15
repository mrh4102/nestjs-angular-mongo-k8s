import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DiaryDocument = HydratedDocument<Diary>;

@Schema()
export class Diary {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  mood: string;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);
